<template>
  <CButton
    color="light"
    class="px-3"
    @click="$emit('click')"
  >
    <CIcon
      name="cil-x-circle"
      class="mr-1"
    />
    {{ text }}
  </CButton>
</template>

<script>
export default {
  name: 'CancelButton',

  props:{
    text: {
      type: String,
      default: 'Batal',
    },
  },
};
</script>
