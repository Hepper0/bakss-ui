<template>
  <div style="padding: 10px">
    <stratagy v-if="taskType === TYPE_STRATEGY" />
    <backup-once v-else-if="taskType === TYPE_BACKUP_ONCE" />
    <backup-permission v-else-if="taskType === TYPE_BACKUP_PERMISSION" />
    <create-backup v-else-if="taskType === TYPE_CREATE_BACKUP" />
    <create-restore v-else-if="taskType === TYPE_CREATE_RESTORE" />
    <modify-directory v-else-if="taskType === TYPE_MODIFY_DIRECTORY" />
    <el-card v-show="appBasicInfo && appBasicInfo.status === 1">
      <div slot="header" class="clearfix">
        <span>操作区</span>
      </div>
      <el-input v-model="remark" type="textarea" :rows="3"/>
      <div style="margin-top: 15px">
        <el-button @click="approval(true)" type="primary">审批同意</el-button>
        <el-button @click="approval(false)" style="color: orangered">审批不同意</el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
import Strategy from '@/views/application/modules/Strategy'
import BackupOnce from '@/views/application/modules/BackupOnce'
import BackupPermission from '@/views/application/modules/BackupPermission'
import CreateBackup from '@/views/application/modules/CreateBackup'
import CreateRestore from '@/views/application/modules/CreateRestore'
import ModifyDirectory from '@/views/application/modules/ModifyDirectory'
import { TYPE_STRATEGY,TYPE_BACKUP_ONCE,TYPE_BACKUP_PERMISSION,TYPE_CREATE_BACKUP,TYPE_CREATE_RESTORE,TYPE_MODIFY_DIRECTORY } from '@/views/common/config'
import { getApplication, approve, reject } from '@/api/application/application'

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
      remark: undefined,
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
    // this.type = this.$route.query
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
    approval(flag) {
      const msg = flag ? '同意' : '不同意'
      if (this.remark === undefined || this.remark === '【同意】' || this.remark === '【不同意】') {
        this.remark = '【' + msg +'】'
      }
      this.$confirm('确定审批【' + msg +'】吗？', '提示', { type: 'warning' }).then(() => {
        const req = flag ? approve : reject
        const reqData = { id: this.appBasicInfo.id, flowId: this.appBasicInfo.flowId, appType: this.appBasicInfo.appType }
        req(reqData).then(resp => {
          this.$message.success('提交成功！')
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
