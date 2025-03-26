<template>
  <div style="padding: 10px">
    <stratagy v-if="taskType === STRATEGY" />
    <backup-once v-else-if="taskType === BACKUP_ONCE" />
    <backup-permission v-else-if="taskType === BACKUP_PERMISSION" />
    <create-backup v-else-if="taskType === CREATE_BACKUP" />
    <create-restore v-else-if="taskType === CREATE_RESTORE" />
    <modify-direction v-else-if="taskType === MODIFY_DIRECTION" />
    <el-card>
      <div slot="header" class="clearfix">
        <span>操作区</span>
      </div>
      <div>
        <el-button @click="cancel" style="color: orangered">取消备份申请</el-button>
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
import ModifyDirection from './modules/ModifyDirection'


const STRATEGY = 1
const BACKUP_ONCE = 2
const BACKUP_PERMISSION = 3
const CREATE_BACKUP = 4
const CREATE_RESTORE = 5
const MODIFY_DIRECTION = 6

export default {
  name: 'detail',
  components: {ModifyDirection, CreateRestore, CreateBackup, BackupOnce, BackupPermission, Strategy},
  data: function () {
    return {
      STRATEGY,
      BACKUP_ONCE,
      BACKUP_PERMISSION,
      CREATE_BACKUP,
      CREATE_RESTORE,
      MODIFY_DIRECTION,
      taskType: MODIFY_DIRECTION
    }
  },
  mounted() {
    this.taskType = parseInt(this.$route.query.taskType) || 2
  },
  methods: {
    back() {
      window.history.back()
    },
    cancel() {
      this.$confirm('确定取消备份申请吗？', '提示', { type: 'warning' }).then(() => {
        // todo api
      })
    }
  }
}
</script>

<style scoped>

</style>
