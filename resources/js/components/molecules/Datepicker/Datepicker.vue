<template>
  <VueDatepicker
    v-bind="$attrs"
    :language="$options.id"
    input-class="form-control"
    v-on="$listeners"
  />
</template>

<script>
import VueDatepicker from 'vuejs-datepicker';
import { id } from 'vuejs-datepicker/dist/locale';

export default {
  name: 'Datepicker',

  components: {
    VueDatepicker,
  },

  id,
};
</script>

<style lang="scss">
.vdp-datepicker {
  .form-control {
    &[readonly] {
      background-color: white;
    }
  }

  &__calendar {
    .cell {
      border-radius: 4px;

      &:hover {
        border: 1px solid #2D9D5B !important;
      }

      &.selected {
        background: #2D9D5B !important;
        color: white;
      }
    }
  }
}
</style>
