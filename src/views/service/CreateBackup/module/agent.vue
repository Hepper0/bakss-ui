<template>
  <el-form ref="agentBackupForm" :model="formData" :rules="rules" size="medium" label-width="120px">
    <el-divider content-position="left">对象</el-divider>
    <el-row>
      <el-col :span="8">
        <el-form-item label="Type" prop="Type">
          <el-select disabled v-model="formData.Type" placeholder="请选择" :style="{width: '80%'}">
            <el-option v-for="(item, index) in typeOptions" :key="index" :label="item.label"
                       :value="item.value"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="Mode" prop="Mode">
          <el-select v-model="formData.Mode" placeholder="请选择" :style="{width: '80%'}">
            <el-option v-for="(item, index) in modeOptions" :key="index" :label="item.label"
                       :value="item.value"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="OSPlatform" prop="OSPlatform">
          <el-select v-model="formData.OSPlatform" placeholder="请选择仓库" :style="{width: '80%'}">
            <el-option v-for="(item, index) in platformOptions" :key="index" :label="item.label"
                       :value="item.value"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="8">
        <el-form-item label="BackupType" prop="BackupType">
          <el-select v-model="formData.BackupType" placeholder="请选择"
                     :style="{width: '80%'}">
            <el-option v-for="(item, index) in backupTypeOptions" :key="index" :label="item.label"
                       :value="item.value"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="保护组对象" prop="pgObjects">
          <el-select v-model="formData.pgObjects" placeholder="请选择" multiple clearable
                     :style="{width: '80%'}" :loading="pgLoading">
            <el-option v-for="(item, index) in pgObjectsOptions" :key="index" :label="item.label"
                       :value="item.value"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="仓库" prop="repository">
          <el-select v-model="formData.repository" placeholder="请选择仓库" :style="{width: '80%'}" :loading="repositoryLoading">
            <el-option v-for="(item, index) in repositoryOptions" :key="index" :label="item.label"
                       :value="item.value"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>
</template>

<script>
import { listRepository } from '@/api/veeam/repo'
import { listProtestGroup } from '@/api/veeam/pg'
import { getDicts } from '@/api/system/dict/data'

const rules = {
  Type: [{
    required: true,
    message: '请选择',
    trigger: 'blur'
  }],
  Mode: [{
    required: true,
    message: '请选择',
    trigger: 'blur'
  }],
  OSPlatform: [{
    required: true,
    message: '请选择',
    trigger: 'blur'
  }],
  BackupType: [{
    required: true,
    message: '请选择',
    trigger: 'blur'
  }],
  repository: [{
    required: true,
    message: '请选择',
    trigger: 'blur'
  }],
  pgObjects: [{
    required: true,
    type: 'array',
    message: '请至少选择一个对象',
    trigger: 'change'
  }],
}

export default {
  name: "BackupAgent",
  data: function () {
    return {
      rules,
      repositoryLoading: false,
      pgLoading: false,
      repositoryOptions: [{ label: '仓库1', value: 'repository1'},],
      pgObjectsOptions: [{ label: 'pg', value: 'pg'}, { label: 'pg2', value: 'pg2'}],
      typeOptions: [],
      modeOptions: [],
      backupTypeOptions: []
    }
  },
  props: {
    formData: {
      type: Object,
      default: function() {
        return {
          pgObjects: [],
          BackupType: undefined,
          Type: undefined,
          Server: undefined,
          Mode: undefined,
          OSPlatform: undefined,
          repository: undefined
        }
      }
    }
  },
  computed: {
    platformOptions: function () {
      return this.getConfig('platform')
    }
  },
  mounted() {
    getDicts('agent_job_type').then(resp => {
      this.typeOptions = resp.data.map((r) => {
        return { label: r.dictLabel, value: r.dictValue }
      })
    })
    getDicts('agent_job_mode').then(resp => {
      this.modeOptions = resp.data.map((r) => {
        return { label: r.dictLabel, value: r.dictValue }
      })
    })
    getDicts('agent_backup_type').then(resp => {
      this.backupTypeOptions = resp.data.map((r) => {
        return { label: r.dictLabel, value: r.dictValue }
      })
    })
    this.getPgObjects()
    this.getRepositoryList()
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
    getPgObjects() {
      this.pgLoading = true
      listProtestGroup(1, 100, this.formData.backupServer).then(resp => {
        this.pgLoading = false
        this.pgObjectsOptions = resp.data.map(r => {
          return { label: r.name, value: r.id }
        })
      }).finally(() => {
        this.pgLoading = false
      })
    },
    onVCChange(e) {
      this.formData.vmObjects = []
      this.getVMList(e)
    },
    refresh() {
      this.formData.pgObjects = []
      this.formData.BackupType = undefined
      // this.formData.Type = undefined
      this.formData.Server = undefined
      this.formData.Mode = undefined
      this.formData.OSPlatform = undefined
      this.formData.repository = undefined
      this.getPgObjects()
      this.getRepositoryList()
    },
    getConfig(type) {
      return this.$store.getters[type] && this.$store.getters[type].map(r => {
        return { label: r.dictLabel, value: r.dictValue }
      })
    },
    setValues(values) {
      for(const k in values) {
        this.formData[k] = values[k]
      }
      this.$forceUpdate()
    },
    validate() {
      return this.$refs['agentBackupForm'].validate()
    },
    update() {
      this.$forceUpdate()
    }
  }
}
</script>

<style scoped>

</style>
