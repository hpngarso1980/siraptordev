<template>
  <ContentPanel @click="$emit('click')">
    <h5 class="font-weight-normal mb-3 text-center text-uppercase">
      {{ title }}
    </h5>

    <div
      class="text-center font-weight-bold"
      style="font-size: 2.5em;"
    >
      {{ value }}
    </div>
  </ContentPanel>
</template>

<script>
import ContentPanel from '@/components/molecules/ContentPanel'

export default {
  name: 'ValueHolder',

  components: {
    ContentPanel,
  },

  props: {
    title: {
      type: String,
      default: '',
    },

    value: {
      type: Number,
      default: 0,
    },
  },
}
</script>
