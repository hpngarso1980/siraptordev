<template>
  <div>
    <PageTitle :title="epic.title">
      <template #actions>
        <PageTitleActions
          :remaining-days="remainingDays"
          :is-all-collapsed="isAllCollapsed"
          show-collapsible-toggle
          @toSummary="toSummaryPage"
          @toggleCollapsible="toggleCollapsible"
        />
      </template>
    </PageTitle>

    <SwimlaneTitle />

    <div
      v-for="(streamTask, streamIndex) in tasks.data"
      :key="streamIndex"
      :class="{ 'is-collapsed': collapsedStreamIds.includes(streamTask.id) }"
      class="c-collapsible"
    >
      <SwimlaneGroupTitle
        :title="streamTask.title"
        :secondary-title="`${streamTask.sub_tasks.length} grup`"
        :is-collapsed="collapsedStreamIds.includes(streamTask.id)"
        @click.native="toggleGroup('collapsedStreamIds', streamTask.id)"
      />

      <div
        v-for="(areaGroupTask, areaGroupIndex) in streamTask.sub_tasks"
        :key="`${streamIndex}-${areaGroupIndex}`"
        :class="{ 'is-collapsed': collapsedAreaGroupIds.includes(areaGroupTask.id) }"
        class="c-collapsible c-collapsible__child"
      >
        <SwimlaneGroupTitle
          :title="areaGroupTask.title"
          :secondary-title="[
            `${areaGroupTask.sub_tasks.length} area`,
            `${areaGroupTask.custom_fields.weight.value} bobot`
          ]"
          :is-collapsed="collapsedAreaGroupIds.includes(areaGroupTask.id)"
          bg-color="light"
          @click.native="toggleGroup('collapsedAreaGroupIds', areaGroupTask.id)"
        />

        <div
          v-for="(areaTask, areaIndex) in areaGroupTask.sub_tasks"
          :key="`${areaGroupIndex}-${areaIndex}`"
          class="c-collapsible__child"
        >
          <SwimlaneGroup
            :title="areaTask.title"
            :tasks="mapTaskColumns(areaTask.sub_tasks)"
            :is-collapsed="collapsedAreaIds.includes(areaTask.id)"
            @change="changeTasks"
            @taskClick="openTaskForm"
            @titleClick="toggleGroup('collapsedAreaIds', areaTask.id)"
          />
        </div>
      </div>
    </div>

    <TaskForm
      :show.sync="showTaskForm"
      :assignee-options="assigneeOptions"
      :task="openedTask"
      @save="saveTask"
    />
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import differenceInCalendarDays from 'date-fns/differenceInCalendarDays';
import PageTitle from '@/components/molecules/PageTitle';
import PageTitleActions from '@/components/organisms/SelfAssessment/PageTitleActions';
import SwimlaneGroup from '@/components/organisms/SelfAssessment/SwimlaneGroup';
import SwimlaneGroupTitle from '@/components/organisms/SelfAssessment/SwimlaneGroupTitle';
import SwimlaneTitle from '@/components/organisms/SelfAssessment/SwimlaneTitle';
import TaskForm from '@/components/organisms/SelfAssessment/TaskForm';
import { common, epics, tasks as tasksModule } from '@/configs/store/modules';
import {
  getAssigneeOptions, getEpics, getTasks, updateTask,
} from '@/configs/store/action-types';

const stateToColumnMap = {
  1: 'todo',
  2: 'documentUploaded',
  3: 'revision',
  4: 'done',
};

function mapTaskColumns(rawTasks = []) {
  const columns = {
    todo: [],
    documentUploaded: [],
    revision: [],
    done: [],
  };

  rawTasks.forEach((task) => columns[stateToColumnMap[task.state]].push(task));

  return columns;
}

export default {
  name: 'SelfAssessmentBoard',

  components: {
    PageTitle,
    PageTitleActions,
    SwimlaneGroup,
    SwimlaneGroupTitle,
    SwimlaneTitle,
    TaskForm,
  },

  data() {
    return {
      showTaskForm: false,
      openedTask: {},
      collapsedStreamIds: [],
      collapsedAreaGroupIds: [],
      collapsedAreaIds: [],
    };
  },

  computed: {
    ...mapState(tasksModule, [
      'tasks',
    ]),

    ...mapState(epics, [
      'epics',
    ]),

    ...mapState(common, [
      'assigneeOptions',
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
    mapTaskColumns,

    ...mapActions(epics, [
      getEpics,
    ]),

    ...mapActions(tasksModule, [
      getTasks,
      updateTask,
    ]),

    ...mapActions(common, [
      getAssigneeOptions,
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
            this.getTasks({
              epic_id: this.epic.id,
              with_sub_tasks: true,
            }).then(() => this.collapseAll());
            this.getAssigneeOptions();
          }
        });
    },

    openTaskForm(task) {
      this.showTaskForm = true;
      this.openedTask = task;
    },

    changeTasks(changeResult) {
      const { columnKey, newPayload } = changeResult;

      this.tasks[columnKey] = newPayload;
    },

    saveTask(task) {
      this.updateTask(task);
      this.$root.showSuccessNotification('Data Sub Area berhasil disimpan');
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

      this.tasks.data.forEach((streamTask) => {
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

    toSummaryPage() {
      this.$router.push({ name: 'SelfAssessmentSummary' });
    },
  },
};
</script>

<style lang="scss" scoped>
.c-collapsible {
  &.is-collapsed {
    & > .c-collapsible__child {
      height: 0;
      overflow: hidden;
    }
  }
}
</style>
