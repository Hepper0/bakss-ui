// 申请类型
export const APPLY_BACKUP_PERMISSION = 0
export const GRANT_BACKUP_PERMISSION = 1
export const CREATE_RESTORE = 2
export const CREATE_BACKUP = 3
export const BACKUP_RIGHT_NOW = 4
export const BACKUP_AT_TIME = 5
export const MODIFY_DIRECTORY = 6
export const ENABLE_STRATEGY = 7
export const DISABLE_STRATEGY = 8
export const DELETE_STRATEGY = 9
export const MODIFY_OWNER = 10
export const MODIFY_MANAGER = 11
export const APPLY_TYPE = ['申请备份管理权', '授权备份管理权','恢复创建','备份创建','立即备份','定时备份','修改备份目录','启用备份','策略禁用','策略删除', '修改owner', '修改管理员']

// 申请类型对应的组件类型
export const TYPE_BACKUP_PERMISSION = 0
export const TYPE_CREATE_RESTORE = 1
export const TYPE_CREATE_BACKUP = 2
export const TYPE_BACKUP_ONCE = 3
export const TYPE_MODIFY_DIRECTORY = 4
export const TYPE_STRATEGY = 5
export const TYPE_MODIFY_USER = 6
export const APPLY_MAP = [
  [APPLY_BACKUP_PERMISSION, GRANT_BACKUP_PERMISSION],
  [CREATE_RESTORE],
  [CREATE_BACKUP],
  [BACKUP_RIGHT_NOW, BACKUP_AT_TIME],
  [MODIFY_DIRECTORY],
  [ENABLE_STRATEGY, DISABLE_STRATEGY, DELETE_STRATEGY],
  [MODIFY_OWNER, MODIFY_MANAGER]
]

// 申请单流程
export const TASK_STATUS = ['指派人审批', '客户端owner审批', 'dba审批', '备份管理员审批']
export const TASK_STATUS_DICT = {
  'assign': '指派人审批',
  'leader': '直接上级审批',
  'owner': '客户端owner审批',
  'dba': 'dba审批',
  'dbaLeader': 'dba经理审批',
  'admin': '备份管理员审批'
}
export const REVIEW_STATUS_DICT = {
  0: '待审批',
  1: '审批同意',
  2: '审批不同意'
}

// 申请单状态
export const CANCEL_APPLICATION = 2;

export const APPROVAL_STATUS_WAIT_LEADER = 0;
export const APPROVAL_STATUS_WAIT_DBA = 1;
export const APPROVAL_STATUS_WAIT_MANAGER = 2;

export const getComponentType = (appType) => {
  for (const t in APPLY_MAP) {
    if (APPLY_MAP[t].includes(appType)) {
      return t
    }
  }
}

// 通用配置
export const MACHINE_TYPE = { vm: '虚拟机' , physical: '物理机' }
export const DATA_CENTER = {catl: '宁德时代/CATL'}
export const COST_TYPE = {costCenter: '成本中心'}
export const ENV = { prod: '生产', dev: '非生产' }

export const JOB_TYPE = {
  0: '虚机备份',
  1: '复制',
  3: '备份验证',
  12: '即时恢复',
  63: '备份拷贝',
  65: '备份拷贝',
  4020: 'SQL日志备份',
  4021: 'Oracle备份',
  4022: 'Postgre日志备份',
  12002: 'Agent客户端备份',
  12003: 'Agent服务端备份',
  12100: 'OracleRMAN备份',
  13000: '非结构化数据备份',
}
