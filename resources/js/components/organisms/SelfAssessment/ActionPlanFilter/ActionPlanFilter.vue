<template>
  <CRow class="mb-3">

    <CCol lg="3">
      <CSelect
        :value.sync="selectedTemplateId"
        :options="templateOptions"
        placeholder="Pilih template"
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
      <CSelect
        :value.sync="selectedAreaId"
        :options="areaOptions"
        placeholder="Pilih area"
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
  name: 'ActionPlanFilter',

  components: {
    ActivateFilterButton,
  },

  props: {
    templates: {
      type: Array,
      default: () => [],
    },

    streams: {
      type: Array,
      default: () => [],
    },

    areas: {
      type: Array,
      default: () => [],
    },
  },

  data() {
    return {
      selectedTemplateId: null,
      selectedStreamId: null,
      selectedAreaId: null,
    }
  },

  computed: {
    templateOptions() {
      return this.templates.map(({ id, name }) => ({
        value: id,
        label: name,
      }))
    },

    streamOptions() {
      return this.streams.map(({ id, name }) => ({
        value: id,
        label: name,
      }))
    },

    areaOptions() {
      return this.areas.map(({ id, name }) => ({
        value: id,
        label: name,
      }))
    },
  },

  methods: {
    filter() {
      this.$emit('filter', {
        template_id: this.selectedTemplateId,
        stream_id: this.selectedStreamId,
        area_id: this.selectedAreaId,
      })
    },
  },
}
</script>
