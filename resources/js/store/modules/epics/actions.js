import generateAction from '@/helpers/vuex-helpers/generate-action';
import { getEpics, updateEpic } from '@/configs/store/action-types';

export default {
  [getEpics]: generateAction('getAll', {
    stateKey: 'epics',
    apiInterface: 'getEpics',
  }),

  [updateEpic]: generateAction('update', {
    stateKey: 'epics',
    apiInterface: 'updateEpic',
  }),
};
