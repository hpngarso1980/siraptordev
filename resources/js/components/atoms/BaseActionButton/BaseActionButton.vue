<template>
  <CButton
    :color="color"
    :size="size"
    class="px-3"
    @click="$emit('click')"
  >
    <CIcon
      v-if="icon"
      :name="icon"
      class="mr-1"
    />
    {{ text }}
  </CButton>
</template>

<script>
export default {
  name: 'BaseActionButton',

  props: {
    color: {
      type: String,
      default: 'info',
    },

    text: {
      type: String,
      default: '',
    },

    icon: {
      type: String,
      name: '',
    },

    size: {
      type: String,
      default: 'sm',
    },
  },
}
</script>
