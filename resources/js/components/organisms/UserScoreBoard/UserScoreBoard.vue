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

        <template #completion_rate="{ item }">
          <td width="300">
            {{ item.completion_rate === null ? '-' : item.completion_rate }}
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

          <template #completion_rate="{ item }">
            <td width="300">
              {{ item.completion_rate === null ? '-' : item.completion_rate }}
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
import { getUserRank } from '@/configs/store/action-types';
import { common } from '@/configs/store/modules';
import scoreBoardMixin from '@/mixins/score-board';
import fields from './configs/fields';

export default {
  name: 'UserScoreBoard',

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
    ...mapState(common, {
      rank: (state) => state.userRank,
    }),
  },

  watch: {
    filters() {
      this.getUserRank();
    },
  },

  mounted() {
    this.getUserRank();
  },

  methods: {
    ...mapActions(common, {
      getUserRank(dispatch) {
        return dispatch(getUserRank, this.filters);
      },
    }),
  },

  fields,
};
</script>
