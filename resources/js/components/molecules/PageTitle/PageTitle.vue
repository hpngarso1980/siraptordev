<template>
  <h1 class="mb-5 d-flex flex-row justify-content-between">
    <div class="w-50">
      {{ title }}
    </div>

    <div>
      <slot name="actions" />
    </div>
  </h1>
</template>

<script>
export default {
  name: 'PageTitle',

  props: {
    title: {
      type: String,
      default: 'Judul Halaman',
    },
  },
};
</script>
