<template>
  <div style="padding: 10px">
    <stratagy v-if="type === STRATEGY" />
    <backup-once v-else-if="BACKUP_ONCE" />
    <backup-permission v-else-if="type === BACKUP_PERMISSION" />
    <create-backup v-else-if="type === CREATE_BACKUP" />
    <create-restore v-else-if="type === CREATE_RESTORE" />
    <modify-direction v-else-if="type === MODIFY_DIRECTION" />
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
      type: 2
    }
  },
  mounted() {
    this.type = this.$route.query
  }
}
</script>

<style scoped>

</style>
