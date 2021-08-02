<template>
  <ContentPanel title="Ganti Password">
    <ValidationObserver
      ref="formObserver"
      slim
      v-slot="{ valid }"
    >
      <CForm>
        <CRow>
          <CCol lg="10">
            <ValidatedInput
              v-model="password"
              :errors="errors.password"
              vid="password"
              type="password"
              label="Password"
              rules="required|max:255"
              @input="changeInput"
            />
          </CCol>
        </CRow>

        <CRow>
          <CCol lg="10">
            <ValidatedInput
              v-model="passwordConfirmation"
              :errors="errors.password_confirmation"
              type="password"
              label="Konfirmasi Password"
              rules="required|max:255|confirmed:password"
              @input="changeInput"
            />
          </CCol>
        </CRow>

        <CRow>
          <CCol>
            <SaveButton
              :disabled="!valid"
              @click="confirmSaveAction"
            />
          </CCol>
        </CRow>

      </CForm>
    </ValidationObserver>
  </ContentPanel>
</template>

<script>
import eventHub from '@/event-hub';
import SaveButton from '@/components/atoms/SaveButton';
import ContentPanel from '@/components/molecules/ContentPanel'
import ValidatedInput from '@/components/molecules/ValidatedInput';

export default {
  name: 'PasswordForm',

  components: {
    ContentPanel,
    SaveButton,
    ValidatedInput,
  },

  props: {
    errors: {
      type: Object,
      default: () => ({}),
    },
  },

  data() {
    return {
      password: '',
      passwordConfirmation: '',
    };
  },

  mounted() {
    eventHub.$on('confirm-action', this.save);
  },

  beforeDestroy() {
    eventHub.$off('confirm-action', this.save)
  },

  methods: {
    changeInput() {
      this.$emit('changeInput');
    },

    confirmSaveAction() {
      this.$root.confirmAction({
        type: 'password-save',
        message: 'Yakin ingin mengganti password?',
        successActionText: 'Update Password',
      });
    },

    save({ type }) {
      if (type === 'password-save') {
        this.$emit('save', {
          password: this.password,
          password_confirmation: this.passwordConfirmation,
        });
      }
    },
  },
};
</script>
