export const state = () => ({
  name: 'jousei',
  Udata: {}
})

export const mutations = {
  changeUdata (state, udata) {
    state.Udata = udata
  }
}
