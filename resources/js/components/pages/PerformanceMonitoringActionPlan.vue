<template>
  <div>
    <PageTitle title="Action Plan Monitoring Kinerja">
      <template #actions>
        <CreateButton
          v-if="canCreate"
          text="Tambah Action Plan"
          @click="create"
        />
      </template>
    </PageTitle>

    <PerformanceActionPlanTable
      :action-plans="actionPlans"
      :status-options="actionPlanStatusOptions"
      :current-page="currentPage"
      :pages="pages"
      :delete-button-shown="canCreate"
      :edit-button-shown="canEdit"
      @edit="edit"
      @remove="toggleDeleteConfirmation"
      @changePage="changePage"
    />

    <PerformanceActionPlanForm
      :show.sync="showForm"
      :edit-mode="editModeForm"
      :edited-data="editFormData"
      :assignee-options="assigneeOptions"
      :status-options="actionPlanStatusOptions"
      :templates="templates"
      :access-level="formAccessLevel"
      :histories="actionPlanHistories.data"
      @save="save"
    />
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import CreateButton from '@/components/atoms/CreateButton';
import PageTitle from '@/components/molecules/PageTitle';
import PerformanceActionPlanForm from '@/components/organisms/PerformanceMonitoring/PerformanceActionPlanForm';
import PerformanceActionPlanTable from '@/components/organisms/PerformanceMonitoring/PerformanceActionPlanTable';
import paginatedTablePage from '@/mixins/paginated-table-page';

import { common, performanceMonitoring } from '@/configs/store/modules';
import {
  getActionPlans,
  createActionPlan,
  updateActionPlan,
  deleteActionPlan,
  getActionPlanStatusOptions,
  getAssigneeOptions,
  getTemplates,
  getActionPlanHistories,
} from '@/configs/store/action-types';
import permissions from '@/configs/permissions';
import accessLevels from '@/configs/access-levels';

export default {
  name: 'PerformanceMonitoringActionPlan',

  components: {
    CreateButton,
    PageTitle,
    PerformanceActionPlanForm,
    PerformanceActionPlanTable,
  },

  mixins: [
    paginatedTablePage,
  ],

  computed: {
    ...mapState(common, [
      'actionPlanStatusOptions',
      'assigneeOptions',
    ]),

    ...mapState(performanceMonitoring, {
      templates: 'templates',
      actionPlans: 'actionPlans',
      meta: 'actionPlansMeta',
      actionPlanHistories: 'actionPlanHistories',
    }),

    canCreate() {
      return this.$root.hasPermissionTo(permissions.MANAGE_PERFORMANCE_MONITORING_ACTION_PLAN);
    },

    canEdit() {
      return this.$root.hasAnyPermissionTo([
        permissions.MANAGE_PERFORMANCE_MONITORING_ACTION_PLAN,
        permissions.REPORT_PERFORMANCE_MONITORING_ACTION_PLAN,
      ]);
    },

    formAccessLevel() {
      const { hasPermissionTo: can, hasRole } = this.$root;

      if (can(permissions.MANAGE_PERFORMANCE_MONITORING_ACTION_PLAN)) return accessLevels.manage;
      if (hasRole('supervisor')) return accessLevels.supervise;
      if (can(permissions.REPORT_PERFORMANCE_MONITORING_ACTION_PLAN)) return accessLevels.report;

      return '';
    },
  },

  methods: {
    ...mapActions(common, [
      getActionPlanStatusOptions,
      getAssigneeOptions,
    ]),

    ...mapActions(performanceMonitoring, {
      getTemplates,

      getPaginatedData(dispatch) {
        return dispatch(getActionPlans, this.currentPage);
      },

      handleCreate: createActionPlan,

      handleUpdate: updateActionPlan,

      handleRemove(dispatch, data) {
        return dispatch(deleteActionPlan, data.id);
      },

      getActionPlanHistories,
    }),

    prepareData() {
      return Promise.all([
        this.getActionPlanStatusOptions(),
        this.getAssigneeOptions(),
        this.getTemplates(),
        this.getPaginatedData(),
      ]).catch(() => this.$root.showGeneralErrorNotification());
    },

    beforeEdit(data) {
      this.getActionPlanHistories(data.id);
    },

    setDeleteConfirmationPayload(data) {
      return {
        title: 'action plan',
        data,
      };
    },

    formatCreateSuccessMessage() {
      return 'Action plan berhasil ditambahkan';
    },

    formatUpdateSuccessMessage() {
      return 'Action plan berhasil diperbarui';
    },

    formatRemovalSuccessMessage() {
      return 'Action plan berhasil dihapus';
    },

    formatRemovalFailedMessage(_, error) {
      const { data } = error.response;
      const errorMessage = data.errors.join(' ');

      return errorMessage;
    },
  },
};
</script>
