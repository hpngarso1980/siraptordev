<template>
  <CButton
    size="sm"
    color="success"
    variant="outline"
    class="px-3"
    title="Edit"
    @click="$emit('click')"
  >
    <CIcon
      name="cil-pencil"
      class="mr-1"
    />
  </CButton>
</template>

<script>
export default {
  name: 'EditButton',
};
</script>
