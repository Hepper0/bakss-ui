<template>
  <div>
    <div class="panel-container">
      <!-- 搜索栏 -->
      <el-row :gutter="10">
        <el-col :span="10">
          <el-select style="width: 30%;margin-right: 15px" size="mini" clearable v-model="conditionType" placeholder="请选择">
            <el-option label="ID" value="ID"></el-option>
            <el-option label="NetWorker" value="NetWorker"></el-option>
          </el-select>
          <el-input style="width: 60%" size="mini" v-model="conditionValue" placeholder="请输入" clearable></el-input>
        </el-col>
        <el-col :span="12" class="search-buttons">
          <el-button size="mini" type="primary" icon="el-icon-search" @click="getTaskList">搜索</el-button>
          <el-button size="mini" icon="el-icon-refresh" @click="reset">重置</el-button>
        </el-col>
      </el-row>
    </div>

    <div class="panel-container">
      <!-- 备份管理表格 -->
      <div class="panel-table-wrapper" style="background-color: #f1f1f1">
        <el-table :data="tableData" stripe>
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column prop="id" label="ID" :show-overflow-tooltip="true"></el-table-column>
          <el-table-column prop="backupSoftware" label="备份软件"></el-table-column>
          <el-table-column prop="appType" label="申请类型">
            <template v-slot="{ row }">
              <span>{{ APPLY_TYPE[row.appType] }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="appUser" label="申请人"></el-table-column>
          <el-table-column prop="reviewUser" label="审批人"></el-table-column>
          <el-table-column prop="flowStep" :label="taskType === 'done' ? '任务名称' : '当前任务'">
            <template v-slot="{ row }">
              {{ TASK_STATUS_DICT[row.flowStep] }}
            </template>
          </el-table-column>
          <el-table-column prop="createTime" :label="taskType === 'done' ? '开始时间' : '创建时间'"></el-table-column>
          <el-table-column prop="reviewTime" v-if="taskType === 'done'" label="结束时间"></el-table-column>
          <el-table-column label="操作" width="120">
            <template v-slot="{ row }">
              <el-button icon="el-icon-document" size="mini" type="text" @click="gotoDetail(row)"></el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!-- 分页 -->
      <pagination
        v-show="total>0"
        :total="total"
        :page.sync="pageNum"
        :limit.sync="pageSize"
        @pagination="getTaskList"
      />
    </div>
  </div>
</template>

<script>
import { APPLY_TYPE, TASK_STATUS_DICT, getComponentType } from '@/views/common/config'
import { getDoneTaskList, getTodoTaskList } from "@/api/task"

// 代办状态 0 指派人/owner  1 dba/管理员 2 管理员
const WAIT_STATUS = [['指派人审批', '客户端owner审批'], ['dba审批', '备份管理员审批'], '备份管理员审批']
// 已完成状态 1 指派人/owner  2 dba 3 管理员
const DONE_STATUS = ['', ['指派人审批', '客户端owner审批'], 'dba审批', '备份管理员审批']

export default {
  name: "TaskList",
  data: function () {
    return {
      APPLY_TYPE,
      TASK_STATUS_DICT,
      conditionType: undefined,
      conditionValue: undefined,
      pageNum: 0,
      pageSize: 10,
      total: 0,
      taskList: [],
      // tableData: [
      //   { backupFile: 'NetBackup', softwareVersion: '9.1.0.1', clientName: 'swtx9ltz7mq', backupContent: 'SQL Server', backupIP: '10.122.145.38', appName: '--', platform: 'Linux', owner: 'wangk7@lenovo.com' },
      // ]
    }
  },
  computed: {
    queryParams: function () {
      return {
        [this.conditionType]: this.conditionValue,
        pageNum: this.pageNum,
        pageSize: this.pageSize
      }
    },
    tableData: function () {
      return this.taskList.slice((this.pageNum - 1) * this.pageSize, this.pageNum *this.pageSize)
    }
  },
  props: {
    taskType: {
      type: String,
      default: 'todo'
    }
  },
  mounted() {
    this.getTaskList()
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
      this.$router.push({ path: '/task/detail', query: { id: row.id, taskType: getComponentType(row.appType) } })
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
    },
    getTaskList(a,b,c,d) {
      if (this.taskType === 'todo') {
        getTodoTaskList(this.queryParams).then(resp => {
          this.taskList = resp.rows
          this.total = resp.total
        })
      } else {
        getDoneTaskList(this.queryParams).then(resp => {
          this.taskList = resp.rows
          this.total = resp.total
        })
      }
    },
    getPageData({page, limit}) {

    },
    reset() {
      this.conditionValue = undefined
      this.conditionType = undefined
    }
  }
}
</script>

<style scoped>

</style>
