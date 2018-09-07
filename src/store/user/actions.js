import Vue from 'vue';
import { date } from 'quasar';

export const updateSettings = async ({ commit }, { payload, userId }) => {
  await Vue.prototype.$firestore
    .collection('users').doc(userId).update(payload);
  commit('setSettings', payload);
};

export const getUser = async ({ commit }, userId) => {
  const snapshot = await Vue.prototype.$firestore.collection('users').doc(userId).get();
  const result = snapshot.data();
  result.current.remainingDays = 8 - date.formatDate(new Date(), 'E');
  commit('setUser', result);
};

function addData(currentData, data) {
  return {
    earnings: currentData.earnings + data.earnings,
    expenses: currentData.expenses + data.expenses.fuel + data.expenses.others,
    distance: currentData.distance + data.distance,
    remainingDays: currentData.remainingDays,
  };
}

// function removeData(data) {
// }

export const updateCurrentStatus = async ({ state, commit }, data) => {
  const updatedData = addData(state.user.current, data);
  await Vue.prototype.$firestore.collection('users').doc(state.user.email).update({ current: updatedData });
  commit('updateCurrentStatus', updatedData);
};
