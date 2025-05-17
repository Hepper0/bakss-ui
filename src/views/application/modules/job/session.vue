<template>
  <div>
    <el-form>
      <el-row>
        <el-col :span="8">
          <el-form-item label="任务名称: ">
            {{ jobInfo.name }}
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="状态: ">
            {{ jobInfo.result }}
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="处理对象: ">
            {{ jobInfo.processedObject }}
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="开始时间: ">
            {{ jobInfo.creationTime }}
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="结束时间: ">
            {{ jobInfo.endTime }}
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="耗时: ">
            {{ jobInfo.duration }}
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="处理速度: ">
            {{ jobInfo.progress.avgSpeed }}
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="处理数据: ">
            {{ jobInfo.processedData }}
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="读取数据: ">
            {{ jobInfo.progress.readSize }}
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="传输数据: ">
            {{ jobInfo.progress.transferedSize }}
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="失败数量: ">
            {{ jobInfo.info.failures }}
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="告警数量: ">
            {{ jobInfo.info.warnings }}
          </el-form-item>
        </el-col>
<!--        <el-col :span="8">-->
<!--          <el-form-item label="压缩比: ">-->
<!--            {{ jobInfo.jobName }}-->
<!--          </el-form-item>-->
<!--        </el-col>-->
<!--        <el-col :span="8">-->
<!--          <el-form-item label="重复比: ">-->
<!--            {{ jobInfo.jobName }}-->
<!--          </el-form-item>-->
<!--        </el-col>-->
      </el-row>
    </el-form>
    <el-row>
      <el-col :span="6">
        <el-table size="mini" :data="taskTableData" @row-click="onTaskClick">
          <el-table-column prop="name" label="名称"></el-table-column>
          <el-table-column prop="statusString" label="状态"></el-table-column>
        </el-table>
      </el-col>
      <el-col :span="18">
        <el-table size="mini" :data="logTableData">
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
export default {
  name: "session",
  data: function () {
    return {
      jobInfo: {
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
          "processedSize": 0,
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
      },
      selectedTask: undefined
    }
  },
  computed: {
    taskTableData: function f() {
      return this.jobInfo.tasks
    },
    logTableData: function () {
      if (this.selectedTask === undefined) {
        return this.jobInfo.tasks[0] && this.jobInfo.tasks[0].logs || []
      } else {
        return this.selectedTask.logs
      }

    }
  },
  methods: {
    onTaskClick(e) {
      this.selectedTask = e
    }
  }
}
</script>

<style scoped>

</style>
