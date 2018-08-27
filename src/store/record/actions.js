import Vue from 'vue';

export const createRecord = async ({ commit }, { payload, userId }) => {
  await Vue.prototype.$firestore
    .collection('users').doc(userId)
    .collection('records').doc()
    .set(payload);
  commit('createRecord', payload);
};

export const updateRecord = async ({ commit }, { payload, userId }) => {
  await Vue.prototype.$firestore
    .collection('users').doc(userId)
    .collection('records').doc(payload.id)
    .set(payload);
  commit('updateRecord', payload);
};

export const getRecords = async ({ commit }, userId) => {
  const snapshot = await Vue.prototype.$firestore
    .collection('users').doc(userId)
    .collection('records')
    .get();
  const result = snapshot.docs.map((doc) => {
    const data = doc.data();
    data.id = doc.id;
    data.date = new Date(data.date.seconds * 1000);
    return data;
  });
  commit('setRecords', result);
};

export const deleteRecord = async ({ commit }, { id, userId }) => {
  await Vue.prototype.$firestore
    .collection('users').doc(userId)
    .collection('records').doc(id)
    .delete();
  commit('deleteRecord', id);
};

