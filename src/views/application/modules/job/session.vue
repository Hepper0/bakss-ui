<template>
  <div v-if="jobSession" style="padding: 10px 30px">
    <el-form>
      <el-row>
        <el-col :span="8">
          <el-form-item label="任务名称: ">
            {{ jobSession.name }}
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="状态: ">
            {{ JOB_STATE[jobSession.state] }}
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="结果: ">
            {{ JOB_RESULT[jobSession.result] }}
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="处理对象: ">
            {{ jobSession.processedObjects }}
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="开始时间: ">
            {{ jobSession.creationTime }}
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="结束时间: ">
            {{ jobSession.endTime }}
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="耗时: ">
            {{ jobSession.duration }}
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="处理速度: ">
            {{ prettyDataSize(jobSession.progress.avgSpeed) }}
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="处理数据: ">
            {{ jobSession.processedData }}
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="读取数据: ">
            {{ prettyDataSize(jobSession.progress.readSize) }}
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="传输数据: ">
            {{ prettyDataSize(jobSession.progress.transferedSize) }}
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="失败数量: ">
            {{ jobSession.info.failures }}
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="告警数量: ">
            {{ jobSession.info.warnings }}
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <div style="display: flex">
            <el-form-item label="处理进度: " style="width: 50%">
            <el-progress  type="circle" :percentage="jobSession.progress.percents"></el-progress>
            </el-form-item>
            <el-button v-show="!jobSession.info.isCompleted" icon="el-icon-refresh" style="height: 32px" @click="refresh"/>
          </div>
        </el-col>
<!--        <el-col :span="8">-->
<!--          <el-form-item label="重复比: ">-->
<!--            {{ jobInfo.jobName }}-->
<!--          </el-form-item>-->
<!--        </el-col>-->
      </el-row>
    </el-form>
    <el-row :gutter="5">
      <el-col :span="6">
        <el-table size="mini" :data="taskTableData" @row-click="onTaskClick">
          <el-table-column prop="name" label="名称"></el-table-column>
          <el-table-column prop="statusString" label="状态"></el-table-column>
        </el-table>
      </el-col>
      <el-col :span="18">
        <el-table size="mini" :data="logTableData" stripe>
          <el-table-column prop="title" label="消息"></el-table-column>
          <el-table-column prop="jobType" label="耗时" width="100">
            <template slot-scope="{ row }">
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { getSessionDetail } from "@/api/veeam/session";
import {prettyDate} from "@/utils";
const jobSession = {
  "backupStats": {
    "backupSize": 1609728,
    "compressRatio": 0,
    "dataSize": 0,
    "dedupRatio": 0
  },
  "creationTime": "2025-04-03 00:52:21",
  "description": "",
  "endTime": "2025-04-03 00:53:03",
  "id": "70a31007-16b2-4f9e-a16e-946ac34ac315",
  "info": {
    "failures": 0,
    "isCompleted": true,
    "isPostprocessing": false,
    "isStarting": false,
    "isWorking": false,
    "warnings": 0
  },
  "jobName": "vmJob1",
  "jobType": 0,
  "logs": [
    {
      "startTime": "2025-04-03 00:52:24",
      "status": 0,
      "statusString": "ESucceeded",
      "title": "Job started at 2025/4/3 0:52:21",
      "updateTime": "2025-04-03 00:52:24"
    },
    {
      "startTime": "2025-04-03 00:52:25",
      "status": 0,
      "statusString": "ESucceeded",
      "title": "Building list of machines to process",
      "updateTime": "2025-04-03 00:52:26"
    },
    {
      "startTime": "2025-04-03 00:52:28",
      "status": 0,
      "statusString": "ESucceeded",
      "title": "VM size: 60 GB (2.7 GB used)",
      "updateTime": "2025-04-03 00:52:28"
    },
    {
      "startTime": "2025-04-03 00:52:28",
      "status": 0,
      "statusString": "ESucceeded",
      "title": "Changed block tracking is enabled",
      "updateTime": "2025-04-03 00:52:28"
    },
    {
      "startTime": "2025-04-03 00:52:29",
      "status": 0,
      "statusString": "ESucceeded",
      "title": "Processing slrum02",
      "updateTime": "2025-04-03 00:53:03"
    },
    {
      "startTime": "2025-04-03 00:53:03",
      "status": 2,
      "statusString": "EFailed",
      "title": "Job finished with error at 2025/4/3 0:53:03",
      "updateTime": "2025-04-03 00:53:03"
    }
  ],
  "name": "vmJob1 (Full)",
  "progress": {
    "avgSpeed": 0,
    "duration": "00:00:42",
    "percentCalculation": "BySize",
    "percents": 100,
    "processedObjects": 1,
    "processedSize": 111111110,
    "processedUsedSize": 0,
    "readSize": 0,
    "readedAverageSize": 0,
    "startTimeLocal": "2025-04-03 00:52:21",
    "stopTimeLocal": "2025-04-03 00:53:03",
    "totalObjects": 1,
    "totalObjectsDelta": 0,
    "totalSize": 0,
    "totalUsedSize": 0,
    "transferedSize": 0,
    "usedSpaceRation": 0
  },
  "result": 2,
  "state": -1,
  "tasks": [
    {
      "id": "59841755-2c13-4ded-baf5-05e0ea1f060b",
      "logs": [
        {
          "startTime": "2025-04-03 00:52:29",
          "status": 0,
          "statusString": "ESucceeded",
          "title": "Queued for processing at 2025/4/3 0:52:29",
          "updateTime": "2025-04-03 00:52:29"
        },
        {
          "startTime": "2025-04-03 00:52:29",
          "status": 0,
          "statusString": "ESucceeded",
          "title": "Required backup infrastructure resources have been assigned",
          "updateTime": "2025-04-03 00:52:29"
        },
        {
          "startTime": "2025-04-03 00:52:34",
          "status": 2,
          "statusString": "EFailed",
          "title": "Processing slrum02 Error: Cannot find Linux guest credentials",
          "updateTime": "2025-04-03 00:52:55"
        },
        {
          "startTime": "2025-04-03 00:52:35",
          "status": 0,
          "statusString": "ESucceeded",
          "title": "VM processing started at 2025/4/3 0:52:35",
          "updateTime": "2025-04-03 00:52:35"
        },
        {
          "startTime": "2025-04-03 00:52:35",
          "status": 0,
          "statusString": "ESucceeded",
          "title": "VM size: 60 GB (2.7 GB used)",
          "updateTime": "2025-04-03 00:52:35"
        },
        {
          "startTime": "2025-04-03 00:52:35",
          "status": 0,
          "statusString": "ESucceeded",
          "title": "Resetting CBT per job settings for active fulls",
          "updateTime": "2025-04-03 00:52:42"
        },
        {
          "startTime": "2025-04-03 00:52:42",
          "status": 0,
          "statusString": "ESucceeded",
          "title": "Getting VM info from vSphere",
          "updateTime": "2025-04-03 00:52:50"
        },
        {
          "startTime": "2025-04-03 00:52:49",
          "status": 1,
          "statusString": "EWarning",
          "title": "Changed block tracking cannot be enabled: one or more snapshots present",
          "updateTime": "2025-04-03 00:52:49"
        },
        {
          "startTime": "2025-04-03 00:52:50",
          "status": 1,
          "statusString": "EWarning",
          "title": "Guest processing skipped (check VMware Tools status)",
          "updateTime": "2025-04-03 00:52:50"
        },
        {
          "startTime": "2025-04-03 00:52:50",
          "status": 2,
          "statusString": "EFailed",
          "title": "Unable to connect to guest OS for guest processing. Cannot find Linux guest credentials",
          "updateTime": "2025-04-03 00:52:50"
        },
        {
          "startTime": "2025-04-03 00:52:55",
          "status": 2,
          "statusString": "EFailed",
          "title": "Error: Cannot find Linux guest credentials",
          "updateTime": "2025-04-03 00:52:55"
        },
        {
          "startTime": "2025-04-03 00:52:58",
          "status": 2,
          "statusString": "EFailed",
          "title": "Processing finished with errors at 2025/4/3 0:52:58",
          "updateTime": "2025-04-03 00:52:58"
        }
      ],
      "name": "slrum02",
      "progress": {
        "duration": "00:00:23",
        "percents": 100,
        "startTimeLocal": "2025-04-03 00:52:35",
        "stopTimeLocal": "2025-04-03 00:52:58"
      },
      "status": 2,
      "statusString": "Failed"
    }
  ]
}

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
  name: "session",
  data: function () {
    return {
      JOB_STATE,
      JOB_RESULT,
      jobSession: undefined, // this.parseSessionInfo(jobSession),
      selectedTask: undefined
    }
  },
  props: {
    sessionId: {
      type: String,
      default: undefined
    },
    server: {
      type: String,
      default: undefined
    },
    loaded: {
      type: Function,
      default: function () {
        return () => {}
      }
    }
  },
  watch: {
    sessionId: function (val) {
      this.jobSession = undefined
      this.refresh(val)
    }
  },
  computed: {
    taskTableData: function () {
      return this.jobSession && this.jobSession.tasks
    },
    logTableData: function () {
      if (this.selectedTask === undefined) {
        return this.jobSession && this.jobSession.tasks[0] && this.jobSession.tasks[0].logs || []
      } else {
        return this.selectedTask.logs
      }
    }
  },
  methods: {
    onTaskClick(e) {
      this.selectedTask = e
    },
    parseSessionInfo(jobSession) {
      const  progress = jobSession.progress
      jobSession.processedData = this.prettyDataSize(progress.processedSize) + '/' + this.prettyDataSize(progress.totalSize)
      jobSession.processedObjects = progress.processedObjects + '/' + progress.totalObjects
      if (jobSession.endTime && jobSession.creationTime) {
        jobSession.duration = prettyDate(((new Date(jobSession.endTime).getTime() - new Date(jobSession.creationTime).getTime())) / 1000)
      } else {
        jobSession.duration = '-'
      }

      return jobSession
    },
    prettyDataSize(dataSize) {
      const unitDefine = ['KB', 'MB', 'GB', 'TB']
      let unit = 'B'
      for (const u of unitDefine) {
        if (dataSize >= 1024) {
          dataSize = dataSize / 1024
          unit = u
        }
      }
      return parseInt(dataSize) + unit
    },
    refresh(sessionId) {
      const loading = this.$loading({
        lock: true
      })
      getSessionDetail(sessionId, this.server).then(resp => {
        loading.close()
        this.selectedTask = undefined
        this.jobSession = resp.data
        this.parseSessionInfo(this.jobSession)
        this.$emit('loaded', this.jobSession)
        this.loaded(this.jobSession)
      })
    }
  }
}
</script>

<style scoped>
.el-form-item{
  margin-bottom: 8px;
}

</style>
