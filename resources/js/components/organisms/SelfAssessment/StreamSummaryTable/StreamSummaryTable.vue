<template>
  <ContentPanel table-content>
    <CDataTable
      :items="areas"
      :fields="$options.fields"
      hover
    />
  </ContentPanel>
</template>

<script>
import ContentPanel from '@/components/molecules/ContentPanel'

import fields from './configs/fields';

export default {
  name: 'SelfAssessmentStreamSummaryTable',

  components: {
    ContentPanel,
  },

  props: {
    areas: {
      type: Array,
      default: () => [],
    },
  },

  fields,
};
</script>
