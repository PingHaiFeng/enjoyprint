const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  id:state => state.user.id,
  store_id:state => state.user.store_id,
  store_name:state => state.user.store_name
}
export default getters
