<template>
  <div>
    <PageTitle title="Rapat Tinjauan Manajemen">
      <template #actions>
        <CreateButton
          v-if="canCreate"
          text="Tambah Action Plan"
          @click="create"
        />
      </template>
    </PageTitle>

    <ManagementActionPlanTable
      :action-plans=" actionPlans"
      :status-options="actionPlanStatusOptions"
      :current-page="currentPage"
      :pages="pages"
      :delete-button-shown="canCreate"
      :edit-button-shown="canEdit"
      @edit="edit"
      @remove="toggleDeleteConfirmation"
      @changePage="changePage"
    />

    <ManagementActionPlanForm
      :show.sync="showForm"
      :edit-mode="editModeForm"
      :edited-data="editFormData"
      :assignee-options="assigneeOptions"
      :status-options="actionPlanStatusOptions"
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
import ManagementActionPlanForm from '@/components/organisms/ManagementActionPlan/ManagementActionPlanForm';
import ManagementActionPlanTable from '@/components/organisms/ManagementActionPlan/ManagementActionPlanTable';
import paginatedTablePage from '@/mixins/paginated-table-page';

import { common, managementActionPlans } from '@/configs/store/modules';
import {
  getActionPlans,
  createActionPlan,
  updateActionPlan,
  deleteActionPlan,
  getActionPlanStatusOptions,
  getAssigneeOptions,
  getActionPlanHistories,
} from '@/configs/store/action-types';
import permissions from '@/configs/permissions';
import accessLevels from '@/configs/access-levels';

export default {
  name: 'ManagementActionPlan',

  components: {
    CreateButton,
    PageTitle,
    ManagementActionPlanForm,
    ManagementActionPlanTable,
  },

  mixins: [
    paginatedTablePage,
  ],

  computed: {
    ...mapState(common, [
      'actionPlanStatusOptions',
      'assigneeOptions',
    ]),

    ...mapState(managementActionPlans, [
      'actionPlans',
      'meta',
      'actionPlanHistories',
    ]),

    canCreate() {
      return this.$root.hasPermissionTo(permissions.MANAGE_MANAGEMENT_ACTION_PLAN);
    },

    canEdit() {
      return this.$root.hasAnyPermissionTo([
        permissions.MANAGE_MANAGEMENT_ACTION_PLAN,
        permissions.REPORT_MANAGEMENT_ACTION_PLAN,
      ]);
    },

    formAccessLevel() {
      const { hasPermissionTo: can, hasRole } = this.$root;

      if (can(permissions.MANAGE_MANAGEMENT_ACTION_PLAN)) return accessLevels.manage;
      if (hasRole('supervisor')) return accessLevels.supervise;
      if (can(permissions.REPORT_MANAGEMENT_ACTION_PLAN)) return accessLevels.report;

      return '';
    },
  },

  methods: {
    ...mapActions(common, [
      getActionPlanStatusOptions,
      getAssigneeOptions,
    ]),

    ...mapActions(managementActionPlans, {
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
        this.getPaginatedData(),
      ]);
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
