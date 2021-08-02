<template>
  <div>
    <PageTitle title="Monitoring Kinerja" />

    <ReportFilter
      :templates="templates"
      :selected-template-id="selectedTemplateId"
      :selected-month="selectedMonth"
      :selected-report-type="selectedReportType"
      @filter="filter"
    />

    <PerformanceSummaries
      :summaries="summaries"
      @showDetail="showDetail"
    />

    <PerformanceDetail
      v-if="detailSection.show"
      :title="detailSection.title"
      :indicators="detailSection.indicators"
      :month="selectedMonth"
      :deduction="isDeduction"
      @edit="showIndicatorEditor"
    />

    <PerformanceDetailForm
      :show="editIndicator.show"
      :indicator="editIndicator.indicator"
      :month="editIndicator.month"
      :parent="editIndicator.hasChildren"
      :template-id="selectedTemplateId"
      :cumulative="cumulativeReport"
      :deduction="isDeduction"
      @update:show="updateIndicatorEditor"
      @assessment-updated="handleAssessmentUpdated"
    />
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import { performanceMonitoring } from '@/configs/store/modules';
import {
  getAssessments,
  getTemplates,
  getSummaries,
  setLatestFilter,
  updateAssessment,
} from '@/configs/store/action-types';
import PageTitle from '@/components/molecules/PageTitle';
import PerformanceDetail from '@/components/organisms/PerformanceMonitoring/PerformanceDetail';
import PerformanceDetailForm from '@/components/organisms/PerformanceMonitoring/PerformanceDetailForm';
import PerformanceSummaries from '@/components/organisms/PerformanceMonitoring/PerformanceSummaries';
import ReportFilter from '@/components/organisms/PerformanceMonitoring/ReportFilter';

export default {
  name: 'PerformanceMonitoring',

  components: {
    PageTitle,
    PerformanceDetail,
    PerformanceDetailForm,
    PerformanceSummaries,
    ReportFilter,
  },

  data() {
    return {
      selectedTemplateId: null,
      selectedMonth: null,
      selectedReportType: 'cumulative',
      openedGroup: null,
      detailSection: {
        show: false,
        title: '',
        indicators: [],
      },
      editIndicator: {
        show: false,
        indicator: null,
        month: null,
        cumulative: false,
        assessments: [],
      },
    };
  },

  computed: {
    ...mapState(performanceMonitoring, [
      'latestFilter',
      'summaries',
      'detail',
      'templates',
    ]),

    cumulativeReport() {
      return this.selectedReportType === 'cumulative';
    },

    isDeduction() {
      return this.openedGroup && this.openedGroup.type === 'deduction';
    },
  },

  async mounted() {
    await this.getTemplates();
    await this.syncRouteFilter();
    await this.fetchDataByRoute();
  },

  methods: {
    ...mapActions(performanceMonitoring, {
      getAssessments(dispatch) {
        return dispatch(getAssessments, {
          group_id: this.openedGroup.performance_indicator_group_id,
          template_id: this.selectedTemplateId,
          month: this.selectedMonth,
          cumulative: this.selectedReportType === 'cumulative',
        });
      },
      getTemplates,
      getSummaries,
      setLatestFilter,
      updateAssessment,
    }),

    filter({ templateId, month, reportType }) {
      const query = {
        month,
        reportType,
        template_id: templateId,
      };

      this.hideDetail();
      this.syncRouteFilter(query);
      this.fetchDataByRoute();
    },

    syncRouteFilter(newFilter = {}) {
      const {
        templateId: newTemplateIdFilter,
        month: newMonthFilter,
        reportType: newReportTypeFilter,
      } = newFilter;
      const {
        templateId: latestTemplateIdFilter,
        month: latestMonthFilter,
        reportType: latestReportTypeFilter,
      } = this.latestFilter;

      const {
        month,
        template_id: templateId,
        reportType: currentReportTypeQuery,
      } = this.$route.query;
      const currentTemplateIdQuery = Number(templateId);
      const currentMonthQuery = Number(month);

      const now = new Date();
      const currentYear = now.getFullYear();
      const currentMonth = now.getMonth() + 1;
      const fallbackTemplate = this.templates.find(({ name }) => name.includes(currentYear));
      const fallbackTemplateId = fallbackTemplate ? fallbackTemplate.id : null;
      const query = {
        template_id: (
          newTemplateIdFilter
          || currentTemplateIdQuery
          || latestTemplateIdFilter
          || fallbackTemplateId
        ),
        month: newMonthFilter || currentMonthQuery || latestMonthFilter || currentMonth,
        reportType: newReportTypeFilter || currentReportTypeQuery || latestReportTypeFilter || 'cumulative',
      };

      if (
        query.template_id !== currentTemplateIdQuery
        || query.month !== currentMonthQuery
        || query.reportType !== currentReportTypeQuery
      ) {
        this.$router.push({ query });
      }
    },

    fetchDataByRoute() {
      const { template_id: templateId, month, reportType } = this.$route.query;

      this.selectedTemplateId = Number(templateId);
      this.selectedMonth = Number(month);
      this.selectedReportType = reportType;

      this.setLatestFilter({
        month,
        reportType,
        template_id: this.selectedTemplateId,
      });
      this.getSummaries();
    },

    async showDetail(group) {
      if (group.slug !== 'final-score') {
        if (
          this.openedGroup
          && (
            this.openedGroup.performance_indicator_group_id === group.performance_indicator_group_id
          )
        ) {
          this.hideDetail();
          return;
        }

        this.openedGroup = group;
        await this.getAssessments();

        this.detailSection = {
          indicators: this.detail,
          show: true,
          title: group.title,
        };
      }
    },

    hideDetail() {
      this.openedGroup = null;
      this.detailSection = {
        indicators: [],
        show: false,
        title: '',
      };
    },

    showIndicatorEditor(indicator) {
      const { assessments, ...otherIndicatorProps } = indicator;
      this.editIndicator = {
        show: true,
        indicator: otherIndicatorProps,
        month: this.selectedMonth,
        cumulative: this.cumulativeReport,
        assessments: indicator.assessments,
        hasChildren: indicator.has_children,
      };
    },

    updateIndicatorEditor(show) {
      if (!show) this.hideIndicatorEditor();
    },

    hideIndicatorEditor() {
      this.editIndicator = {
        show: false,
        indicator: null,
        month: null,
        cumulative: false,
        assessments: [],
      };
    },

    async handleAssessmentUpdated() {
      await Promise.all([
        this.getSummaries(),
        this.getAssessments(),
      ]);
      this.detailSection = {
        ...this.detailSection,
        indicators: this.detail,
      };
    },
  },
};
</script>
