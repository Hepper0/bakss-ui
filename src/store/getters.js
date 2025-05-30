const getters = {
  sidebar: state => state.app.sidebar,
  size: state => state.app.size,
  device: state => state.app.device,
  dict: state => state.dict.dict,
  visitedViews: state => state.tagsView.visitedViews,
  cachedViews: state => state.tagsView.cachedViews,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  introduction: state => state.user.introduction,
  roles: state => state.user.roles,
  user: state => state.user,
  permissions: state => state.user.permissions,
  permission_routes: state => state.permission.routes,
  topbarRouters:state => state.permission.topbarRouters,
  defaultRoutes:state => state.permission.defaultRoutes,
  sidebarRouters:state => state.permission.sidebarRouters,
  backupContent:state => state.config.backupContent,
  applicationType:state => state.config.applicationType,
  approvalStatus:state => state.config.approvalStatus,
  jobType:state => state.config.jobType,
  env:state => state.config.env,
  costType:state => state.config.costType,
  flowStatus:state => state.config.flowStatus,
  machineType:state => state.config.machineType,
  dataCenter:state => state.config.dataCenter,
  platform:state => state.config.platform,
}
export default getters
