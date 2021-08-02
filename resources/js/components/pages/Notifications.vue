<template>
  <CRow>
    <CCol>
      <PageTitle title="Notifikasi" />

      <NotificationTable
        :notifications="notifications"
        :current-page="currentPage"
        :pages="pages"
        @changePage="changePage"
      />
    </CCol>
  </CRow>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import PageTitle from '@/components/molecules/PageTitle';
import NotificationTable from '@/components/organisms/Profile/NotificationTable';
import paginatedTablePage from '@/mixins/paginated-table-page';

import { common } from '@/configs/store/modules';
import {
  getNotifications,
  getProfile,
  markAllNotificationsAsRead,
} from '@/configs/store/action-types';

export default {
  name: 'Notifications',

  components: {
    PageTitle,
    NotificationTable,
  },

  mixins: [
    paginatedTablePage,
  ],

  computed: {
    ...mapState(common, [
      'notifications',
    ]),
  },

  mounted() {
    this.markAllNotificationsAsRead()
      .then(() => this.getProfile());
  },

  methods: {
    ...mapActions(common, {
      getProfile,

      markAllNotificationsAsRead,

      getPaginatedData(dispatch) {
        return dispatch(getNotifications);
      },
    }),

    prepareData() {
      return this.getPaginatedData();
    },
  },
};
</script>
