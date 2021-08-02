<template>
  <div>
    <input
      ref="file"
      type="file"
      class="hidden-file-input"
      @input="setFile"
    >

    <div
      :class="placeholderClasses"
      @click="handlePlaceholderClick"
    >
      <template v-if="fileSelected">
        <div>
          <component
            :is="targetUrl ? 'a' : 'div'"
            :href="targetUrl"
            target="_blank"
            class="text-body d-block"
          >
            {{ placeholderText }}
          </component>
          <small
            v-if="secondaryText"
            class="text-muted"
          >
            {{ secondaryText }}
          </small>
        </div>
        <CSpinner
          v-if="isLoading"
          color="success"
          size="sm"
        />
        <div v-else>
          <CButton
            v-if="actions.includes('resubmit')"
            size="sm"
            class="btn-link text-dark"
            @click.stop="$emit('resubmit')"
          >
            Kirim ulang
          </CButton>
          <CButton
            v-if="actions.includes('remove')"
            size="sm"
            class="btn-link text-danger"
            @click.stop="$emit('remove')"
          >
            Hapus
          </CButton>
        </div>
      </template>

      <div v-else>
        <CIcon
          name="cil-plus"
          class="mr-1"
        />

        Tambah file
      </div>
    </div>

    <template v-if="hasError">
      <div
        v-for="(error, index) in errors"
        :key="index"
        class="invalid-feedback text-sentence-case"
      >
        {{ error }}
      </div>
    </template>
  </div>
</template>

<script>
export default {
  name: 'FileInput',

  props: {
    value: {
      type: String,
      default: null,
    },

    neverSelectFile: {
      type: Boolean,
      default: false,
    },

    errors: {
      type: Array,
      default: () => [],
    },

    actions: {
      type: Array,
      default: () => [],
      validator(value) {
        return value.reduce((isValid, action) => (
          ['resubmit', 'remove', null].includes(action) && isValid
        ), true);
      },
    },

    isLoading: {
      type: Boolean,
      default: false,
    },

    targetUrl: {
      type: String,
      default: '',
    },

    secondaryText: {
      type: String,
      default: '',
    },
  },

  data() {
    return {
      selectedFile: null,
    };
  },

  computed: {
    fileSelected() {
      return !this.neverSelectFile && (this.selectedFile || this.value);
    },

    placeholderClasses() {
      return {
        'file-input-placeholder rounded border p-3 d-flex flex-row justify-content-between align-items-center': true,
        'file-input-placeholder--input': !this.fileSelected,
        'is-invalid': this.hasError,
      };
    },

    placeholderText() {
      return this.selectedFile || this.value;
    },

    hasError() {
      return this.errors && this.errors.length;
    },
  },

  methods: {
    toggleFileExplorer() {
      const click = new MouseEvent('click');
      this.$refs.file.dispatchEvent(click);
    },

    handlePlaceholderClick() {
      if (this.value) {
        this.$emit('click');
      } else {
        this.toggleFileExplorer();
      }
    },

    setFile(event) {
      const { files } = event.target;

      if (files.length > 0) {
        this.selectedFile = files[0].name;
        this.$emit('input', files[0]);
      } else {
        this.selectedFile = null;
        this.$emit('input', null);
      }

      this.$refs.file.value = '';
    },
  },
};
</script>

<style lang="scss">
.hidden-file-input {
  position: absolute;
  height: 0;
  width: 0;
  padding: 0;
  margin: 0;
  overflow: hidden;
}
.file-input-placeholder {
  cursor: pointer;

  &--input {
    border-style: dashed !important;
  }

  &.is-invalid {
    border-color: #e55353 !important;
  }
}
</style>
