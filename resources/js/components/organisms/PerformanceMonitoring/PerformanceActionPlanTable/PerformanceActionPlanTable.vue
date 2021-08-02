<template>
  <ContentPanel table-content>

    <CDataTable
      :items="actionPlans"
      :fields="$options.fields"
      hover
    >

      <TableNoItem slot="no-items-view" />

      <template #status="{ item }">
        <td>
          <CBadge
            v-if="statuses[item.status]"
            :color="statusColors[item.status]"
            shape="pill"
          >
            {{ statuses[item.status] || '-' }}
          </CBadge>
          <template v-else>
            -
          </template>
        </td>
      </template>

      <template #assignees="{ item }">
        <td>
          {{ item.assignees.map(({ name }) => name).join(', ') }}
        </td>
      </template>

      <template #performance_template="{ item }">
        <td>
          {{ item.performance_template ? item.performance_template.name : '-' }}
        </td>
      </template>

      <template #created_at="{ item }">
        <td>
          {{ item.created_at | toHumanDate }}
        </td>
      </template>

      <template #updated_at="{ item }">
        <td>
          {{ item.updated_at | toHumanDate }}
        </td>
      </template>

      <template #actions="{ item }">
        <td>
          <CButtonGroup>

            <EditButton
              v-if="editButtonShown"
              @click="edit(item)"
            />

            <DeleteButton
              v-if="deleteButtonShown"
              @click="remove(item)"
            />

          </CButtonGroup>
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
import DeleteButton from "@/components/atoms/DeleteButton";
import EditButton from '@/components/atoms/EditButton';
import TableNoItem from '@/components/atoms/TableNoItem';
import ContentPanel from '@/components/molecules/ContentPanel';
import tableWithActionsMixin from '@/mixins/table-with-actions';

import fields from './configs/fields'

export default {
  name: 'PerformanceActionPlanTable',

  components: {
    DeleteButton,
    EditButton,
    TableNoItem,
    ContentPanel,
  },

  mixins: [
    tableWithActionsMixin,
  ],

  props: {
    actionPlans: {
      type: Array,
      default: () => [],
    },

    statusOptions: {
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

  computed: {
    statuses() {
      return this.statusOptions.reduce((result, status) => {
        result[status.value] = status.label;

        return result;
      }, {});
    },

    statusColors() {
      return this.statusOptions.reduce((result, status) => {
        result[status.value] = status.color;

        return result;
      }, {});
    },
  },

  methods: {
    changePage(page) {
      this.$emit('changePage', page);
    },
  },

  fields,
};
</script>
