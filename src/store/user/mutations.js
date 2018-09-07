export const setSettings = (state, data) => {
  state.user.settings = data.settings;
};

export const setUser = (state, data) => {
  state.user = data;
};

export const updateCurrentStatus = (state, data) => {
  state.user.current = data;
};
