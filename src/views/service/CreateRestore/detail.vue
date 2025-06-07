<template>
  <div class="container">
    <el-card class="card-panel">
      <div slot="header" class="clearfix">
        <span>基本信息</span>
      </div>
      <div class="card-panel-content">
        <el-row>
          <el-form ref="basicForm" :model="formData" :rules="rules" size="medium" label-width="120px">
            <el-col :span="8">
              <el-form-item label="备份类型" prop="jobType">
                <el-select v-model="formData.jobType" :style="{width: '80%'}" @change="onContentChange">
                  <el-option v-for="(item, index) in jobTypeOptions" :key="index" :label="item.label" :value="item.value" />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="备份任务" prop="jobName">
                <el-select v-model="formData.jobName" :style="{width: '80%'}" @change="onJobChange">
                  <el-option v-for="(item, index) in backupJobOptions" :key="index" :label="item.label" :value="item.value" />
                </el-select>
              </el-form-item>
            </el-col>
          </el-form>
        </el-row>
      </div>
    </el-card>
    <el-card class="card-panel">
      <div slot="header" class="clearfix">
        <span>备份信息</span>
      </div>
      <div class="card-panel-content">
        <el-row>
          <el-form ref="basicForm" :model="formData" :rules="rules" size="medium" label-width="120px">
            <el-col :span="8">
              <el-form-item label="虚机" prop="vmName">
                <el-select v-model="formData.vmName" :style="{width: '80%'}">
                  <el-option v-for="(item, index) in vmOptions" :key="index" :label="item.label" :value="item.value" />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="备份" prop="backupId">
                <el-select v-model="formData.backupId" :style="{width: '80%'}" @change="onBackupChange">
                  <el-option v-for="(item, index) in backupOptions" :key="index" :label="item.label" :value="item.value" />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="还原点" prop="pointId">
                <el-select v-model="formData.pointId" :style="{width: '80%'}" @change="onPointChange">
                  <el-option v-for="(item, index) in pointOptions" :key="index" :label="item.label" :value="item.value" />
                </el-select>
              </el-form-item>
            </el-col>
          </el-form>
        </el-row>
        <el-row>
          <el-form ref="basicForm" :model="formData" :rules="rules" size="medium" label-width="120px">
            <el-col :span="8">
              <el-form-item label="还原模式" prop="restoreMode">
                <el-select v-show="false" v-model="formData.restoreMode" :style="{width: '80%'}">
                  <el-option label="还原到原位置" :value="1" />
                  <el-option label="还原到新的位置" :value="2" />
                </el-select>
                <el-radio-group size="small" v-model="formData.restoreMode">
                  <el-radio-button :label="1" name="original">还原到原位置</el-radio-button>
                  <el-radio-button :label="2" name="new">还原到新的位置</el-radio-button>
                </el-radio-group>
              </el-form-item>
            </el-col>
          </el-form>
        </el-row>
        <el-row v-show="formData.restoreMode === 2">
          <el-form ref="basicForm" :model="formData" :rules="rules" size="medium" label-width="120px">
            <el-col :span="8">
              <el-form-item label="主机" prop="host" @change="fetchOptions">
                <el-select v-model="formData.host" :style="{width: '80%'}">
                  <el-option v-for="(item, index) in hostOptions" :key="index" :label="item.label" :value="item.value" />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="目录" prop="vmFolder">
                <el-select :style="{width: '80%'}" v-model="formData.vmFolder">
                  <el-option v-for="(item, index) in folderOptions" :key="index" :label="item.label" :value="item.value" />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="资源池" prop="resourcePool">
                <el-select :style="{width: '80%'}" v-model="formData.resourcePool">
                  <el-option v-for="(item, index) in resourcePoolOptions" :key="index" :label="item.label" :value="item.value" />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item prop="redirectWriteCache">
                <el-checkbox v-model="formData.redirectWriteCache">重定向写缓存</el-checkbox>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="数据存储" prop="datastoreName">
                <el-select :disabled="!formData.redirectWriteCache" :style="{width: '80%'}" v-model="formData.datastoreName">
                  <el-option v-for="(item, index) in datastoreOptions" :key="index" :label="item.label" :value="item.value" />
                </el-select>
              </el-form-item>
            </el-col>
          </el-form>
        </el-row>
        <el-row>
          <el-form ref="basicForm" :model="formData" :rules="rules" size="medium" label-width="120px">
            <el-form-item>
              <el-checkbox v-model="formData.powerUp">是否开机</el-checkbox>
              <el-checkbox v-model="formData.nicsEnabled">是否联网</el-checkbox>
            </el-form-item>
          </el-form>
        </el-row>
      </div>
    </el-card>
    <el-card class="card-panel">
      <div slot="header" class="clearfix">
        <span>其他信息</span>
      </div>
      <div class="card-panel-content">
        <el-form ref="basicForm" :model="formData" :rules="rules" size="medium" label-width="120px">
          <el-col :span="24">
            <el-form-item label="申请理由" prop="reason">
              <el-input :style="{width: '80%'}" :rows="5" type="textarea" v-model="formData.reason"></el-input>
            </el-form-item>
          </el-col>
        </el-form>
      </div>
    </el-card>
    <el-row style="display: flex; justify-content: right">
      <el-button @click="resetForm" size="small" type="primary">重置</el-button>
      <el-button @click="submit" size="small" type="success">提交</el-button>
    </el-row>
  </div>
</template>

<script>
import {getBackupPoint, listBackup} from '@/api/veeam/backup'
import {myBackup as listJob} from '@/api/service/backup'
import {getHostDatastore, getHostFolder, getHostResourcePool} from '@/api/veeam/host'
import {applyCreateRestore} from '@/api/application/apply'

export default {
  name: "detail",
  data: function () {
    return {
      formData: {
        backupId: undefined,
        pointId: undefined,
        restoreMode: 1,
        restoreVmTags: false,
        vmName: undefined,
        host: undefined,
        vmFolder: undefined,
        resourcePool: undefined,
        datastoreName: undefined,
        redirectWriteCache: false,
        enableAntivirusScan: false,
        virusDetectionAction: undefined,
        enableEntireVolumeScan: false,
        reason: undefined,
        nicsEnabled: true,
        powerUp: true,
      },
      jobList: [],
      backupList: [{dirPath: 'backup1111', id: 'backup1111'}],
      pointList: [{creationTime: 'point1111', id: 'point1111'}],
      selectedPoint: undefined,
      selectedJob: undefined,
      hostOptions: [{label: 'host1111', value: 'host1111'}],
      resourcePoolOptions: [{label: 'resource11', value: 'resource11'}],
      datastoreOptions: [{label: 'datastore11', value: 'datastore11'}],
      vmOptions: [{label: 'vm11', value: 'vm11'}],
      folderOptions: [{label: 'folder11', value: 'folder11'}]
    }
  },
  computed: {
    jobTypeOptions: function () {
      return this.getConfig('jobType')
    },
    backupJobOptions: function() {
      return this.jobList.map(j => {
        return { label: j.appName, value: j.appName }
      })
    },
    backupOptions: function () {
      return this.backupList.map(b => {
        return { label: b.dirPath, value: b.id }
      })
    },
    pointOptions: function () {
      return this.pointList.map(p => {
        return { label: p.creationTime, value: p.id }
      })
    },
    appType: function () {
      const t = this.getConfig('applicationType').find(c => c.label === '创建恢复')
      return t && t.value
    }
  },
  mounted () {
  },
  methods: {
    onContentChange(e) {
      this.getJobList(e)
    },
    onJobChange(e) {
      const j = this.jobList.find(j => j.appName === e)
      if (j) {
        this.selectedJob = j
        this.getBackupList(j.appName)
        this.getJobDetail(j.appName, j.backupServer).then(resp => {
          this.selectedJob = Object.assign(this.selectedJob, resp.data)
          this.vmOptions = resp.data.selectedVmObjects.map(v => {
            return { label: v.name, value: v.name }
          })
          if (this.vmOptions[0]) {
            this.formData.vmName = this.vmOptions[0].value
            this.formData.host = this.vmOptions[0].path.split('\\')[0]
          }
        })
      }
    },
    onBackupChange(e) {
      getBackupPoint(e, this.formData.vmName, this.selectedJob.backupServer).then(resp => {
        this.pointList = resp.data
      })
    },
    onPointChange(e) {
      this.selectedPoint = this.pointList.find(p => p.id === e)
    },
    getConfig(type) {
      return this.$store.getters[type] && this.$store.getters[type].map(r => {
        return { label: r.dictLabel, value: r.dictValue }
      })
    },
    getBackupList(jobName) {
      listBackup(jobName, 1, 0, this.selectedJob.backupServer).then(resp => {
        this.backupList = resp.data
      })
    },
    getJobList(jobType) {
      listJob({jobType}).then(resp => {
        this.jobList = resp.rows
      })
    },
    submit() {
      const data = {
        restoreType: 1,
        backupId: this.selectedJob.id,
        jobKey: this.selectedJob.appName,
        appType: this.appType,
        backupServer: this.selectedJob.backupServer,
        backupSoftware: this.selectedJob.backupSoftware,
        jobType: this.selectedJob.jobType,
        remark: this.formData.reason
      }
      Object.assign(data, this.formData)
      applyCreateRestore(data).then(() => {
        this.$message.success('提交成功!')
        this.$router.push({ path: '/application' })
      })
    },
    fetchOptions() {
      getHostDatastore(this.formData.host, this.selectedJob.backupServer).then(resp => {
        this.hostOptions = resp.data.map(r => {
          return { label: r.name, value: r.name }
        })
      })
      getHostResourcePool(this.formData.host, this.selectedJob.backupServer).then(resp => {
        this.resourcePoolOptions = resp.data.map(r => {
          return { label: r.name, value: r.name }
        })
      })
      getHostFolder(this.formData.host, this.selectedJob.backupServer).then(resp => {
        this.folderOptions = resp.data.map(r => {
          return { label: r.name, value: r.name }
        })
      })
    }
  }
}
</script>

<style scoped>
.card-panel {
  margin-bottom: 10px;
}

.card-panel-content {
  padding: 0 40px;
}
</style>
