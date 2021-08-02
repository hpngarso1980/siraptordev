<template>
  <CContainer class="d-flex align-items-center justify-content-center min-vh-100">
    <CRow>
      <CCol md="8">
        <CCard
          class="p-4 shadow-lg border-0"
          style="width: 400px;"
        >
          <CCardBody>
            <CForm @submit.prevent="login">
              <div class="d-block text-center mb-5">
                <CImg
                  src="/images/logo-full.png"
                  alt="Logo SIRAPTOR"
                  class="w-50"
                />
              </div>

              <CInput
                v-model="email"
                placeholder="Email"
                autocomplete="email"
                :is-valid="emailIsValid"
                required
                @input="revalidateErrors"
              >
                <template #prepend-content>
                  <CIcon name="cil-user"/>
                </template>

                <div
                  slot="invalid-feedback"
                  class="invalid-feedback text-capitalize"
                >
                  {{ fieldErrors.email }}
                </div>
              </CInput>

              <CInput
                v-model="password"
                placeholder="Password"
                :type="passwordFieldType"
                autocomplete="curent-password"
                :is-valid="passwordIsValid"
                required
                @input="revalidateErrors"
              >
                <template #prepend-content>
                  <CIcon name="cil-lock-locked"/>
                </template>

                <template #append-content>
                  <div
                    style="cursor: pointer;"
                    @click="togglePassword"
                  >
                    {{ showPassword ? 'sembunyikan' : 'tampilkan' }}
                  </div>
                </template>

                <div
                  slot="invalid-feedback"
                  class="invalid-feedback text-capitalize"
                >
                  {{ fieldErrors.password }}
                </div>
              </CInput>

              <CRow class="mt-5">
                <CCol col="12">
                  <CButton
                    type="submit"
                    size="lg"
                    color="success"
                    class="px-4"
                    block
                    @click="login"
                  >
                    Masuk
                  </CButton>
                </CCol>
                <CCol
                  col="12"
                  class="text-center mt-3"
                >
                  <CButton
                    color="link"
                    class="px-0"
                    block
                  >
                    Lupa kata sandi?
                  </CButton>
                </CCol>
              </CRow>
            </CForm>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  </CContainer>
</template>

<script>
import api from '@/api';

export default {
  name: 'UserLogin',

  data() {
    return {
      email: '',
      password: '',
      fieldErrors: {
        email: '',
        password: '',
      },
      showPassword: false,
    };
  },

  computed: {
    fieldErrorsOccurred() {
      const { fieldErrors } = this;

      return fieldErrors.email || fieldErrors.password;
    },

    emailIsValid() {
      return this.fieldErrors.email ? false : null;
    },

    passwordIsValid() {
      return this.fieldErrors.password ? false : null;
    },

    passwordFieldType() {
      return this.showPassword ? 'text' : 'password';
    },
  },

  methods: {
    togglePassword() {
      this.showPassword = !this.showPassword;
    },

    clearFieldErrors() {
      this.fieldErrors = {
        email: '',
        password: '',
      };
    },

    revalidateErrors() {
      if (this.fieldErrorsOccurred) {
        this.clearFieldErrors();
      }
    },

    handleError(errorResponse) {
      const { data, status } = errorResponse;

      if (status === 422) {
        const { errors } = data;

        Object.keys(errors).forEach(field => {
          this.fieldErrors[field] = errors[field].join(' ');
        });
      }
    },

    login() {
      this.$root.login(this.email, this.password).catch(error => {
        this.handleError(error.response);
      });
    },
  },
};
</script>
