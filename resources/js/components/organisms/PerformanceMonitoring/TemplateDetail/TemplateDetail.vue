<template>
  <div>
    <ContentPanel
      v-for="(group, index) in groups"
      :key="index"
      table-content
    >
      <template #title>
        <div class="float-left">
          {{ group.title }}
        </div>
        <div
          v-if="!indicatorGroups[index].deduction"
          class="float-right"
        >
          Bobot: {{ calculateWeight(indicatorGroups[index].indicators) }}
        </div>
      </template>

      <CDataTable
        :items="group.indicators"
        :fields="indicatorGroups[index].deduction ? deductionFields : $options.fields"
        hover
      >
        <template #unit="{ item }">
          <td>
            {{ item.unit || '-' }}
          </td>
        </template>
      </CDataTable>
    </ContentPanel>
  </div>
</template>

<script>
import ContentPanel from '@/components/molecules/ContentPanel'
import flattenIndicators from '@/helpers/performance-monitoring-helpers/flatten-indicators'
import fields from './configs/fields'

export default {
  name: 'TemplateDetail',

  components: {
    ContentPanel,
  },

  props: {
    indicatorGroups: {
      type: Array,
      default: () => [],
    },
  },

  computed: {
    groups() {
      return this.indicatorGroups.map(({ title, indicators }) => ({
        title,
        indicators: flattenIndicators(indicators),
      }))
    },

    deductionFields() {
      return fields.filter(({ key }) => !['unit', 'weight'].includes(key))
    },
  },

  methods: {
    calculateWeight(indicators) {
      return indicators.reduce((totalWeight, { weight }) =>
        totalWeight + weight
      , 0)
    },
  },

  fields,
}
</script>

<style lang="scss">
tr.level {
  &-2 {
    td:first-child {
      padding-left: 28px;
    }
  }

  &-3 {
    td:first-child {
      padding-left: 36px;
    }
  }
}
</style>
