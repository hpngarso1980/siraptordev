export default {
  props: {
    editButtonShown: {
      type: Boolean,
      default: true,
    },

    deleteButtonShown: {
      type: Boolean,
      default: true,
    },
  },

  computed: {
    fields() {
      if (!this.$options.fields) return [];

      if (!this.editButtonShown && !this.deleteButtonShown) {
        return this.$options.fields.filter(({ key }) => key !== 'actions');
      }

      return this.$options.fields;
    },
  },

  methods: {
    edit(item) {
      this.$emit('edit', item);
    },

    remove(id) {
      this.$emit("remove", id);
    },
  },
};
