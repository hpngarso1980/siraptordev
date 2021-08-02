<template>
  <div>
    <FileInput
      v-for="(file, index) in files"
      :key="index"
      :value="file.name"
      :errors="file.errors"
      :actions="!disabled && file.actions || undefined"
      :target-url="file.targetUrl"
      :is-loading="file.isLoading"
      :secondary-text="file.secondaryText"
      class="mb-2"
      @click="clickFile(file)"
      @remove="removeFile(file)"
      @resubmit="resubmitFile(file)"
    />

    <FileInput
      v-if="!disabled"
      :errors="errors"
      never-select-file
      @input="addFile"
    />
  </div>
</template>

<script>
import FileInput from '@/components/molecules/FileInput';

export default {
  name: 'MultipleFileInput',

  components: {
    FileInput,
  },

  props: {
    value: {
      type: Array,
      default: () => [],
    },

    existingFiles: {
      type: Array,
      default: () => [],
    },

    errors: {
      type: Array,
      default: () => [],
    },

    disabled: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      files: [],
    };
  },

  watch: {
    existingFiles() {
      this.syncExistingFiles();
    },
  },

  mounted() {
    this.syncExistingFiles();
  },

  methods: {
    syncExistingFiles() {
      this.files = this.existingFiles;
    },

    addFile(file) {
      this.$emit('add', file);
    },

    removeFile(file) {
      this.$emit('remove', file);
    },

    resubmitFile(file) {
      this.$emit('resubmit', file);
    },

    clickFile(file) {
      this.$emit('click', file);
    },
  },
};
</script>
