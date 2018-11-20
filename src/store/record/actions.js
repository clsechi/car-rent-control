import Vue from 'vue';
import moment from 'moment';

const onThisWeek = (record) => {
  const weekStart = moment().startOf('isoWeek');
  const weekEnd = moment().endOf('isoWeek');
  return record.date >= weekStart && record.date <= weekEnd;
};

export const createRecord = async ({ rootGetters, commit, dispatch }, payload) => {
  await Vue.prototype.$firestore
    .collection('users').doc(rootGetters['user/uid'])
    .collection('records').doc()
    .set(payload, { merge: true });

  if (onThisWeek(payload)) commit('addWeekRecord', payload);

  dispatch('status/updateStatus', {}, { root: true });
};

export const updateRecord = async ({ rootGetters, commit, dispatch }, record) => {
  await Vue.prototype.$firestore
    .collection('users').doc(rootGetters['user/uid'])
    .collection('records').doc(record.id)
    .set(record, { merge: true });
  commit('updateRecord', record);

  if (onThisWeek(record)) commit('updateWeekRecord', record);

  dispatch('status/updateStatus', {}, { root: true });
};


export const deleteRecord = async ({ rootGetters, commit, dispatch }, record) => {
  await Vue.prototype.$firestore
    .collection('users').doc(rootGetters['user/uid'])
    .collection('records').doc(record.id)
    .delete();
  commit('deleteRecord', record.id);

  if (onThisWeek(record)) commit('deleteWeekRecord', record);

  dispatch('status/updateStatus', {}, { root: true });
};

export const getWeekRecords = async ({
  rootGetters,
  state,
  commit,
  dispatch,
}) => {
  if (state.records.week.length > 0) return;

  const snapshot = await Vue.prototype.$firestore
    .collection('users').doc(rootGetters['user/uid'])
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

export const getRecords = async ({ rootGetters, state, commit }) => {
  if (state.records.all.length > 0) return;

  const snapshot = await Vue.prototype.$firestore
    .collection('users').doc(rootGetters['user/uid'])
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
