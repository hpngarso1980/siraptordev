<template>
  <CModal
    :show="show"
    :close-on-backdrop="false"
    class="text-center"
    centered
    @update:show="toggleConfirmationModal"
  >
    <div class="pt-3" v-html="content" />

    <template #header-wrapper>
      <div></div>
    </template>

    <template #footer-wrapper>
      <div class="p-3 pb-5">

        <CButton
          :color="successActionColor"
          class="mr-2"
          @click="confirm"
        >
          {{ successAction }}
        </CButton>

        <CButton
          variant="outline"
          color="dark"
          @click="cancel"
        >
          Batalkan
        </CButton>

      </div>
    </template>
  </CModal>
</template>

<script>
export default {
  name: 'ConfirmationModal',

  props: {
    show: {
      type: Boolean,
      default: false,
    },

    content: {
      type: String,
      default: '',
    },

    successAction: {
      type: String,
      default: 'Ya, lanjutkan',
    },

    successActionColor: {
      type: String,
      default: 'success',
    },
  },

  methods: {
    confirm() {
      this.$emit('confirm')
    },

    cancel() {
      this.$emit('cancel')
      this.toggleConfirmationModal(false)
    },

    toggleConfirmationModal(show) {
      this.$emit('update:show', show)
    },
  },
}
</script>
