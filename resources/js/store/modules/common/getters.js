export default {
  permissions(state) {
    return state.profile && Array.isArray(state.profile.permissions)
      ? state.profile.permissions.map(({ name }) => name)
      : [];
  },

  role(state) {
    return (state.profile && state.profile.role) || {};
  },
};
