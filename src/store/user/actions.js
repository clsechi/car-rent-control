import Vue from 'vue';

export const updateSettings = async ({ state, commit }, payload) => {
  await Vue.prototype.$firestore
    .collection('users').doc(state.user.uid).update(payload);
  commit('setSettings', payload);
};

export const getSettings = async ({ state, commit }) => {
  const snapshot = await Vue.prototype.$firestore.collection('users').doc(state.user.uid).get();
  const result = snapshot.data();
  commit('setSettings', result.settings);
};

export const updateProfile = async ({ commit }, payload) => {
  const {
    displayName,
    email,
    photoURL,
    uid,
  } = payload;

  await Vue.prototype.$firestore.collection('users').doc(uid).update({
    profile:
      {
        displayName,
        email,
        photoURL,
      },
  });
  commit('setData', payload);
};

export const createUser = async ({ commit }, payload) => {
  const {
    displayName,
    email,
    photoURL,
    uid,
  } = payload;

  const user = {
    profile:
      {
        displayName,
        email,
        photoURL,
      },
    settings: {
      car: {
        km: {
          allowed: null,
        },
      },
      rental: {
        costs: null,
      },
      costs: null,
    },
  };

  await Vue.prototype.$firestore.collection('users').doc(uid).set(user);
  commit('setUser', { ...user, uid });
};
