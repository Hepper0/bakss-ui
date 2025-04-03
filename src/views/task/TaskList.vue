<template>
  <div>
    <div class="panel-container">
      <!-- 搜索栏 -->
      <el-row :gutter="10">
        <el-col :span="6">
          <el-select size="mini" clearable v-model="selectedFile" placeholder="请选择">
            <el-option label="ID" value="ID"></el-option>
            <el-option label="NetWorker" value="NetWorker"></el-option>
          </el-select>
        </el-col>
        <el-col :span="6">
          <el-input size="mini" v-model="searchQuery" placeholder="请输入" clearable></el-input>
        </el-col>
        <el-col :span="12" class="search-buttons">
          <el-button size="mini" type="primary" icon="el-icon-search">搜索</el-button>
          <el-button size="mini" icon="el-icon-refresh">重置</el-button>
        </el-col>
      </el-row>
    </div>

    <div class="panel-container">
      <!-- 备份管理表格 -->
      <div class="panel-table-wrapper" style="background-color: #f1f1f1">
        <el-table size="small" :data="tableData" stripe>
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column prop="id" label="ID"></el-table-column>
          <el-table-column prop="softwareVersion" label="备份软件"></el-table-column>
          <el-table-column prop="applyType" label="申请类型">
            <template v-slot="{ row }">
              <span>{{ APPLY_TYPE[row.applyType] }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="applyUser" label="申请人"></el-table-column>
          <el-table-column prop="reviewUser" label="审批人"></el-table-column>
          <el-table-column prop="reviewStatus" :label="taskType === 'done' ? '任务名称' : '当前任务'">
            <template v-slot="{ row }">
              <span v-if="taskType === 'done'">{{ getDoneBackupStatus(row) }}</span>
              <span v-else>{{ getWaitingBackupStatus(row) }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="createTime" :label="taskType === 'done' ? '开始时间' : '创建时间'"></el-table-column>
          <el-table-column prop="endTime" v-if="taskType === 'done'" label="结束时间"></el-table-column>
          <el-table-column label="操作" width="120">
            <template v-slot="{ row }">
              <el-button icon="el-icon-document" size="mini" type="text" @click="gotoDetail(row)"></el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!-- 分页 -->
      <el-pagination class="pagination" background layout="prev, pager, next" :total="30"></el-pagination>
    </div>
  </div>
</template>

<script>
import { APPLY_TYPE, getComponentType } from '@/views/common/config'

// 代办状态 0 指派人/owner  1 dba/管理员 2 管理员
const WAIT_STATUS = [['指派人审批', '客户端owner审批'], ['dba审批', '备份管理员审批'], '备份管理员审批']
// 已完成状态 1 指派人/owner  2 dba 3 管理员
const DONE_STATUS = ['', ['指派人审批', '客户端owner审批'], 'dba审批', '备份管理员审批']

export default {
  name: "TaskList",
  data: function () {
    return {
      APPLY_TYPE,
      selectedFile: '',
      searchQuery: '',
      tableData: [
        { backupFile: 'NetBackup', softwareVersion: '9.1.0.1', clientName: 'swtx9ltz7mq', backupContent: 'SQL Server', backupIP: '10.122.145.38', appName: '--', platform: 'Linux', owner: 'wangk7@lenovo.com' },
        { backupFile: 'NetBackup', softwareVersion: '9.1.0.1', clientName: 'swtkvb5quvc', backupContent: 'SQL Server', backupIP: '10.122.145.53', appName: '--', platform: 'Linux', owner: 'zhangxy90@lenovo.com' }
      ]
    }
  },
  props: {
    taskType: {
      type: String,
      default: 'todo'
    }
  },
  methods: {
    editRow(row) {
      this.$message.info(`编辑 ${row.clientName}`);
    },
    handleCommand(command) {
      if (command === 'delete') {
        this.$message.warning('删除操作未实现');
      } else if (command === 'view') {
        this.$message.info('查看详情未实现');
      }
    },
    gotoDetail(row) {
      this.$router.push({ path: '/task/detail', query: { id: row.id } })
    },
    getWaitingBackupStatus (row) {
      switch (row.reviewStatus) {
        case 0:
          return WAIT_STATUS[0]
        case 1:
          if (["MySQL", "SQLSERVER", "PostgreSQL", "Oracle"].includes(row.backupContent))  {
            return WAIT_STATUS[1][0]
          } else {
            return WAIT_STATUS[1][1]
          }
        case 2:
          return WAIT_STATUS[2]
      }
    },
    getDoneBackupStatus (row) {
      switch (row.reviewStatus) {
        case 1:
          if (1) return DONE_STATUS[1][0]
          else return DONE_STATUS[1][1]
        case 2:
          return DONE_STATUS[2]
        case 3:
          return DONE_STATUS[3]
      }
    }
  }
}
</script>

<style scoped>

</style>
