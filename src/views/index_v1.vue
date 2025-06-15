<template>
  <div class="dashboard-editor-container">
    <panel-group
      :applyCount="applyCount"
      :pendingCount="pendingCount"
      :clientCount="clientCount"
      :taskCount="taskCount"
    />

    <el-row :gutter="10">
      <!-- 最近申请 -->
      <el-col :span="12">
        <div class="panel-container" >
          <div style="margin-bottom: 15px">
            <i class="el-icon-message panel-icon" />
            <b style="font-size: 15px">最近申请</b>
          </div>
          <div>
            <div class="panel-table-wrapper">
              <el-table size="small" :data="recentApplications">
                <el-table-column prop="serviceType" label="服务类型">
                  <template  v-slot="{ row }">
                    {{ APPLY_TYPE[row.appType] }}
                  </template>
                </el-table-column>
                <el-table-column prop="reviewStatus" label="审核状态">
                  <template  v-slot="{ row }">
                    {{ REVIEW_STATUS_DICT[row.appType] }}
                  </template>
                </el-table-column>
                <el-table-column prop="exeStatus" label="执行状态"></el-table-column>
                <el-table-column prop="appTime" label="申请时间"></el-table-column>
              </el-table>
            </div>
            <div style="height: 60px; padding: 20px 10px">
              <div style="float: right" @click="goto('application')">
                <b class="font-body" style="color: #558bea; font-size: 15px">
                  >>更多
                </b>
              </div>
            </div>
          </div>
        </div>
      </el-col>

      <!-- 待审批列表 -->
      <el-col :span="12">
        <div class="panel-container" >
          <div style="margin-bottom: 15px">
            <i class="el-icon-document panel-icon" />
            <b style="font-size: 15px">待审批列表</b>
          </div>
          <div>
            <div class="panel-table-wrapper">
              <el-table size="small" :data="recentTask">
                <el-table-column prop="appUser" label="申请人"></el-table-column>
                <el-table-column prop="appType" label="服务类型">
                  <template  v-slot="{ row }">
                    {{ APPLY_TYPE[row.appType] }}
                  </template>
                </el-table-column>
                <el-table-column prop="taskName" label="任务名称">
                  <template  v-slot="{ row }">
                    {{ TASK_STATUS_DICT[row.flowStep] }}
                  </template>
                </el-table-column>
                <el-table-column prop="appTime" label="申请时间"></el-table-column>
              </el-table>
            </div>
            <div style="height: 60px; padding: 20px 10px">
              <div style="float: right" @click="goto('task')">
                <b class="font-body" style="color: #558bea; font-size: 15px">
                  >>更多
                </b>
              </div>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import PanelGroup from './dashboard/PanelGroup'
import { listApplication } from "@/api/application/application"
import { getAllTaskList, getTodoTaskList } from "@/api/task"
import { myBackup } from "@/api/service/backup"
import { TASK_STATUS_DICT, REVIEW_STATUS_DICT } from "./common/config"

const recordLimit = 10


export default {
  name: 'Index',
  components: {
    PanelGroup
  },
  data() {
    return {
      TASK_STATUS_DICT,
      REVIEW_STATUS_DICT,
      recentApplications: [],
      recentTask: [],
      applyCount: 0,
      pendingCount: 0,
      clientCount: 0,
      taskCount: 0
    }
  },
  computed: {
    APPLY_TYPE: function () {
      return this.$store.getters['applicationType'] && this.$store.getters['applicationType'].map(r => r.dictLabel)
    }
  },
  mounted() {
    this.getApplicationList()
    this.getTaskList()
    this.getTodoTaskList()
    this.getClientList()
  },
  methods: {
    handleSetLineChartData(type) {
      // this.lineChartData = lineChartData[type]
    },
    goto(fn) {
      this.$router.push({ path: '/' + fn })
    },
    getApplicationList() {
      listApplication({ pageSize: recordLimit, pageNum: 1}).then(resp => {
        this.applyCount = resp.total
        this.recentApplications = resp.rows
      })
    },
    getTaskList() {
      getAllTaskList().then(resp => {
        this.taskCount = resp.total
      })
    },
    getTodoTaskList() {
      getTodoTaskList().then(resp => {
        this.pendingCount = resp.total
        this.recentTask = resp.rows.slice(0, recordLimit)
      })
    },
    getClientList() {
      myBackup().then(resp => {
        this.clientCount = resp.total
      })
    }

  }
}
</script>

<style lang="scss" scoped>
.dashboard-editor-container {
  padding: 10px;
  background-color: rgb(240, 242, 245);
  position: relative;

  .chart-wrapper {
    background: #fff;
    padding: 16px 16px 0;
    margin-bottom: 32px;
  }
}

@media (max-width:1024px) {
  .chart-wrapper {
    padding: 8px;
  }
}

.font-body {
  font-family: "Microsoft YaHei", "微软雅黑", sans-serif;

}
.font-body:hover {
  cursor: pointer;
}

</style>
