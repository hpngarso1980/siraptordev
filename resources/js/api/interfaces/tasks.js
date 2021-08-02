import generateInterface from '@/helpers/request-helpers/generate-interface';
import createUrl from './create-url';

const taskUrl = createUrl('/tasks');

export default {
  getTasks: generateInterface('getAll', taskUrl),
  getTaskById: generateInterface('getById', taskUrl),
  createTask: generateInterface('create', taskUrl),
  updateTask: generateInterface('update', taskUrl),
  deleteTask: generateInterface('delete', taskUrl),

  addAttachment(taskId, file, type = null) {
    const data = new FormData();

    if (file) {
      data.append('attachment', file);
    }

    if (type) {
      data.append('type', type);
    }

    data.append('_method', 'PUT');

    return this.post(`${taskUrl}/${taskId}/attachments`, data);
  },

  removeAttachment(taskId, attachmentId) {
    return this.delete(`${taskUrl}/${taskId}/attachments/${attachmentId}`);
  },
};
