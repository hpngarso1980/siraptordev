<template>
  <div>
    <PageTitle title="Action Plan Penguatan Kinerja Proses">
      <template #actions>
        <CreateButton
          v-if="canCreate"
          text="Tambah Action Plan"
          @click="create"
        />
      </template>
    </PageTitle>

    <ActionPlanTable
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

    <ActionPlanForm
      :show.sync="showForm"
      :edit-mode="editModeForm"
      :edited-data="editFormData"
      :assignee-options="assigneeOptions"
      :stream-options="streamOptions"
      :status-options="actionPlanStatusOptions"
      :category-options="categoryOptions"
      :access-level="formAccessLevel"
      :histories="actionPlanHistories.data"
      @save="save"
    />
  </div>
</template>

<script>
import { mapActions, mapMutations, mapState } from 'vuex';
import CreateButton from '@/components/atoms/CreateButton';
import PageTitle from '@/components/molecules/PageTitle';
import ActionPlanForm from '@/components/organisms/SelfAssessment/ActionPlanForm';
import ActionPlanTable from '@/components/organisms/SelfAssessment/ActionPlanTable';
import paginatedTablePage from '@/mixins/paginated-table-page';

import { common, selfAssessment } from '@/configs/store/modules';
import {
  getActionPlans,
  createActionPlan,
  updateActionPlan,
  deleteActionPlan,
  getActionPlanCategories,
  getActionPlanStatusOptions,
  getAssigneeOptions,
  getActionPlanHistories,
  getStreams,
} from '@/configs/store/action-types';
import {
  setActionPlanHistories,
} from '@/configs/store/mutation-types';
import permissions from '@/configs/permissions';
import accessLevels from '@/configs/access-levels';

export default {
  name: 'SelfAssessmentActionPlan',

  components: {
    CreateButton,
    PageTitle,
    ActionPlanForm,
    ActionPlanTable,
  },

  mixins: [
    paginatedTablePage,
  ],

  computed: {
    ...mapState(common, [
      'actionPlanCategories',
      'actionPlanStatusOptions',
      'assigneeOptions',
    ]),

    ...mapState(selfAssessment, {
      actionPlans: 'actionPlans',
      meta: 'actionPlansMeta',
      actionPlanHistories: 'actionPlanHistories',
      streams: 'streams',
    }),

    streamOptions() {
      return this.streams.data.map(({ id, name }) => ({
        value: id,
        label: name,
      }));
    },

    categoryOptions() {
      return this.actionPlanCategories.data.map(({ id, name }) => ({
        value: id,
        label: name,
      }));
    },

    canCreate() {
      return this.$root.hasPermissionTo(permissions.MANAGE_SELF_ASSESSMENT_ACTION_PLAN);
    },

    canEdit() {
      return this.$root.hasAnyPermissionTo([
        permissions.MANAGE_SELF_ASSESSMENT_ACTION_PLAN,
        permissions.REPORT_SELF_ASSESSMENT_ACTION_PLAN,
      ]);
    },

    formAccessLevel() {
      const { hasPermissionTo: can, hasRole } = this.$root;

      if (can(permissions.MANAGE_SELF_ASSESSMENT_ACTION_PLAN)) return accessLevels.manage;
      if (hasRole('supervisor')) return accessLevels.supervise;
      if (can(permissions.REPORT_SELF_ASSESSMENT_ACTION_PLAN)) return accessLevels.report;

      return '';
    },
  },

  methods: {
    ...mapActions(common, [
      getActionPlanCategories,
      getActionPlanStatusOptions,
      getAssigneeOptions,
    ]),

    ...mapActions(selfAssessment, {
      getPaginatedData(dispatch) {
        return dispatch(getActionPlans, this.currentPage);
      },

      handleCreate: createActionPlan,

      handleUpdate: updateActionPlan,

      handleRemove(dispatch, data) {
        return dispatch(deleteActionPlan, data.id);
      },

      getActionPlanHistories,

      getStreams,
    }),

    ...mapMutations(selfAssessment, [
      setActionPlanHistories,
    ]),

    prepareData() {
      return Promise.all([
        this.getActionPlanCategories(),
        this.getActionPlanStatusOptions(),
        this.getAssigneeOptions(),
        this.getPaginatedData(),
        this.getStreams(),
      ]).catch(() => this.$root.showGeneralErrorNotification());
    },

    beforeCreate() {
      this.setActionPlanHistories([]);
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
