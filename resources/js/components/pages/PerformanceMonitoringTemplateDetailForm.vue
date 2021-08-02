<template>
  <div>
    <CBreadcrumb
      :items="breadcrumbItems"
      class="p-0 mb-4 border-0"
    />

    <PageTitle :title="title">
      <template #actions>
        <BaseActionButton
          text="Ubah ke Tampilan Tabel"
          size=""
          icon="cil-list"
          @click="showList"
        />
      </template>
    </PageTitle>

    <TemplateDetailForm
      :indicator-groups="indicators"
      @save="save"
    />
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import BaseActionButton from '@/components/atoms/BaseActionButton';
import PageTitle from '@/components/molecules/PageTitle';
import TemplateDetailForm from '@/components/organisms/PerformanceMonitoring/TemplateDetailForm';
import templateDetailMixin from '@/mixins/performance-monitoring/template-detail';
import { performanceMonitoring } from '@/configs/store/modules';
import { syncIndicators } from '@/configs/store/action-types';

export default {
  name: 'PerformanceMonitoringTemplateDetailForm',

  components: {
    BaseActionButton,
    PageTitle,
    TemplateDetailForm,
  },

  mixins: [
    templateDetailMixin,
  ],

  computed: {
    breadcrumbItems() {
      return [
        {
          text: 'Periode Monitoring Kinerja',
          to: { name: 'PerformanceMonitoringTemplate' },
        },
        {
          text: this.title,
          to: {
            name: 'PerformanceMonitoringTemplateDetail',
            params: {
              id: this.template.id,
            },
          },
        },
        {
          text: 'Edit',
        },
      ];
    },
  },

  methods: {
    ...mapActions(performanceMonitoring, [
      syncIndicators,
    ]),

    showList() {
      const { id } = this.$route.params;

      this.$router.push({
        name: 'PerformanceMonitoringTemplateDetail',
        params: {
          id,
        },
      });
    },

    save(indicators = [], deleted = []) {
      this.syncIndicators({
        indicators,
        deleted,
        templateId: this.template.id,
      })
        .then(() => this.$root.showSuccessNotification('Indikator berhasil disimpan'))
        .catch(() => this.$root.showErrorNotification('Indikator gagal disimpan'));
    },
  },
};
</script>
