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
        <el-form ref="backupForm" :model="backupFormData" :rules="backupRules" size="medium" label-width="120px">
          <el-row>
            <el-col :span="8">
              <el-form-item label="应用名称" prop="appName">
                <el-input v-model="backupFormData.appName" placeholder="请输入" :style="{width: '80%'}">
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="Veeam Server" prop="backupServer">
                <el-select v-model="backupFormData.backupServer" placeholder="请选择" :style="{width: '80%'}">
                  <el-option v-for="(item, index) in veeamServerOptions" :key="index" :label="item.label"
                             :value="item.value"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-col :span="8">
            <el-form-item label="VC名称" prop="vCenter">
              <el-select v-model="backupFormData.vCenter" placeholder="请选择" @change="onVCChange"
                         :style="{width: '80%'}">
                <el-option v-for="(item, index) in vcOptions" :key="index" :label="item.label"
                           :value="item.value"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="VM名称" prop="vmObjects">
              <el-select v-model="backupFormData.vmObjects" placeholder="请选择" multiple clearable
                         :style="{width: '80%'}" :loading="false">
                <el-option v-for="(item, index) in vmObjectsOptions" :key="index" :label="item.label"
                           :value="item.value"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="仓库" prop="repository">
              <el-select v-model="backupFormData.repository" placeholder="请选择仓库" :style="{width: '80%'}">
                <el-option v-for="(item, index) in repositoryOptions" :key="index" :label="item.label"
                           :value="item.value"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
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
import { getHostEntity, listHost } from '@/api/veeam/host'
import { listRepository } from '@/api/veeam/repo'
import { createJob } from '@/api/veeam/job'
import { applyCreateBackup } from '@/api/application/apply'
import { CREATE_BACKUP } from '@/views/common/config'
import {deepClone} from "../../../utils";

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
    message: '请选择',
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
  description: [{
    required: true,
    message: '请输入任务描述',
    trigger: 'blur'
  }]
}
const otherRules = {
  costType: [{
    required: true,
    message: '请选择成本方式',
    trigger: 'blur'
  }],
  costNumber: [{
    required: true,
    message: '请输入成本编号',
    trigger: 'blur'
  }],
  remark: [{
    required: true,
    message: '请输入申请理由',
    trigger: 'blur'
  }]
}

const backupContentOptions = [
  {label: 'VMware', value: 'vm'},
  {label: 'MySQL', value: 'mysql'},
  {label: 'SQL Server', value: 'sqlserver'},
  {label: 'PostgreSQL', value: 'postgresql'},
  {label: 'Oracle', value: 'oracle'},
  {label: 'FileSystem', value: 'filesystem'},
]

const dataCenterOptions = [{label: 'CATL/宁德时代', value: 'catl'}]
const platformOptions = [{label: 'Windows', value: 'windows'}, {label: 'Linux', value: 'linux'}]
const envOptions = [{label: '生产', value: 'prod'}, {label: '非生产', value: 'dev'},]
const backupSoftwareOptions = [{label: 'Veeam', value: 'veeam'}]
const machineTypeOptions = [{label: '虚拟机', value: 'vm'}, {label: '物理机', value: 'physical'},]

const veeamServerOptions = [{ label: 'VeeamServer1', value: 'vs1' }, { label: 'VeeamServer2', value: 'vs2'}]

const cascadeRule = { mysql: {}, vm: {machineType: 'vm', platform: 'windows'}}

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
      veeamServerOptions,
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
        description: undefined
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
      costTypeOptions: [{label: '收费方式1', value: 'costType1'}, {label: '收费方式2', value: 'costType2'}],
      vmCache: {},

    }
  },
  computed: {
    cascadeRule: function () {
      return cascadeRule[this.basicFormData.backupContent]
    }
  },
  mounted() {
    // getVCList()
    // listRepository().then(resp => {
    //   this.repositoryDataList = resp.rows
    // })
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
        applyCreateBackup(data).then((resp) => {
          this.$message.success("提交成功！")
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
      // this.getVMList(e)
    },
    getVCList() {
      listHost(undefined, undefined, this.backupServer).then(resp => {
        this.vcOptions = resp.rows.filter(r => r.type === 1).map(r => {
          return { label: r.name, value: r.name }
        })
      })
    },
    getVMList(name) {
      if (this.vmCache[name]) return this.vmCache[name]
      getHostEntity(name, 'HostAndVms', this.backupServer).then(resp => {
        this.vmObjectsOptions = resp.rows.filter(r => r.type === 'Vm').map(r => {
          return { label: r.name, value: r.path }
        })
        if (this.vmCache[name] === undefined) {
          this.vmCache[name] = this.vmObjectsOptions
        }
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
