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

      <template #category="{ item }">
        <td>
          {{ item.category ? item.category.name : '-' }}
        </td>
      </template>

      <template #assignees="{ item }">
        <td>
          {{ item.assignees.length ? item.assignees.map(({ name }) => name).join(', ') : '-' }}
        </td>
      </template>

      <template #streams="{ item }">
        <td>
          {{ item.streams.length ? item.streams.map(({ name }) => name).join(', ') : '-' }}
        </td>
      </template>

      <template #areas="{ item }">
        <td>
          {{ item.areas.length ? item.areas.map(({ name }) => name).join(', ') : '-' }}
        </td>
      </template>

      <template #sub_areas="{ item }">
        <td>
          {{ item.sub_areas.length ? item.sub_areas.map(({ name }) => name).join(', ') : '-' }}
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
import DeleteButton from '@/components/atoms/DeleteButton';
import EditButton from '@/components/atoms/EditButton';
import TableNoItem from '@/components/atoms/TableNoItem';
import ContentPanel from '@/components/molecules/ContentPanel';
import tableWithActionsMixin from '@/mixins/table-with-actions';
import tableWithPaginationMixin from '@/mixins/table-with-pagination';

import fields from './configs/fields';

export default {
  name: 'SelfAssessmentActionPlanTable',

  components: {
    DeleteButton,
    EditButton,
    TableNoItem,
    ContentPanel,
  },

  mixins: [
    tableWithActionsMixin,
    tableWithPaginationMixin,
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
  },

  computed: {
    statuses() {
      return this.statusOptions.reduce((result, status) => {
        result[status.value] = status.label; // eslint-disable-line

        return result;
      }, {});
    },

    statusColors() {
      return this.statusOptions.reduce((result, status) => {
        result[status.value] = status.color; // eslint-disable-line

        return result;
      }, {});
    },
  },

  fields,
};
</script>
