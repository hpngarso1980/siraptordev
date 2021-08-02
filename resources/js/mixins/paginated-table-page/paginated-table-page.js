import crudPageMixin from '@/mixins/crud-page';

export default {
  mixins: [
    crudPageMixin,
  ],

  computed: {
    currentPage() {
      const currentPage = Number(this.$route.query.page);
      return currentPage && currentPage > 0 ? currentPage : 1;
    },

    pages() {
      const { last_page: lastPage = 1 } = this.meta || {};

      return lastPage;
    },
  },

  methods: {
    /**
     * Customizable methods
     *
     * You can add implementation for these methods
     * to fulfill your requirement
     */

    getPaginatedData() {
      // Implement get paginated data when paga is changed

      return Promise.resolve();
    },

    /**
     * Generic methods
     *
     * No need to alter these methods
     * since they're commonly used
     */

    changePage(page) {
      this.$router.push({
        query: {
          page,
        },
      });
    },
  },
};
