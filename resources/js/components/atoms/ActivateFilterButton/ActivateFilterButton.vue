<template>
   <CButton
    color="dark"
    variant="outline"
    class="px-3"
    @click="$emit('click')"
  >
    <CIcon
      name="cil-magnifying-glass"
      class="mr-1"
    />
    {{ text }}
  </CButton>
</template>

<script>
export default {
  name: 'ActivateFilterButton',

  props:{
    text: {
      type: String,
      default: 'Tampilkan',
    },
  },
};
</script>
