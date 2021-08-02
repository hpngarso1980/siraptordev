<template>
  <CModal
    :title="title"
    :show="show"
    size="xl"
    :close-on-backdrop="false"
    centered
    @update:show="updateShow"
  >
    <table class="mb-4">
      <tr>
        <td class="pr-4">
          <strong>Indikator</strong>
        </td>
        <td class="pr-2">
          :
        </td>
        <td>{{ indicator && indicator.indicator }}</td>
      </tr>
      <tr>
        <td class="pr-4">
          <strong>Bobot</strong>
        </td>
        <td class="pr-2">
          :
        </td>
        <td>{{ indicator && indicator.weight || '-' }}</td>
      </tr>
    </table>
    <CForm>
      <table class="w-100">
        <thead>
          <tr>
            <th
              v-for="(column, index) in assessmentColumns"
              :key="index"
              class="pr-4"
            >
              {{ column }}
            </th>
          </tr>
        </thead>
        <tbody class="align-top">
          <tr
            v-for="(row, index) in formRows"
            :key="index"
          >
            <td
              width="100"
              class="pr-4"
            >
              {{ $options.months[row.month - 1] }}
            </td>

            <td
              v-if="!deduction"
              width="100"
              class="pr-4"
            >
              <span v-if="parent">
                -
              </span>

              <CInput
                v-else
                type="number"
                min="0"
                :value="row.target"
                @change="changeRow(index, { target: $event })"
              />
            </td>

            <td
              v-if="!deduction"
              width="100"
              class="pr-4"
            >
              <template v-if="parent">
                -
              </template>

              <CInput
                v-else
                type="number"
                min="0"
                :value="row.realization"
                @change="changeRow(index, { realization: $event })"
              />
            </td>

            <td
              width="100"
              class="pr-4"
            >
              <CInput
                v-if="deduction"
                type="number"
                min="0"
                :value="row.score"
                @change="changeRow(index, { score: $event })"
              />
              <template v-else>
                {{ row.score }}
              </template>
            </td>

            <td
              v-if="!deduction"
              class="pr-4"
            >
              {{ row.accomplishment_percentage }}%
            </td>

            <td
              width="80"
              class="pr-4"
            >
              <CInput
                type="number"
                :value="row.priority"
                @change="changeRow(index, { priority: $event })"
              />
            </td>

            <td
              width="400"
              class="pr-4"
            >
              <CTextarea
                :value="row.note"
                @change="changeRow(index, { note: $event })"
              />
            </td>

            <td class="pr-4">
              <BaseActionButton
                text="Simpan"
                @click="submitChange(index)"
              />
            </td>
          </tr>
        </tbody>
      </table>
    </CForm>

    <template #footer-wrapper>
      <div />
    </template>
  </CModal>
</template>

<script>
import api from '@/api';
import { mapActions } from 'vuex';
import { performanceMonitoring } from '@/configs/store/modules';
import { updateAssessment } from '@/configs/store/action-types';
import BaseActionButton from '@/components/atoms/BaseActionButton';
import { months } from '@/configs/data';

const assessmentColumns = [
  'Bulan',
  'Target',
  'Realisasi',
  'Nilai',
  'Pencapaian',
  'Prioritas',
  'Catatan',
];
const deductionRemovedColumns = [
  'Target',
  'Realisasi',
  'Pencapaian',
];

export default {
  name: 'PerformanceDetailForm',

  components: {
    BaseActionButton,
  },

  props: {
    indicator: {
      type: Object,
      default: () => ({}),
    },

    month: {
      type: Number,
      default: null,
    },

    templateId: {
      type: Number,
      default: null,
    },

    cumulative: {
      type: Boolean,
      default: false,
    },

    show: {
      type: Boolean,
      default: false,
    },

    parent: {
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
      formRows: [],
      assessments: [],
    };
  },

  computed: {
    title() {
      const type = this.cumulative ? 'kumulatif' : 'bulanan';
      const month = months[this.month - 1] || '';
      return `Monitoring kinerja ${type} ${month}`;
    },

    assessmentColumns() {
      if (this.deduction) {
        return assessmentColumns.filter((column) => !deductionRemovedColumns.includes(column));
      }

      return assessmentColumns;
    },
  },

  watch: {
    async show(show) {
      if (show) {
        await this.getAssessments();
        this.formRows = this.generateFormRows();
      } else {
        this.formRows = [];
      }
    },

    assessments() {
      this.formRows = this.generateFormRows();
    },
  },

  methods: {
    ...mapActions(performanceMonitoring, {
      updateAssessment,
    }),

    submitChange(rowIndex) {
      const assessment = this.formRows[rowIndex];
      this.updateRowData(assessment);
    },

    getAssessments() {
      const filters = {
        indicator_id: this.indicator.id,
        template_id: this.templateId,
        month: this.month,
        cumulative: this.cumulative,
      };
      return api.getPerformanceMonitoringAssessments(filters)
        .then(({ data }) => {
          const indicators = data.data;
          if (!indicators.length || !Array.isArray(indicators[0].assessments)) return;
          this.assessments = indicators[0].assessments;
        });
    },

    async updateRowData(assessment) {
      try {
        const updatedData = await this.updateAssessment({
          ...assessment,
          type: this.cumulative ? 2 : 1,
        });

        this.assessments = this.assessments.map((item) => {
          if (item.id === updatedData.id) return updatedData;
          return item;
        });

        this.$emit('assessment-updated');
        this.$root.showSuccessNotification('Berhasil menyimpan penilaian');
      } catch (error) {
        this.$root.showErrorNotification('Gagal menyimpan penilaian');
      }
    },

    generateFormRows() {
      const { month } = this;

      if (!month) return [];

      const rows = [];

      for (let monthIndex = 1; monthIndex <= month; monthIndex += 1) {
        rows.push(this.getAssessmentByMonth(monthIndex));
      }

      return rows;
    },

    getAssessmentByMonth(month) {
      const assessment = this.assessments.find((item) => item.month === month);

      if (!assessment) {
        return {
          month,
          target: 0,
          realization: 0,
          accomplishment_percentage: 0,
          score: 0,
          performance_indicator_id: this.indicator.id,
          priority: null,
        };
      }

      return assessment;
    },

    changeRow(rowIndex, newData) {
      this.formRows[rowIndex] = {
        ...this.formRows[rowIndex],
        ...newData,
      };
    },

    updateShow(show) {
      this.$emit('update:show', show);
    },
  },

  months,
};
</script>
