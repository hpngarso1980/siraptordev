import createUrl from './create-url'

const createProfileUrl = (path = '') => createUrl(`/profile${path}`);

export default {
  getProfile() {
    return this.get(createProfileUrl());
  },

  updateProfile(data) {
    return this.patch(createProfileUrl(), data);
  },

  updatePassword(data) {
    return this.patch(createProfileUrl('/password'), data);
  },

  updatePhoto(file) {
    const data = new FormData();

    if (file) {
      data.append('photo', file);
    }

    data.append('_method', 'PUT');

    return this.post(createProfileUrl('/photo'), data);
  },

  getNotifications() {
    return this.get(createProfileUrl('/notifications'));
  },

  markAllNotificationsAsRead() {
    return this.patch(createProfileUrl('/notifications/read-all'));
  },

  getProfileStats() {
    return this.get(createProfileUrl('/stats'));
  },
}
