<template>
  <CRow>
    <CCol>
      <PageTitle :title="pageTitle" />

      <CRow>
        <CCol
          v-if="!fullScreenChart"
          lg="6"
        >
          <SwimlaneGroupTitle
            title="Item"
            :secondary-title="[
              'Bobot',
              'Nilai',
              'Nilai Terbobot',
              'Target',
            ]"
            secondary-title-class="c-summary__cell--small text-uppercase font-weight-bold"
            class="py-3 border-bottom"
            hide-icon
          />

          <template v-if="stream">
            <div
              v-for="(areaGroupTask, areaGroupIndex) in stream.sub_tasks"
              :key="areaGroupIndex"
              :class="{ 'is-collapsed': collapsedAreaGroupIds.includes(areaGroupTask.id) }"
              class="c-collapsible c-collapsible__child"
            >
              <SwimlaneGroupTitle
                :title="areaGroupTask.title"
                :secondary-title="[
                  areaGroupTask.weight || 0,
                  areaGroupTask.score || 0,
                  areaGroupTask.final_score || 0,
                  areaGroupTask.score_target || 0,
                ]"
                secondary-title-class="c-summary__cell--small"
                :is-collapsed="collapsedAreaGroupIds.includes(areaGroupTask.id)"
                @click.native="toggleGroup('collapsedAreaGroupIds', areaGroupTask.id)"
              />

              <div
                v-for="(areaTask, areaIndex) in areaGroupTask.sub_tasks"
                :key="`${areaGroupIndex}-${areaIndex}`"
                :class="{ 'is-collapsed': collapsedAreaIds.includes(areaTask.id) }"
                class="c-collapsible c-collapsible__child"
              >
                <SwimlaneGroupTitle
                  :title="areaTask.title"
                  title-class="font-weight-bold"
                  :secondary-title="[
                    '-',
                    areaTask.final_score || 0,
                    '-',
                    areaTask.score_target || 0,
                  ]"
                  secondary-title-class="c-summary__cell--small"
                  :is-collapsed="collapsedAreaIds.includes(areaTask.id)"
                  bg-color="light"
                  @click.native="toggleGroup('collapsedAreaIds', areaTask.id)"
                />

                <div
                  v-for="(subAreaTask, subAreaIndex) in areaTask.sub_tasks"
                  :key="`${areaIndex}-${subAreaIndex}`"
                  class="c-collapsible__child"
                >
                  <SwimlaneGroupTitle
                    :title="subAreaTask.title"
                    title-class=""
                    :secondary-title="[
                      subAreaTask.weight || '-',
                      subAreaTask.score || 0,
                      subAreaTask.final_score || 0,
                      subAreaTask.score_target || 0,
                    ]"
                    secondary-title-class="c-summary__cell--small"
                    :is-collapsed="collapsedAreaIds.includes(subAreaTask.id)"
                    bg-color="light"
                    hide-icon
                  />
                </div>
              </div>
            </div>
          </template>
        </CCol>

        <CCol :lg="fullScreenChart ? 12 : 6">
          <ContentPanel>
            <ValidatedSelect
              v-model="activeGroup"
              :options="groupOptions"
              placeholder="Pilih Grup"
              label="Grup"
            />
            <CInputCheckbox
              :checked="showAllSubArea"
              label="Tampilkan semua sub area"
              @update:checked="showAllSubArea = $event"
            />
            <CInputCheckbox
              :checked="useBarChart"
              label="Tampilkan bar chart"
              @update:checked="useBarChart = $event"
            />
            <CInputCheckbox
              :checked="fullScreenChart"
              label="Tampilkan penuh"
              @update:checked="fullScreenChart = $event"
            />
            <CChartBar
              v-if="useBarChart"
              :labels="chartLabels"
              :datasets="chartDatasets"
            />
            <CChartRadar
              v-else
              :labels="chartLabels"
              :datasets="chartDatasets"
            />
          </ContentPanel>
        </CCol>
      </CRow>
    </CCol>
  </CRow>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import { CChartBar, CChartRadar } from '@coreui/vue-chartjs';
import ContentPanel from '@/components/molecules/ContentPanel';
import PageTitle from '@/components/molecules/PageTitle';
import SwimlaneGroupTitle from '@/components/organisms/SelfAssessment/SwimlaneGroupTitle';
import ValidatedSelect from '@/components/molecules/ValidatedSelect';
import {
  epics, selfAssessment,
} from '@/configs/store/modules';
import {
  getEpics,
  getSummary,
} from '@/configs/store/action-types';
import toHumanDate from '@/helpers/date-helpers/to-human-date';

export default {
  name: 'SelfAssessmentStreamSummary',

  components: {
    CChartBar,
    CChartRadar,
    ContentPanel,
    PageTitle,
    SwimlaneGroupTitle,
    ValidatedSelect,
  },

  data() {
    return {
      collapsedStreamIds: [],
      collapsedAreaGroupIds: [],
      collapsedAreaIds: [],
      activeGroup: null,
      showAllSubArea: true,
      fullScreenChart: false,
      useBarChart: false,
    };
  },

  computed: {
    ...mapState(epics, [
      'epics',
    ]),

    ...mapState(selfAssessment, [
      'summary',
    ]),

    epic() {
      return this.epics.data.find(({ id }) => id === Number(this.$route.params.epicId)) || {};
    },

    streamId() {
      return this.$route.params.id;
    },

    isAllCollapsed() {
      return !!(this.collapsedStreamIds.length && this.collapsedAreaIds.length);
    },

    pageTitle() {
      const streamTitle = this.stream ? this.stream.title : 'Stream';

      return `Ringkasan ${streamTitle}`;
    },

    stream() {
      return this.summary.data.find(({ id }) => id === this.streamId);
    },

    groupOptions() {
      return this.stream ? this.stream.sub_tasks.map(({ title, id }) => ({
        label: title,
        value: id,
      })) : [];
    },

    selectedGroup() {
      return this.stream && this.activeGroup
        ? this.stream.sub_tasks.find(({ id }) => id === this.activeGroup.value)
        : null;
    },

    chartLabels() {
      return this.chartData.map(({ title }) => title);
    },

    chartDatasets() {
      return [
        {
          label: 'Nilai',
          borderColor: 'rgba(112, 202, 129, 1)',
          backgroundColor: 'rgba(112, 202, 129, 1)',
          fill: 'rgba(112, 202, 129, 0.5)',
          data: this.chartData.map(({ final_score: finalScore }) => finalScore),
        },
        {
          label: 'Target',
          borderColor: 'rgba(202, 59, 59, 1)',
          backgroundColor: 'rgba(202, 59, 59, 1)',
          fill: 'rgba(202, 59, 59, 0.5)',
          data: this.chartData.map(({ score_target: scoreTarget }) => scoreTarget),
        },
      ];
    },

    chartData() {
      if (!this.selectedGroup) return [];

      if (!this.showAllSubArea) {
        return this.selectedGroup.sub_tasks;
      }

      const subTasks = [];
      this.selectedGroup.sub_tasks.forEach((area) => {
        area.sub_tasks.forEach((subArea) => {
          subTasks.push(subArea);
        });
      });

      return subTasks;
    },
  },

  watch: {
    chartData(newChartData) {
      this.useBarChart = newChartData.length < 5;
    },
  },

  mounted() {
    this.prepareData();
  },

  methods: {
    toHumanDate,

    ...mapActions(epics, [
      getEpics,
    ]),

    ...mapActions(selfAssessment, [
      getSummary,
    ]),

    prepareData() {
      Promise
        .all([
          !this.epics.data.length && this.getEpics(),
        ])
        .then(() => {
          if (!this.epic.id) {
            this.$router.push({ name: 'SelfAssessment' });
          } else {
            this.getSummary(this.epic.id).then(() => this.collapseAll());
          }
        });
    },

    toggleCollapsible() {
      if (this.isAllCollapsed) {
        this.collapsedAreaIds = [];
        this.collapsedStreamIds = [];
      } else {
        this.collapseAll();
      }
    },

    collapseAll() {
      const collapsedStreamIds = [];
      const collapsedAreaGroupIds = [];
      const collapsedAreaIds = [];

      this.summary.data.forEach((streamTask) => {
        collapsedStreamIds.push(streamTask.id);
        streamTask.sub_tasks.forEach((areaGroupTask) => {
          collapsedAreaGroupIds.push(areaGroupTask.id);
          areaGroupTask.sub_tasks.forEach((areaTask) => {
            collapsedAreaIds.push(areaTask.id);
          });
        });
      });

      this.collapsedStreamIds = collapsedStreamIds;
      this.collapsedAreaGroupIds = collapsedAreaGroupIds;
      this.collapsedAreaIds = collapsedAreaIds;
    },

    toggleGroup(groupName, id) {
      const index = this[groupName].indexOf(id);

      if (index > -1) {
        const newGroup = [...this[groupName]];
        newGroup.splice(index, 1);
        this[groupName] = newGroup;
      } else {
        this[groupName] = [
          ...this[groupName],
          id,
        ];
      }
    },
  },
};
</script>

<style lang="scss">
.c-summary__cell--small {
  width: 68px;
  padding: 0 4px;
}
</style>
