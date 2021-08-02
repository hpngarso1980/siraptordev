<template>
   <CButton
    color="success"
    class="px-3"
    @click="$emit('click')"
  >
    <CIcon
      name="cil-plus"
      class="mr-1"
    />
    {{ text }}
  </CButton>
</template>

<script>
export default {
  name: 'CreateButton',

  props:{
    text: {
      type: String,
      default: 'Tambah',
    },
  },
};
</script>
