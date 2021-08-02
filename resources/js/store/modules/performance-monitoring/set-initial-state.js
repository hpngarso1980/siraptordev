export default function setInitialState() {
  return {
    detail: [],
    summaries: {},
    templates: [],
    template: {},
    indicators: [],

    latestFilter: {},
    templatesMeta: {},

    actionPlans: [],
    actionPlansMeta: {},

    actionPlanHistories: {
      data: [],
      requestState: null,
    },
  };
}
