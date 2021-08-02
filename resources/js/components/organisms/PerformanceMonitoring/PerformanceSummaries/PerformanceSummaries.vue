<template>
  <CRow>
    <CCol
      v-for="summary in summaryGauges"
      :key="`${summary.slug}${keyPrefix}`"
      lg="4"
    >
      <PerformanceGauge
        :title="summary.title"
        :accomplishment-percentage="summary.accomplishment_percentage"
        :weight="summary.weight"
        :score="summary.score"
        class="clickable-block"
        @click="showDetail(summary)"
      />
    </CCol>

    <CCol>
      <CRow
        v-for="summary in summaryValues"
        :key="summary.slug"
      >
        <CCol>
          <ValueHolder
            :title="summary.title"
            :value="summary.score"
            :class="{ 'clickable-block': summary.slug !== 'final-score'}"
            @click="showDetail(summary)"
          />
        </CCol>
      </CRow>
    </CCol>
  </CRow>
</template>

<script>
import PerformanceGauge from '@/components/organisms/PerformanceMonitoring/PerformanceGauge';
import ValueHolder from '@/components/organisms/PerformanceMonitoring/ValueHolder';

export default {
  name: 'PerformanceSummaries',

  components: {
    PerformanceGauge,
    ValueHolder,
  },

  props: {
    summaries: {
      type: Object,
      default: () => ({}),
    },
  },

  data() {
    return {
      keyPrefix: new Date().getTime(),
    };
  },

  computed: {
    summaryGauges() {
      return this.summaries ? Object.values(this.summaries).filter((item) => item.type === 'performance') : [];
    },

    summaryValues() {
      return this.summaries ? Object.values(this.summaries).filter((item) => item.type !== 'performance') : [];
    },
  },

  watch: {
    summaries() {
      this.keyPrefix = new Date().getTime();
    },
  },

  methods: {
    showDetail(groupSlug) {
      this.$emit('showDetail', groupSlug);
    },
  },
};
</script>
