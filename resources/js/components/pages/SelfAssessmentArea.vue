<template>
  <CRow>
    <CCol
      lg="10"
      sm="12"
    >
      <PageTitle title="Master Data Area" />

      <AreaFilter
        :selected-stream-id="selectedStreamId"
        :streams="streams.data"
        @filter="filter"
        @new="create"
      />

      <AreaTable
        :areas="areas.data"
        :current-page="currentPage"
        :pages="pages"
        :delete-button-shown="canCreate"
        :edit-button-shown="canEdit"
        @edit="edit"
        @remove="toggleDeleteConfirmation"
        @changePage="changePage"
      />

      <AreaForm
        :show.sync="showForm"
        :edit-mode="editModeForm"
        :edited-data="editFormData"
        :access-level="formAccessLevel"
        :selected-stream-id="selectedStreamId"
        @save="save"
      />

      <AreaGroupForm
        :show.sync="showAreaGroupForm"
        :edit-mode="editModeForm"
        :edited-data="editFormData"
        :access-level="formAccessLevel"
        :selected-stream-id="selectedStreamId"
        @save="save"
      />
    </CCol>
  </CRow>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import PageTitle from '@/components/molecules/PageTitle';
import AreaFilter from '@/components/organisms/SelfAssessment/AreaFilter';
import AreaForm from '@/components/organisms/SelfAssessment/AreaForm';
import AreaGroupForm from '@/components/organisms/SelfAssessment/AreaGroupForm';
import AreaTable from '@/components/organisms/SelfAssessment/AreaTable';
import paginatedTablePage from '@/mixins/paginated-table-page';

import { selfAssessment } from '@/configs/store/modules';
import {
  getAreas,
  updateArea,
  createArea,
  deleteArea,
  getStreams,
  getAreaGroups,
} from '@/configs/store/action-types';
import permissions from '@/configs/permissions';
import accessLevels from '@/configs/access-levels';

export default {
  name: 'SelfAssessmentArea',

  components: {
    PageTitle,
    AreaFilter,
    AreaForm,
    AreaGroupForm,
    AreaTable,
  },

  mixins: [
    paginatedTablePage,
  ],

  data() {
    return {
      selectedStreamId: null,
      showAreaGroupForm: false,
      areaGroupEditModeForm: false,
      areaGroupEditFormData: {},
    };
  },

  computed: {
    ...mapState(selfAssessment, [
      'areaGroups',
      'areas',
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
      getStreams,

      getAreaGroups,

      async getPaginatedData(dispatch) {
        await dispatch(getAreaGroups, {
          stream_id: this.selectedStreamId,
        });

        await Promise.all(this.areaGroups.data.map((areaGroup) => dispatch(getAreas, {
          area_group_id: areaGroup.id,
        })));

        // return dispatch(getAreas, {
        //   stream_id: this.selectedStreamId,
        //   page: this.currentPage,
        // });
      },

      handleCreate: createArea,

      handleUpdate: updateArea,

      handleRemove(dispatch, data) {
        return dispatch(deleteArea, data.id);
      },
    }),

    prepareData() {
      this.getStreams().then(() => {
        if (this.streams.data && this.streams.data.length) {
          this.filter({
            selectedStream: this.streams.data[0],
          });
        }
      });
    },

    setDeleteConfirmationPayload(data) {
      return {
        title: 'area',
        data,
      };
    },

    formatCreateSuccessMessage() {
      return 'Area berhasil ditambahkan';
    },

    formatUpdateSuccessMessage() {
      return 'Area berhasil diperbarui';
    },

    formatRemovalSuccessMessage() {
      return 'Area berhasil dihapus';
    },

    formatRemovalFailedMessage(_, error) {
      const { data } = error.response;
      const errorMessage = data.errors.join(' ');

      return errorMessage;
    },

    filter({ selectedStream }) {
      this.selectedStreamId = (selectedStream && selectedStream.id) || null;
      this.getPaginatedData();
    },
  },
};
</script>
