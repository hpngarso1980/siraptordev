<template>
  <ContentPanel>
    <CChartRadar
      :labels="criterias"
      :datasets="datasets"
    />
  </ContentPanel>
</template>

<script>
import { CChartRadar } from '@coreui/vue-chartjs'

import ContentPanel from '@/components/molecules/ContentPanel'

export default {
  name: 'StreamSummaryChart',

  components: {
    CChartRadar,
    ContentPanel,
  },

  props: {
    criterias: {
      type: Array,
      default: () => [],
    },

    target: {
      type: Array,
      default: () => [],
    },

    realization: {
      type: Array,
      default: () => [],
    },
  },

  computed: {
    datasets() {
      return [
        {
          label: 'Target',
          borderColor: 'rgba(245, 143, 164, 1)',
          fill: 'rgba(245, 143, 164, 0.5)',
          data: this.target,
        },
        {
          label: 'Realisasi',
          borderColor: 'rgba(112, 202, 129, 1)',
          fill: 'rgba(112, 202, 129, 0.5)',
          data: this.realization,
        },
      ]
    },
  },
}
</script>
