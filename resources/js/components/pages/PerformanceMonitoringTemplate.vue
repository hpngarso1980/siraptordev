<template>
  <CRow>
    <CCol
      lg="10"
      sm="12"
    >
      <PageTitle title="Periode Monitoring Kinerja">
        <template #actions>
          <CreateButton
            text="Tambah Periode"
            @click="create"
          />
        </template>
      </PageTitle>

      <TemplateTable
        :templates="templates"
        :current-page="currentPage"
        :pages="pages"
        @edit="edit"
        @viewIndicators="viewIndicators"
        @remove="toggleDeleteConfirmation"
        @changePage="changePage"
      />

      <TemplateForm
        :show.sync="showForm"
        :edit-mode="editModeForm"
        :edited-data="editFormData"
        :existing-templates="templates"
        @save="save"
      />
    </CCol>
  </CRow>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import CreateButton from '@/components/atoms/CreateButton';
import PageTitle from '@/components/molecules/PageTitle';
import TemplateForm from '@/components/organisms/PerformanceMonitoring/TemplateForm';
import TemplateTable from '@/components/organisms/PerformanceMonitoring/TemplateTable';
import paginatedTablePage from '@/mixins/paginated-table-page';

import { performanceMonitoring } from '@/configs/store/modules';
import {
  getTemplates,
  createTemplate,
  updateTemplate,
  deleteTemplate,
} from '@/configs/store/action-types';

export default {
  name: 'PerformanceMonitoringTemplate',

  components: {
    CreateButton,
    PageTitle,
    TemplateForm,
    TemplateTable,
  },

  mixins: [
    paginatedTablePage,
  ],

  computed: {
    ...mapState(performanceMonitoring, [
      'templates',
    ]),
  },

  methods: {
    ...mapActions(performanceMonitoring, {
      getPaginatedData(dispatch) {
        return dispatch(getTemplates, this.currentPage);
      },

      handleCreate: createTemplate,

      handleUpdate: updateTemplate,

      handleRemove(dispatch, data) {
        return dispatch(deleteTemplate, data.id);
      },
    }),

    prepareData() {
      return this.getPaginatedData();
    },

    setDeleteConfirmationPayload(data) {
      return {
        title: data.name,
        data,
      };
    },

    formatCreateSuccessMessage(data) {
      return `Periode ${data.name} berhasil ditambahkan`;
    },

    formatUpdateSuccessMessage(data) {
      return `Periode ${data.name} berhasil diperbarui`;
    },

    formatRemovalSuccessMessage(data) {
      return `Periode ${data.name} berhasil dihapus`;
    },

    formatRemovalFailedMessage(data) {
      return `Periode ${data.name} gagal dihapus`;
    },

    viewIndicators(template) {
      this.$router.push({
        name: 'PerformanceMonitoringTemplateDetail',
        params: {
          id: template.id,
        },
      });
    },
  },
};
</script>
