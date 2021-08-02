<template>
  <div class="c-app">
    <slot name="sidebar" />

    <div class="c-wrapper">
      <slot name="header" />

      <div class="c-body">
        <main class="c-main">
          <CContainer fluid>
            <transition name="fade">
              <slot />
            </transition>
          </CContainer>
        </main>
      </div>

      <slot name="footer" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'DashboardLayout',
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
