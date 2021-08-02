<template>
  <CCol
    sm="6"
    lg="3"
    @click="$emit('click')"
  >
    <CWidgetSimple
      class="bg-light"
      style="cursor: pointer; border-style: dashed;"
    >

      <CIcon
        name="cil-plus"
        size="xl"
        class="mt-3"
      />

      <div class="mt-3 text-center">
        Self assessment baru
      </div>

    </CWidgetSimple>
  </CCol>
</template>

<script>
export default {
  name: 'AddProjectButton',
}
</script>
