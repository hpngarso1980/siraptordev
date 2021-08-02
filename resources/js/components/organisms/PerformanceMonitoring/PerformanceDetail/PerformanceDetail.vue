<template>
  <div>
    <ContentPanel
      :title="title"
      table-content
    >
      <template #title>
        <div class="float-left">
          {{ title }}
        </div>
        <div class="float-right">
          <div class="float-left mr-2">
            Tampilkan:
          </div>
          <CSelect
            :value.sync="valueType"
            :options="valueTypes"
            size="sm"
            class="float-left mb-0"
          />
        </div>
      </template>

      <CDataTable
        :items="flatIndicators"
        :fields="fields"
        hover
      >
        <template #actions="{ item }">
          <td>
            <EditButton @click="$emit('edit', item)" />
          </td>
        </template>

        <template #code="{ item }">
          <td>
            <div class="padded">
              {{ item.code }}
            </div>
          </td>
        </template>

        <template #indicator="{ item }">
          <td>
            <div
              class="padded"
              style="width: 250px;"
            >
              {{ item.indicator }}
            </div>
          </td>
        </template>

        <template #unit="{ item }">
          <td>
            {{ item.unit || '-' }}
          </td>
        </template>

        <template #priority="{ item }">
          <td>
            {{ (
              item.assessments &&
              item.assessments.length &&
              item.assessments[0].priority
            ) || '-'
            }}
          </td>
        </template>

        <template
          v-for="({ key }) in monthFields"
          #[key]="{ item }"
        >
          <td :key="`${item.id}-${key}`">
            {{ renderAssessmentData(getAssessmentByMonth(item.assessments, key)) }}
          </td>
        </template>
      </CDataTable>
    </ContentPanel>
  </div>
</template>

<script>
import EditButton from '@/components/atoms/EditButton';
import ContentPanel from '@/components/molecules/ContentPanel';
import flattenIndicators from '@/helpers/performance-monitoring-helpers/flatten-indicators';
import { months } from '@/configs/data';
import fields from './configs/fields';

const valueTypes = [
  {
    label: 'Pencapaian',
    value: 'accomplishmentPercentage',
  },
  {
    label: 'Nilai',
    value: 'score',
  },
  {
    label: 'Realisasi/Target',
    value: 'realizationByTarget',
  },
];

export default {
  name: 'PerformanceDetail',

  components: {
    EditButton,
    ContentPanel,
  },

  props: {
    title: {
      type: String,
      default: '',
    },

    indicators: {
      type: Array,
      default: () => [],
    },

    month: {
      type: Number,
      default: null,
    },

    cumulative: {
      type: Boolean,
      default: false,
    },

    deduction: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      valueType: 'accomplishmentPercentage',
    };
  },

  computed: {
    flatIndicators() {
      return flattenIndicators(this.indicators);
    },

    fields() {
      return [
        ...fields,
        ...this.monthFields,
      ];
    },

    monthFields() {
      const { cumulative, month } = this;

      if (!cumulative) {
        return [
          {
            key: month,
            label: months[month - 1],
            sorter: true,
          },
        ];
      }

      const monthFields = [];

      for (let key = 1; key <= month; key += 1) {
        monthFields.push({
          key,
          label: months[key - 1],
        });
      }

      return monthFields;
    },

    valueTypes() {
      if (this.deduction) {
        return valueTypes.filter(({ value }) => value === 'score');
      }
      return valueTypes;
    },
  },

  watch: {
    deduction() {
      this.initiateSelectedValueTypes();
    },
  },

  mounted() {
    this.initiateSelectedValueTypes();
  },

  methods: {
    initiateSelectedValueTypes() {
      this.valueType = this.valueTypes[0].value;
    },

    getAssessmentByMonth(assessments, month) {
      return assessments.find((assessment) => assessment.month === month);
    },

    renderAssessmentData(assessment) {
      const valueMapping = {
        accomplishmentPercentage: '0%',
        score: 0,
        realizationByTarget: '0 / 0',
      };

      if (assessment) {
        const {
          realization, target, score, accomplishment_percentage: accomplishmentPercentage,
        } = assessment;

        valueMapping.accomplishmentPercentage = `${accomplishmentPercentage}%`;
        valueMapping.score = score;
        valueMapping.realizationByTarget = `${realization || '-'} / ${target || '-'}`;
      }

      return valueMapping[this.valueType];
    },
  },
};
</script>

<style>
.level-2 .padded{
  padding-left: 12px;
}
.level-3 .padded {
  padding-left: 24px;
}
</style>
