<template>
  <div class="container">
    <el-card class="card-panel">
      <div slot="header" class="clearfix">
        <span>基本信息</span>
      </div>
      <div class="card-panel-content">
        <el-form ref="elForm" :model="formData" :rules="rules" size="medium" label-width="100px">
          <el-col :span="8">
            <el-form-item label="备份内容" prop="name">
              <el-select v-model="formData.backupContent" placeholder="请输入任务名称" clearable :style="{width: '80%'}">
                <el-option v-for="(item, index) in backupContentOptions" :key="index" :label="item.label" :value="item.value" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="机器类型" prop="name" label-width="120px">
              <el-select v-model="formData.machineType" placeholder="请输入任务名称" clearable :style="{width: '80%'}">
                <el-option v-for="(item, index) in machineTypeOptions" :key="index" :label="item.label" :value="item.value" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="数据中心" prop="name">
              <el-select v-model="formData.dataCenter" placeholder="请输入任务名称" clearable :style="{width: '80%'}">
                <el-option v-for="(item, index) in dataCenterOptions" :key="index" :label="item.label" :value="item.value" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="环境" prop="name">
              <el-select v-model="formData.env" placeholder="请输入任务名称" clearable :style="{width: '80%'}">
                <el-option v-for="(item, index) in envOptions" :key="index" :label="item.label" :value="item.value" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="操作系统类型" prop="name" label-width="120px">
              <el-select v-model="formData.platform" placeholder="请输入任务名称" clearable :style="{width: '80%'}">
                <el-option v-for="(item, index) in platformOptions" :key="index" :label="item.label" :value="item.value" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="备份软件" prop="name">
              <el-select v-model="formData.backupSoftware" placeholder="请输入任务名称" clearable :style="{width: '80%'}">
                <el-option v-for="(item, index) in backupSoftwareOptions" :key="index" :label="item.label" :value="item.value" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="任务描述" prop="description">
              <el-input v-model="formData.description" type="textarea" placeholder="请输入多行文本"
                        :autosize="{minRows: 4, maxRows: 4}" :style="{width: '90%'}"></el-input>
            </el-form-item>
          </el-col>
        </el-form>
<!--          <el-form ref="elForm" :model="formData" :rules="rules" size="medium" label-width="100px">-->
<!--            <el-col :span="16">-->
<!--              <el-form-item label="任务名称" prop="name">-->
<!--                <el-input v-model="formData.name" placeholder="请输入任务名称" clearable :style="{width: '100%'}">-->
<!--                </el-input>-->
<!--              </el-form-item>-->
<!--            </el-col>-->
<!--            <el-col :span="16">-->
<!--              <el-form-item label="备份内容" prop="name">-->
<!--                <el-input v-model="formData.type" placeholder="请输入任务名称" clearable :style="{width: '100%'}">-->
<!--                </el-input>-->
<!--                <el-select>-->
<!--                  <el-option></el-option>-->
<!--                </el-select>-->
<!--              </el-form-item>-->
<!--            </el-col>-->
<!--            <el-col :span="24">-->
<!--              <el-form-item label="任务描述" prop="description">-->
<!--                <el-input v-model="formData.description" type="textarea" placeholder="请输入多行文本"-->
<!--                          :autosize="{minRows: 4, maxRows: 4}" :style="{width: '100%'}"></el-input>-->
<!--              </el-form-item>-->
<!--            </el-col>-->
<!--            <el-col :span="8">-->
<!--              <el-form-item label="虚机" prop="vmObjects">-->
<!--                <el-select v-model="formData.vmObjects" placeholder="请选择虚机" multiple clearable-->
<!--                           :style="{width: '100%'}">-->
<!--                  <el-option v-for="(item, index) in vmObjectsOptions" :key="index" :label="item.label"-->
<!--                             :value="item.value"></el-option>-->
<!--                </el-select>-->
<!--              </el-form-item>-->
<!--            </el-col>-->
<!--            <el-col :span="8">-->
<!--              <el-form-item label="仓库" prop="repository">-->
<!--                <el-select v-model="formData.repository" placeholder="请选择仓库" clearable-->
<!--                           :style="{width: '100%'}">-->
<!--                  <el-option v-for="(item, index) in repositoryOptions" :key="index" :label="item.label"-->
<!--                             :value="item.value"></el-option>-->
<!--                </el-select>-->
<!--              </el-form-item>-->
<!--            </el-col>-->
<!--            <el-col :span="24">-->
<!--              <el-form-item label="申请理由" prop="reason">-->
<!--                <el-input v-model="formData.reason" type="textarea" :rows="5" />-->
<!--              </el-form-item>-->
<!--            </el-col>-->
<!--          </el-form>-->
        </div>
      </el-card>
      <el-card class="card-panel">
        <div slot="header" class="clearfix">
          <span>备份信息</span>
        </div>
      </el-card>

      <el-card class="card-panel">
        <div slot="header" class="clearfix">
          <span>其他信息</span>
        </div>
        <div class="card-panel-content">
          <el-form>
            <el-col :span="8">
              <el-form-item label="收费方式" prop="name">
                <el-select v-model="otherFormData.costType" placeholder="请选择收费方式" clearable :style="{width: '80%'}">
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="收费编号" prop="name">
                <el-input v-model="otherFormData.costNumber" placeholder="请输入收费编号" clearable :style="{width: '80%'}">
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="16">
              <el-form-item label="申请理由" prop="description">
                <el-input v-model="otherFormData.reason" type="textarea" placeholder="请输入申请理由"
                          :autosize="{minRows: 4, maxRows: 4}" :style="{width: '90%'}"></el-input>
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
import { getHostEntity } from '@/api/veeam/host'
import { listRepository } from '@/api/veeam/repository'
import { createJob } from '@/api/veeam/job'
import { applyCreateBackup } from '@/api/application/apply'
import { CREATE_BACKUP } from '@/views/common/config'

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

export default {
  name: "detail",
  data: function () {
    return {
      backupContentOptions,
      dataCenterOptions,
      platformOptions,
      envOptions,
      backupSoftwareOptions,
      machineTypeOptions,
      reason: undefined,
      formData: {
        backupContent: undefined,
        machineType: undefined,
        dataCenter: undefined,
        backupSoftware: undefined,
        platform: undefined,
        env: undefined
      },
      otherFormData: {
        costType: undefined,
        costNumber: undefined,
        reason: undefined
      },
      vmObjectDataList: [],
      repositoryDataList: [],
      vmObjectsOptions: [{ label: '虚机1', value: 'vm1'}, { label: '虚机2', value: 'vm2'}, { label: '虚机3', value: 'vm3'},],
      repositoryOptions: [{ label: '仓库1', value: 'repository1'}, { label: '仓库2', value: 'repository2'},],
      rules: {
        name: [{
          required: true,
          message: '请输入任务名称',
          trigger: 'blur'
        }],
        vmObjects: [{
          required: true,
          type: 'array',
          message: '请至少选择一个vmObjects',
          trigger: 'change'
        }],
        repository: [{
          required: true,
          message: '请选择仓库',
          trigger: 'blur'
        }],
        description: [{
          required: true,
          message: '请输入任务描述',
          trigger: 'blur'
        }],
        reason: [{
          required: true,
          message: '请输入申请理由',
          trigger: 'blur'
        }],
      }
    }
  },
  mounted() {
    // getHostEntity().then(resp => {
    //   this.vmObjectDataList = resp.rows
    // })
    //
    // listRepository().then(resp => {
    //   this.repositoryDataList = resp.rows
    // })
  },
  methods: {
    submitForm() {
      this.$refs['elForm'].validate(valid => {
        if (!valid) return
        this.formData['appType'] = CREATE_BACKUP
        applyCreateBackup(this.formData).then((resp) => {
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
    validate() {

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
