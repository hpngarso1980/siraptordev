<template>
  <CRow>
    <CCol
      lg="10"
      sm="12"
    >
      <h1>Test</h1>
      <PageTitle title="Master Data Stream">
        <template #actions>
          <CreateButton
            text="Tambah Stream"
            @click="create"
          />
        </template>


      </PageTitle>

      <StreamTable
        :streams="streams.data"
        :current-page="currentPage"
        :pages="pages"
        :delete-button-shown="canCreate"
        :edit-button-shown="canEdit"
        @edit="edit"
        @remove="toggleDeleteConfirmation"
        @changePage="changePage"
      />

      <StreamForm
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
import StreamForm from '@/components/organisms/SelfAssessment/StreamForm';
import StreamTable from '@/components/organisms/SelfAssessment/StreamTable';
import paginatedTablePage from '@/mixins/paginated-table-page';

import { selfAssessment } from '@/configs/store/modules';
import {
  getStreams,
  createStream,
  updateStream,
  deleteStream,
} from '@/configs/store/action-types';
import permissions from '@/configs/permissions';
import accessLevels from '@/configs/access-levels';

export default {
  name: 'SelfAssessmentStream',

  components: {
    CreateButton,
    PageTitle,
    StreamForm,
    StreamTable,
  },

  mixins: [
    paginatedTablePage,
  ],

  computed: {
    ...mapState(selfAssessment, [
      'streams',
    ]),

    canCreate() {
      return this.$root.hasPermissionTo(permissions.MANAGE_SELF_ASSESSMENT);
    },

    canEdit() {
      return this.$root.hasAnyPermissionTo([
        permissions.MANAGE_SELF_ASSESSMENT,
      ]);
    },

    formAccessLevel() {
      const { hasPermissionTo: can, hasRole } = this.$root;

      if (can(permissions.MANAGE_SELF_ASSESSMENT)) return accessLevels.manage;
      if (hasRole('supervisor')) return accessLevels.supervise;
      if (can(permissions.REPORT_SELF_ASSESSMENT)) return accessLevels.report;

      return '';
    },
  },

  methods: {
    ...mapActions(selfAssessment, {

      getPaginatedData(dispatch) {
        return dispatch(getStreams, {
          page: this.currentPage,
        });
      },

      handleCreate: createStream,

      handleUpdate: updateStream,

      handleRemove(dispatch, data) {
        return dispatch(deleteStream, data.id);
      },
    }),

    prepareData() {
      this.getPaginatedData();
    },

    setDeleteConfirmationPayload(data) {
      return {
        title: 'stream',
        data,
      };
    },

    formatCreateSuccessMessage() {
      return 'Stream berhasil ditambahkan';
    },

    formatUpdateSuccessMessage() {
      return 'Stream berhasil diperbarui';
    },

    formatRemovalSuccessMessage() {
      return 'Stream berhasil dihapus';
    },

    formatRemovalFailedMessage(_, error) {
      const { data } = error.response;
      const errorMessage = data.errors.join(' ');

      return errorMessage;
    },
  },
};
</script>
