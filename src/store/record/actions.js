import Vue from 'vue';
import moment from 'moment';

const onThisWeek = (record) => {
  const weekStart = moment().startOf('isoWeek');
  const weekEnd = moment().endOf('isoWeek');
  return record.date >= weekStart && record.date <= weekEnd;
};

export const createRecord = async ({ commit, dispatch }, { payload, userId }) => {
  await Vue.prototype.$firestore
    .collection('users').doc(userId)
    .collection('records').doc()
    .set(payload);
  commit('createRecord', payload);

  if (onThisWeek(payload)) commit('addWeekRecord', payload);

  dispatch('status/updateStatus', {}, { root: true });
};

export const updateRecord = async ({ commit, dispatch }, { record, userId }) => {
  await Vue.prototype.$firestore
    .collection('users').doc(userId)
    .collection('records').doc(record.id)
    .set(record);
  commit('updateRecord', record);

  if (onThisWeek(record)) commit('updateWeekRecord', record);

  dispatch('status/updateStatus', {}, { root: true });
};

export const deleteRecord = async ({ commit, dispatch }, { record, userId }) => {
  await Vue.prototype.$firestore
    .collection('users').doc(userId)
    .collection('records').doc(record.id)
    .delete();
  commit('deleteRecord', record.id);

  if (onThisWeek(record)) commit('deleteWeekRecord', record);

  dispatch('status/updateStatus', {}, { root: true });
};

export const getWeekRecords = async ({ state, commit, dispatch }, userId) => {
  if (state.records.week.length > 0) return;

  const snapshot = await Vue.prototype.$firestore
    .collection('users').doc(userId)
    .collection('records')
    .where('date', '>=', moment().startOf('isoWeek').toDate())
    .where('date', '<=', moment().endOf('isoWeek').toDate())
    .get();
  const result = snapshot.docs.map((doc) => {
    const data = doc.data();
    data.id = doc.id;
    data.date = new Date(data.date.seconds * 1000);
    return data;
  });

  commit('setWeekRecords', result);
  dispatch('status/updateStatus', {}, { root: true });
};

export const getRecords = async ({ state, commit }, userId) => {
  if (state.records.all.length > 0) return;

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
