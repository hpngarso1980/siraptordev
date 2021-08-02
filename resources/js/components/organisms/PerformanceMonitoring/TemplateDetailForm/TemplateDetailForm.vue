<template>
  <CForm>
    <ContentPanel
      v-for="(group, index) in indicatorGroups"
      :key="index"
    >
      <template #title>
        <div class="float-left">
          {{ group.title }}
        </div>
        <div
          v-if="!group.deduction"
          class="float-right"
        >
          Bobot: {{ calculateWeight(group.indicators) }}
        </div>
      </template>

      <IndicatorForm
        :indicator-group-id="group.id"
        :indicators="group.indicators"
        :deduction="!!group.deduction"
        @input="updateIndicators(group.id, $event)"
        @remove="removeIndicator"
      />
    </ContentPanel>

    <SaveButton
      class="float-right"
      @click="save"
    />
  </CForm>
</template>

<script>
import SaveButton from '@/components/atoms/SaveButton';
import ContentPanel from '@/components/molecules/ContentPanel'
import IndicatorForm from '@/components/organisms/PerformanceMonitoring/IndicatorForm'
import uniquePush from '@/helpers/array-helpers/unique-push'

export default {
  name: 'TemplateDetailForm',

  components: {
    ContentPanel,
    IndicatorForm,
    SaveButton,
  },

  props: {
    indicatorGroups: {
      type: Array,
      default: () => [],
    },
  },

  data() {
    const indicators = this.generateIndicators();

    return {
      indicators,
      deleted: [],
    };
  },

  watch: {
    indicatorGroups() {
      this.indicators = this.generateIndicators();
    },
  },

  methods: {
    calculateWeight(indicators) {
      return indicators.reduce((totalWeight, { weight }) =>
        totalWeight + weight
      , 0)
    },

    generateIndicators() {
      return this.indicatorGroups.reduce((indicatorsObject, group) => {
        indicatorsObject[group.id] = group.indicators || [];

        return indicatorsObject;
      }, {});
    },

    updateIndicators(groupId, indicators) {
      this.indicators = {
        ...this.indicators,
        [groupId]: indicators,
      };
    },

    removeIndicator(id) {
      this.deleted = uniquePush(this.deleted, id)
    },

    save() {
      const indicators = Object.values(this.indicators).flat();

      this.$emit('save', indicators, this.deleted);
    },
  },
};
</script>
