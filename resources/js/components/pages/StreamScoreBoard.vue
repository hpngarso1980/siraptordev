<template>
  <div>
    <PageTitle title="Score Board Stream" />

    <CRow class="mb-2">
      <CCol lg="5">
        <div
          role="group"
          class="form-group"
        >
          <div class="font-weight-bold mb-1">
            Self Assessment
          </div>
          <VueSelect
            v-model="selectedEpic"
            :options="epicsOptions"
            :clearable="false"
            placeholder="Pilih Self Assessment"
          />
        </div>
      </CCol>
    </CRow>

    <ScoreBoard :filters="filters" />
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import PageTitle from '@/components/molecules/PageTitle';
import ScoreBoard from '@/components/organisms/SelfAssessment/StreamScoreBoard';
import { common, epics } from '@/configs/store/modules';
import { getEpics, getRankGroups } from '@/configs/store/action-types';

export default {
  name: 'StreamScoreBoard',

  components: {
    PageTitle,
    ScoreBoard,
  },

  data() {
    return {
      selectedEpic: null,
    };
  },

  computed: {
    ...mapState(epics, [
      'epics',
    ]),

    epicsOptions() {
      return this.epics.data.map(({ id, title }) => ({
        label: title,
        value: id,
      }));
    },

    filters() {
      return {
        epicId: (this.selectedEpic && this.selectedEpic.value) || null,
      };
    },
  },

  mounted() {
    Promise.all([
      this.getRankGroups({ preventReload: true }),
      this.getEpics()
        .then(() => {
          this.selectedEpic = (this.epicsOptions.length && this.epicsOptions[0]) || null;
        }),
    ]);
  },

  methods: {
    ...mapActions(epics, [
      getEpics,
    ]),

    ...mapActions(common, [
      getRankGroups,
    ]),
  },
};
</script>
