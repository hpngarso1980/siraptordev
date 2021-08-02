<template>
  <div>
    <vue-progress-bar />

    <RouterView />

    <ConfirmationModal
      :show="confirmationModalActive"
      :content="confirmationModalContent"
      :success-action="confirmationSuccessAction"
      :success-action-color="confirmationSuccessActionColor"
      @confirm="confirm"
      @cancel="cancel"
    />

    <notifications
      group="app"
      :duration="8000"
    />

  </div>
</template>

<script>
import ConfirmationModal from '@/components/molecules/ConfirmationModal'
import eventHub from '@/event-hub'

export default {
  name: 'App',

  components: {
    ConfirmationModal,
  },

  data() {
    return {
      confirmationModalActive: false,
      confirmationModalContent: '',
      confirmationModalPayload: null,
      confirmationSuccessAction: 'Ya, lanjutkan',
      confirmationSuccessActionColor: 'success',
    }
  },

  mounted() {
    eventHub.$on('open-confirmation', this.openConfirmation)
    eventHub.$on('open-delete-confirmation', this.openDeleteConfirmation)
    eventHub.$on('close-confirmation', this.closeConfirmation)
  },

  beforeDestroy() {
    eventHub.$on('open-confirmation', this.openConfirmation)
    eventHub.$off('open-delete-confirmation', this.openDeleteConfirmation)
    eventHub.$off('close-confirmation', this.closeConfirmation)
  },

  methods: {
    openConfirmation(eventPayload) {
      const {
        message,
        successActionText,
        successActionColor,
      } = eventPayload

      this.confirmationModalContent = message
      this.confirmationModalPayload = eventPayload
      this.confirmationSuccessAction = successActionText || 'Oke'
      this.confirmationSuccessActionColor = successActionColor || 'success'
      this.confirmationModalActive = true
    },

    openDeleteConfirmation(eventPayload) {
      const { title } = eventPayload

      this.confirmationModalContent = `Hapus ${title}?`
      this.confirmationModalPayload = eventPayload
      this.confirmationSuccessAction = 'Hapus'
      this.confirmationSuccessActionColor = 'danger'
      this.confirmationModalActive = true
    },

    closeConfirmation() {
      this.toggleConfirmationModal(false)
    },

    confirm() {
      eventHub.$emit('confirm-action', this.confirmationModalPayload)
    },

    cancel() {
      this.toggleConfirmationModal(false)
    },

    toggleConfirmationModal(show) {
      this.confirmationModalActive = show

      if (!show) {
        this.resetConfirmationModal()
      }
    },

    resetConfirmationModal() {
      this.confirmationModalContent = ''
      this.confirmationModalPayload = null
      this.confirmationSuccessAction = 'Ya, lanjutkan'
    },
  },
}
</script>
