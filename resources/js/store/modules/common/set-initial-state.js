export default function setInitialState() {
  return {
    profile: null,
    profileStats: {},
    notifications: [],
    actionPlanStatusOptions: [],
    assigneeOptions: [],

    userRank: {
      data: [],
      requestState: null,
    },

    rankGroups: {
      data: [],
      requestState: null,
      isFetched: false,
    },

    actionPlanCategories: {
      data: [],
      meta: {},
      requestState: null,
      currentFilter: {},
    },
  };
}
