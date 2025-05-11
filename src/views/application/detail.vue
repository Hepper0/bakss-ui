<template>
  <div style="padding: 10px">
    <backup-permission ref="detail" v-if="taskType === TYPE_BACKUP_PERMISSION" />
    <create-restore ref="detail" v-else-if="taskType === TYPE_CREATE_RESTORE" />
    <create-backup ref="detail" v-else-if="taskType === TYPE_CREATE_BACKUP" />
    <backup-once ref="detail" v-else-if="taskType === TYPE_BACKUP_ONCE" />
    <modify-directory ref="detail" v-else-if="taskType === TYPE_MODIFY_DIRECTORY" />
    <strategy ref="detail" v-else-if="taskType === TYPE_STRATEGY" />
    <el-card>
      <div slot="header" class="clearfix">
        <span>操作区</span>
      </div>
      <div>
        <el-button v-show="user.name === appBasicInfo && appBasicInfo.appUser" @click="cancel" style="color: orangered">取消申请</el-button>
        <el-button @click="back">返回</el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
import Strategy from './modules/Strategy'
import BackupOnce from './modules/BackupOnce'
import BackupPermission from './modules/BackupPermission'
import CreateBackup from './modules/CreateBackup'
import CreateRestore from './modules/CreateRestore'
import ModifyDirectory from './modules/ModifyDirectory'
import { TYPE_STRATEGY,TYPE_BACKUP_ONCE,TYPE_BACKUP_PERMISSION,TYPE_CREATE_BACKUP,TYPE_CREATE_RESTORE,TYPE_MODIFY_DIRECTORY, APPLY_TYPE } from '@/views/common/config'
import { cancelApplication } from '@/api/application/apply'
import { getApplication } from '@/api/application/application'


export default {
  name: 'detail',
  components: {ModifyDirectory, CreateRestore, CreateBackup, BackupOnce, BackupPermission, Strategy},
  data: function () {
    return {
      TYPE_STRATEGY,
      TYPE_BACKUP_ONCE,
      TYPE_BACKUP_PERMISSION,
      TYPE_CREATE_BACKUP,
      TYPE_CREATE_RESTORE,
      TYPE_MODIFY_DIRECTORY,
      taskType: TYPE_MODIFY_DIRECTORY,
      appId: undefined,
      appBasicInfo: undefined
    }
  },
  computed: {
    user: function () {
      return this.$store.getters.user
    }
  },
  mounted() {
    this.taskType = parseInt(this.$route.query.taskType)
    this.appId = this.$route.query.id
  },
  provide() {
    return {
      getAppBasicInfo: this.getApplicationBasicInfo
    }
  },
  methods: {
    back() {
      window.history.back()
    },
    cancel() {
      this.$confirm('确定取消备份申请吗？', '提示', { type: 'warning' }).then(() => {
        cancelApplication(this.appId).then(() => {
          this.$message.success('取消成功！')
          this.back()
        })
      })
    },
    getApplicationBasicInfo() {
      return new Promise((resolve, reject) => {
          getApplication(this.appId).then(resp => {
            this.appBasicInfo = resp.data
            resolve(resp)
          }).catch(e => reject(e))
        }
      )
    }
  }
}
</script>

<style scoped>

</style>
