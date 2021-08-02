<template>
  <ContentPanel @click="$emit('click')">
    <h5 class="font-weight-normal mb-3 text-center text-uppercase">
      {{ title }}
    </h5>

    <VueSvgGauge
      :start-angle="-110"
      :end-angle="110"
      :inner-radius="80"
      :value="accomplishmentPercentage"
      :min="0"
      :max="100"
      :gauge-color="gaugeColor"
      :scale-interval="1"
      :separator-step="0"
    />

    <h5 class="text-center font-weight-normal mt-3">
      <div>Bobot: {{ weight }}</div>
      <div>Nilai: {{ score }}</div>
    </h5>

    <div
      :class="textColor"
      class="gauge__percentage"
    >
      {{ accomplishmentPercentage }}%
    </div>
  </ContentPanel>
</template>

<script>
import ContentPanel from '@/components/molecules/ContentPanel'

export default {
  name: 'PerformanceGauge',

  components: {
    ContentPanel,
  },

  props: {
    title: {
      type: String,
      default: '',
    },

    accomplishmentPercentage: {
      type: Number,
      default: 0,
    },

    weight: {
      type: Number,
      default: 0,
    },

    score: {
      type: Number,
      default: 0,
    },
  },

  computed: {
    textColor() {
      return this.decideColor(this.accomplishmentPercentage, [
        'text-danger',
        'text-warning',
        'text-success',
      ])
    },

    gaugeColor() {
      return this.decideColor(this.accomplishmentPercentage, [
        '#D44949',
        '#E3932D',
        '#26A350',
      ])
    }
  },

  methods: {
    decideColor(value, colors) {
      if (value < 95) return colors[0]
      else if (value >= 95 && value < 99.9) return colors[1]
      else return colors[2]
    }
  },
}
</script>

<style>
.gauge__percentage {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 2em;
}
</style>
