export const settings = state => state.user.settings;

export const car = state => state.user.settings.car;

export const rental = state => state.user.settings.rental;

export const personal = state => state.user.settings.personal;

export const profile = state => state.user.profile;

export const uid = state => state.user.uid;

export const settingsCompleted = (state) => {
  const { user } = state;

  const requiredValues = [
    Boolean(user.settings.rental.costs.week),
    Boolean(user.settings.car.nickname),
    Boolean(user.settings.personal.costs),
  ];

  return requiredValues.reduce((acc, val) => acc && val, true);
};
