export const setSettings = (state, data) => {
  state.user.settings = data.settings;
};

export const setUser = (state, data) => {
  state.user = data;
};
