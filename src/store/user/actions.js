import Vue from 'vue';

export const updateSettings = async ({ state, commit }, payload) => {
  await Vue.prototype.$store.$firestore
    .collection('users').doc(state.user.uid).update(payload);
  commit('setSettings', payload);
};

export const getSettings = async ({ rootState, commit }, uid) => {
  const snapshot = await rootState.$firestore.collection('users').doc(uid).get();
  const result = snapshot.data();
  commit('setSettings', result);
};

export const updateProfile = async ({ rootState, commit }, payload) => {
  const {
    displayName,
    email,
    photoURL,
    uid,
  } = payload;

  console.log('uid', uid);

  try {
    await rootState.$firestore.collection('users').doc(uid).update({
      profile:
        {
          displayName,
          email,
          photoURL,
        },
    });
    commit('setData', payload);
  } catch (err) {
    Vue.prototype.$log.error('[updateProfile]', err);
  }
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

  await Vue.prototype.$store.$firestore.collection('users').doc(uid).set(user);
  commit('setUser', { ...user, uid });
};
