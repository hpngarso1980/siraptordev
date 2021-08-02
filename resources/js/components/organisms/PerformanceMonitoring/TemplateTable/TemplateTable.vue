<template>
  <ContentPanel table-content>

    <CDataTable
      :items="templates"
      :fields="$options.fields"
      class="mb-4"
      hover
    >

      <TableNoItem slot="no-items-view" />

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

            <EditButton @click="edit(item)" />

            <ViewDetailButton
              title="Lihat indikator"
              @click="viewIndicators(item)"
            />

            <DeleteButton @click="remove(item)" />

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
import DeleteButton from '@/components/atoms/DeleteButton'
import EditButton from '@/components/atoms/EditButton'
import TableNoItem from '@/components/atoms/TableNoItem'
import ViewDetailButton from '@/components/atoms/ViewDetailButton'
import ContentPanel from '@/components/molecules/ContentPanel'

import fields from './configs/fields'

export default {
  name: 'PerformanceMonitoringTemplateTable',

  components: {
    DeleteButton,
    EditButton,
    TableNoItem,
    ViewDetailButton,
    ContentPanel,
  },

  props: {
    templates: {
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
    edit(template) {
      this.$emit('edit', template);
    },

    viewIndicators(template) {
      this.$emit('viewIndicators', template);
    },

    remove(template) {
      this.$emit("remove", template);
    },

    changePage(page) {
      this.$emit('changePage', page);
    },
  },

  fields,
};
</script>
