import Vue from 'vue';

const updateSettings = async (uid, payload) => {
  await Vue.prototype.$firestore.collection('users').doc(uid).update(payload);
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
  const { settings } = snapshot.data();
  settings.personal.startHour = new Date(settings.personal.startHour.seconds * 1000);
  settings.personal.endHour = new Date(settings.personal.endHour.seconds * 1000);
  commit('setSettings', settings);
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
    timestamp: Vue.prototype.firestore.FieldValue.serverTimestamp(),
  });
  commit('setData', payload);
};
