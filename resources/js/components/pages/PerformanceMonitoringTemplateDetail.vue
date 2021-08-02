<template>
  <div>
    <CBreadcrumb
      :items="breadcrumbItems"
      class="p-0 mb-4 border-0"
    />

    <PageTitle :title="title">
      <template #actions>
        <BaseActionButton
          text="Ubah ke Tampilan Edit"
          size=""
          icon="cil-pencil"
          @click="edit"
        />
      </template>
    </PageTitle>

    <TemplateDetail
      :indicator-groups="indicators"
    />
  </div>
</template>

<script>
import BaseActionButton from '@/components/atoms/BaseActionButton';
import PageTitle from '@/components/molecules/PageTitle';
import TemplateDetail from '@/components/organisms/PerformanceMonitoring/TemplateDetail';
import templateDetailMixin from '@/mixins/performance-monitoring/template-detail';

export default {
  name: 'PerformanceMonitoringTemplateDetail',

  components: {
    BaseActionButton,
    PageTitle,
    TemplateDetail,
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
        },
      ];
    },
  },

  methods: {
    edit() {
      const { id } = this.$route.params;

      this.$router.push({
        name: 'PerformanceMonitoringTemplateDetailFormEdit',
        params: {
          id,
        },
      });
    },
  },
};
</script>
