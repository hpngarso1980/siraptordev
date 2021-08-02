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

    <CCol lg="3">
      <VueSelect
        :value="selectedArea"
        :options="areaOptions"
        placeholder="Pilih Area"
        @input="changeArea"
      />
    </CCol>

    <CCol>
      <CreateButton
        class="float-right"
        text="Tambah Sub Area"
        @click="createNew"
      />
    </CCol>

  </CRow>
</template>

<script>
import CreateButton from '@/components/atoms/CreateButton';

export default {
  name: 'SubAreaFilter',

  components: {
    CreateButton,
  },

  props: {
    streams: {
      type: Array,
      default: () => [],
    },

    areas: {
      type: Array,
      default: () => [],
    },
  },

  data() {
    return {
      selectedStream: null,
      selectedArea: null,
    };
  },

  computed: {
    streamOptions() {
      return this.streams.map(({ id, name }) => ({
        value: id,
        label: name,
      }));
    },

    areaOptions() {
      return this.areas.map(({ id, name }) => ({
        value: id,
        label: name,
      }));
    },
  },

  methods: {
    changeStream(stream) {
      this.selectedStream = stream;

      const selectedStreamId = stream && stream.value;
      const selectedStream = this.streams.find(({ id }) => id === selectedStreamId);

      this.$emit('changeStream', selectedStream);
    },

    changeArea(area) {
      this.selectedArea = area;

      const selectedAreaId = area && area.value;
      const selectedArea = this.areas.find(({ id }) => id === selectedAreaId);

      this.$emit('filter', { selectedArea });
    },

    createNew() {
      this.$emit('new');
    },
  },
};
</script>
