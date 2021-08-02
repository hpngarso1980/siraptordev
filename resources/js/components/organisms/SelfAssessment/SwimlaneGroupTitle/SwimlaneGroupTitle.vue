<template>
  <div
    class="
      c-group-title
      d-flex flex-row justify-content-between align-items-center
      text-body shadow-sm px-3 py-2 rounded mb-2 u-pointer
    "
    :class="{ 'is-collapsed': isCollapsed, [`bg-${bgColor}`]: true }"
  >
    <div class="w-100 m-0 d-flex flex-row justify-content-between">
      <span
        class="mr-4"
        :class="titleClass"
      >
        {{ title }}
      </span>
      <div
        v-if="Array.isArray(secondaryTitle)"
        class="d-flex flex-row align-items-center"
      >
        <small
          v-for="(item, index) in secondaryTitle"
          :key="index"
          :class="secondaryTitleClass"
        >
          {{ item }}
        </small>
        <slot name="actions" />
      </div>
      <small v-else>
        {{ secondaryTitle }}
      </small>
    </div>

    <div
      v-if="hideIcon"
      class="ml-2"
      style="width: 16px"
    >
      &nbsp;
    </div>
    <CIcon
      v-else
      name="cil-chevron-top"
      class="ml-2 flex-shrink-0"
    />
  </div>
</template>

<script>
export default {
  name: 'SwimlaneGroupTitle',

  props: {
    title: {
      type: String,
      default: '',
    },

    titleClass: {
      type: String,
      default: 'text-uppercase font-weight-bold',
    },

    secondaryTitle: {
      type: [String, Array],
      default: '',
    },

    secondaryTitleClass: {
      type: String,
      default: 'mr-2',
    },

    isCollapsed: {
      type: Boolean,
      default: true,
    },

    bgColor: {
      type: String,
      default: 'white',
    },

    hideIcon: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style lang="scss" scoped>
.c-group-title {
  .c-icon {
    transition: transform 0.25s ease-in;
  }

  &.is-collapsed {
    .c-icon {
      transform: rotate(180deg);
    }
  }
}
</style>
