<template>
  <CRow class="mb-3">

    <CCol lg="2">
      <CSelect
        :value.sync="internalSelectedTemplateId"
        :options="templateOptions"
        placeholder="Pilih Template"
      />
    </CCol>

    <CCol lg="2">
      <CSelect
        :value.sync="internalSelectedMonth"
        :options="$options.monthOptions"
        placeholder="Pilih bulan"
      />
    </CCol>

    <CCol lg="2">
      <CSelect
        :value.sync="internalSelectedReportType"
        :options="$options.reportTypeOptions"
        placeholder="Jenis Laporan"
      />
    </CCol>

    <CCol lg="3">
      <ActivateFilterButton @click="filter" />
    </CCol>

  </CRow>
</template>

<script>
import ActivateFilterButton from '@/components/atoms/ActivateFilterButton'
import { monthOptions } from '@/configs/options'
import reportTypeOptions from './configs/report-type-options'

export default {
  name: 'ReportFilter',

  components: {
    ActivateFilterButton,
  },

  props: {
    templates: {
      type: Array,
      default: () => [],
    },

    selectedTemplateId: {
      type: Number,
      default: null,
    },

    selectedMonth: {
      type: Number,
      default: null,
    },

    selectedReportType: {
      type: String,
      default: 'cumulative',
    },
  },

  data() {
    return {
      internalSelectedTemplateId: this.selectedTemplateId,
      internalSelectedMonth: this.selectedMonth,
      internalSelectedReportType: this.selectedReportType,
    }
  },

  computed: {
    templateOptions() {
      return this.templates.map(({ id, name }) => ({
        value: id,
        label: name,
      }))
    },
  },

  watch: {
    selectedTemplateId() {
      this.syncKeys('internalSelectedTemplateId', 'selectedTemplateId')
    },

    selectedMonth() {
      this.syncKeys('internalSelectedMonth', 'selectedMonth')
    },

    selectedReportType() {
      this.syncKeys('internalSelectedReportType', 'selectedReportType')
    }
  },

  methods: {
    syncKeys(internalKey, propKey) {
      if (this[internalKey] !== this[propKey]) {
        this[internalKey] = this[propKey]
      }
    },

    filter() {
      this.$emit('filter', {
        templateId: this.internalSelectedTemplateId,
        month: this.internalSelectedMonth,
        reportType: this.internalSelectedReportType,
      })
    },
  },

  monthOptions,
  reportTypeOptions,
}
</script>
