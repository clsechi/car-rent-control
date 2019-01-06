import Vue from 'vue';

const updateSettings = async (uid, payload) => {
  await Vue.prototype.$firestore.collection('users').doc(uid).update(payload);
};

const toDate = (timestamp) => {
  if (!timestamp) return null;
  return timestamp.toDate();
};

export const setSettings = async ({ state, commit }, payload) => {
  const data = { settings: payload };
  await updateSettings(state.user.uid, data);
  commit('setSettings', payload);
};

export const updateRental = async ({ state, commit }, payload) => {
  const data = { 'settings.rental': payload };
  await updateSettings(state.user.uid, data);
  commit('updateRental', payload);
};

export const updateCar = async ({ state, commit }, payload) => {
  const data = { 'settings.car': payload };
  await updateSettings(state.user.uid, data);
  commit('updateCar', payload);
};

export const updatePersonal = async ({ state, commit }, payload) => {
  const data = { 'settings.personal': payload };
  await updateSettings(state.user.uid, data);
  commit('updatePersonal', payload);
};

export const getSettings = async ({ state, commit }) => {
  const snapshot = await Vue.prototype.$firestore.collection('users').doc(state.user.uid).get();
  const data = snapshot.data();
  if (data) {
    const { settings } = snapshot.data();
    settings.personal.startHour = toDate(settings.personal.startHour);
    settings.personal.endHour = toDate(settings.personal.endHour);
    commit('setSettings', settings);
  } else {
    commit('setSettings', null);
  }
};

export const updateProfile = async ({ commit }, payload) => {
  const {
    displayName,
    email,
    photoURL,
    uid,
  } = payload;

  await Vue.prototype.$firestore.collection('users').doc(uid).update({
    profile: {
      displayName,
      email,
      photoURL,
    },
    timestamp: Vue.prototype.$firestore.FieldValue.serverTimestamp(),
  });
  commit('setData', payload);
};
