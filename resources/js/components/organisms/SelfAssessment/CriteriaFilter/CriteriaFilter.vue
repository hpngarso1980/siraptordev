<template>
  <CRow class="mb-3">

    <CCol
      lg="9"
      class="d-flex flex-row"
    >
      <VueSelect
        :value="selectedStream"
        :options="streamOptions"
        placeholder="Pilih Stream"
        class="w-100 mr-1"
        @input="changeStream"
      />

      <VueSelect
        :value="selectedArea"
        :options="areaOptions"
        placeholder="Pilih Area"
        class="w-100 mr-1"
        @input="changeArea"
      />

      <VueSelect
        :value="selectedSubArea"
        :options="subAreaOptions"
        placeholder="Pilih Sub Area"
        class="w-100"
        @input="changeSubArea"
      />
    </CCol>

    <CCol lg="3">
      <CreateButton
        class="float-right"
        text="Tambah  Kriteria"
        @click="createNew"
      />
    </CCol>

  </CRow>
</template>

<script>
import CreateButton from '@/components/atoms/CreateButton';

export default {
  name: 'CriteriaFilter',

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

    subAreas: {
      type: Array,
      default: () => [],
    },
  },

  data() {
    return {
      selectedStream: null,
      selectedArea: null,
      selectedSubArea: null,
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

    subAreaOptions() {
      return this.subAreas.map(({ id, name }) => ({
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

      this.$emit('changeArea', selectedArea);
    },

    changeSubArea(subArea) {
      this.selectedSubArea = subArea;

      const selectedSubAreaId = subArea && subArea.value;
      const selectedSubArea = this.subAreas.find(({ id }) => id === selectedSubAreaId);
      this.$emit('changeSubArea', selectedSubArea);
    },

    createNew() {
      this.$emit('new');
    },
  },
};
</script>
