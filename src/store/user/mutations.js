export const setSettings = (state, data) => {
  state.user.settings = data.settings;
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
