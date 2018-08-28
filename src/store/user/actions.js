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
