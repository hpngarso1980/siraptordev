<template>
  <ContentPanel table-content>
    <CDataTable
      :items="notifications"
      :fields="$options.fields"
      :header="false"
      class="mb-4"
      hover
    >
      <TableNoItem slot="no-items-view" />

      <template #photo="{ item }">
        <td>
          <div class="c-avatar">
            <img
              :src="item.trigger && item.trigger.photo
                ? item.trigger.photo
                : '/images/logo-dark-initial.png'
              "
              class="c-avatar-img "
            >
          </div>
        </td>
      </template>

      <template #content="{ item }">
        <td>
          <div class="text-black-50 mb-2">
            {{ item.title }}
          </div>

          <div class="text-body">
            {{ item.description }}
          </div>
        </td>
      </template>

      <template #created_at="{ item }">
        <td class="text-black-50">
          {{ item.created_at | toHumanDate }}
        </td>
      </template>

      <template #action="{ item }">
        <td>
          <router-link
            v-if="generateTargetPage(item)"
            :to="generateTargetPage(item)"
          >
            Lihat
          </router-link>
        </td>
      </template>
    </CDataTable>

    <CPagination
      :active-page="currentPage"
      :pages="pages"
      align="center"
      @update:activePage="changePage"
    />
  </ContentPanel>
</template>

<script>
import TableNoItem from '@/components/atoms/TableNoItem';
import ContentPanel from '@/components/molecules/ContentPanel';

import fields from './configs/fields';

export default {
  name: 'NotificationTable',

  components: {
    TableNoItem,
    ContentPanel,
  },

  props: {
    notifications: {
      type: Array,
      default: () => [],
    },

    currentPage: {
      type: Number,
      default: 1,
    },

    pages: {
      type: Number,
      default: 1,
    },
  },

  methods: {
    generateTargetPage(notification) {
      switch (notification.type) {
        case 'management_action_plan':
          return { name: 'ManagementActionPlan' };
        case 'performance_monitoring_action_plan':
          return { name: 'PerformanceMonitoringActionPlan' };
        case 'self_assessment_action_plan':
          return { name: 'SelfAssessmentActionPlan' };
        case 'task':
          return {
            name: 'SelfAssessmentBoard',
            params: {
              id: notification.data.epic_id,
            },
          };
        default:
          return null;
      }
    },

    changePage(page) {
      this.$emit('changePage', page);
    },
  },

  fields,
};
</script>
