const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.accessToken,
  avatar: state => state.user.avatar,
  user: state => state.user.user,
  visitedViews: state => state.tagsView.visitedViews,
  currentNodeId: state => state.orgtree.currentNodeId
}
export default getters
