import { getType } from '@/api/system/dict/type'
import { getData, getDicts } from '@/api/system/dict/data'
import Cookies from 'js-cookie'

export default {
  state: {
    approvalStatus: undefined,
    applicationType: undefined,
    backupContent: undefined,
    flowStatus: undefined,
    jobType: undefined,
    env: undefined,
    costType: undefined,
    dataCenter: undefined,
    machineType: undefined,
    platform: undefined
  },
  mutations: {
    SET_APPLICATION_TYPE: (state, data) => {
      state.applicationType = data
    },
    SET_APPROVAL_STATUS: (state, data) => {
      state.approvalStatus = data
    },
    SET_FLOW_STATUS: (state, data) => {
      state.flowStatus = data
    },
    SET_DATA_CENTER: (state, data) => {
      state.dataCenter = data
    },
    SET_ENV: (state, data) => {
      state.env = data
    },
    SET_MACHINE_TYPE: (state, data) => {
      state.machineType = data
    },
    SET_COST_TYPE: (state, data) => {
      state.costType = data
    },
    SET_BACKUP_CONTENT: (state, data) => {
      state.backupContent = data
    },
    SET_JOB_TYPE: (state, data) => {
      state.jobType = data
    }
  },
  actions: {
    getApprovalStatusList: function ({ state, commit }) {
      return new Promise((resolve, reject) => {
        if (state.approvalStatus === undefined) {
          getDicts('approval_status').then(resp => {
            commit('SET_APPROVAL_STATUS', resp.data)
            resolve(resp.data)
          }).catch(e => reject(e))
        } else {
          resolve(state.approvalStatus)
        }
      })
    },
    getApplicationTypeList: function ({ state, commit }) {
      return new Promise((resolve, reject) => {
        if (state.applicationType === undefined) {
          getDicts('application_type').then(resp => {
            commit('SET_APPLICATION_TYPE', resp.data)
            resolve(resp.data)
          }).catch(e => reject(e))
        } else {
          resolve(state.applicationType)
        }
      })
    },
    getBackupContentList: function ({ state, commit }) {
      return new Promise((resolve, reject) => {
        if (state.backupContent === undefined) {
          getDicts('backup_content').then(resp => {
            commit('SET_BACKUP_CONTENT', resp.data)
            console.log('state.backupContent', state.backupContent)
            // Cookies.set('SET_BACKUP_CONTENT', resp.data)
            resolve(resp.data)
          }).catch(e => reject(e))
        } else {
          resolve(state.backupContent)
        }
      })
    },
    getFlowStatusList: function ({ state, commit }) {
      return new Promise((resolve, reject) => {
        if (state.flowStatus === undefined) {
          getDicts('flow_status').then(resp => {
            commit('SET_FLOW_STATUS', resp.data)
            resolve(resp.data)
          }).catch(e => reject(e))
        } else {
          resolve(state.flowStatus)
        }
      })
    },
    getJobTypeList: function ({ state, commit }) {
      return new Promise((resolve, reject) => {
        if (state.jobType === undefined) {
          getDicts('job_type').then(resp => {
            commit('SET_JOB_TYPE', resp.data)
            resolve(resp.data)
          }).catch(e => reject(e))
        } else {
          resolve(state.jobType)
        }
      })
    },
    getEnvList: function ({ state, commit }) {
      return new Promise((resolve, reject) => {
        if (state.env === undefined) {
          getDicts('env').then(resp => {
            commit('SET_ENV', resp.data)
            resolve(resp.data)
          }).catch(e => reject(e))
        } else {
          resolve(state.env)
        }
      })
    },
    getCostTypeList: function ({ state, commit }) {
      return new Promise((resolve, reject) => {
        if (state.costType === undefined) {
          getDicts('cost_type').then(resp => {
            commit('SET_COST_TYPE', resp.data)
            resolve(resp.data)
          }).catch(e => reject(e))
        } else {
          resolve(state.costType)
        }
      })
    },
    getDataCenterList: function ({ state, commit }) {
      return new Promise((resolve, reject) => {
        if (state.dataCenter === undefined) {
          getDicts('data_center').then(resp => {
            commit('SET_DATA_CENTER', resp.data)
            resolve(resp.data)
          }).catch(e => reject(e))
        } else {
          resolve(state.dataCenter)
        }
      })
    },
    getMachineTypeList: function ({ state, commit }) {
      return new Promise((resolve, reject) => {
        if (state.machineType === undefined) {
          getDicts('machine_type').then(resp => {
            commit('SET_MACHINE_TYPE', resp.data)
            resolve(resp.data)
          }).catch(e => reject(e))
        } else {
          resolve(state.machineType)
        }
      })
    },
    getPlatformList: function ({ state, commit }) {
      return new Promise((resolve, reject) => {
        if (state.platform === undefined) {
          getDicts('platform').then(resp => {
            state.platform = resp.data
            resolve(resp.data)
          }).catch(e => reject(e))
        } else {
          resolve(state.platform)
        }
      })
    },
  }
}
