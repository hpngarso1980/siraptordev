<template>
  <CRow>
    <CCol
      lg="10"
      sm="12"
    >
      <PageTitle title="Pekerjaan" />

      <template v-if="taskStats.length">
        <h3 class="mb-4">
          Self Assessment
        </h3>
        <CRow class="mb-5">
          <CCol
            v-for="(task, index) in taskStats"
            :key="index"
            lg="5"
            class="mb-4"
          >
            <TaskStatCard
              :title="task.epic_title"
              :finished-count="task.finished_task_count"
              :total="task.task_count"
              :to="{
                name: 'SelfAssessmentBoard',
                params: {
                  id: task.epic_id,
                },
              }"
            />
          </CCol>
        </CRow>
      </template>

      <h3 class="mb-4">
        Action Plan
      </h3>
      <CRow>
        <CCol
          v-for="({ title, to, key }, index) in $options.tasks"
          :key="index"
          lg="5"
          class="mb-4"
        >
          <TaskStatCard
            :title="title"
            :finished-count="calculateFinishedTask(key)"
            :total="profileStats[`${key}_action_plan_total_count`]"
            :to="to"
          />
        </CCol>
      </CRow>
    </CCol>
  </CRow>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import PageTitle from '@/components/molecules/PageTitle';
import TaskStatCard from '@/components/molecules/TaskStatCard';

import { common } from '@/configs/store/modules';
import { getProfileStats } from '@/configs/store/action-types';

const tasks = [
  {
    title: 'Action Plan Monitoring Kinerja',
    key: 'performance',
    to: { name: 'PerformanceMonitoringActionPlan' },
  },
  {
    title: 'Action Plan Penguatan Kinerja Proses',
    key: 'self_assessment',
    to: { name: 'SelfAssessmentActionPlan' },
  },
  {
    title: 'Action Plan Rapat Tinjauan Manajemen',
    key: 'management',
    to: { name: 'ManagementActionPlan' },
  },
];

export default {
  name: 'Tasks',

  components: {
    PageTitle,
    TaskStatCard,
  },

  computed: {
    ...mapState(common, [
      'profileStats',
    ]),

    taskStats() {
      if (!Array.isArray(this.profileStats.self_assessment_tasks)) return [];

      const taskStats = [];
      this.profileStats.self_assessment_tasks.forEach((stat) => {
        const statIndex = taskStats.findIndex((existingStat) => (
          existingStat.epic_id === stat.epic_id
        ));

        if (statIndex === -1) {
          taskStats.push({
            epic_id: stat.epic_id,
            epic_title: stat.epic_title,
            task_count: stat.task_count,
            finished_task_count: stat.state === 4 ? stat.task_count : 0,
            unfinished_task_count: stat.state !== 4 ? stat.task_count : 0,
          });
        } else {
          taskStats[statIndex].task_count += stat.task_count;
          if (stat.state === 4) {
            taskStats[statIndex].finished_task_count += stat.task_count;
          } else {
            taskStats[statIndex].unfinished_task_count += stat.task_count;
          }
        }
      });

      return taskStats;
    },
  },

  mounted() {
    this.getProfileStats();
  },

  methods: {
    ...mapActions(common, [
      getProfileStats,
    ]),

    calculateFinishedTask(key) {
      const { profileStats } = this;
      const keyPrefix = `${key}_action_plan`;

      return profileStats[`${keyPrefix}_total_count`] - profileStats[`${keyPrefix}_unfinished_count`];
    },

    calculateColor(key) {
      return this.profileStats[`${key}_action_plan_unfinished_count`] === 0
        ? 'success'
        : 'warning';
    },
  },

  tasks,
};
</script>
