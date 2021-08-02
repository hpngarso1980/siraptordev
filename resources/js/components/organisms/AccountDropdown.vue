<template>
  <CDropdown
    :toggler-text="name"
    in-nav
    class="c-header-nav-items"
    placement="bottom-end"
    add-menu-classes="p-0"
  >
    <template #toggler>
      <div
        class="d-flex align-items-center"
        style="cursor:pointer;"
      >
        <div class="pr-3">
          {{ name }}
        </div>
        <Avatar :src="photo">
          <CBadge
            v-if="avatarHighlightCounter"
            color="danger"
            class="c-avatar-highlight"
          >
            {{ avatarHighlightCounter }}
          </CBadge>
        </Avatar>
      </div>
    </template>

    <CDropdownItem @click="$router.push({ name: 'Notifications' })">
      <CIcon name="cil-bell" /> Notifikasi
      <CBadge
        v-if="notificationCount"
        color="danger"
        class="ml-auto"
      >
        {{ notificationCount }}
      </CBadge>
    </CDropdownItem>

    <CDropdownItem @click="$router.push({ name: 'Tasks' })">
      <CIcon name="cil-task" /> Pekerjaan
      <CBadge
        v-if="taskCount"
        color="danger"
        class="ml-auto"
      >
        {{ taskCount }}
      </CBadge>
    </CDropdownItem>

    <CDropdownItem @click="$router.push({ name: 'ProfileSettings' })">
      <CIcon name="cil-user" /> Profil
    </CDropdownItem>

    <CDropdownItem @click="logout">
      <CIcon name="cil-lock-locked" /> Keluar
    </CDropdownItem>
  </CDropdown>
</template>

<script>
import Avatar from '@/components/atoms/Avatar';

export default {
  name: 'AccountDropdown',

  components: {
    Avatar,
  },

  props: {
    name: {
      type: String,
      default: '',
    },

    photo: {
      type: String,
      default: '/images/logo-dark-initial.png',
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

  computed: {
    avatarHighlightCounter() {
      const totalCount = this.notificationCount + this.taskCount;

      if (totalCount > 99) return '99+';

      return totalCount;
    },
  },

  methods: {
    logout() {
      this.$emit('logout');
    },
  },
};
</script>

<style lang="scss" scoped>
.c-icon {
  margin-right: 0.3rem;
}

.c-avatar {
  &-highlight {
    position: absolute;
    top: 0;
    right: 0;
    transform: translate(45%, -25%);
  }
}
</style>
