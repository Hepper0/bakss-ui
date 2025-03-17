<template>
  <div class="backup-management">
    <div class="panel-container">
      <!-- 搜索栏 -->
      <el-row :gutter="10">
        <el-col :span="6">
          <el-select size="mini" clearable v-model="selectedFile" placeholder="备份文件">
            <el-option label="NetBackup" value="NetBackup"></el-option>
            <el-option label="NetWorker" value="NetWorker"></el-option>
          </el-select>
        </el-col>
        <el-col :span="6">
          <el-input size="mini" v-model="searchQuery" placeholder="请输入客户端名称" clearable></el-input>
        </el-col>
        <el-col :span="12" class="search-buttons">
          <el-button size="mini" type="primary" icon="el-icon-search">搜索</el-button>
          <el-button size="mini" icon="el-icon-refresh">重置</el-button>
          <el-button size="mini" type="success">创建备份</el-button>
          <el-button size="mini">申请备份管理员权限</el-button>
        </el-col>
      </el-row>
    </div>

    <div class="panel-container">
      <!-- 备份管理表格 -->
      <div class="panel-table-wrapper" style="background-color: #f1f1f1">
        <el-table size="small" :data="tableData" stripe>
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column prop="backupFile" label="备份软件"></el-table-column>
          <el-table-column prop="softwareVersion" label="软件版本"></el-table-column>
          <el-table-column prop="clientName" label="客户端名称"></el-table-column>
          <el-table-column prop="backupContent" label="备份内容"></el-table-column>
          <el-table-column prop="vCenter" label="VCenter主机名"></el-table-column>
          <el-table-column prop="backupIP" label="备份IP"></el-table-column>
          <el-table-column prop="appName" label="应用名称"></el-table-column>
          <el-table-column prop="osType" label="操作系统类型"></el-table-column>
          <el-table-column prop="owner" label="负责人"></el-table-column>
          <el-table-column label="操作" width="150">
            <template v-slot="{ row }">
              <el-tooltip class="item" effect="dark" content="编辑" placement="top-start">
                <el-button icon="el-icon-edit" size="mini" type="text" @click="editRow(row)"></el-button>
              </el-tooltip>
              <el-tooltip class="item" effect="dark" content="授权" placement="top-start">
                <el-button icon="el-icon-key" size="mini" type="text" @click="goto('grant', row)"></el-button>
              </el-tooltip>
              <el-tooltip class="item" effect="dark" content="用户" placement="top-start">
                <el-button icon="el-icon-s-custom" size="mini" type="text" @click="editRow(row)"></el-button>
              </el-tooltip>
              <el-tooltip class="item" effect="dark" content="更多操作" placement="top-start">
                <el-button icon="el-icon-more" size="mini" type="text" @click="goto('more', row.id)"></el-button>
              </el-tooltip>
            </template>
          </el-table-column>
        </el-table>
      </div>

      <!-- 分页 -->
      <el-pagination class="pagination" background layout="prev, pager, next" :total="30"></el-pagination>
    </div>
  </div>
</template>

<script>
require('/src/views/style/panel.css')

export default {
  name: 'BackupMgr',
  data() {
    return {
      selectedFile: '',
      searchQuery: '',
      tableData: [
        { backupFile: 'NetBackup', softwareVersion: '9.1.0.1', clientName: 'swtx9ltz7mq', backupContent: 'SQL Server', backupIP: '10.122.145.38', appName: '--', osType: 'Linux', owner: 'wangk7@lenovo.com' },
        { backupFile: 'NetBackup', softwareVersion: '9.1.0.1', clientName: 'swtkvb5quvc', backupContent: 'SQL Server', backupIP: '10.122.145.53', appName: '--', osType: 'Linux', owner: 'zhangxy90@lenovo.com' }
      ]
    };
  },
  methods: {
    editRow(row) {
      this.$message.info(`编辑 ${row.clientName}`);
    },
    handleCommand(command) {
      if (command === 'delete') {
        this.$message.warning('删除操作未实现');
      } else if (command === 'view') {
        this.$message.info('查看详情未实现');
      }
    },
    goto (path, id) {
      this.$router.push({ path, query: { id }})
    }
  }
};
</script>

<style>
.backup-management {
  padding: 10px;
}

.search-buttons {
  display: flex;
  gap: 10px;
}
</style>
