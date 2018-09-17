/* eslint-disable */
import moment from 'moment';

export const updateStatus = ({ rootGetters, commit }) => {
  const status = rootGetters['record/weekRecords'].reduce((acc, record) => ({
    earnings: acc.earnings + record.earnings,
    expenses: acc.expenses + record.expenses.fuel + record.expenses.others,
    distance: acc.distance + record.distance,
  }), {
    earnings: 0,
    expenses: 0,
    distance: 0,
  });

  status.remainingDays = 8 - moment().isoWeekday();

  commit('updateStatus', status);
};