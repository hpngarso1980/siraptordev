export default {
  props: {
    editMode: {
      type: Boolean,
      default: false,
    },

    editedData: {
      type: Object,
      default: () => {},
    },
  },

  data() {
    return {
      formData: {
        ...this.getInitialFormData(),
      },
    };
  },

  methods: {
    syncEditedData() {
      const formData = this.formatBeforeEdit(this.editedData);

      this.formData = { ...formData };
    },

    formatBeforeEdit(formData) {
      return {
        ...this.getInitialFormData(),
        ...formData,
      };
    },

    async save() {
      const saveable = await this.beforeSave();

      if (!saveable) return;

      const formData = this.formatBeforeSave(this.formData);

      this.$emit('save', formData);
    },

    beforeSave() {
      return true;
    },

    formatBeforeSave(formData){
      return formData;
    },

    resetFormData() {
      this.beforeReset();

      this.formData = { ...this.getInitialFormData() };
    },

    beforeReset() {
    },

    getInitialFormData() {
      return this.$options.initialFormData;
    },
  },

  initialFormData: {},
};
