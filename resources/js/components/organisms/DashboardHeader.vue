<template>
  <CHeader :fixed="false">
    <CHeaderNav class="mr-auto">
      <CToggler
        v-c-emit-root-event:toggle-sidebar-mobile
        in-header
        class="ml-3 d-lg-none"
      />

      <CToggler
        v-c-emit-root-event:toggle-sidebar
        in-header
        class="ml-3 d-md-down-none"
      />
    </CHeaderNav>

    <CHeaderNav class="mr-4">
      <AccountDropdown
        :name="name"
        :photo="photo"
        :notification-count="notificationCount"
        :task-count="taskCount"
        @logout="logout"
      />
    </CHeaderNav>
  </CHeader>
</template>

<script>
import AccountDropdown from './AccountDropdown.vue';

export default {
  name: 'DashboardHeader',

  components: {
    AccountDropdown,
  },

  props: {
    name: {
      type: String,
      default: '',
    },

    photo: {
      type: String,
      default: undefined,
    },

    notificationCount: {
      type: Number,
      default: 0,
    },

    taskCount: {
      type: Number,
      default: 0,
    },
  },

  methods: {
    logout() {
      this.$emit('logout');
    },
  },
};
</script>

<style>
.c-header {
  background: transparent;
  border-bottom: none;
}
</style>
