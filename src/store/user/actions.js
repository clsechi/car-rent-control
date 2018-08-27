import Vue from 'vue';

export const updateSettings = async ({ commit }, { payload, userId }) => {
  await Vue.prototype.$firestore
    .collection('users').doc(userId).update(payload);
  commit('setSettings', payload);
};

export const getUser = async ({ commit }, userId) => {
  const snapshot = await Vue.prototype.$firestore.collection('users').doc(userId).get();
  const result = snapshot.data();
  commit('setUser', result);
};
