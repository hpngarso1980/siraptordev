export default function setInitialState() {
  return {
    tasks: {
      data: [],
      meta: {},
      requestState: null,
      currentFilter: {},
    },
  };
}
