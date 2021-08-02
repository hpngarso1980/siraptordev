<template>
  <ContentPanel table-content>
    <CDataTable
      :items="rankGroups"
      :fields="fields"
      class="mb-4"
      hover
    >
      <TableNoItem slot="no-items-view" />

      <template #order="{ item }">
        <td width="100">
          {{ item.order }}
        </td>
      </template>

      <template #color="{ item }">
        <td>
          <div :style="`width: 100px; height: 30px; background: ${item.color}`" />
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
          <EditButton
            v-if="editButtonShown"
            @click="edit(item)"
          />

          <DeleteButton
            v-if="deleteButtonShown"
            @click="remove(item)"
          />
        </td>
      </template>
    </CDataTable>
  </ContentPanel>
</template>

<script>
import DeleteButton from '@/components/atoms/DeleteButton';
import EditButton from '@/components/atoms/EditButton';
import TableNoItem from '@/components/atoms/TableNoItem';
import ContentPanel from '@/components/molecules/ContentPanel';
import tableWithActionsMixin from '@/mixins/table-with-actions';
import fields from './configs/fields';

export default {
  name: 'RankGroupTable',

  components: {
    DeleteButton,
    EditButton,
    ContentPanel,
    TableNoItem,
  },

  mixins: [
    tableWithActionsMixin,
  ],

  props: {
    rankGroups: {
      type: Array,
      default: () => [],
    },
  },

  fields,
};
</script>
