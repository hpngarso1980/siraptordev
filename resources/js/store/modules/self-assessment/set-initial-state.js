export default function setInitialState() {
  return {
    actionPlans: [],
    actionPlansMeta: {},

    actionPlanHistories: {
      data: [],
      requestState: null,
    },

    streams: {
      data: [],
      meta: {},
      requestState: null,
      currentFilter: {},
    },

    areaGroups: {
      data: [],
      meta: {},
      requestState: null,
      currentFilter: {},
    },

    areas: {
      data: [],
      meta: {},
      requestState: null,
      currentFilter: {},
    },

    subAreas: {
      data: [],
      meta: {},
      requestState: null,
      currentFilter: {},
    },

    criteria: {
      data: [],
      meta: {},
      requestState: null,
      currentFilter: {},
    },

    summary: {
      data: [],
      requestState: null,
    },

    rank: {
      stream: {
        data: [],
        requestState: null,
      },
      user: {
        data: [],
        requestState: null,
      },
    },
  };
}
