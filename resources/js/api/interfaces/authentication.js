import createUrl from './create-url'

export default {
  login(email, password) {
    return this.post(createUrl('/login'), {
      email,
      password,
    })
  },

  logout() {
    return this.post(createUrl('/logout'))
  },
}
