<template>
  <div class="backup-management">
    <el-dialog
      title="一次性备份"
      :visible="backupDialogVisible"
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
              <el-radio-button :label="BACKUP_AT_TIME" name="atTime">定时备份</el-radio-button>
            </el-radio-group>
          </el-col>
        </el-row>
        <br />
        <el-row :gutter="5">
          <el-col :span="4" style="text-align: right">
            备注：
          </el-col>
          <el-col :span="20">
            <el-input v-mode="backupExecReason" type="textarea" :rows="3"/>
          </el-col>
        </el-row>
        <br/>
        <span slot="footer" class="dialog-footer" style="display: flex; justify-content: right; border-top: 1px solid #f1f1f1; padding-top: 10px">
          <el-button @click="showBackupOnceDialog(false)" size="small">取 消</el-button>
          <el-button type="primary" @click.stop="backupOnceSubmit" size="small">确 定</el-button>
        </span>
      </div>
    </el-dialog>
    <el-dialog
      :title="strategyDialogTitle"
      :visible="strategyDialogVisible"
      show-close
    >
      <div style="padding: 0 40px">
        <el-row :gutter="5">
          <el-col :span="4" style="text-align: right; padding: 3px">
            <b style="color: red">* </b>备份策略：
          </el-col>
          <el-col :span="20">
            <el-input disabled size="mini" />
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
    <!-- 基本信息 -->
    <el-card class="box-card panel-container-raw">
      <div slot="header" class="clearfix">
        <span>基本信息</span>
      </div>
      <el-form label-width="100px">
        <el-row :gutter="20">
          <el-col :span="6">
            <el-form-item label="备份IP">
              <el-input v-model="basicInfo.backupIp" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="备份软件">
              <el-select v-model="basicInfo.backupSoftwaree" disabled style="width: 100%">
                <el-option label="NetBackup" value="NetBackup"></el-option>
                <el-option label="NetWorker" value="NetWorker"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="备份类型">
              <el-input v-model="basicInfo.backupType" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="客户端名称">
              <el-input v-model="basicInfo.client" disabled></el-input>
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
            <el-form-item label="备份应用">
              <el-input v-model="basicInfo.backupApp" disabled></el-input>
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
      <el-tabs value="first">
        <el-tab-pane label="数据库全备" name="first">
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
              <div class="collapse-panel">
                <el-collapse :value="1" class="panel-container-raw" style="padding: 2px; border-bottom: 0">
                  <el-collapse-item :name="1">
                    <template slot="title">
                      <div style="width: 100%">
                        <span style="font-size: 14px;">
                        <span style="font-family: 'Microsoft YaHei', sans-serif;">
                          {{ backupStrategy.name }}
                        </span>
                        </span>
                        <span style="float: right; margin-right: 15px">
                          <el-button @click.stop="showStrategyDialog(true, 1)" type="warning" size="mini">{{ backupStrategy.status ? '禁用' : '启用' }}备份</el-button>
                          <el-button @click.stop="showStrategyDialog(true, 2)" type="danger" size="mini">删除</el-button>
                        </span>
                      </div>
                    </template>
                    <div class="collapse-panel">
                      <div style="background-color: #f1f1f1; border-radius: 8px; padding: 15px">
                        <el-row style="padding: 0 10px">
                          <el-button size="mini" type="primary" style="float: right" @click="showBackupOnceDialog(true)">一次性备份</el-button>
                        </el-row>
                        <el-row style="margin-bottom: 15px">
                          <el-col :span="8">备份策略: {{ backupStrategy.name }}</el-col>
                          <el-col :span="8">数据保留时间: {{ backupStrategy.retention }}</el-col>
                          <el-col :span="8">调度名称: {{ backupStrategy.dispatch }}</el-col>
                        </el-row>
                        <el-row>
                          <el-col :span="8">备份目录: {{ backupStrategy.directory }}</el-col>
                          <el-col :span="8">备份频率: {{ backupStrategy.schedule }}</el-col>
                        </el-row>
                      </div>
                    </div>
                  </el-collapse-item>
                </el-collapse>
              </div>
            </el-collapse-item>
          </el-collapse>
        </el-tab-pane>
        <el-tab-pane label="数据库日志备份" name="second">数据库日志备份</el-tab-pane>
      </el-tabs>
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
                策略名：<el-input style="width: calc(100% - 100px)" size="mini" v-model="searchQuery.strategy" placeholder="请输入策略名称" clearable></el-input>
              </el-col>
              <el-col :span="4">
                客户端名称：<el-input style="width: calc(100% - 100px)" size="mini" v-model="searchQuery.clientName" placeholder="请输入客户端名称" clearable></el-input>
              </el-col>
              <el-col :span="3">
                <el-select size="mini" clearable v-model="searchQuery.status" placeholder="状态">
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
            <el-table :data="backupHistory" size="small">
              <el-table-column prop="name" label="策略名"></el-table-column>
              <el-table-column prop="client" label="客户端名称"></el-table-column>
              <el-table-column prop="startTime" label="开始时间"></el-table-column>
              <el-table-column prop="endTime" label="结束时间"></el-table-column>
              <el-table-column prop="size" label="原始大小"></el-table-column>
              <el-table-column prop="status" label="备份状态">
                <template slot-scope="scope">
                  <el-tag v-if="scope.row.status === '成功'" type="success">成功</el-tag>
                  <el-tag v-else type="danger">失败</el-tag>
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
import { applyStrategy, applyBackup } from '@/api/review/apply'
import { backupHistory } from '@/api/service/backup'

const BACKUP_EXEC_RIGHT_NOW = 1
const BACKUP_EXEC_AT_TIME = 2
export const BACKUP_RIGHT_NOW = 4
export const BACKUP_AT_TIME = 5
export const ENABLE_STRATEGY = 7
export const DISABLE_STRATEGY = 8
export const DELETE_STRATEGY = 9

export default {
  name: "more",
  data() {
    return {
      BACKUP_AT_TIME,
      BACKUP_RIGHT_NOW,
      basicInfo: {
        id: 1,
        backupIp: '10.122.145.38',
        masterIp: 'sltwfqm7huz',
        backupSoftware: 'NetBackup'
      },
      backupStrategy: {
        id: '123',
        name: '10.122.145.38_SQL_Alvayson_FULL',
        directory: 'WHOLE_DATABASE',
        retention: '1 month',
        schedule: 'Every week on Monday at 15:00',
        status: 1
      },
      backupHistory: [
        { name: '10.122.145.38_SQL_Alvayson_FULL', client: 'sltwfqm7huz', startTime: '2022-08-31 16:43:01', endTime: '2022-08-31 16:45:28', size: '2.08GB', status: '成功' },
        { name: '10.122.145.38_SQL_Alvayson_FULL', client: 'swt9zltzmq', startTime: '2022-08-31 16:44:11', endTime: '2022-08-31 16:44:46', size: '28.78MB', status: '成功' }
      ],
      searchQuery: { dataRange: [], strategy: undefined, clientName: undefined, status: undefined },
      backupDialogVisible: false,
      strategyDialogVisible: false,
      strategyDialogTitle: '禁用备份策略',
      strategyOperation: 1,
      backupExecType: BACKUP_RIGHT_NOW,
      backupExecReason: undefined,
      backupStrategyReason: undefined
    };
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
        if (this.backupStrategy.status === 1) {
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
        strategyId: this.backupStrategy.id,
        appType: this.backupExecType,
        remark: this.backupExecReason
      }
      applyBackup(data).then(() => {
        this.$message.success('提交成功!')
        this.showBackupOnceDialog(false)
      })
    },
    strategySubmit() {
      const data = {
        backupId: this.basicInfo.id,
        strategyId: this.backupStrategy.id,
        remark: this.backupStrategyReason
      }
      // 禁用备份策略
      if (this.strategyOperation === 1) {
        if (this.backupStrategy.status === 1) {
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
      backupHistory({ id: this.backupStrategy.id}).then(resp => {
        this.backupHistory = resp.rows
      })
    },
    resetBackupQuery() {
      this.searchQuery = { dataRange: [], strategy: undefined, clientName: undefined, status: undefined }
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
</style>
