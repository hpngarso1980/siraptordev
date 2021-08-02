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
          v-model="formData.status"
          :options="statusOptions"
          placeholder="Pilih Status"
          label="Status"
          rules="required"
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
};

export default {
  name: 'ManagementActionPlanForm',

  components: {
    Histories,
    CancelButton,
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

    statusOptions: {
      type: Array,
      default: () => [],
    },

    histories: {
      type: Array,
      default: () => [],
    },
  },

  methods: {
    formatBeforeEdit(formData) {
      return {
        ...this.getInitialFormData(),
        ...formData,
        status: this.statusOptions.find((item) => item.value === formData.status),
        assignees: formData.assignees.map(({ id, name }) => ({
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
        status: formData.status.value,
      };
    },

    beforeReset() {
      this.$refs.formObserver.reset();
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
