<template>
  <CModal
    title="Edit Sub Area"
    size="lg"
    :show="show"
    :close-on-backdrop="false"
    centered
    @update:show="updateShow"
  >
    <div
      v-if="state === 'loading'"
      class="d-flex flex-row py-5 justify-content-center align-items-center"
    >
      <CSpinner
        size="sm"
        color="success"
        class="mr-2"
      />
      <h5 class="d-inline m-0">
        Memuat data
      </h5>
    </div>

    <div
      v-else-if="state === 'error'"
      class="d-flex flex-column py-5 justify-content-center align-items-center"
    >
      <h3 class="mb-4">
        Terjadi kesalahan
      </h3>
      <CButton
        color="success"
        @click="syncFormData"
      >
        Muat ulang
      </CButton>
    </div>

    <template v-else>
      <CRow>
        <CCol>
          <div
            role="group"
            class="form-group"
          >
            <label>
              Kriteria Penilaian
            </label>
            <div
              class="p-3 bg-light overflow-auto"
              style="height: 350px;"
            >
              <DescriptionList
                v-for="(criterion, key) in criteria"
                :key="key"
                :fields="$options.criteriaFields"
                :item="criterion"
              />
            </div>
          </div>
        </CCol>

        <CCol>
          <CForm>
            <div
              role="group"
              class="form-group"
            >
              <label>
                Sub Area
              </label>
              <div>
                {{ formData.title }}
              </div>
            </div>

            <ValidatedSelect
              v-model="formData.assignees"
              :options="assigneeOptions"
              :disabled="!canAssign"
              placeholder="Pilih PIC"
              label="PIC"
              multiple
            />

            <div
              role="group"
              class="form-group"
            >
              <label>
                Dokumen
              </label>

              <MultipleFileInput
                :existing-files="attachments"
                :errors="attachmentsErrors"
                :disabled="!canReport"
                @add="addTaskAttachment"
                @remove="removeTaskAttachment"
                @resubmit="resubmitTaskAttachment"
              />
            </div>

            <CTextarea
              v-if="formData.custom_fields"
              v-model="formData.custom_fields.note"
              :disabled="!canReport"
            >
              <template #label>
                <label>
                  Catatan
                  <span class="text-secondary">
                    (Opsional)
                  </span>
                </label>
              </template>

              <template #description>
                <small class="form-text text-muted">
                  Jika file berukuran besar dan tidak bisa diunggah,
                  gunakan catatan untuk memberikan link file.
                </small>
              </template>
            </CTextarea>

            <CRow>
              <CCol v-if="formData.custom_fields">
                <ValidatedInput
                  v-model="formData.custom_fields.score"
                  :disabled="!canAssess"
                  type="number"
                  label="Nilai"
                />
              </CCol>

              <CCol v-if="formData.custom_fields">
                <ValidatedInput
                  v-model="formData.custom_fields.score_target"
                  :disabled="!canAssess"
                  type="number"
                  label="Target Nilai"
                />
              </CCol>
            </CRow>

            <CRow>
              <CCol>
                <ValidatedSelect
                  v-model="formData.state"
                  :options="$options.stateOptions"
                  :disabled="!canAssess"
                  placeholder="Pilih Status"
                  label="Status"
                  rules="required"
                />
              </CCol>
            </CRow>

            <ValidatedInput
              v-if="formData.custom_fields"
              v-model="formData.custom_fields.assessor_note"
              :disabled="!canAssess"
              type="textarea"
              label="Catatan Penilai"
            />
          </CForm>
        </CCol>
      </CRow>
    </template>

    <template #footer-wrapper>
      <div class="p-3">
        <SaveButton
          :disabled="['loading', 'error'].includes(state)"
          class="float-right"
          @click="save"
        />

        <CancelButton
          text="Tutup"
          class="float-right mr-2"
          @click="updateShow(false)"
        />
      </div>
    </template>
  </CModal>
</template>

<script>
import { mapActions } from 'vuex';
import api from '@/api';
import CancelButton from '@/components/atoms/CancelButton';
import SaveButton from '@/components/atoms/SaveButton';
import MultipleFileInput from '@/components/molecules/MultipleFileInput';
import DescriptionList from '@/components/molecules/DescriptionList';
import ValidatedInput from '@/components/molecules/ValidatedInput';
import ValidatedSelect from '@/components/molecules/ValidatedSelect';
import permissions from '@/configs/permissions';
import { tasks } from '@/configs/store/modules';
import { addAttachment, removeAttachment } from '@/configs/store/action-types';
import toHumanDate from '@/helpers/date-helpers/to-human-date';

const criteriaFields = [
  {
    title: 'Nilai',
    key: 'score',
  },
  {
    title: 'Level',
    key: 'level',
  },
  {
    title: 'Uraian',
    key: 'description',
  },
];
const stateOptions = [
  {
    label: 'Belum dikerjakan',
    value: 1,
  },
  {
    label: 'Dokumen terunggah',
    value: 2,
  },
  {
    label: 'Revisi',
    value: 3,
  },
  {
    label: 'Selesai',
    value: 4,
  },
];

export default {
  name: 'TaskForm',

  components: {
    CancelButton,
    SaveButton,
    MultipleFileInput,
    DescriptionList,
    ValidatedInput,
    ValidatedSelect,
  },

  props: {
    assigneeOptions: {
      type: Array,
      default: () => [],
    },

    task: {
      type: Object,
      default: () => {},
    },

    show: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      attachments: [],
      attachmentsErrors: [],
      formData: {},
      completeTaskInfo: {},
      state: null,
    };
  },

  computed: {
    criteria() {
      if (!this.completeTaskInfo.description) return [];

      try {
        const criteria = JSON.parse(this.completeTaskInfo.description);
        return criteria;
      } catch (err) {
        return [];
      }
    },

    canAssign() {
      return this.$root.hasAnyPermissionTo([
        permissions.MANAGE_SELF_ASSESSMENT,
      ]) || this.$root.hasRole('supervisor');
    },

    canReport() {
      return this.$root.hasAnyPermissionTo([
        permissions.MANAGE_SELF_ASSESSMENT,
        permissions.REPORT_SELF_ASSESSMENT,
      ]);
    },

    canAssess() {
      return this.$root.hasAnyPermissionTo([
        permissions.MANAGE_SELF_ASSESSMENT,
        permissions.REPORT_SELF_ASSESSMENT_RESULT,
      ]);
    },
  },

  watch: {
    show(show) {
      if (show) this.syncFormData();
    },
  },

  methods: {
    ...mapActions(tasks, [
      addAttachment,
      removeAttachment,
    ]),

    updateShow(show) {
      this.$emit('update:show', show);
    },

    async syncFormData() {
      this.state = 'loading';

      try {
        const { data } = await api.getTaskById(this.task.id);
        this.completeTaskInfo = data.data;

        this.formData = {
          ...this.completeTaskInfo,
          custom_fields: this.generateCustomFieldsInput(this.completeTaskInfo.custom_fields),
          state: stateOptions.find(({ value }) => value === this.completeTaskInfo.state),
          assignees: this.completeTaskInfo.assignees.map(({ id, name }) => ({
            value: id,
            label: name,
          })),
        };
        this.attachments = this.completeTaskInfo.attachments.map(({
          id, name, path, created_at: createdAt,
        }) => ({
          id,
          name,
          tempId: id,
          isSaved: true,
          targetUrl: path,
          secondaryText: toHumanDate(createdAt),
          actions: ['remove'],
        }));
        this.state = null;
      } catch (err) {
        this.state = 'error';
      }
    },

    generateCustomFieldsInput(customFields) {
      return customFields
        ? Object.keys(customFields).reduce((result, key) => ({
          ...result,
          [key]: customFields[key].value,
        }), {})
        : null;
    },

    save() {
      this.$emit('save', this.formatBeforeSave(this.formData));
    },

    formatBeforeSave(formData) {
      return {
        ...formData,
        state: formData.state ? formData.state.value : null,
        assignees: formData.assignees.map(({ value }) => value),
      };
    },

    addTaskAttachment(file) {
      const similarFile = this.attachments.find(({ name }) => file.name === name);

      if (similarFile) {
        this.attachmentsErrors = [
          `Berkas ${file.name} sudah diunggah. Silakan unggah file lainnya.`,
        ];
        return;
      }
      this.attachmentsErrors = [];

      const tempId = Date.now();
      this.attachments = [
        ...this.attachments,
        {
          file,
          tempId,
          name: file.name,
          isLoading: true,
          isSaved: false,
        },
      ];

      this.putAttachment(file, tempId);
    },

    removeTaskAttachment(file) {
      const attachment = this.attachments.find((item) => item.tempId === file.tempId);

      if (attachment && !attachment.isSaved) {
        this.attachments = this.attachments.filter((item) => (
          item.tempId !== file.tempId
        ));
        return;
      }

      this.setAttachmentState(file.tempId, {
        isLoading: true,
      });

      this.removeAttachment({
        taskId: this.task.id,
        attachmentId: file.id,
      }).then(() => {
        this.attachments = this.attachments.filter(({ id }) => id !== file.id);
      }).catch(() => {
        const message = 'Terjadi kesalahan';
        this.setAttachmentState(file.tempId, {
          isLoading: false,
          actions: ['remove'],
          errors: [message],
        });
      });
    },

    resubmitTaskAttachment(file) {
      this.putAttachment(file.file, file.tempId);
    },

    putAttachment(file, tempId) {
      return this.addAttachment({
        file,
        taskId: this.task.id,
        type: 'self_assessment',
      }).then((updatedTask) => {
        const addedAttachment = updatedTask.attachments.find((attachment) => (
          attachment.name === file.name
        ));
        if (addedAttachment) {
          this.setAttachmentState(tempId, {
            id: addedAttachment.id,
            isLoading: false,
            isSaved: true,
            targetUrl: addedAttachment.path,
            secondaryText: toHumanDate(addedAttachment.created_at),
            actions: ['remove'],
          });
        }
      }).catch(() => {
        const message = 'Terjadi kesalahan';
        this.setAttachmentState(tempId, {
          isLoading: false,
          actions: ['resubmit', 'remove'],
          errors: [message],
        });
      });
    },

    setAttachmentState(tempId, state = {}) {
      this.attachments = this.attachments.map((attachment) => (
        attachment.tempId !== tempId ? attachment : {
          ...attachment,
          ...state,
        }
      ));
    },
  },

  criteriaFields,
  stateOptions,
};
</script>
