<template>
  <el-form ref="backupForm" :model="formData" :rules="rules" size="medium" label-width="120px">
    <el-divider content-position="left">表单</el-divider>
    <el-row>
      <el-col :span="8">
        <el-form-item id="repository" label="仓库" prop="repository">
          <el-select v-model="formData.repository" placeholder="请选择仓库" :style="{width: '80%'}" :loading="repositoryLoading" :disabled="formData.backupServer === undefined">
            <el-option v-for="(item, index) in repositoryOptions" :key="index" :label="item.label"
                       :value="item.value"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="VC名称" prop="vCenter">
          <el-select id="vCenter" v-model="formData.vCenter" placeholder="请选择" @change="onVCChange"
                     :style="{width: '80%'}" :loading="vcLoading" :disabled="formData.backupServer === undefined">
            <el-option v-for="(item, index) in vcOptions" :key="index" :label="item.label"
                       :value="item.value"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item id="vm" label="VM名称" prop="vmObjects">
          <el-select v-model="formData.vmObjects" placeholder="请选择" multiple clearable
                     :style="{width: '80%'}" :loading="vmLoading" :disabled="formData.vCenter === undefined">
            <el-option v-for="(item, index) in vmObjectsOptions" :key="index" :label="item.label"
                       :value="item.value"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>
</template>

<script>
import { getHostEntity, listHost } from '@/api/veeam/host'
import { listRepository } from '@/api/veeam/repo'

const rules = {
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
    }]
  }

export default {
  name: "BackupVm",
  data: function () {
    return {
      rules,
      repositoryLoading: false,
      vcLoading: false,
      vmLoading: false,
      vmCache: {},
      repositoryOptions: [],
      vcOptions: [],
      vmObjectsOptions: []
    }
  },
  props: {
    formData: {
      type: Object,
      default: function() {
        return {}
      }
    }
  },
  methods: {
    getRepositoryList() {
      this.repositoryLoading = true
      listRepository(1, 100, this.formData.backupServer).then(resp => {
        this.repositoryDataList = resp.data
        this.repositoryOptions = this.repositoryDataList.map(r => {
          this.repositoryLoading = false
          return { label: r.name, value: r.name }
        })
      }).finally(() => this.repositoryLoading = false)
    },
    getVCList() {
      this.vcLoading = true
      listHost(1, 100, this.formData.backupServer).then(resp => {
        this.vcLoading = false
        let vcList = resp.data.filter(r => r.type === 1)
        if (vcList.length === 0) {
          vcList = resp.data.filter(r => r.type === 6)
        }
        this.vcOptions = vcList.map(r => {
          return { label: r.name, value: r.name }
        })
      }).finally(() => {
        this.vcLoading = false
      })
    },
    getVMList(name) {
      this.vmLoading = true
      if (this.vmCache[name]) return this.vmCache[name]
      getHostEntity(name, 'HostAndVms', this.formData.backupServer).then(resp => {
        this.vmLoading = false
        this.vmObjectsOptions = resp.data.filter(r => r.type === 'Vm').map(r => {
          return { label: r.name, value: r.id }
        })
        if (this.vmCache[name] === undefined) {
          this.vmCache[name] = this.vmObjectsOptions
        }
      }).finally(() => this.vmLoading = false)
    },
    onVCChange(e) {
      this.formData.vmObjects = []
      this.getVMList(e)
    },
    refresh() {
      this.formData.vCenter = undefined
      this.formData.repository = undefined
      this.formData.vmObjects = undefined
      this.getVCList()
      this.getRepositoryList()
    },
    setValues(values) {
      for(const k in values) {
        this.formData[k] = values[k]
      }
      this.$forceUpdate()
    }
  }
}
</script>

<style scoped>

</style>
