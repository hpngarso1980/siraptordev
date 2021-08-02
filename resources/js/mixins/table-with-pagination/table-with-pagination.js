export default {
  props: {
    currentPage: {
      type: Number,
      default: 1,
    },

    pages: {
      type: Number,
      default: 1,
    },
  },

  methods: {
    changePage(page) {
      this.$emit('changePage', page);
    },
  },
};
