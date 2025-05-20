<template>
  <div class="container">
    <el-card class="card-panel">
      <div slot="header" class="clearfix">
        <span>基本信息</span>
      </div>
      <div class="card-panel-content">
        <el-form ref="basicForm" :model="basicFormData" :rules="rules" size="medium" label-width="120px">
          <el-col :span="8">
            <el-form-item label="备份内容" prop="backupContent">
              <el-select v-model="basicFormData.backupContent" :style="{width: '80%'}" @change="onContentChange">
                <el-option v-for="(item, index) in backupContentOptions" :key="index" :label="item.label" :value="item.value" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="机器类型" prop="machineType" label-width="120px">
              <el-select v-model="basicFormData.machineType" placeholder="请输入任务名称" :disabled="cascadeRule && cascadeRule['machineType'] !== undefined" :style="{width: '80%'}">
                <el-option v-for="(item, index) in machineTypeOptions" :key="index" :label="item.label" :value="item.value" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="数据中心" prop="dataCenter">
              <el-select v-model="basicFormData.dataCenter" :style="{width: '80%'}">
                <el-option v-for="(item, index) in dataCenterOptions" :key="index" :label="item.label" :value="item.value" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="环境" prop="env">
              <el-select v-model="basicFormData.env" :style="{width: '80%'}">
                <el-option v-for="(item, index) in envOptions" :key="index" :label="item.label" :value="item.value" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="操作系统类型" prop="platform" label-width="120px">
              <el-select v-model="basicFormData.platform" :style="{width: '80%'}" :disabled="cascadeRule && cascadeRule['platform'] !== undefined">
                <el-option v-for="(item, index) in platformOptions" :key="index" :label="item.label" :value="item.value" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="备份软件" prop="backupSoftware" :disabled="cascadeRule && cascadeRule['backupSoftware'] !== undefined">
              <el-select v-model="basicFormData.backupSoftware" :style="{width: '80%'}">
                <el-option v-for="(item, index) in backupSoftwareOptions" :key="index" :label="item.label" :value="item.value" />
              </el-select>
            </el-form-item>
          </el-col>
        </el-form>
      </div>
    </el-card>
    <el-card class="card-panel">
      <div slot="header" class="clearfix">
        <span>操作系统</span>
      </div>
      <div class="card-panel-content">
        <el-form ref="platformForm" :model="platformFormData" :rules="platformRules" size="medium" label-width="120px">
          <el-col :span="8">
            <el-form-item label="备份IP" prop="backupIP">
              <el-input v-model="platformFormData.backupIP" placeholder="请输入" :style="{width: '80%'}"/>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="远程端口" prop="backupPort">
              <el-input v-model="platformFormData.backupPort" placeholder="请输入" :style="{width: '80%'}"/>
            </el-form-item>
          </el-col>
        </el-form>
      </div>
    </el-card>
    <el-card class="card-panel">
      <div slot="header" class="clearfix">
        <span>备份信息</span>
      </div>
      <div class="card-panel-content">
        <el-form ref="backupForm" :model="backupFormData" :rules="backupRules" size="medium" label-width="120px" :loading="true">
          <el-row>
            <el-col :span="8">
              <el-form-item label="任务名称" prop="appName">
                <el-input v-model="backupFormData.appName" placeholder="请输入" :style="{width: '80%'}">
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="Veeam Server" prop="backupServer">
                <el-select v-model="backupFormData.backupServer" placeholder="请选择" :style="{width: '80%'}" @change="onServerChange">
                  <el-option v-for="(item, index) in veeamServerOptions" :key="index" :label="item.label"
                             :value="item.value"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item id="repository" label="仓库" prop="repository">
                <el-select v-model="backupFormData.repository" placeholder="请选择仓库" :style="{width: '80%'}" :loading="repositoryLoading" :disabled="backupFormData.backupServer === undefined">
                  <el-option v-for="(item, index) in repositoryOptions" :key="index" :label="item.label"
                             :value="item.value"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="VC名称" prop="vCenter">
                <el-select id="vCenter" v-model="backupFormData.vCenter" placeholder="请选择" @change="onVCChange"
                           :style="{width: '80%'}" :loading="vcLoading" :disabled="backupFormData.backupServer === undefined">
                  <el-option v-for="(item, index) in vcOptions" :key="index" :label="item.label"
                             :value="item.value"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item id="vm" label="VM名称" prop="vmObjects">
                <el-select v-model="backupFormData.vmObjects" placeholder="请选择" multiple clearable
                           :style="{width: '80%'}" :loading="vmLoading" :disabled="backupFormData.vCenter === undefined">
                  <el-option v-for="(item, index) in vmObjectsOptions" :key="index" :label="item.label"
                             :value="item.value"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item id="schedule" label="备份时间" prop="scheduleTime">
                <el-time-select
                  v-model="backupFormData.scheduleTime"
                  :picker-options="{
                      start: '00:00',
                      step: '00:10',
                      end: '23:50'
                    }"
                  placeholder="选择时间">
                </el-time-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item id="schedule" label="备份计划类型" prop="scheduleDateType">
                <el-select v-model="backupFormData.scheduleDateType" placeholder="请选择" :style="{width: '80%'}" :loading="repositoryLoading">
                  <el-option v-for="(item, index) in scheduleDateTypeOptions" :key="index" :label="item.label"
                             :value="item.value"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8" v-if="backupFormData.scheduleDateType === 'selectedDays'">
              <el-form-item id="schedule" label="备份日期" prop="scheduleDay">
                <el-select v-model="backupFormData.scheduleDay" placeholder="请选择" :style="{width: '80%'}" :loading="repositoryLoading" multiple>
                  <el-option v-for="(item, index) in scheduleDayOptions" :key="index" :label="item.label"
                             :value="item.value"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-col :span="16">
            <el-form-item label="任务描述" prop="description">
              <el-input v-model="backupFormData.description" type="textarea" placeholder="请输入多行文本"
                        :autosize="{minRows: 3, maxRows: 4}" :style="{width: '90%'}"></el-input>
            </el-form-item>
          </el-col>
        </el-form>
      </div>
    </el-card>

    <el-card class="card-panel">
      <div slot="header" class="clearfix">
        <span>其他信息</span>
      </div>
      <div class="card-panel-content">
        <el-form ref="otherForm" :model="otherFormData" :rules="otherRules" label-width="120px">
          <el-col :span="8">
            <el-form-item label="收费方式" prop="costType">
              <el-select v-model="otherFormData.costType" placeholder="请选择收费方式" :style="{width: '80%'}">
                <el-option v-for="(item, index) in costTypeOptions" :key="index" :label="item.label"
                           :value="item.value"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="收费编号" prop="costNumber">
              <el-input v-model="otherFormData.costNumber" placeholder="请输入收费编号" :style="{width: '80%'}">
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="16">
            <el-form-item label="申请理由" prop="remark">
              <el-input v-model="otherFormData.remark" type="textarea" placeholder="请输入申请理由"
                        :autosize="{minRows: 3, maxRows: 4}" :style="{width: '90%'}"></el-input>
            </el-form-item>
          </el-col>
        </el-form>
      </div>

    </el-card>
    <el-row style="display: flex; justify-content: right">
      <el-button @click="resetForm" size="small" type="primary">重置</el-button>
      <el-button @click="submitForm" size="small" type="success">提交</el-button>
    </el-row>
  </div>
</template>

<script>
import { listConfig } from "@/api/veeam/basic"
import { getHostEntity, listHost } from '@/api/veeam/host'
import { listRepository } from '@/api/veeam/repo'
import { applyCreateBackup } from '@/api/application/apply'
import { CREATE_BACKUP, MACHINE_TYPE, COST_TYPE, DATA_CENTER } from '@/views/common/config'
import { deepClone } from "@/utils";
import { parseTime } from "@/utils/ruoyi"
import { Loading } from 'element-ui'


const rules = {
  backupContent: [{
    required: true,
    message: '请选择备份内容',
    trigger: 'blur'
  }],
    machineType: [{
    required: true,
    message: '请选择机器类型',
    trigger: 'blur'
  }],
    dataCenter: [{
    required: true,
    message: '请选择数据中心',
    trigger: 'blur'
  }],
    env: [{
    required: true,
    message: '请选择环境',
    trigger: 'blur'
  }],
    platform: [{
    required: true,
    message: '请选择操作系统',
    trigger: 'blur'
  }],
    backupSoftware: [{
    required: true,
    message: '请选择备份软件',
    trigger: 'blur'
  }],
}
const platformRules = {
  backupIP: [{
    required: true,
    message: '请输入',
    trigger: 'blur'
  }],
    backupPort: [{
    required: true,
    message: '请输入',
    trigger: 'blur'
  }],
}
const backupRules = {
  appName: [{
    required: true,
    message: '请输入',
    trigger: 'blur'
  }],
  vCenter: [{
    required: true,
    message: '请选择',
    trigger: 'blur'
  }],
  vmObjects: [{
    required: true,
    type: 'array',
    message: '请至少选择一个VC',
    trigger: 'change'
  }],
  repository: [{
    required: true,
    message: '请选择仓库',
    trigger: 'blur'
  }],
  backupServer: [{
    required: true,
    message: '请选择',
    trigger: 'blur'
  }],
  scheduleTime: [{
    required: true,
    message: '请选择',
    trigger: 'blur'
  }],
  scheduleDateType: [{
    required: true,
    message: '请选择',
    trigger: 'blur'
  }],
  scheduleDay: [{
    required: true,
    type: 'array',
    message: '请至少选择一个日期',
    trigger: 'change'
  }],
  description: [{
    required: true,
    message: '请输入任务描述',
    trigger: 'blur'
  }]
}
const otherRules = {
  // costType: [{
  //   required: true,
  //   message: '请选择成本方式',
  //   trigger: 'blur'
  // }],
  // costNumber: [{
  //   required: true,
  //   message: '请输入成本编号',
  //   trigger: 'blur'
  // }],
  remark: [{
    required: true,
    message: '请输入申请理由',
    trigger: 'blur'
  }]
}

const backupContentOptions = [
  {label: 'VMware', value: 'VMware'},
  {label: 'MySQL', value: 'MySQL'},
  {label: 'SQL Server', value: 'SQL Server'},
  {label: 'PostgreSQL', value: 'PostgreSQL'},
  {label: 'Oracle', value: 'Oracle'},
  {label: 'FileSystem', value: 'FileSystem'},
]

const dataCenterOptions = [{label: 'CATL/宁德时代', value: 'catl'}]
const platformOptions = [{label: 'Windows', value: 'Windows'}, {label: 'Linux', value: 'Linux'}]
const envOptions = [{label: '生产', value: 'prod'}, {label: '非生产', value: 'dev'},]
const backupSoftwareOptions = [{label: 'Veeam', value: 'Veeam'}]
const machineTypeOptions = [{label: '虚拟机', value: 'vm'}, {label: '物理机', value: 'physical'},]
const scheduleDateTypeOptions = [{label: 'EveryDay', value: 'everyday'}, {label: 'On Weekdays', value: 'weekdays'}, { label: 'On these days', value: 'selectedDays'}]
const scheduleDayOptions = [
  {label: 'Monday', value: 'Monday'},
  {label: 'Tuesday', value: 'Tuesday'},
  {label: 'Wednesday', value: 'Wednesday'},
  {label: 'Thursday', value: 'Thursday'},
  {label: 'Friday', value: 'Friday'},
  {label: 'Saturday', value: 'Saturday'},
  {label: 'Sunday', value: 'Sunday'}]

// const veeamServerOptions = [{ label: '192.168.1.104:8888', value: '192.168.1.104:8888' }, { label: '192.168.1.101:8888', value: '192.168.1.101:8888'}]

const cascadeRule = { MySQL: {}, VMware: {machineType: 'vm', platform: 'Windows'}}

export default {
  name: "detail",
  data: function () {
    return {
      rules,
      platformRules,
      backupRules,
      otherRules,
      backupContentOptions,
      dataCenterOptions,
      platformOptions,
      envOptions,
      backupSoftwareOptions,
      machineTypeOptions,
      scheduleDateTypeOptions,
      scheduleDayOptions,
      veeamServerOptions: [],
      remark: undefined,
      formData: {
        backupContent: undefined,
        machineType: undefined,
        dataCenter: undefined,
        backupSoftware: undefined,
        platform: undefined,
        env: undefined,
        vmObjects: [],
        repository: undefined,
        description: undefined,
        costType: undefined,
        costNumber: undefined,
        remark: undefined
      },
      basicFormData: {
        backupContent: undefined,
        machineType: undefined,
        dataCenter: undefined,
        backupSoftware: undefined,
        platform: undefined,
        env: undefined
      },
      platformFormData: {
        backupIP: undefined,
        backupPort: 22
      },
      backupFormData: {
        appName: undefined,
        backupServer: undefined,
        vCenter: undefined,
        vmObjects: [],
        repository: undefined,
        description: undefined,
        scheduleTime: '22:00',
        scheduleDateType: 'everyday',
        scheduleDay: undefined
      },
      otherFormData: {
        costType: undefined,
        costNumber: undefined,
        remark: undefined
      },
      backupServer: undefined,
      vmObjectDataList: [],
      repositoryDataList: [],
      vcOptions: [{ label: 'vc1', value:'vc1' }, { label: 'vc2', value:'vc2' }],
      vmObjectsOptions: [{ label: '虚机1', value: 'vm1'}, { label: '虚机2', value: 'vm2'}, { label: '虚机3', value: 'vm3'},],
      repositoryOptions: [{ label: '仓库1', value: 'repository1'}, { label: '仓库2', value: 'repository2'},],
      costTypeOptions: [{label: '成本中心', value: 'costCenter'}, {label: '收费方式2', value: 'costType2'}],
      scheduleOptions: [],
      vmCache: {},
      vcLoading: false,
      vmLoading: false,
      repositoryLoading: false
    }
  },
  computed: {
    cascadeRule: function () {
      return cascadeRule[this.basicFormData.backupContent]
    },
    user: function () {
      return this.$store.getters.user
    },
  },
  mounted() {
    // getVCList()
    // listRepository().then(resp => {
    //   this.repositoryDataList = resp.rows
    // })
    // name要拼接appId, 放在后端处理
    this.backupFormData.description = "Created by Bakss\\" + this.user.name + " at " + parseTime(new Date().getTime(), '{y}-{m}-{d} {h}:{i}')
    listConfig().then(resp => {
      this.veeamServerOptions = resp.rows.filter(r => r.status).map(r => {
        return { label: r.hostname, value: `http://${r.ip}:${r.port}` }
      })
    })
  },
  methods: {
    submitForm() {
      const validateList = [this.$refs['basicForm'].validate(), this.$refs['platformForm'].validate(), this.$refs['backupForm'].validate(), this.$refs['otherForm'].validate()]
      Promise.all(validateList).then(validates => {
        for (const v of validates) {
          if (!v) return
        }
        const data = {
          appType: CREATE_BACKUP
        }
        Object.assign(data, this.basicFormData)
        Object.assign(data, this.platformFormData)
        Object.assign(data, this.backupFormData)
        Object.assign(data, this.otherFormData)
        const backupInfo = deepClone(this.backupFormData)
        backupInfo.vmObjects = backupInfo.vmObjects.toString()
        data['backupInfo'] = backupInfo
        // 备份计划是通用的放在外层
        if (data.scheduleDateType === 'selectedDays' && data.scheduleDay) {
          data.scheduleDay = data.scheduleDay.toString()
        }
        applyCreateBackup(data).then((resp) => {
          this.$message.success("提交成功！")
          this.$router.push({ path: '/application' })
        })
      })
    },
    resetForm() {
      this.formData = {
        backupContent: undefined,
        machineType: undefined,
        dataCenter: undefined,
        backupSoftware: undefined,
        platform: undefined,
        env: undefined
      }
    },
    onContentChange(e) {
      this.basicFormData.machineType = undefined
      this.basicFormData.platform = undefined
      this.basicFormData.env = undefined
      this.basicFormData.backupSoftware = undefined
      const rule = cascadeRule[e]
      if (rule) {
        for(const k in rule) {
          this.basicFormData[k] = rule[k]
        }
      }
    },
    onVCChange(e) {
      this.backupFormData.vmObjects = []
      this.getVMList(e)
    },
    onServerChange() {
      this.backupFormData.vCenter = undefined
      this.backupFormData.repository = undefined
      this.getVCList()
      this.getRepositoryList()
    },
    getRepositoryList() {
      this.repositoryLoading = true
      listRepository(1, 100, this.backupFormData.backupServer).then(resp => {
        this.repositoryDataList = resp.data
        this.repositoryOptions = this.repositoryDataList.map(r => {
          this.repositoryLoading = false
          return { label: r.name, value: r.name }
        })
      }).catch(e => this.repositoryLoading = false)
    },
    getVCList() {
      this.vcLoading = true
      listHost(1, 100, this.backupFormData.backupServer).then(resp => {
        this.vcLoading = false
        this.vcOptions = resp.data.filter(r => r.type === 1).map(r => {
          return { label: r.name, value: r.name }
        })
      }).catch(e => {
        this.vcLoading = false
      })
    },
    getVMList(name) {
      this.vmLoading = true
      if (this.vmCache[name]) return this.vmCache[name]
      getHostEntity(name, 'HostAndVms', this.backupFormData.backupServer).then(resp => {
        this.vmLoading = false
        this.vmObjectsOptions = resp.data.filter(r => r.type === 'Vm').map(r => {
          return { label: r.name, value: r.id }
        })
        if (this.vmCache[name] === undefined) {
          this.vmCache[name] = this.vmObjectsOptions
        }
      }).catch(e => this.vmLoading = false)
    },
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
