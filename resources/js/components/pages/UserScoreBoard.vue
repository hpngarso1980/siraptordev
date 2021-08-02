<template>
  <div>
    <PageTitle title="Score Board PIC" />

    <CRow class="mb-2">
      <CCol lg="2">
        <div
          role="group"
          class="form-group"
        >
          <div class="font-weight-bold mb-1">
            Tgl. Awal
          </div>
          <Datepicker
            v-model="startDate"
            :language="$options.id"
          />
        </div>
      </CCol>

      <CCol lg="2">
        <div
          role="group"
          class="form-group"
        >
          <div class="font-weight-bold mb-1">
            Tgl. Akhir
          </div>
          <Datepicker
            v-model="endDate"
            :language="$options.id"
          />
        </div>
      </CCol>
    </CRow>

    <ScoreBoard :filters="filters" />
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import format from 'date-fns/format';
import startOfYear from 'date-fns/startOfYear';
import endOfYear from 'date-fns/endOfYear';
import Datepicker from '@/components/molecules/Datepicker';
import PageTitle from '@/components/molecules/PageTitle';
import ScoreBoard from '@/components/organisms/UserScoreBoard';
import { common } from '@/configs/store/modules';
import { getRankGroups } from '@/configs/store/action-types';

export default {
  name: 'UserScoreBoard',

  components: {
    Datepicker,
    PageTitle,
    ScoreBoard,
  },

  data() {
    return {
      startDate: null,
      endDate: null,
    };
  },

  computed: {
    filters() {
      const { startDate, endDate } = this;
      const dateFormat = 'yyyy-MM-dd';
      const now = format(new Date(), dateFormat);

      return {
        start_date: startDate ? format(startDate, dateFormat) : now,
        end_date: endDate ? format(endDate, dateFormat) : now,
      };
    },
  },

  mounted() {
    this.initiateFilters();
    this.getRankGroups({ preventReload: true });
  },

  methods: {
    ...mapActions(common, [
      getRankGroups,
    ]),

    initiateFilters() {
      const now = new Date();
      this.startDate = startOfYear(now);
      this.endDate = endOfYear(now);
    },
  },
};
</script>
