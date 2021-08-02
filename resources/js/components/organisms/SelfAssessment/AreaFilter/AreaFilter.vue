<template>
  <CRow class="mb-3">
    <CCol lg="3">
      <VueSelect
        :value="selectedStream"
        :options="streamOptions"
        placeholder="Pilih Stream"
        @input="changeStream"
      />
    </CCol>

    <CCol>
      <CreateButton
        class="float-right"
        text="Tambah Area"
        @click="newArea"
      />
    </CCol>

  </CRow>
</template>

<script>
import CreateButton from '@/components/atoms/CreateButton';

export default {
  name: 'AreaFilter',

  components: {
    CreateButton,
  },

  props: {
    streams: {
      type: Array,
      default: () => [],
    },

    selectedStreamId: {
      type: Number,
      default: null,
    },
  },

  data() {
    return {
      selectedStream: null,
    };
  },

  computed: {
    streamOptions() {
      return this.streams.map(({ id, name }) => ({
        value: id,
        label: name,
      }));
    },
  },

  watch: {
    selectedStreamId(selectedStreamId) {
      this.selectedStream = this.streamOptions.find(({ value }) => value === selectedStreamId) || null;
    }
  },

  methods: {
    changeStream(stream) {
      this.selectedStream = stream;

      const selectedStreamId = stream && stream.value;
      const selectedStream = this.streams.find(({ id }) => id === selectedStreamId);

      this.$emit('filter', { selectedStream });
    },

    newArea() {
      this.$emit('new');
    },
  },
};
</script>
