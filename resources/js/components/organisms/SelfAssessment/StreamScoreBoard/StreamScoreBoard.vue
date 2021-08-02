<template>
  <div>
    <ContentPanel
      v-if="!isRankGrouped"
      table-content
    >
      <CDataTable
        :items="rank.data"
        :fields="$options.fields"
        hover
      >
        <TableNoItem slot="no-items-view" />

        <template #rank="{ index }">
          <td width="120">
            {{ index + 1 }}
          </td>
        </template>

        <template #final_score="{ item }">
          <td width="80">
            {{ item.final_score || '-' }}
          </td>
        </template>

        <template #finished_days="{ item }">
          <td width="250">
            {{ item.finished_days || '-' }}
          </td>
        </template>
      </CDataTable>
    </ContentPanel>

    <template v-else>
      <ContentPanel
        v-for="(group, groupIndex) in groupedRank"
        :key="groupIndex"
        :title="group.title"
        :background-color="group.color"
        type="score-board"
        table-content
      >
        <CDataTable
          :items="group.members"
          :fields="$options.fields"
          hover
        >
          <TableNoItem slot="no-items-view" />

          <template #rank="{ index }">
            <td width="120">
              {{ index + 1 }}
            </td>
          </template>

          <template #final_score="{ item }">
            <td width="80">
              {{ item.final_score || '-' }}
            </td>
          </template>

          <template #finished_days="{ item }">
            <td width="250">
              {{ item.finished_days || '-' }}
            </td>
          </template>
        </CDataTable>
      </ContentPanel>
    </template>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import TableNoItem from '@/components/atoms/TableNoItem';
import ContentPanel from '@/components/molecules/ContentPanel';
import { getRank } from '@/configs/store/action-types';
import { selfAssessment } from '@/configs/store/modules';
import scoreBoardMixin from '@/mixins/score-board';
import fields from './configs/fields';

export default {
  name: 'SelfAssessmentStreamScoreBoard',

  components: {
    ContentPanel,
    TableNoItem,
  },

  mixins: [scoreBoardMixin],

  props: {
    filters: {
      type: Object,
      default: () => ({}),
    },
  },

  computed: {
    ...mapState(selfAssessment, {
      rank: (state) => state.rank.stream,
    }),
  },

  watch: {
    filters() {
      this.getRank();
    },
  },

  mounted() {
    this.getRank();
  },

  methods: {
    ...mapActions(selfAssessment, {
      getRank(dispatch) {
        return dispatch(getRank, {
          type: 'stream',
          ...this.filters,
        });
      },
    }),
  },

  fields,
};
</script>
