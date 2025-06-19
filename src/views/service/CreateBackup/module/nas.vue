<template>
  <el-form ref="backupForm" :model="formData" :rules="rules" size="medium" label-width="120px">
    <el-divider content-position="left">对象</el-divider>
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
        <el-form-item label="文件共享服务器" prop="fileServer">
          <el-select id="vCenter" v-model="formData.serverId" placeholder="请选择" @change="onServerChange"
                     :style="{width: '80%'}" :loading="serverLoading" :disabled="formData.repository === undefined">
            <el-option v-for="(item, index) in serverOptions" :key="index" :label="item.label"
                       :value="item.value"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item id="vm" label="文件共享路径" prop="folder">
          <el-select v-model="formData.paths" placeholder="请选择" multiple clearable
                     :style="{width: '80%'}" :loading="folderLoading" :disabled="formData.serverId === undefined">
            <el-option v-for="(item, index) in folderOptions" :key="index" :label="item.label"
                       :value="item.value"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>
</template>

<script>
export default {
  name: "BackupNAS",
  data: function () {
    return {
      rules,
      serverList: [],
      selectedServer: undefined,
      repositoryLoading: false,
      serverLoading: false,
      folderLoading: false,
      repositoryOptions:  [{ label: '仓库1', value: 'repository1'}, { label: '仓库2', value: 'repository2'},],
      serverOptions: [{ label: 'vc1', value:'vc1' }, { label: 'vc2', value:'vc2' }],
      folderOptions: [{ label: '虚机1', value: 'vm1'}, { label: '虚机2', value: 'vm2'}, { label: '虚机3', value: 'vm3'},]
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
        this.repositoryLoading = false
        this.repositoryDataList = resp.data
        this.repositoryOptions = this.repositoryDataList.map(r => {
          return { label: r.name, value: r.name }
        })
      }).finally(() => this.repositoryLoading = false)
    },
    getFileServerList(repository) {
      this.serverLoading = true
      listHost(repository, this.formData.backupServer).then(resp => {
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
      listHost(serverId, null, this.formData.backupServer).then(resp => {
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
        this.formData.serverId = t.id
        this.formData.serverpath = t.path
        this.formData.type = t.type
      }
      this.formData.paths = []
      this.getFileShareFolder(e)
    },
    refresh() {
      this.formData.serverId = undefined
      this.formData.serverPath = undefined
      this.formData.type = undefined
      this.formData.repository = undefined
      this.formData.paths = undefined
      this.getVCList()
      this.getRepositoryList()
    },
    setValues(values) {
      for(const k in values) {
        this.formData[k] = values[k]
      }
      this.$forceUpdate()
    },
    validate() {
      return this.$refs['backupForm'].validate()
    }
  }
}
</script>

<style scoped>

</style>
