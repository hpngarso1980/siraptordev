<template>
  <ValidationObserver
    ref="formObserver"
    v-slot="{ valid }"
    slim
  >
    <CModal
      :title="title"
      :show="show"
      size="sm"
      :close-on-backdrop="false"
      centered
      @update:show="updateShow"
    >
      <CForm>
        <ValidatedInput
          v-model="formData.name"
          type="text"
          label="Nama"
          rules="required|max:500"
        />

        <ValidatedInput
          v-model="formData.email"
          type="email"
          label="Email"
          rules="required|email|max:500"
        />

        <ValidatedInput
          v-model="formData.phone"
          type="text"
          label="No.Telepon"
          rules="numeric|max:15"
        />

        <ValidatedSelect
          v-model="formData.role"
          :options="roleOptions"
          placeholder="Pilih role"
          rules="required"
          label="Role"
          :reduce="item => item.value"
        />

        <template v-if="roleSelected">
          <div
            v-if="roleBasedPermissions.length"
            role="group"
            class="form-group"
          >
            Hak Akses Berdasarkan Jabatan
            <CInputCheckbox
              v-for="(permission, index) in roleBasedPermissions"
              :key="index"
              checked
              disabled
            >
              <template #label>
                {{ permission.name }}
              </template>
            </CInputCheckbox>
          </div>

          <div
            v-if="otherPermissions.length"
            role="group"
            class="form-group"
          >
            Hak Akses Tambahan
            <CInputCheckbox
              v-for="(permission, index) in otherPermissions"
              :key="index"
              :value="permission.name"
              :checked="formData.additionalPermissions.includes(permission.name)"
              @update:checked="handleAdditionalPermissionsChange"
            >
              <template #label>
                {{ permission.name }}
              </template>
            </CInputCheckbox>
          </div>
        </template>

        <ValidatedInput
          v-model="formData.password"
          type="password"
          label="Password"
        />
      </CForm>

      <template #footer-wrapper>
        <div class="p-3">
          <SaveButton
            :disabled="!valid"
            class="float-right"
            @click="save"
          />
        </div>
      </template>
    </CModal>
  </ValidationObserver>
</template>

<script>
import capitalize from 'lodash-es/capitalize';
import differenceBy from 'lodash-es/differenceBy';
import SaveButton from '@/components/atoms/SaveButton';
import ValidatedInput from '@/components/molecules/ValidatedInput';
import ValidatedSelect from '@/components/molecules/ValidatedSelect';
import modalFormMixin from '@/mixins/modal-form';
import { uniquePush, removeItem } from '@/helpers/array-helpers';

const formTitle = 'User';
const initialFormData = {
  name: '',
  email: '',
  phone: '',
  role: '',
  permissions: [],
  additionalPermissions: [],
  password: 'password',
};

export default {
  name: 'UserForm',

  components: {
    SaveButton,
    ValidatedInput,
    ValidatedSelect,
  },

  mixins: [
    modalFormMixin,
  ],

  props: {
    roles: {
      type: Array,
      default: () => [],
    },

    permissions: {
      type: Array,
      default: () => [],
    },
  },

  computed: {
    roleOptions() {
      return this.roles.map(({ name }) => ({
        value: name,
        label: capitalize(name),
      }));
    },

    roleSelected() {
      return this.formData.role;
    },

    roleBasedPermissions() {
      const role = this.roles.find((role) => role.name === this.formData.role); //eslint-disable-line

      return role ? role.permissions : [];
    },

    otherPermissions() {
      return differenceBy(this.permissions, this.roleBasedPermissions, 'id');
    },
  },

  methods: {
    handleAdditionalPermissionsChange(checked, $event) {
      const permission = $event.target.value;
      const { additionalPermissions } = this.formData;

      if (checked) {
        this.formData.additionalPermissions = uniquePush(additionalPermissions, permission);
      } else {
        this.formData.additionalPermissions = removeItem(additionalPermissions, permission);
      }
    },

    formatBeforeEdit(formData) {
      return {
        ...this.$options.initialFormData,
        ...formData,
        role: formData.role ? formData.role.name : null,
        password: null,
      };
    },

    formatBeforeSave(formData) {
      const roleBasedPermissions = formData.permissions.map(({ name }) => name);
      const permissions = roleBasedPermissions.concat(this.formData.additionalPermissions);
      const finalData = {
        ...formData,
        permissions,
      };

      delete finalData.additionalPermissions;

      return finalData;
    },

    beforeReset() {
      this.$refs.formObserver.reset();
    },

    beforeSave() {
      return this.$refs.formObserver.validate();
    },
  },

  formTitle,
  initialFormData,
};
</script>
