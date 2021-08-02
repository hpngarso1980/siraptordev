<template>
  <CRow>
    <CCol
      lg="10"
      sm="12"
    >
      <PageTitle title="Master Data Kategori Action Plan">
        <template #actions>
          <CreateButton
            text="Tambah Kategori"
            @click="create"
          />
        </template>
      </PageTitle>

      <ActionPlanCategoryTable
        :categories="actionPlanCategories.data"
        :current-page="currentPage"
        :pages="pages"
        :delete-button-shown="canCreate"
        :edit-button-shown="canEdit"
        @edit="edit"
        @remove="toggleDeleteConfirmation"
        @changePage="changePage"
      />

      <ActionPlanCategoryForm
        :show.sync="showForm"
        :edit-mode="editModeForm"
        :edited-data="editFormData"
        :access-level="formAccessLevel"
        @save="save"
      />
    </CCol>
  </CRow>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import PageTitle from '@/components/molecules/PageTitle';
import CreateButton from '@/components/atoms/CreateButton';
import ActionPlanCategoryForm from '@/components/organisms/ActionPlanCategoryForm';
import ActionPlanCategoryTable from '@/components/organisms/ActionPlanCategoryTable';
import paginatedTablePage from '@/mixins/paginated-table-page';

import { common } from '@/configs/store/modules';
import {
  getActionPlanCategories,
  createActionPlanCategory,
  updateActionPlanCategory,
  deleteActionPlanCategory,
} from '@/configs/store/action-types';
import permissions from '@/configs/permissions';
import accessLevels from '@/configs/access-levels';

const allowedPermission = [
  permissions.MANAGE_PERFORMANCE_MONITORING_ACTION_PLAN,
  permissions.MANAGE_SELF_ASSESSMENT_ACTION_PLAN,
  permissions.MANAGE_MANAGEMENT_ACTION_PLAN,
];

export default {
  name: 'ActionPlanCategories',

  components: {
    CreateButton,
    PageTitle,
    ActionPlanCategoryForm,
    ActionPlanCategoryTable,
  },

  mixins: [
    paginatedTablePage,
  ],

  computed: {
    ...mapState(common, [
      'actionPlanCategories',
    ]),

    canCreate() {
      return this.$root.hasAnyPermissionTo(allowedPermission);
    },

    canEdit() {
      return this.$root.hasAnyPermissionTo(allowedPermission);
    },

    formAccessLevel() {
      const { hasAnyPermissionTo: can } = this.$root;

      if (can(allowedPermission)) return accessLevels.manage;

      return '';
    },
  },

  methods: {
    ...mapActions(common, {

      getPaginatedData(dispatch) {
        return dispatch(getActionPlanCategories, {
          page: this.currentPage,
        });
      },

      handleCreate: createActionPlanCategory,

      handleUpdate: updateActionPlanCategory,

      handleRemove(dispatch, data) {
        return dispatch(deleteActionPlanCategory, data.id);
      },
    }),

    prepareData() {
      this.getPaginatedData();
    },

    setDeleteConfirmationPayload(data) {
      return {
        title: `kategori "${data.name}"`,
        data,
      };
    },

    formatCreateSuccessMessage() {
      return 'Kategori berhasil ditambahkan';
    },

    formatUpdateSuccessMessage() {
      return 'Kategori berhasil diperbarui';
    },

    formatRemovalSuccessMessage() {
      return 'Kategori berhasil dihapus';
    },

    formatRemovalFailedMessage(_, error) {
      const { data } = error.response;
      const errorMessage = data.errors.join(' ');

      return errorMessage;
    },
  },
};
</script>
