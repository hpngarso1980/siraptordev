<template>
  <CCard class="h-100">
    <CCardBody class="d-flex flex-column">
      <div class="h4 mb-auto">
        {{ title }}
      </div>

      <template v-if="total">
        <div>
          <CProgress
            height="8px"
            style="background: rgba(0, 0, 0, 0.1);"
          >
            <CProgressBar
              :value="finishedCount"
              :max="total"
              :color="color"
              style="background-image: none;"
              animated
            />
          </CProgress>

          <div>
            <div class="float-right text-muted mt-2">
              {{ finishedCount }}
              /
              {{ total }}
              selesai
            </div>
          </div>
        </div>

        <div>
          <router-link :to="to">
            Lihat
          </router-link>
        </div>
      </template>

      <div
        v-else
        class="mb-5 text-center text-black-50"
      >
        Belum ada Pekerjaan
      </div>
    </CCardBody>
  </CCard>
</template>

<script>
export default {
  name: 'TaskStatCard',

  props: {
    title: {
      type: String,
      default: '',
    },

    total: {
      type: Number,
      default: 0,
    },

    finishedCount: {
      type: Number,
      default: 0,
    },

    to: {
      type: Object,
      default: () => ({}),
    },
  },

  computed: {
    color() {
      return this.finishedCount === this.total ? 'success' : 'warning';
    },
  },
};
</script>

<style>

</style>
