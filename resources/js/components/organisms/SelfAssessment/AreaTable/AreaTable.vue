<template>
  <ContentPanel table-content>

    <CDataTable
      :items="areas"
      :fields="fields"
      class="mb-4"
      hover
    >

      <TableNoItem slot="no-items-view" />

      <template #sub_area_count>
        <td>
          -
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

    <CPagination
      :active-page="currentPage"
      :pages="pages"
      align="center"
      @update:activePage="changePage"
    />

  </ContentPanel>
</template>

<script>
import DeleteButton from '@/components/atoms/DeleteButton'
import EditButton from '@/components/atoms/EditButton'
import TableNoItem from '@/components/atoms/TableNoItem';
import ContentPanel from '@/components/molecules/ContentPanel'
import tableWithActionsMixin from '@/mixins/table-with-actions'
import tableWithPaginationMixin from '@/mixins/table-with-pagination'

import fields from './configs/fields'

export default {
  name: 'SelfAssessmentAreaTable',

  components: {
    DeleteButton,
    EditButton,
    ContentPanel,
    TableNoItem,
  },

  mixins:[
    tableWithActionsMixin,
    tableWithPaginationMixin,
  ],

  props: {
    areas: {
      type: Array,
      default: () => [],
    },
  },

  fields,
}
</script>
