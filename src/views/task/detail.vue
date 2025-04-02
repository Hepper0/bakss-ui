<template>
  <div style="padding: 10px">
    <stratagy v-if="taskType === TYPE_STRATEGY" />
    <backup-once v-else-if="taskType === TYPE_BACKUP_ONCE" />
    <backup-permission v-else-if="taskType === TYPE_BACKUP_PERMISSION" />
    <create-backup v-else-if="taskType === TYPE_CREATE_BACKUP" />
    <create-restore v-else-if="taskType === TYPE_CREATE_RESTORE" />
    <modify-direction v-else-if="taskType === TYPE_MODIFY_DIRECTION" />
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
import Strategy from '@/views/review/modules/Strategy'
import BackupOnce from '@/views/review/modules/BackupOnce'
import BackupPermission from '@/views/review/modules/BackupPermission'
import CreateBackup from '@/views/review/modules/CreateBackup'
import CreateRestore from '@/views/review/modules/CreateRestore'
import ModifyDirection from '@/views/review/modules/ModifyDirection'
import { TYPE_STRATEGY,TYPE_BACKUP_ONCE,TYPE_BACKUP_PERMISSION,TYPE_CREATE_BACKUP,TYPE_CREATE_RESTORE,TYPE_MODIFY_DIRECTION } from '@/views/common/config'

export default {
  name: 'detail',
  components: {ModifyDirection, CreateRestore, CreateBackup, BackupOnce, BackupPermission, Strategy},
  data: function () {
    return {
      TYPE_STRATEGY,
      TYPE_BACKUP_ONCE,
      TYPE_BACKUP_PERMISSION,
      TYPE_CREATE_BACKUP,
      TYPE_CREATE_RESTORE,
      TYPE_MODIFY_DIRECTION,
      taskType: TYPE_MODIFY_DIRECTION
    }
  },
  mounted() {
    // this.type = this.$route.query
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
