<template>
  <div class="c-avatar">

    <img
      :src="displayedPhoto"
      class="c-avatar-img "
    />

    <slot />

  </div>
</template>

<script>
export default {
  name: 'Avatar',

  props: {
    src: {
      type: String,
      default: '',
    },
  },

  computed: {
    displayedPhoto() {
      return this.src || '/images/logo-dark-initial.png';
    },
  },
};
</script>

<style lang="scss" scoped>
.c-avatar {
  &-img {
    height: 100%;
  }
}
</style>
