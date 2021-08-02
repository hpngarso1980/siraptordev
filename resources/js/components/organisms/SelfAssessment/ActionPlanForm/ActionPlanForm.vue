<template>
  <ValidationObserver
    ref="formObserver"
    v-slot="{ valid }"
    slim
  >
    <CModal
      :title="title"
      :show="show"
      :close-on-backdrop="false"
      centered
      @update:show="updateShow"
    >
      <CForm>
        <ValidatedInput
          v-model="formData.description"
          :disabled="!canManage"
          type="textarea"
          label="Action Plan"
          rules="required|max:1000"
        />

        <ValidatedInput
          v-model="formData.due_date"
          :disabled="!canManage"
          :disabled-dates="disabledDueDates"
          type="date"
          label="Target Selesai"
          rules="required"
        />

        <ValidatedSelect
          v-model="formData.assignees"
          :disabled="!canManage && !canSupervise"
          :options="assigneeOptions"
          placeholder="Pilih PIC"
          label="PIC"
          multiple
        />

        <ValidatedSelect
          :value="formData.streams"
          :disabled="!canManage && !canSupervise"
          :options="streamOptions"
          placeholder="Pilih Stream"
          label="Stream"
          multiple
          @input="updateSelectedStreams"
        />

        <ValidatedSelect
          :value="formData.areas"
          :disabled="(!canManage && !canSupervise) || !areas.length"
          :options="getOptions('areas')"
          placeholder="Pilih Area"
          label="Area"
          multiple
          @input="updateSelectedAreas"
        />

        <ValidatedSelect
          v-model="formData.sub_areas"
          :disabled="(!canManage && !canSupervise) || !subAreas.length"
          :options="getOptions('subAreas')"
          placeholder="Pilih Sub Area"
          label="Sub Area"
          multiple
        />

        <ValidatedSelect
          v-model="formData.status"
          :options="statusOptions"
          placeholder="Pilih Status"
          label="Status"
          rules="required"
        />

        <ValidatedSelect
          v-model="formData.action_plan_category_id"
          :options="categoryOptions"
          placeholder="Pilih Kategori"
          label="Kategori"
        />

        <ValidatedInput
          v-model="formData.note"
          type="textarea"
          label="Catatan"
          rules="max:1000"
        />
      </CForm>

      <Histories
        title="Action Plan"
        :histories="histories"
        class="mt-4"
      />

      <template #footer-wrapper>
        <div class="p-3">
          <SaveButton
            :disabled="!valid"
            class="float-right"
            @click="save"
          />

          <CancelButton
            class="float-right mr-2"
            @click="updateShow(false)"
          />
        </div>
      </template>
    </CModal>
  </ValidationObserver>
</template>

<script>
import format from 'date-fns/format';
import api from '@/api';
import CancelButton from '@/components/atoms/CancelButton';
import SaveButton from '@/components/atoms/SaveButton';
import ValidatedInput from '@/components/molecules/ValidatedInput';
import ValidatedSelect from '@/components/molecules/ValidatedSelect';
import Histories from '@/components/molecules/Histories';
import accessLevelMixin from '@/mixins/access-level';
import dueDateMixin from '@/mixins/due-date';
import modalFormMixin from '@/mixins/modal-form';

const formTitle = 'Action Plan';
const initialFormData = {
  description: '',
  due_date: null,
  status: 2,
  note: null,
  assignees: [],
  epic_id: null,
  action_plan_category_id: null,
  streams: [],
  areas: [],
  sub_areas: [],
};

export default {
  name: 'SelfAssessmentActionPlanForm',

  components: {
    CancelButton,
    Histories,
    SaveButton,
    ValidatedInput,
    ValidatedSelect,
  },

  mixins: [
    accessLevelMixin,
    dueDateMixin,
    modalFormMixin,
  ],

  props: {
    assigneeOptions: {
      type: Array,
      default: () => [],
    },

    streamOptions: {
      type: Array,
      default: () => [],
    },

    statusOptions: {
      type: Array,
      default: () => [],
    },

    categoryOptions: {
      type: Array,
      default: () => [],
    },

    histories: {
      type: Array,
      default: () => [],
    },
  },

  data() {
    return {
      areas: [],
      subAreas: [],
    };
  },

  methods: {
    updateSelectedStreams(streams) {
      this.formData = {
        ...this.formData,
        streams,
      };

      this.areas = [];
      this.subAreas = [];
      this.formData.areas = [];
      this.formData.sub_areas = [];

      if (streams.length === 1) {
        this.getAreas(streams[0].value);
      }
    },

    updateSelectedAreas(areas) {
      this.formData = {
        ...this.formData,
        areas,
      };

      this.subAreas = [];
      this.formData.sub_areas = [];

      if (areas.length === 1) {
        this.getSubAreas(areas[0].value);
      }
    },

    async getAreas(streamId) {
      try {
        const { data } = await api.getSelfAssessmentAreas({
          query: {
            stream_id: streamId,
          },
        });

        this.areas = data.data;
      } catch (err) {
        this.areas = [];
      }
    },

    async getSubAreas(areaId) {
      try {
        const { data } = await api.getSelfAssessmentSubAreas({
          query: {
            area_id: areaId,
          },
        });

        this.subAreas = data.data;
      } catch (err) {
        this.subAreas = [];
      }
    },

    getOptions(type = '') {
      return this[type].map(({ id, name }) => ({
        value: id,
        label: name,
      }));
    },

    formatBeforeEdit(formData) {
      if (formData.streams.length === 1) {
        this.getAreas(formData.streams[0].value);
      }

      if (formData.areas.length === 1) {
        this.getSubAreas(formData.areas[0].value);
      }

      return {
        ...this.getInitialFormData(),
        ...formData,
        status: this.statusOptions.find((item) => item.value === formData.status),
        action_plan_category_id: formData.category ? this.categoryOptions.find((item) => (
          item.value === formData.category.id
        )) : null,
        assignees: formData.assignees.map(({ id, name }) => ({
          value: id,
          label: name,
        })),
        streams: formData.streams.map(({ id, name }) => ({
          value: id,
          label: name,
        })),
        areas: formData.areas.map(({ id, name }) => ({
          value: id,
          label: name,
        })),
        sub_areas: formData.sub_areas.map(({ id, name }) => ({
          value: id,
          label: name,
        })),
      };
    },

    formatBeforeSave(formData) {
      return {
        ...formData,
        due_date: format(new Date(formData.due_date), 'yyyy-MM-dd'),
        assignees: formData.assignees.map(({ value }) => value),
        streams: formData.streams.map(({ value }) => value),
        areas: formData.areas.map(({ value }) => value),
        sub_areas: formData.sub_areas.map(({ value }) => value),
        status: formData.status.value,
        action_plan_category_id: formData.action_plan_category_id
          ? formData.action_plan_category_id.value
          : null,
      };
    },

    beforeReset() {
      this.$refs.formObserver.reset();
      this.areas = [];
      this.subAreas = [];
    },

    beforeSave() {
      return this.$refs.formObserver.validate();
    },

    getInitialFormData() {
      return {
        ...initialFormData,
        status: this.statusOptions.length ? this.statusOptions[0] : null,
      };
    },
  },

  formTitle,
};
</script>
