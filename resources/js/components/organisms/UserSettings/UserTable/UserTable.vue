<template>
  <ContentPanel table-content>

    <CDataTable
      :items="users"
      :fields="$options.fields"
      class="mb-4"
      hover
    >

      <TableNoItem slot="no-items-view" />

      <template #phone="{ item }">
        <td>{{ item.phone || '-' }}</td>
      </template>

      <template #role="{ item }">
        <td>{{ item.role ? item.role.name : '-' }}</td>
      </template>

      <template #created_at="{ item }">
        <td>{{ item.created_at | toHumanDateTime }}</td>
      </template>

      <template #updated_at="{ item }">
        <td>{{ item.updated_at | toHumanDateTime }}</td>
      </template>

      <template #actions="{ item }">
        <td>
          <CButtonGroup>
            <EditButton @click="edit(item)" />
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
import DeleteButton from "@/components/atoms/DeleteButton";
import EditButton from "@/components/atoms/EditButton";
import TableNoItem from '@/components/atoms/TableNoItem'
import ContentPanel from "@/components/molecules/ContentPanel";

import fields from "./configs/fields";

export default {
  name: "UserTable",

  components: {
    DeleteButton,
    EditButton,
    TableNoItem,
    ContentPanel
  },

  props: {
    users: {
      type: Array,
      default: () => []
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
    edit(user) {
      this.$emit("edit", user);
    },

    remove(id) {
      this.$emit("remove", id);
    },

    changePage(page) {
      this.$emit('changePage', page);
    },
  },

  fields
};
</script>
