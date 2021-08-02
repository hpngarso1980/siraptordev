<template>
  <div>

    <PageTitle title="Pengaturan Pengguna">
      <template #actions>
        <CreateButton
          text="Tambah Pengguna"
          @click="create"
        />
      </template>
    </PageTitle>

    <UserTable
      :users="users"
      :current-page="currentPage"
      :pages="pages"
      @edit="edit"
      @remove="toggleDeleteConfirmation"
      @changePage="changePage"
    />

    <UserForm
      :show.sync="showForm"
      :edit-mode="editModeForm"
      :edited-data="editFormData"
      :roles="roles"
      :permissions="permissions"
      @save="save"
    />

  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import CreateButton from "@/components/atoms/CreateButton";
import PageTitle from "@/components/molecules/PageTitle";
import UserForm from "@/components/organisms/UserSettings/UserForm";
import UserTable from "@/components/organisms/UserSettings/UserTable";
import paginatedTablePage from '@/mixins/paginated-table-page';

import { userSettings } from '@/configs/store/modules';
import {
  getPermissions,
  getRoles,
  getUsers,
  createUser,
  updateUser,
  deleteUser,
} from '@/configs/store/action-types';

export default {
  name: "UsersSettings",

  components: {
    CreateButton,
    PageTitle,
    UserForm,
    UserTable,
  },

  mixins: [
    paginatedTablePage,
  ],

  computed: {
    ...mapState(userSettings, [
      'permissions',
      'roles',
      'users',
      'meta',
    ]),
  },

  methods: {
    ...mapActions(userSettings, {
      prepareData(dispatch) {
        return Promise.all([
          dispatch(getRoles),
          dispatch(getPermissions),
        ]).then(() => {
          this.getPaginatedData();
        });
      },

      getPaginatedData(dispatch) {
        return dispatch(getUsers, this.currentPage);
      },

      handleCreate: createUser,

      handleUpdate: updateUser,

      handleRemove(dispatch, data) {
        return dispatch(deleteUser, data.id);
      },
    }),

    setDeleteConfirmationPayload(data) {
      return {
        title: data.email,
        data,
      };
    },

    formatCreateSuccessMessage(data) {
      return `User ${data.email} berhasil ditambahkan`;
    },

    formatUpdateSuccessMessage(data) {
      return `User ${data.email} berhasil diperbarui`;
    },

    formatRemovalSuccessMessage(data) {
      return `User ${data.email} berhasil dihapus`;
    },

    formatRemovalFailedMessage(data) {
      return `User ${data.email} gagal dihapus`;
    },
  },
};
</script>
