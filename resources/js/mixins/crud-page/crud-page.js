import eventHub from '@/event-hub';

const deleteConfirmationLabel = 'data-deletion';

export default {
  data() {
    return {
      showForm: false,
      editModeForm: false,
      editFormData: {},
    };
  },

  mounted() {
    eventHub.$on('confirm-action', this.confirmAction);
    this.prepareData();
  },

  beforeDestroy() {
    eventHub.$off('confirm-action', this.confirmAction);
  },

  methods: {
    /**
     * Customizable methods
     *
     * You can add implementation for these methods
     * to fulfill your requirement
     */

    prepareData() {
      // Implement data preparation when component mounted

      return Promise.resolve();
    },

    beforeCreate() {
      // Implement actions before create form is activated
    },

    beforeEdit() {
      // Implement actions before edit form is activated
    },

    handleCreate(data) {
      // Implement save action

      return Promise.resolve(data);
    },

    handleUpdate(data) {
      // Implement save action

      return Promise.resolve(data);
    },

    handleRemove(data) {
      // Implement remove action

      return Promise.resolve(data);
    },

    setDeleteConfirmationPayload(data) {
      // Setup confirmation modal payload

      return {
        title: '',
        data,
      };
    },

    formatCreateSuccessMessage() {
      // Alter create success message

      return 'Data berhasil ditambahkan';
    },

    // eslint-disable-next-line no-unused-vars
    formatUpdateSuccessMessage(data) {
      // Alter update success message

      return 'Data berhasil diperbarui';
    },

    // eslint-disable-next-line no-unused-vars
    formatRemovalSuccessMessage(data) {
      // Alter removal success message

      return 'Data berhasil dihapus';
    },

    // eslint-disable-next-line no-unused-vars
    formatRemovalFailedMessage(data, error) {
      // Alter removal failed message

      return 'Data gagal dihapus';
    },

    /**
     * Generic methods
     *
     * No need to alter these methods
     * since they're commonly used
     */

    create() {
      this.beforeCreate();

      this.editModeForm = false;
      this.showForm = true;
    },

    edit(data) {
      this.beforeEdit(data);

      this.editFormData = {
        ...data,
      };
      this.editModeForm = true;
      this.showForm = true;
    },

    save(data) {
      let action = this.handleCreate;
      let successMessage = this.formatCreateSuccessMessage(data);

      if (this.editModeForm) {
        action = this.handleUpdate;
        successMessage = this.formatUpdateSuccessMessage(data);
      }

      return action(data)
        .then(() => {
          this.$root.showSuccessNotification(successMessage);
          this.closeForm();
        });
    },

    toggleDeleteConfirmation(deletedData) {
      const { title, data } = this.setDeleteConfirmationPayload(deletedData);

      this.$root.confirmDeletion(this.$options.deleteConfirmationLabel, title, data);
    },

    confirmAction(action) {
      if (action.type === this.$options.deleteConfirmationLabel) {
        this.handleRemove(action.payload)
          .then(() => {
            this.$root.showSuccessNotification(this.formatRemovalSuccessMessage(action.payload));
          })
          .catch((error) => {
            this.$root.showErrorNotification(
              this.formatRemovalFailedMessage(action.payload, error),
            );
          })
          .finally(() => {
            this.$root.closeConfirmation();
          });
      }
    },

    closeForm() {
      this.showForm = false;
    },
  },

  deleteConfirmationLabel,
};
