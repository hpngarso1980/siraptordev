<template>
  <CRow>
    <CCol
      lg="10"
      sm="12"
    >
      <PageTitle title="Master Data Level Ranking">
        <template #actions>
          <CreateButton
            text="Tambah Level"
            @click="create"
          />
        </template>
      </PageTitle>

      <RankGroupTable
        :rank-groups="rankGroups.data"
        :delete-button-shown="canCreate"
        :edit-button-shown="canEdit"
        @edit="edit"
        @remove="toggleDeleteConfirmation"
      />

      <RankGroupForm
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
import RankGroupForm from '@/components/organisms/RankGroupForm';
import RankGroupTable from '@/components/organisms/RankGroupTable';
import paginatedTablePage from '@/mixins/paginated-table-page';

import { common } from '@/configs/store/modules';
import {
  getRankGroups,
  createRankGroup,
  updateRankGroup,
  deleteRankGroup,
} from '@/configs/store/action-types';
import permissions from '@/configs/permissions';
import accessLevels from '@/configs/access-levels';

export default {
  name: 'RankGroups',

  components: {
    CreateButton,
    PageTitle,
    RankGroupForm,
    RankGroupTable,
  },

  mixins: [
    paginatedTablePage,
  ],

  computed: {
    ...mapState(common, [
      'rankGroups',
    ]),

    canCreate() {
      return this.$root.hasPermissionTo(permissions.MANAGE_USER);
    },

    canEdit() {
      return this.$root.hasAnyPermissionTo([
        permissions.MANAGE_USER,
      ]);
    },

    formAccessLevel() {
      const { hasPermissionTo: can } = this.$root;
      return (can(permissions.MANAGE_USER)) ? accessLevels.manage : '';
    },
  },

  methods: {
    ...mapActions(common, {

      getPaginatedData(dispatch) {
        return dispatch(getRankGroups);
      },

      handleCreate: createRankGroup,

      handleUpdate: updateRankGroup,

      handleRemove(dispatch, data) {
        return dispatch(deleteRankGroup, data.id);
      },
    }),

    prepareData() {
      this.getPaginatedData();
    },

    setDeleteConfirmationPayload(data) {
      return {
        title: 'level ranking',
        data,
      };
    },

    formatCreateSuccessMessage() {
      return 'Level ranking berhasil ditambahkan';
    },

    formatUpdateSuccessMessage() {
      return 'Level ranking berhasil diperbarui';
    },

    formatRemovalSuccessMessage() {
      return 'Level ranking berhasil dihapus';
    },

    formatRemovalFailedMessage(_, error) {
      const { data } = error.response;
      const errorMessage = data.errors.join(' ');

      return errorMessage;
    },
  },
};
</script>
