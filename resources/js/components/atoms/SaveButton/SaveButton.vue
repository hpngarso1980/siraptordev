<template>
  <CButton
    color="success"
    class="px-3"
    @click="$emit('click')"
  >
    <CIcon
      name="cil-check-circle"
      class="mr-1"
    />
    {{ text }}
  </CButton>
</template>

<script>
export default {
  name: 'SaveButton',

  props:{
    text: {
      type: String,
      default: 'Simpan',
    },
  },
};
</script>
