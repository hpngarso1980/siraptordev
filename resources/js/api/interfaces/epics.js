import generateInterface from '@/helpers/request-helpers/generate-interface';
import createUrl from './create-url';

const epicUrl = createUrl('/epics');

export default {
  getEpics: generateInterface('getAll', epicUrl),
  updateEpic: generateInterface('update', epicUrl),
};
