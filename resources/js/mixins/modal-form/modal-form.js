import formMixin from '@/mixins/form';

export default {
  mixins: [
    formMixin,
  ],

  props: {
    show: {
      type: Boolean,
      default: false,
    },
  },

  computed: {
    title() {
      const mode = this.editMode ? 'Edit' : 'Tambah';

      return `${mode} ${this.$options.formTitle}`;
    },
  },

  watch: {
    show(show) {
      const { editedData, editMode } = this;

      if (show && editMode && editedData) {
        this.syncEditedData();
      } else {
        this.resetFormData();
      }
    }
  },

  methods: {
    updateShow(show) {
      this.$emit('update:show', show);
    },
  },

  formTitle: '',
};
