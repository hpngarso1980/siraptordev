import chunk from 'lodash-es/chunk';
import { mapState } from 'vuex';
import { common } from '@/configs/store/modules';

export default {
  computed: {
    ...mapState(common, [
      'rankGroups',
    ]),

    groupedRank() {
      if (!this.isRankGrouped) return this.rank.data;

      const rankGroups = this.rankGroups.data;
      const rank = this.rank.data;
      const rankGroupsCount = rankGroups.length;
      const rankCount = rank.length;
      const remains = rankCount % rankGroupsCount;
      const memberCount = remains === (rankGroupsCount - 1)
        ? Math.ceil(rankCount / rankGroupsCount)
        : Math.floor(rankCount / rankGroupsCount);

      const chunked = chunk(rank, memberCount);
      if (rankGroupsCount > 0 && chunked.length > rankGroupsCount) {
        chunked[rankGroupsCount - 1].push(...chunked[rankGroupsCount]);
      }
      const finalChunked = chunked.slice(0, rankGroupsCount);

      const groupedRank = finalChunked.map((members, index) => ({
        members,
        title: rankGroups[index].title,
        color: rankGroups[index].color,
      }));

      return groupedRank;
    },

    isRankGrouped() {
      const rankGroups = this.rankGroups.data;
      const rank = this.rank.data;
      return rank.length >= (rankGroups.length * 2);
    },
  },
};
