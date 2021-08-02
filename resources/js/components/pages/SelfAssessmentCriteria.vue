<template>
  <CRow>
    <CCol>
      <PageTitle title="Master Data Kriteria" />

      <CriteriaFilter
        :selected-stream-id="selectedStreamId"
        :selected-area-id="selectedAreaId"
        :selected-sub-area-id="selectedSubAreaId"
        :streams="streams.data"
        :areas="areas.data"
        :sub-areas="subAreas.data"
        @changeStream="changeStream"
        @changeArea="changeArea"
        @changeSubArea="changeSubArea"
        @new="create"
      />

      <CriteriaTable
        :criteria="criteria.data"
        :current-page="currentPage"
        :pages="pages"
        :delete-button-shown="canCreate"
        :edit-button-shown="canEdit"
        @edit="edit"
        @remove="toggleDeleteConfirmation"
        @changePage="changePage"
      />

      <CriteriaForm
        :show.sync="showForm"
        :edit-mode="editModeForm"
        :edited-data="editFormData"
        :access-level="formAccessLevel"
        :selected-sub-area-id="selectedSubAreaId"
        @save="save"
      />
    </CCol>
  </CRow>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import PageTitle from '@/components/molecules/PageTitle';
import CriteriaFilter from '@/components/organisms/SelfAssessment/CriteriaFilter';
import CriteriaForm from '@/components/organisms/SelfAssessment/CriteriaForm';
import CriteriaTable from '@/components/organisms/SelfAssessment/CriteriaTable';
import paginatedTablePage from '@/mixins/paginated-table-page';

import { selfAssessment } from '@/configs/store/modules';
import {
  getCriteria,
  updateCriterion,
  createCriterion,
  deleteCriterion,
  getAreas,
  getStreams,
  getSubAreas,
} from '@/configs/store/action-types';
import permissions from '@/configs/permissions';
import accessLevels from '@/configs/access-levels';

export default {
  name: 'SelfAssessmentCriteria',

  components: {
    PageTitle,
    CriteriaFilter,
    CriteriaForm,
    CriteriaTable,
  },

  mixins: [
    paginatedTablePage,
  ],

  data() {
    return {
      selectedAreaId: null,
      selectedStreamId: null,
      selectedSubAreaId: null,
    };
  },

  computed: {
    ...mapState(selfAssessment, [
      'areas',
      'criteria',
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

      getSubAreas,

      getPaginatedData(dispatch) {
        return dispatch(getCriteria, {
          sub_area_id: this.selectedSubAreaId,
          page: this.currentPage,
        });
      },

      handleCreate: createCriterion,

      handleUpdate: updateCriterion,

      handleRemove(dispatch, data) {
        return dispatch(deleteCriterion, data.id);
      },
    }),

    prepareData() {
      this.getStreams();
    },

    setDeleteConfirmationPayload(data) {
      return {
        title: 'kriteria',
        data,
      };
    },

    formatCreateSuccessMessage() {
      return 'Kriteria berhasil ditambahkan';
    },

    formatUpdateSuccessMessage() {
      return 'Kriteria berhasil diperbarui';
    },

    formatRemovalSuccessMessage() {
      return 'Kriteria berhasil dihapus';
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

    changeArea(selectedArea) {
      this.selectedAreaId = (selectedArea && selectedArea.id) || null;
      this.getSubAreas({
        area_id: this.selectedAreaId,
      });
    },

    changeSubArea(selectedSubArea) {
      this.selectedSubAreaId = (selectedSubArea && selectedSubArea.id) || null;
      this.getPaginatedData();
    },
  },
};
</script>
