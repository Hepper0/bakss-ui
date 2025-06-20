<template>
  <el-form ref="backupForm" :model="formData" :rules="rules" size="medium" label-width="120px">
    <el-divider content-position="left">对象</el-divider>
    <el-row>
      <el-col :span="8">
        <el-form-item label="仓库" prop="repository">
          <el-select v-model="formData.repository" placeholder="请选择仓库" :style="{width: '80%'}" :loading="repositoryLoading" :disabled="formData.backupServer === undefined">
            <el-option v-for="(item, index) in repositoryOptions" :key="index" :label="item.label"
                       :value="item.value"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="文件共享服务器" prop="fileServer">
          <el-select v-model="formData.fileServerId" placeholder="请选择" @change="onServerChange"
                     :style="{width: '80%'}" :loading="serverLoading" :disabled="formData.backupServer === undefined">
            <el-option v-for="(item, index) in serverOptions" :key="index" :label="item.label"
                       :value="item.value"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="文件共享路径" prop="folder">
          <el-select v-model="formData.folderPaths" placeholder="请选择" multiple clearable
                     :style="{width: '80%'}" :loading="folderLoading" :disabled="formData.fileServerId === undefined">
            <el-option v-for="(item, index) in folderOptions" :key="index" :label="item.label"
                       :value="item.value"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>
</template>

<script>
import { listRepository } from '../../../../api/veeam/repo'
import { listFileShareFolder, listFileShareServer } from '../../../../api/veeam/file'

const rules = {
  fileServer: [{
    required: true,
    message: '请选择',
    trigger: 'blur'
  }],
  repository: [{
    required: true,
    message: '请选择',
    trigger: 'blur'
  }],
  folder: [{
    required: true,
    type: 'array',
    message: '请至少选择一个对象',
    trigger: 'change'
  }],
}

export default {
  name: "BackupNas",
  data: function () {
    return {
      rules,
      serverList: [
        {
          "id": "2e958e0e-b371-47fe-85fd-739b26384ed0",
          "type": 23,
          "path": "\\\\192.168.27.53\\smbshare"
        },
        {
          "id": "97223f82-1267-45bd-8373-76943421de5e",
          "type": 24,
          "path": "192.168.27.53:/mnt/bk_source_v/nfsshare"
        }
      ],
      selectedServer: undefined,
      repositoryLoading: false,
      serverLoading: false,
      folderLoading: false,
      repositoryOptions:  [{ label: '仓库1', value: 'repository1'}, { label: '仓库2', value: 'repository2'},],
      serverOptions: [{ label: '\\\\192.168.27.53\\smbshare', value:'2e958e0e-b371-47fe-85fd-739b26384ed0' }, { label: '192.168.27.53:/mnt/bk_source_v/nfsshare', value:'97223f82-1267-45bd-8373-76943421de5e' }],
      folderOptions: [{ label: '\\\\level1', value: '\\\\level1'}, { label: '\\\\level2', value: '\\\\level2'}]
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
  mounted() {
    // this.getRepositoryList()
    // this.getFileServerList()
  },
  methods: {
    getRepositoryList() {
      this.repositoryLoading = true
      listRepository(1, 100, this.formData.backupServer).then(resp => {
        this.repositoryLoading = false
        this.repositoryDataList = resp.data
        this.repositoryOptions = this.repositoryDataList.map(r => {
          return { label: r.name, value: r.name }
        })
      }).finally(() => this.repositoryLoading = false)
    },
    getFileServerList() {
      this.serverLoading = true
      listFileShareServer(1, 0, this.formData.backupServer).then(resp => {
        this.serverLoading = false
        this.serverList = resp.data
        this.serverOptions = resp.data.map(r => {
          return { label: r.path, value: r.id }
        })
      }).finally(() => {
        this.serverLoading = false
      })
    },
    getFileShareFolder(serverId) {
      this.folderLoading = true
      listFileShareFolder(serverId, null, this.formData.backupServer).then(resp => {
        this.folderLoading = false
        this.folderOptions = resp.data.map(r => {
          return { label: r.path, value: r.path }
        })
      }).finally(() => {
        this.folderLoading = false
      })
    },
    onServerChange(e) {
      const t = this.serverList.find(s => s.id = e)
      if (t) {
        this.selectedServer = t
        this.formData.fileServerId = t.id
        this.formData.fileServerPath = t.path
        this.formData.fileServerType = t.type
      }
      this.formData.folderPaths = []
      this.getFileShareFolder(e)
    },
    refresh() {
      this.formData.fileServerId = undefined
      this.formData.fileServerPath = undefined
      this.formData.fileServerType = undefined
      this.formData.repository = undefined
      this.formData.folderPaths = []
      this.getFileServerList()
      this.getRepositoryList()
    },
    setValues(values) {
      for(const k in values) {
        this.formData[k] = values[k]
      }
      this.$forceUpdate()
    },
    validate() {
      if (this.formData.repository === undefined) {
        this.$modal.msgError('仓库未选择')
        return false
      }
      if (this.formData.fileServerId === undefined) {
        this.$modal.msgError('文件服务器未选择')
        return false
      }
      if (this.formData.folderPaths.length === 0) {
        this.$modal.msgError('共享目录未选择')
        return false
      }
      return true
      // this.$refs['backupForm'].validate()
    },
    clearValidate() {
      this.$refs.form.clearValidate()
    }
  }
}
</script>

<style scoped>

</style>
