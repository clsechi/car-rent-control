export const setSettings = (state, data) => {
  state.user.settings = data;
};

export const updateRental = (state, data) => {
  state.user.settings.rental = data;
};

export const updateCar = (state, data) => {
  state.user.settings.car = data;
};

export const updatePersonal = (state, data) => {
  state.user.settings.personal = data;
};

export const setUser = (state, data) => {
  state.user = data;
};

export const setData = (state, data) => {
  const {
    displayName,
    email,
    photoURL,
    uid,
  } = data;

  state.user.uid = uid;

  state.user.profile = {
    displayName,
    email,
    photoURL,
  };
};
