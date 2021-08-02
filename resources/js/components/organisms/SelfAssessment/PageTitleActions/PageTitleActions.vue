<template>
  <div>
    <CButton>
      <CIcon
        name="cil-clock"
        class="mr-1"
      />
      <template v-if="remainingDays >= 0">
        tersisa {{ remainingDays }} hari
      </template>
      <template v-else>
        selesai
      </template>
    </CButton>

    <CButton
      v-if="showCollapsibleToggle"
      class="btn-outline-dark ml-3"
      @click="$emit('toggleCollapsible')"
    >
      {{ isAllCollapsed ? 'Tampilkan' : 'Sembunyikan' }} semua
    </CButton>

    <CButton
      v-if="showSummaryLink"
      class="btn-dark ml-1"
      @click="$emit('toSummary')"
    >
      Ringkasan
    </CButton>

    <CButton
      v-if="showBoardLink"
      class="btn-dark ml-1"
      @click="$emit('toBoard')"
    >
      Tampilan board
    </CButton>
  </div>
</template>

<script>
export default {
  name: 'PageTitleActions',

  props: {
    remainingDays: {
      type: Number,
      default: 0,
    },

    showSummaryLink: {
      type: Boolean,
      default: true,
    },

    showBoardLink: {
      type: Boolean,
      default: false,
    },

    showCollapsibleToggle: {
      type: Boolean,
      default: false,
    },

    isAllCollapsed: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
