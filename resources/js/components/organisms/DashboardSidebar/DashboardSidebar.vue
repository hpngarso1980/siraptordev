<template>
  <CSidebar
    :class="customClass"
    show="responsive"
    fixed
  >

    <CSidebarBrand
      to="/"
      class="py-3"
    >
      <img
        src="/images/logo-white.png"
        class="c-sidebar-brand-full"
        alt="Logo Siraptor"
      />
      <img
        src="/images/logo-white-minified.png"
        class="c-sidebar-brand-minimized"
        alt="Logo Siraptor"
      />
    </CSidebarBrand>

    <CRenderFunction
      :content-to-render="navigations"
      class="pt-3"
      flat
    />

    <div class="m-2">&nbsp;</div>

  </CSidebar>
</template>

<script>
import navigations from './data/navigations';

export default {
  name: 'DashboardSidebar',

  props: {
    minimize: {
      type: Boolean,
      default: false,
    },

    userPermissions: {
      type: Array,
      default: () => [],
    },

    navigationBadges: {
      type: Object,
      default: () => ({}),
    },
  },

  computed: {
    customClass() {
      return {
        'c-sidebar-unfoldable': this.minimize,
      };
    },

    navigations() {
      const wrapper = [...navigations];

      wrapper[0]._children = wrapper[0]._children
        .filter(({ permissions }) => {
          if (permissions === '*') return true;

          if (Array.isArray(permissions)) {
            return permissions.some((permission) =>
              this.userPermissions.includes(permission)
            );
          }

          return false;
        })
        .map(item => {
          if (!item.to) return item;

          const badgeValue = this.navigationBadges[item.to.name];

          if (badgeValue) {
            item.badge = {
              text: badgeValue,
              color: 'danger',
              class: 'ml-1',
            };
          } else {
            item.badge = null;
          }

          return item;
        });

      return wrapper;
    },
  },
};
</script>

<style lang="scss">
@import "styles/_variables";

.c-sidebar {
  background: #212121;
  box-shadow: 2px 0 10px rgba(221, 221, 221, 0.25);
  border-radius: 0 16px 16px 0;

  & &-brand {
    background: transparent;
    border-radius: 0 16px 0 0;

    &-full, &-minimized {
      width: 50%;
    }
  }

  &-nav {
    padding-top: 40px;

    &-link {
      white-space: normal;

      &:hover {
        background: $success !important;
      }
    }
  }

  &-unfoldable {
    width: 56px;

    &:hover {
      width: 256px;

      .c-sidebar-brand-full {
        display: block;
      }

      .c-sidebar-brand-minimized {
        display: none;
      }

      .c-sidebar-nav-link {
        white-space: initial;
      }
    }

    .c-sidebar-brand-full {
      display: none;
    }

    .c-sidebar-brand-minimized {
      display: block;
    }

    .c-sidebar-nav-title {
      display: none;
    }

    .c-sidebar-nav-link {
      white-space: nowrap;
    }

    & ~ .c-wrapper {
      margin-left: 56px !important;
    }
  }
}
</style>
