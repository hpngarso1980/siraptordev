<template>
  <CCard
    :class="{
      'border-0': !isScoreBoard,
      'card-table': tableContent,
    }"
    :style="cardStyle"
    class="mb-3 shadow-sm"
    @click="$emit('click')"
  >
    <CCardHeader
      v-if="title || $slots.title"
      class="d-flex font-weight-bold py-3 text-uppercase"
      :style="headerStyle"
    >
      <CIcon
        v-if="!isScoreBoard"
        name="cil-stream"
        class="flex-shrink-1 mr-3"
      />
      <div class="w-100">
        <slot name="title">
          {{ title }}
        </slot>
      </div>
    </CCardHeader>

    <CCardBody>
      <slot />
    </CCardBody>
  </CCard>
</template>

<script>
export default {
  name: 'ContentPanel',

  props: {
    title: {
      type: String,
      default: '',
    },

    tableContent: {
      type: Boolean,
      default: false,
    },

    type: {
      type: String,
      default: '',
    },

    backgroundColor: {
      type: String,
      default: '',
    },
  },

  computed: {
    cardStyle() {
      return this.isScoreBoard && this.backgroundColor
        ? `border-color: ${this.backgroundColor} !important;`
        : '';
    },

    headerStyle() {
      return this.isScoreBoard && this.backgroundColor
        ? `background: ${this.backgroundColor};`
        : '';
    },

    isScoreBoard() {
      return this.type === 'score-board';
    },
  },
};
</script>

<style lang="scss">
.card-table {
  .card-body {
    padding: 0;
  }

  table {
    thead {
      tr {
        th {
          border-top: none;
        }
      }
    }
  }
}
</style>
