const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.accessToken,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  currentNodeId: state => state.orgtree.currentNodeId
}
export default getters
