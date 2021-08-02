<template>
  <CRow class="mb-3">

    <CCol lg="3">
      <CSelect
        :value.sync="selectedProjectId"
        :options="projectOptions"
        placeholder="Pilih project"
      />
    </CCol>

    <CCol lg="3">
      <CSelect
        :value.sync="selectedStreamId"
        :options="streamOptions"
        placeholder="Pilih stream"
      />
    </CCol>

    <CCol lg="3">
      <ActivateFilterButton @click="filter" />
    </CCol>

  </CRow>
</template>

<script>
import ActivateFilterButton from '@/components/atoms/ActivateFilterButton';

export default {
  name: 'StreamSummaryFilter',

  components: {
    ActivateFilterButton,
  },

  props: {
    projects: {
      type: Array,
      default: () => [],
    },

    streams: {
      type: Array,
      default: () => [],
    },
  },

  data() {
    return {
      selectedProjectId: 1,
      selectedStreamId: 1,
    };
  },

  computed: {
    projectOptions() {
      return this.projects.map(({ id, name }) => ({
        value: id,
        label: name,
      }));
    },

    streamOptions() {
      return this.streams.map(({ id, name }) => ({
        value: id,
        label: name,
      }));
    },
  },

  methods: {
    filter() {
      this.$emit('filter', {
        template_id: this.selectedProjectId,
      });
    },
  },
};
</script>
