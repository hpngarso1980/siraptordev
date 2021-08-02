import api from '@/api';
import generateAction from '@/helpers/vuex-helpers/generate-action';
import {
  getTasks,
  updateTask,
  addAttachment,
  removeAttachment,
} from '@/configs/store/action-types';
import { setData } from '@/configs/store/mutation-types';

function syncTasks(tasks, newTask) {
  return tasks.map((existingTask) => {
    const task = existingTask.id === newTask.id ? { ...existingTask, ...newTask } : existingTask;

    if (task.sub_tasks.length) {
      task.sub_tasks = syncTasks(task.sub_tasks, newTask);
    }

    return task;
  });
}

export default {
  [getTasks]: generateAction('getAll', {
    stateKey: 'tasks',
    apiInterface: 'getTasks',
  }),

  [updateTask]({ commit, state }, newData) {
    return api.updateTask(newData.id, newData)
      .then(({ data }) => {
        const updatedData = data.data;
        const list = syncTasks(state.tasks.data, updatedData);

        commit(setData, {
          key: 'tasks',
          value: list,
        });
      });
  },

  [addAttachment]({ commit, state }, { taskId, file, type }) {
    return api.addAttachment(taskId, file, type)
      .then(({ data }) => {
        const updatedData = data.data;
        const list = syncTasks(state.tasks.data, updatedData);

        commit(setData, {
          key: 'tasks',
          value: list,
        });

        return updatedData;
      });
  },

  [removeAttachment]({ commit, state }, { taskId, attachmentId }) {
    return api.removeAttachment(taskId, attachmentId)
      .then(({ data }) => {
        const updatedData = data.data;
        const list = syncTasks(state.tasks.data, updatedData);

        commit(setData, {
          key: 'tasks',
          value: list,
        });
      });
  },
};
