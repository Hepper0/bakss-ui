export const TYPE_BACKUP_PERMISSION = 0
export const TYPE_CREATE_RESTORE = 1
export const TYPE_CREATE_BACKUP = 2
export const TYPE_BACKUP_ONCE = 3
export const TYPE_MODIFY_DIRECTION = 4
export const TYPE_STRATEGY = 5
export const APPLY_BACKUP_PERMISSION = 0
export const GRANT_BACKUP_PERMISSION = 1
export const CREATE_RESTORE = 2
export const CREATE_BACKUP = 3
export const BACKUP_RIGHT_NOW = 4
export const CREATE_AT_TIME = 5
export const MODIFY_DIRECTION = 6
export const ENABLE_STRATEGY = 7
export const DISABLE_STRATEGY = 8
export const DELETE_STRATEGY = 9


export const APPLY_TYPE = ['申请备份管理权', '授权备份管理权','恢复创建','备份创建','立即备份','定时备份','修改备份目录','启用备份','策略禁用','策略删除']
export const APPLY_MAP = [
  [APPLY_BACKUP_PERMISSION,GRANT_BACKUP_PERMISSION],
  [CREATE_RESTORE],
  [CREATE_BACKUP],
  [BACKUP_RIGHT_NOW,CREATE_AT_TIME],
  [MODIFY_DIRECTION],
  [ENABLE_STRATEGY,DISABLE_STRATEGY,DELETE_STRATEGY]
]

export const TASK_STATUS = ['指派人审批', '客户端owner审批', 'dba审批', '备份管理员审批']
export const APPROVAL_STATUS_WAIT_LEADER = 0;
export const APPROVAL_STATUS_WAIT_DBA = 1;
export const APPROVAL_STATUS_WAIT_MANAGER = 2;
