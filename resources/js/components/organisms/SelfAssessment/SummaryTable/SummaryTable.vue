<template>
  <ContentPanel table-content>
    <CDataTable
      :items="streams"
      :fields="$options.fields"
      hover
    >

      <template #quantity_check="{ item }">
        <td :class="percentageClasses(item.quantity_check)">
          {{ item.quantity_check }}%
        </td>
      </template>

      <template #status="{ item }">
        <td
          class="text-capitalize"
          :class="statusClasses(item.status)"
        >
          {{ item.status }}
        </td>
      </template>

      <template #finished_at="{ item }">
        <td>
          {{ item.created_at | toHumanDate }}
        </td>
      </template>

      <template #actions="{ item }">
        <td>
          <ViewDetailButton @click="view(item)" />
        </td>
      </template>

    </CDataTable>
  </ContentPanel>
</template>

<script>
import ViewDetailButton from '@/components/atoms/ViewDetailButton';
import ContentPanel from '@/components/molecules/ContentPanel'

import fields from './configs/fields';

export default {
  name: 'SelfAssessmentSummaryTable',

  components: {
    ViewDetailButton,
    ContentPanel,
  },

  props: {
    streams: {
      type: Array,
      default: () => [],
    },
  },

  methods: {
    view(stream) {
      this.$emit('view', stream);
    },

    percentageClasses(value) {
      if (value < 95) {
        return 'text-danger'
      } else if (value >= 95 && value < 100) {
        return 'text-warning'
      } else {
        return 'text-success'
      }
    },

    statusClasses(value) {
      if (value === 'diproses') {
        return 'text-warning'
      } else {
        return 'text-danger'
      }
    }
  },

  fields,
};
</script>
