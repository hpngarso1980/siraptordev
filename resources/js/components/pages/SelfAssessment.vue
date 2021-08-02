<template>
  <div>
    <PageTitle title="Self Assessment" />

    <CRow class="d-flex">
      <ProjectCard
        v-for="(epic, key) in epics.data"
        :key="key"
        :title="epic.title"
        :secondary-title="generateProjectPeriod(epic)"
        :href="`/self-assessment/${epic.id}`"
        @click="openProjectBoard(epic.id)"
        @edit="edit(epic)"
        @delete="confirmDeleteProject(epic)"
      />
    </CRow>

    <CRow>
      <AddProjectButton @click="create" />
    </CRow>

    <ProjectForm
      :show.sync="showForm"
      :edit-mode="editModeForm"
      :edited-data="editFormData"
      :streams="streams.data"
      @save="save"
    />
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import AddProjectButton from '@/components/molecules/AddProjectButton';
import PageTitle from '@/components/molecules/PageTitle';
import ProjectCard from '@/components/molecules/ProjectCard';
import ProjectForm from '@/components/organisms/SelfAssessment/ProjectForm';
import {
  getEpics, updateEpic, createProject, getStreams,
} from '@/configs/store/action-types';
import { epics, selfAssessment } from '@/configs/store/modules';
import toHumanDate from '@/helpers/date-helpers/to-human-date';
import crudPageMixin from '@/mixins/crud-page';

export default {
  name: 'SelfAssessment',

  components: {
    AddProjectButton,
    PageTitle,
    ProjectCard,
    ProjectForm,
  },

  mixins: [
    crudPageMixin,
  ],

  computed: {
    ...mapState(epics, [
      'epics',
    ]),

    ...mapState(selfAssessment, [
      'streams',
    ]),
  },

  methods: {
    ...mapActions(epics, [
      getEpics,
      updateEpic,
    ]),

    ...mapActions(selfAssessment, [
      createProject,
      getStreams,
    ]),

    prepareData() {
      return Promise
        .all([
          this.getEpics(),
          this.getStreams({ all: true }),
        ])
        .catch(() => this.$root.showGeneralErrorNotification());
    },

    handleCreate(data) {
      return this.createProject(data);
    },

    handleUpdate(data) {
      return this.updateEpic(data);
    },

    setDeleteConfirmationPayload(data) {
      return {
        title: 'project',
        data,
      };
    },

    formatCreateSuccessMessage() {
      return 'Project berhasil ditambahkan';
    },

    formatUpdateSuccessMessage() {
      return 'Project berhasil diperbarui';
    },

    formatRemovalSuccessMessage() {
      return 'Project berhasil dihapus';
    },

    generateProjectPeriod(epic) {
      return epic.start_date && epic.end_date && `${toHumanDate(epic.start_date)} - ${toHumanDate(epic.end_date)}`;
    },

    openProjectBoard(id) {
      this.$router.push({
        name: 'SelfAssessmentBoard',
        params: {
          id,
        },
      });
    },
  },
};
</script>
