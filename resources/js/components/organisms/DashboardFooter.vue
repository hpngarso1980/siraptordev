<template>
  <CFooter>
    <div>
      <span class="ml-1">
        &copy; {{ year }}  PJB Muara Tawar
      </span>
    </div>
  </CFooter>
</template>

<script>
export default {
  name: 'DashboardFooter',

  computed: {
    year() {
      return (new Date()).getFullYear();
    },
  },
};
</script>

<style>
.c-footer {
  background: transparent;
  border: none;
}
</style>
