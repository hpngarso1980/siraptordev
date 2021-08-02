<template>
  <DashboardLayout>
    <DashboardHeader
      slot="header"
      :name="name"
      :photo="photo"
      :notification-count="profileStats.notification_count"
      :task-count="profileStats.unfinished_task_count"
      @logout="$root.logout"
    />

    <DashboardSidebar
      slot="sidebar"
      :user-permissions="userPermissions"
      :navigation-badges="navigationBadges"
      :minimize="minimizeSidebar"
    />

    <RouterView />

    <DashboardFooter slot="footer" />
  </DashboardLayout>
</template>

<script>
import { mapState } from 'vuex';
import DashboardLayout from '@/components/templates/DashboardLayout.vue';
import DashboardHeader from '@/components/organisms/DashboardHeader.vue';
import DashboardSidebar from '@/components/organisms/DashboardSidebar';
import DashboardFooter from '@/components/organisms/DashboardFooter.vue';
import { common } from '@/configs/store/modules';

const statToNavigationMap = {
  management_action_plan_unfinished_count: 'ManagementActionPlan',
  performance_action_plan_unfinished_count: 'PerformanceMonitoringActionPlan',
  self_assessment_action_plan_unfinished_count: 'SelfAssessmentActionPlan',
};

export default {
  name: 'DashboardWrapper',

  components: {
    DashboardLayout,
    DashboardHeader,
    DashboardSidebar,
    DashboardFooter,
  },

  data() {
    return {
      minimizeSidebar: false,
    };
  },

  computed: {
    ...mapState(common, {
      userPermissions: (state) => {
        const permissions = state.profile && Array.isArray(state.profile.permissions)
          ? state.profile.permissions.map(({ name }) => name)
          : [];

        return permissions;
      },

      name: (state) => (state.profile && state.profile.name ? state.profile.name : ''),

      photo: (state) => (state.profile && state.profile.photo ? state.profile.photo : undefined),

      profileStats: (state) => state.profileStats,
    }),

    navigationBadges() {
      return Object.keys(this.profileStats).reduce((result, statKey) => {
        const routeName = statToNavigationMap[statKey];
        return routeName
          ? {
            ...result,
            [routeName]: this.profileStats[statKey],
          }
          : result;
      }, {});
    },
  },

  mounted() {
    this.$root.$on('toggle-sidebar', this.toggleSidebar);
    this.$root.$on('toggle-sidebar-mobile', this.toggleSidebar);
  },

  methods: {
    toggleSidebar() {
      this.minimizeSidebar = !this.minimizeSidebar;
    },
  },
};
</script>
