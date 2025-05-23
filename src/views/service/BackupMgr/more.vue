<template>
  <div class="backup-management">
    <!--  一次性备份  -->
    <el-dialog
      title="一次性备份"
      :visible.sync="backupDialogVisible"
      show-close
    >
      <div style="padding: 0 40px">
        <el-row :gutter="5">
          <el-col :span="4" style="text-align: right; padding: 3px">
            <b style="color: red">* </b>备份方式：
          </el-col>
          <el-col :span="20">
            <el-radio-group size="mini" v-model="backupExecType">
              <el-radio-button :label="BACKUP_RIGHT_NOW" name="rightNow">立即备份</el-radio-button>
              <el-radio-button v-show="false" :label="BACKUP_AT_TIME" name="atTime">定时备份</el-radio-button>
            </el-radio-group>
          </el-col>
        </el-row>
        <el-row v-show="backupExecType === BACKUP_AT_TIME">
          <br />
          <el-col :span="4" style="text-align: right; padding: 3px">
            <b style="color: red">* </b>备份时间：
          </el-col>
          <el-col :span="20">
            <el-date-picker
              size="mini"
              v-model="backupExecTime"
              type="datetime"
              placeholder="请选择日期时间"
              :picker-options="dateOptions"
              value-format="yyyy-MM-dd HH:mm:ss"
            />
          </el-col>
        </el-row>
        <br />
        <el-row :gutter="5">
          <el-col :span="4" style="text-align: right">
            备注：
          </el-col>
          <el-col :span="20">
            <el-input v-model="backupExecReason" type="textarea" :rows="3"/>
          </el-col>
        </el-row>
        <br/>
        <span slot="footer" class="dialog-footer" style="display: flex; justify-content: right; border-top: 1px solid #f1f1f1; padding-top: 10px">
          <el-button @click="showBackupOnceDialog(false)" size="small">取 消</el-button>
          <el-button type="primary" @click.stop="backupOnceSubmit" size="small">确 定</el-button>
        </span>
      </div>
    </el-dialog>
    <!-- 启停备份   -->
    <el-dialog
      :title="strategyDialogTitle"
      :visible.sync="strategyDialogVisible"
      show-close
    >
      <div style="padding: 0 40px">
        <el-row :gutter="5">
          <el-col :span="4" style="text-align: right; padding: 3px">
            <b style="color: red">* </b>任务名称：
          </el-col>
          <el-col :span="20">
            <el-input v-model="jobName" disabled size="mini" />
          </el-col>
        </el-row>
        <br />
        <el-row :gutter="5">
          <el-col :span="4" style="text-align: right">
            申请理由：
          </el-col>
          <el-col :span="20">
            <el-input v-model="backupStrategyReason" type="textarea" :rows="3"/>
          </el-col>
        </el-row>
        <br/>
        <span slot="footer" class="dialog-footer" style="display: flex; justify-content: right; border-top: 1px solid #f1f1f1; padding-top: 10px">
          <el-button @click="showStrategyDialog(false)" size="small">取 消</el-button>
          <el-button type="primary" @click="strategySubmit" size="small">确 定</el-button>
        </span>
      </div>
    </el-dialog>
    <el-dialog
      title="任务详情"
      :visible.sync="sessionDetailVisible"
      custom-class="dialog-border"
    >
      <Session :sessionId="sessionDetailSessionId" :server="server" style="border-top: 1px solid #e3e3e3; margin-top: -20px"/>
    </el-dialog>
    <!-- 基本信息 -->
    <el-card class="box-card panel-container-raw">
      <div slot="header" class="clearfix">
        <span>基本信息</span>
      </div>
      <el-form label-width="100px">
        <el-row :gutter="20">
          <el-col :span="6">
            <el-form-item label="任务名称">
              <el-input v-model="jobName" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="备份软件">
              <el-select v-model="basicInfo.backupSoftware" disabled style="width: 100%">
                <el-option label="Veeam" value="Veeam"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="备份类型">
              <el-input v-model="basicInfo.backupType" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="备份IP">
              <el-input v-model="basicInfo.backupIp" disabled></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="6">
            <el-form-item label="Master IP">
              <el-input v-model="basicInfo.masterIp" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="备份内容">
              <el-input v-model="basicInfo.backupContent" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="环境">
              <el-select v-model="basicInfo.env" disabled style="width: 100%">
                <el-option label="NetBackup" value="NetBackup"></el-option>
                <el-option label="NetWorker" value="NetWorker"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="操作系统">
              <el-select v-model="basicInfo.platform" disabled style="width: 100%">
                <el-option label="Windows" value="Windows"></el-option>
                <el-option label="Linux" value="Linux"></el-option>
                <el-option label="MacOs" value="MacOs"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-card>

    <!-- 备份策略 -->
    <div class="panel-container">
          <el-collapse :value="1" class="panel-container-raw" style="padding: 2px; border-bottom: 0">
            <el-collapse-item :name="1">
              <template slot="title">
                <div style="font-size: 14px;">
                  <i class="header-icon el-icon-location" style="color: red; margin-left: 15px"></i>
                  <span style="font-family: 'Microsoft YaHei', sans-serif;">
                    备份策略
                  </span>
                </div>
              </template>
              <div class="collapse-panel" id="jobDetail">
                <el-collapse :value="1" class="panel-container-raw" style="padding: 2px; border-bottom: 0" v-loading="jobDetailLoading">
                  <el-collapse-item :name="1">
                    <template slot="title">
                      <div style="width: 100%">
                        <span style="font-size: 14px; margin-left: 20px">
                          <span style="font-family: 'Microsoft YaHei', sans-serif;">
                            {{ jobName }}
                          </span>
                        </span>
                        <span style="float: right; margin-right: 15px">
                          <el-button @click.stop="showStrategyDialog(true, 1)" type="warning" size="mini">{{ backupStrategy.isScheduleEnabled ? '禁用' : '启用' }}备份</el-button>
                          <el-button @click.stop="showStrategyDialog(true, 2)" type="danger" size="mini">删除</el-button>
                        </span>
                      </div>
                    </template>
                    <div class="collapse-panel">
                      <div style="background-color: #f1f1f1; border-radius: 8px; padding: 15px 30px">
                        <el-row style="padding: 0 10px">
                          <el-button size="mini" type="primary" style="float: right" @click="showBackupOnceDialog(true)">一次性备份</el-button>
                        </el-row>
                        <el-form label-width="120px">
                          <el-row>
                            <el-col :span="8">
                              <el-form-item label="备份服务器: ">
                                {{ basicInfo.backupServer }}
                              </el-form-item>
                            </el-col>
                          </el-row>
                          <el-row>
                            <el-col :span="8">
                              <el-form-item label="VCenter: ">
                                {{ basicInfo.vCenter }}
                              </el-form-item>
                            </el-col>
                            <el-col :span="8">
                              <el-form-item label="虚拟机: ">
                                <span v-if="backupStrategy.selectedVmObjects">
                                  <el-tag :key="idx" v-for="(v, idx) in backupStrategy.selectedVmObjects.map(v => v.name)"> {{ v }}</el-tag>
                                </span>
                              </el-form-item>
                            </el-col>
                            <el-col :span="8">
                              <el-form-item label="仓库: ">
                                {{ backupStrategy.repository }}
                              </el-form-item>
                            </el-col>
                          </el-row>
                          <el-row>
                            <el-col :span="8">
                              <el-form-item label="备份时间: ">
                                {{ backupStrategy.scheduleTime }}
                              </el-form-item>
                            </el-col>
                            <el-col :span="8">
                              <el-form-item label="备份计划类型: ">
                                {{ backupStrategy.scheduleDateType }}
                              </el-form-item>
                            </el-col>
                            <el-col v-show="(backupStrategy.policy === 'Daily' && backupStrategy.scheduleDateType === 'selectedDays') || backupStrategy.policy === 'Monthly'" :span="8">备份日期: {{ backupStrategy.scheduleDay }}</el-col>
                          </el-row>
                        </el-form>
                      </div>
                    </div>
                  </el-collapse-item>
                </el-collapse>
              </div>
            </el-collapse-item>
          </el-collapse>

    </div>

    <!-- 备份历史 -->
    <el-collapse :value="1" class="panel-container-raw" style="padding: 2px; border-bottom: 0">
      <el-collapse-item :name="1">
        <template slot="title">
          <div style="font-size: 16px;">
            <i class="header-icon el-icon-location" style="color: red; margin-left: 15px"></i>
              <span style="font-family: 'Microsoft YaHei', sans-serif;">
                备份历史
              </span>
          </div>
        </template>
        <div class="collapse-panel">
          <div class="panel-container">
            <!-- 搜索栏 -->
            <el-row :gutter="10">
              <el-col :span="6">
                时间：
                <el-date-picker
                  v-model="searchQuery.dataRange"
                  size="mini"
                  type="datetimerange"
                  range-separator="-"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  style="width: calc(100% - 50px)"
                >
                </el-date-picker>
              </el-col>
              <el-col :span="4" style="display: flex">
                任务名称：
                <el-input style="width: calc(100% - 100px)" size="mini" v-model="searchQuery.jobName" clearable></el-input>
              </el-col>
              <el-col :span="4">
                任务类型：
                <el-select style="width: calc(100% - 100px)" size="mini" v-model="searchQuery.jobType" clearable>
                  <el-option v-for="(item, index) in jobTypeOptions" :key="index" :label="item.label"
                             :value="item.value"></el-option>
                </el-select>
              </el-col>
              <el-col :span="3">
                <el-select size="mini" clearable v-model="searchQuery.result" placeholder="状态">
                  <el-option label="备份成功" value="success"></el-option>
                  <el-option label="备份失败" value="failure"></el-option>
                </el-select>
              </el-col>
              <el-col :span="3" class="search-buttons">
                <el-button size="mini" type="primary" icon="el-icon-search" @click="getBackupHistory">搜索</el-button>
                <el-button size="mini" icon="el-icon-refresh" @click="resetBackupQuery">重置</el-button>
              </el-col>
            </el-row>
          </div>

          <div class="panel-table-wrapper">
            <el-table :data="backupHistory" size="small" v-loading="historyLoading">
              <el-table-column prop="id" label="ID" :show-overflow-tooltip="true"></el-table-column>
              <el-table-column prop="jobName" label="任务名"></el-table-column>
              <el-table-column prop="jobType" label="任务类型">
                <template slot-scope="{ row }">
                  {{ JOB_TYPE[row.jobType] }}
                </template>
              </el-table-column>
              <el-table-column prop="state" label="状态">
                <template slot-scope="{ row }">
                  {{ JOB_STATE[row.state] }}
                </template>
              </el-table-column>
              <el-table-column prop="creationTime" label="开始时间"></el-table-column>
              <el-table-column prop="endTime" label="结束时间"></el-table-column>
              <el-table-column prop="result" label="备份状态">
                <template slot-scope="scope">
                  <el-tag v-if="scope.row.result === 0" type="success">成功</el-tag>
                  <el-tag v-else-if="scope.row.result === 1" type="warning">告警</el-tag>
                  <el-tag v-else-if="scope.row.result === 2" type="danger">失败</el-tag>
                </template>
              </el-table-column>
              <el-table-column label="操作">
                <template slot-scope="{ row }">
                  <i class="header-icon el-icon-document session-detail" @click="showSessionDetail(row.id)" />
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>
import { applyStrategy, applyBackup } from '@/api/application/apply'
import { getBackup } from '@/api/service/backup'
import { listSession, getSessionDetail } from '@/api/veeam/session'
import { getJobDetail } from '@/api/veeam/job'
import { JOB_TYPE } from "../../common/config";
import Session from "@/views/application/modules/job/session";

const BACKUP_EXEC_RIGHT_NOW = 1
const BACKUP_EXEC_AT_TIME = 2
const BACKUP_RIGHT_NOW = 4
const BACKUP_AT_TIME = 5
const ENABLE_STRATEGY = 7
const DISABLE_STRATEGY = 8
const DELETE_STRATEGY = 9

const JOB_STATE = {
  [-1]: '已停止',
  [3]: '启动中',
  [4]: '停止中',
  [5]: '执行中',
  [6]: '暂停',
  [7]: '恢复中',
  [8]: '等待磁带',
  [9]: '空闲',
  [10]: '后处理',
  [11]: '等待仓库',
  [12]: '等待插槽',
  [13]: '脏块',
  [14]: '需要动作'
}

const JOB_RESULT = {
  [-1]: '无',
  [0]: '成功',
  [1]: '告警',
  [2]: '失败'
}

export default {
  name: "more",
  components: {Session},
  data() {
    return {
      JOB_TYPE,
      JOB_STATE,
      JOB_RESULT,
      BACKUP_AT_TIME,
      BACKUP_RIGHT_NOW,
      basicInfo: {},
      backupStrategy: {
        jobName: undefined,
        backupServer: undefined,
        vCenter: undefined,
        vmObjects: undefined,
        repository: undefined,
        scheduleTime: undefined,
        scheduleDateType: undefined,
        isScheduleEnabled: undefined
      },
      backupHistory: [
        // {
        //   "creationTime": "2025-04-03 14:56:16",
        //   "endTime": "2025-04-03 14:57:25",
        //   "id": "56620a04-10c9-4e5f-80fa-a26fc3172d71",
        //   "jobId": "51a4756c-8eda-44f5-ad52-cc738ccc77d0",
        //   "jobType": 3,
        //   "state": -1,
        //   "result": 2,
        //   "progress": 100,
        //   "runManually": true,
        //   "jobName": "surebackupJob",
        //   "description": "",
        //   "operation": "",
        //   "reason": ""
        // }
      ],
      searchQuery: { dataRange: [], jobType: undefined, jobName: undefined, result: undefined },
      backupDialogVisible: false,
      strategyDialogVisible: false,
      strategyDialogTitle: '禁用备份策略',
      strategyOperation: 1,
      backupExecType: BACKUP_RIGHT_NOW,
      backupExecTime: undefined,
      backupExecReason: undefined,
      backupStrategyReason: undefined,
      dateOptions: {
        disabledDate(time) {
          return time.getTime() < new Date().getTime();
        }
      },
      sessionDetailVisible: false,
      sessionDetailSessionId: undefined,
      historyLoading: false,
      jobDetailLoading: false
    };
  },
  mounted() {
    const backupId = this.$route.query.id
    getBackup(backupId).then(resp => {
      this.basicInfo = resp.data
    })
  },
  computed: {
    jobName: function () {
      return this.basicInfo.appName
    },
    server: function () {
      return this.basicInfo.backupServer
    },
    jobTypeOptions: function () {
      const jobTypeList = []
      for(const k in JOB_TYPE) {
        const jobType = { label: JOB_TYPE[k], value: k }
        jobTypeList.push(jobType)
      }
      return jobTypeList
    }
  },
  watch: {
    jobName: function (val) {
      if (val !== undefined) {
        this.getJobDetail()
        this.getBackupHistory()
      }
    }
  },
  methods: {
    showBackupOnceDialog(flag) {
      this.backupDialogVisible = flag
    },
    showStrategyDialog(flag, type) {
      this.strategyOperation = type
      this.strategyDialogVisible = flag
      // 禁用备份策略
      if (this.strategyOperation === 1) {
        if (this.backupStrategy.isScheduleEnabled) {
          this.strategyDialogTitle = '禁用备份策略'
        } else {
          this.strategyDialogTitle = '启用备份策略'
        }
      } else {
        // 删除备份策略
        this.strategyDialogTitle = '删除备份策略'
      }
    },
    backupOnceSubmit() {
      const data = {
        backupId: this.basicInfo.id,
        jobKey: this.jobName,
        appType: this.backupExecType,
        backupServer: this.basicInfo.backupServer,
        backupSoftware: this.basicInfo.backupSoftware,
        remark: this.backupExecReason
      }
      if (this.backupExecType === BACKUP_AT_TIME) {
        data['backupTime'] = this.backupExecTime
      }
      applyBackup(data).then(() => {
        this.$message.success('提交成功!')
        this.showBackupOnceDialog(false)
      })
    },
    strategySubmit() {
      const data = {
        backupId: this.basicInfo.id,
        jobKey: this.jobName,
        remark: this.backupStrategyReason,
        backupServer: this.basicInfo.backupServer,
        backupSoftware: this.basicInfo.backupSoftware
      }
      // 禁用备份策略
      if (this.strategyOperation === 1) {
        if (this.backupStrategy.isScheduleEnabled) {
          // this.strategyDialogTitle = '禁用备份策略'
          data.type = 2
          data.appType = DISABLE_STRATEGY
        } else {
          // this.strategyDialogTitle = '启用备份策略'
          data.type = 1
          data.appType = ENABLE_STRATEGY
        }
      } else {
        // 删除备份策略
        // this.strategyDialogTitle = '删除备份策略'
        data.type = 3
        data.appType = DELETE_STRATEGY
      }
      applyStrategy(data).then(resp => {
        this.$message.success('提交成功!')
        this.showStrategyDialog(false)
      })
    },
    getBackupHistory() {
      this.historyLoading = true
      listSession(this.jobName, 1, 10, this.basicInfo.backupServer).then(resp => {
        this.backupHistory = resp.data
        this.historyLoading = false
      }).catch(e => this.historyLoading = false)
    },
    resetBackupQuery() {
      this.searchQuery = { dataRange: [], jobType: undefined, jobName: undefined, result: undefined }
    },
    onChangeDate (e) {
      console.log(e)
    },
    getSessionDetail(id) {
      getSessionDetail(id, this.basicInfo.backupServer).then(resp => {

      })
    },
    getJobDetail() {
      this.jobDetailLoading = true
      getJobDetail(this.jobName, this.basicInfo.backupServer).then(resp => {
        this.jobDetailLoading = false
        const jobInfo = resp.data
        jobInfo.repository = jobInfo['backupRepositoryName']
        const vmObjects = jobInfo['selectedVmObjects']
        if (vmObjects[0]) {
          const path = vmObjects[0].path
          jobInfo.Vcenter = path.split('\\')[0]
        }
        const schedule = jobInfo['schedule']
        if (schedule) {
          jobInfo.isScheduleEnabled = schedule.isScheduleEnabled
          const policy = schedule['policy']
          jobInfo.policy = policy
          const options = schedule['options' + policy]
          switch (policy) {
            case 'Daily':
              jobInfo.scheduleTime = options['startDateTimeLocal']
              jobInfo.scheduleDateType = options['dayNumberInMonth']
              jobInfo.scheduleDay = options['dayOfWeek']
              break
            case 'Monthly':
              const dayInMonth = options['dayInMonth']
              jobInfo.scheduleTime = options['time']
              jobInfo.scheduleDateType = dayInMonth['dayNumberInMonth'] + ',' + dayInMonth['dayOfWeek']
              jobInfo.scheduleDay = options['months']
              break
            case 'Periodically':
              break
            case 'Continuous':
              break
          }
        }
        this.backupStrategy = jobInfo
      }).catch(e => this.jobDetailLoading = false)
    },
    showSessionDetail(sessionId) {
      this.sessionDetailVisible = true
      this.$nextTick(() => {
        this.sessionDetailSessionId = sessionId
      })
    }
  }
};
</script>

<style scoped>
.backup-management {
  padding: 20px;
}
.box-card {
  margin-bottom: 20px;
}

.collapse-panel {
  padding: 10px;
  border-top: 1px solid #f1f1f1;
}

.session-detail {
  color: #1890ff;
  font-size: 16px
}

.session-detail:hover {
  cursor: pointer;
}

.el-dialog {
  border-top-right-radius: 10px;
  border-top-left-radius: 10px;
}
</style>
