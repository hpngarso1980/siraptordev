<template>
  <CButton
    size="sm"
    color="danger"
    variant="outline"
    class="px-3"
    title="Hapus"
    @click="$emit('click')"
  >
    <CIcon
      name="cil-trash"
      class="mr-1"
    />
  </CButton>
</template>

<script>
export default {
  name: 'DeleteButton',
};
</script>
