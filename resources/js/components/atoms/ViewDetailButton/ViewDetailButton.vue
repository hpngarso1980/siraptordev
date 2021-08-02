<template>
  <CButton
    size="sm"
    color="success"
    variant="outline"
    class="px-3"
    v-bind="$attrs"
    @click="$emit('click')"
  >
    <CIcon
      name="cil-magnifying-glass"
      class="mr-1"
    />
  </CButton>
</template>

<script>
export default {
  name: 'ViewDetailButton',
};
</script>
