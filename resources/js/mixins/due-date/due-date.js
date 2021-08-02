import endOfYesterday from 'date-fns/endOfYesterday';

export default {
  computed: {
    disabledDueDates() {
      return {
        to: endOfYesterday(),
      };
    },
  },
};
