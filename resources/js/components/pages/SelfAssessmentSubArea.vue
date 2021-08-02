<template>
  <CRow>
    <CCol>
      <PageTitle title="Master Data Sub Area" />

      <SubAreaFilter
        :selected-stream-id="selectedStreamId"
        :selected-area-id="selectedAreaId"
        :streams="streams.data"
        :areas="areas.data"
        @changeStream="changeStream"
        @filter="filter"
        @new="create"
      />

      <SubAreaTable
        :sub-areas="subAreas.data"
        :current-page="currentPage"
        :pages="pages"
        :delete-button-shown="canCreate"
        :edit-button-shown="canEdit"
        @edit="edit"
        @remove="toggleDeleteConfirmation"
        @changePage="changePage"
      />

      <SubAreaForm
        :show.sync="showForm"
        :edit-mode="editModeForm"
        :edited-data="editFormData"
        :access-level="formAccessLevel"
        :selected-area-id="selectedAreaId"
        @save="save"
      />
    </CCol>
  </CRow>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import PageTitle from '@/components/molecules/PageTitle';
import SubAreaFilter from '@/components/organisms/SelfAssessment/SubAreaFilter';
import SubAreaForm from '@/components/organisms/SelfAssessment/SubAreaForm';
import SubAreaTable from '@/components/organisms/SelfAssessment/SubAreaTable';
import paginatedTablePage from '@/mixins/paginated-table-page';

import { selfAssessment } from '@/configs/store/modules';
import {
  getSubAreas,
  updateSubArea,
  createSubArea,
  deleteSubArea,
  getAreas,
  getStreams,
} from '@/configs/store/action-types';
import permissions from '@/configs/permissions';
import accessLevels from '@/configs/access-levels';

export default {
  name: 'SelfAssessmentSubArea',

  components: {
    PageTitle,
    SubAreaFilter,
    SubAreaForm,
    SubAreaTable,
  },

  mixins: [
    paginatedTablePage,
  ],

  data() {
    return {
      selectedAreaId: null,
      selectedStreamId: null,
    };
  },

  computed: {
    ...mapState(selfAssessment, [
      'areas',
      'streams',
      'subAreas',
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
      getStreams,

      getAreas,

      getPaginatedData(dispatch) {
        return dispatch(getSubAreas, {
          area_id: this.selectedAreaId,
          page: this.currentPage,
        });
      },

      handleCreate: createSubArea,

      handleUpdate: updateSubArea,

      handleRemove(dispatch, data) {
        return dispatch(deleteSubArea, data.id);
      },
    }),

    prepareData() {
      this.getStreams();
    },

    setDeleteConfirmationPayload(data) {
      return {
        title: 'sub area',
        data,
      };
    },

    formatCreateSuccessMessage() {
      return 'Sub area berhasil ditambahkan';
    },

    formatUpdateSuccessMessage() {
      return 'Sub area berhasil diperbarui';
    },

    formatRemovalSuccessMessage() {
      return 'Sub area berhasil dihapus';
    },

    formatRemovalFailedMessage(_, error) {
      const { data } = error.response;
      const errorMessage = data.errors.join(' ');

      return errorMessage;
    },

    changeStream(stream) {
      this.selectedStreamId = (stream && stream.id) || null;
      this.getAreas({
        stream_id: this.selectedStreamId,
      });
    },

    filter({ selectedArea }) {
      this.selectedAreaId = (selectedArea && selectedArea.id) || null;
      this.getPaginatedData();
    },
  },
};
</script>
