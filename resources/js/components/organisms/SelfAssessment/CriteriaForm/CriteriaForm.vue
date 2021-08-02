<template>
  <ValidationObserver
    ref="formObserver"
    slim
    v-slot="{ valid }"
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
          v-model="formData.score"
          :disabled="!canManage"
          type="text"
          label="Nilai"
          rules="required|max:45"
        />

        <ValidatedInput
          v-model="formData.level"
          :disabled="!canManage"
          type="text"
          label="Level"
          rules="required|max:500"
        />

        <ValidatedInput
          v-model="formData.description"
          :disabled="!canManage"
          type="text"
          label="Deskripsi"
          rules="required|max:500"
        />

      </CForm>

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
import CancelButton from '@/components/atoms/CancelButton';
import SaveButton from '@/components/atoms/SaveButton';
import ValidatedInput from '@/components/molecules/ValidatedInput';
import modalFormMixin from '@/mixins/modal-form';
import accessLevelMixin from '@/mixins/access-level';

const formTitle = 'Kriteria';
const initialFormData = {
  score: '',
  level: '',
  description: '',
};

export default {
  name: 'CriteriaForm',

  components: {
    CancelButton,
    SaveButton,
    ValidatedInput,
  },

  mixins: [
    modalFormMixin,
    accessLevelMixin,
  ],

  props: {
    selectedSubAreaId: {
      type: Number,
      default: null,
    },
  },

  methods: {
    beforeReset() {
      this.$refs.formObserver.reset();
    },

    beforeSave() {
      return this.$refs.formObserver.validate();
    },

    formatBeforeSave(formData) {
      return {
        ...formData,
        sub_area_id: this.selectedSubAreaId,
      };
    },
  },

  formTitle,
};
</script>
