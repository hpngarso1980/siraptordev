<template>
  <div>
    <PageTitle :title="epic.title">
      <template #actions>
        <PageTitleActions
          :remaining-days="remainingDays"
          :show-summary-link="false"
          :is-all-collapsed="isAllCollapsed"
          show-board-link
          show-collapsible-toggle
          @toBoard="toBoardPage"
          @toggleCollapsible="toggleCollapsible"
        />
      </template>
    </PageTitle>

    <SwimlaneGroupTitle
      title="Item"
      :secondary-title="[
        'Status',
        'Jml. Dokumen',
        'Kuantitas',
        'Bobot',
        'Nilai',
        'Nilai Terbobot',
        'Target',
        'Tgl. Selesai',
        '#'
      ]"
      secondary-title-class="c-summary__cell text-uppercase font-weight-bold"
      class="py-3 border-bottom sticky-top"
      hide-icon
    />

    <div
      v-for="(streamTask, streamIndex) in summary.data"
      :key="streamIndex"
      :class="{ 'is-collapsed': collapsedStreamIds.includes(streamTask.id) }"
      class="c-collapsible"
    >
      <SwimlaneGroupTitle
        :title="streamTask.title"
        :secondary-title="[
          $options.taskStateMap[streamTask.state].title,
          `${streamTask.quantity_achieved}/${streamTask.quantity_target}`,
          `${streamTask.quantity_percentage || 0}%`,
          '-',
          streamTask.final_score || 0,
          '-',
          streamTask.score_target || '-',
          streamTask.finished_at ? toHumanDate(streamTask.finished_at) : '-',
        ]"
        secondary-title-class="c-summary__cell"
        :is-collapsed="collapsedStreamIds.includes(streamTask.id)"
        @click.native="toggleGroup('collapsedStreamIds', streamTask.id)"
      >
        <div
          slot="actions"
          class="c-summary__cell"
        >
          <CButton
            color="info"
            size="sm"
            @click.stop="viewStream(streamTask.id)"
          >
            Detail
          </CButton>
        </div>
      </SwimlaneGroupTitle>

      <div
        v-for="(areaGroupTask, areaGroupIndex) in streamTask.sub_tasks"
        :key="`${streamIndex}-${areaGroupIndex}`"
        :class="{ 'is-collapsed': collapsedAreaGroupIds.includes(areaGroupTask.id) }"
        class="c-collapsible c-collapsible__child"
      >
        <SwimlaneGroupTitle
          :title="areaGroupTask.title"
          :secondary-title="[
            $options.taskStateMap[areaGroupTask.state].title,
            `${areaGroupTask.quantity_achieved}/${areaGroupTask.quantity_target}`,
            `${areaGroupTask.quantity_percentage || 0}%`,
            areaGroupTask.weight || '-',
            areaGroupTask.score || 0,
            areaGroupTask.final_score || 0,
            '-',
            areaGroupTask.finished_at ? toHumanDate(areaGroupTask.finished_at) : '-',
          ]"
          secondary-title-class="c-summary__cell"
          :is-collapsed="collapsedAreaGroupIds.includes(areaGroupTask.id)"
          bg-color="light"
          @click.native="toggleGroup('collapsedAreaGroupIds', areaGroupTask.id)"
        >
          <div
            slot="actions"
            class="c-summary__cell"
          />
        </SwimlaneGroupTitle>

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
              $options.taskStateMap[areaTask.state].title,
              `${areaTask.quantity_achieved}/${areaTask.quantity_target}`,
              `${areaTask.quantity_percentage || 0}%`,
              '-',
              areaTask.final_score || 0,
              '-',
              areaTask.score_target || '-',
              areaTask.finished_at ? toHumanDate(areaTask.finished_at) : '-',
            ]"
            secondary-title-class="c-summary__cell"
            :is-collapsed="collapsedAreaIds.includes(areaTask.id)"
            bg-color="light"
            @click.native="toggleGroup('collapsedAreaIds', areaTask.id)"
          >
            <div
              slot="actions"
              class="c-summary__cell"
            />
          </SwimlaneGroupTitle>

          <div
            v-for="(subAreaTask, subAreaIndex) in areaTask.sub_tasks"
            :key="`${areaIndex}-${subAreaIndex}`"
            class="c-collapsible__child"
          >
            <SwimlaneGroupTitle
              :title="subAreaTask.title"
              title-class=""
              :secondary-title="[
                $options.taskStateMap[subAreaTask.state].title,
                subAreaTask.quantity_achieved,
                `${subAreaTask.quantity_percentage || 0}%`,
                subAreaTask.weight || '-',
                subAreaTask.score || 0,
                subAreaTask.final_score || 0,
                subAreaTask.score_target || '-',
                subAreaTask.finished_at ? toHumanDate(subAreaTask.finished_at) : '-',
              ]"
              secondary-title-class="c-summary__cell"
              :is-collapsed="collapsedAreaIds.includes(subAreaTask.id)"
              bg-color="light"
              hide-icon
            >
              <div
                slot="actions"
                class="c-summary__cell"
              />
            </SwimlaneGroupTitle>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import differenceInCalendarDays from 'date-fns/differenceInCalendarDays';
import PageTitle from '@/components/molecules/PageTitle';
import PageTitleActions from '@/components/organisms/SelfAssessment/PageTitleActions';
import SwimlaneGroupTitle from '@/components/organisms/SelfAssessment/SwimlaneGroupTitle';
import {
  epics, selfAssessment,
} from '@/configs/store/modules';
import {
  getEpics,
  getSummary,
} from '@/configs/store/action-types';
import { taskStateMap } from '@/configs/data';
import toHumanDate from '@/helpers/date-helpers/to-human-date';

export default {
  name: 'SelfAssessmentSummary',

  components: {
    PageTitle,
    PageTitleActions,
    SwimlaneGroupTitle,
  },

  data() {
    return {
      collapsedStreamIds: [],
      collapsedAreaGroupIds: [],
      collapsedAreaIds: [],
    };
  },

  computed: {
    ...mapState(epics, [
      'epics',
    ]),

    ...mapState(selfAssessment, [
      'summary',
    ]),

    remainingDays() {
      if (!this.epic || !this.epic.end_date) return undefined;

      return differenceInCalendarDays(
        new Date(this.epic.end_date),
        new Date(),
      );
    },

    epic() {
      return this.epics.data.find(({ id }) => id === Number(this.$route.params.id)) || {};
    },

    isAllCollapsed() {
      return !!(
        this.collapsedStreamIds.length
        && this.collapsedAreaGroupIds.length
        && this.collapsedAreaIds.length
      );
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
        this.collapsedAreaGroupIds = [];
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

    toBoardPage() {
      this.$router.push({ name: 'SelfAssessmentBoard' });
    },

    viewStream(streamId) {
      this.$router.push({
        name: 'SelfAssessmentStreamSummary',
        params: {
          id: streamId,
          epicId: this.epic.id,
        },
      });
    },
  },

  taskStateMap,
};
</script>

<style lang="scss">
.c-collapsible {
  &.is-collapsed {
    & > .c-collapsible__child {
      height: 0;
      overflow: hidden;
    }
  }
}

.c-summary__cell {
  width: 80px;
  padding: 0 8px;
}
</style>
