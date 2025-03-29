<template>
  <div class="backup-management">
    <div class="panel-container">
      <!-- 搜索栏 -->
      <el-row :gutter="10">
        <el-col :span="6">
          <el-select size="mini" clearable v-model="selectedFile" placeholder="请选择">
            <el-option label="ID" value="ID"></el-option>
            <el-option label="NetWorker" value="NetWorker"></el-option>
          </el-select>
        </el-col>
        <el-col :span="6">
          <el-input size="mini" v-model="searchQuery" placeholder="请输入" clearable></el-input>
        </el-col>
        <el-col :span="12" class="search-buttons">
          <el-button size="mini" type="primary" icon="el-icon-search">搜索</el-button>
          <el-button size="mini" icon="el-icon-refresh">重置</el-button>
        </el-col>
      </el-row>
    </div>

    <div class="panel-container">
      <!-- 备份管理表格 -->
      <div class="panel-table-wrapper" style="background-color: #f1f1f1">
        <el-table size="small" :data="tableData" stripe>
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column prop="id" label="ID"></el-table-column>
          <el-table-column prop="backupSoftware" label="备份软件"></el-table-column>
          <el-table-column prop="applyType" label="申请类型"></el-table-column>
          <el-table-column prop="applyUser" label="申请人"></el-table-column>
          <el-table-column prop="reviewStatus" label="审批状态"></el-table-column>
          <el-table-column prop="backupStatus" label="执行状态"></el-table-column>
          <el-table-column prop="backupIP" label="创建日期"></el-table-column>
          <el-table-column label="操作" width="120">
            <template v-slot="{ row }">
              <el-button icon="el-icon-document" size="mini" type="text" @click="gotoDetail(row)"></el-button>
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
export default {
  name: 'review',
  data() {
    return {
      selectedFile: '',
      searchQuery: '',
      tableData: [
        { backupFile: 'NetBackup', softwareVersion: '9.1.0.1', clientName: 'swtx9ltz7mq', backupContent: 'SQL Server', backupIP: '10.122.145.38', appName: '--', platform: 'Linux', owner: 'wangk7@lenovo.com' },
        { backupFile: 'NetBackup', softwareVersion: '9.1.0.1', clientName: 'swtkvb5quvc', backupContent: 'SQL Server', backupIP: '10.122.145.53', appName: '--', platform: 'Linux', owner: 'zhangxy90@lenovo.com' }
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
    gotoDetail(row) {
      this.$router.push({ path: '/review/detail', query: { id: row.id } })
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
