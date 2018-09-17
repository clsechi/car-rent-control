export const createRecord = (state, data) => {
  state.records.all.push(data);
};

export const updateRecord = (state, data) => {
  const recordIndex = state.records.all.findIndex(rec => rec.id === data.id);
  state.records.all[recordIndex] = data;
};

export const setRecords = (state, data) => {
  state.records.all = data;
};

export const deleteRecord = (state, data) => {
  state.records.all = state.records.all.filter(record => record.id !== data);
};

export const setWeekRecords = (state, data) => {
  state.records.week = data;
};

export const addWeekRecord = (state, data) => {
  state.records.week.push(data);
};

export const updateWeekRecord = (state, data) => {
  const recordIndex = state.records.week.findIndex(rec => rec.id === data.id);
  state.records.week[recordIndex] = data;
};

export const deleteWeekRecord = (state, data) => {
  state.records.week = state.records.week.filter(record => record.id !== data);
};

