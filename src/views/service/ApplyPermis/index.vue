<template>
  <div class="backup-management">
    <div class="panel-container">
      <!-- 搜索栏 -->
      <el-row :gutter="10">
        <el-col :span="10">
          <el-select style="width: 30%;margin-right: 15px" size="mini" clearable v-model="queryParams.backupSoftware" placeholder="请选择">
            <el-option label="ID" value="ID"></el-option>
            <el-option label="NetWorker" value="NetWorker"></el-option>
          </el-select>
          <el-input style="width: 60%" size="mini" v-model="queryParams.clientName" placeholder="请输入" clearable></el-input>
        </el-col>
        <el-col :span="12" class="search-buttons">
          <el-button size="mini" @click="getList" type="primary" icon="el-icon-search">搜索</el-button>
          <el-button size="mini" @click="reset" icon="el-icon-refresh">重置</el-button>
          <el-button size="mini" @click="createBackup" type="success">创建备份</el-button>
          <el-button size="mini" @click="gotoApply()">申请备份管理员权限</el-button>
        </el-col>
      </el-row>
    </div>

    <div class="panel-container">
      <!-- 备份管理表格 -->
      <div class="panel-table-wrapper">
        <el-table v-loading="loading" size="small" :data="tableData" @selection-change="handleSelectionChange" stripe>
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column prop="backupSoftware" label="备份软件"></el-table-column>
          <el-table-column prop="softwareVersion" label="软件版本"></el-table-column>
          <el-table-column prop="clientName" label="客户端名称"></el-table-column>
          <el-table-column prop="backupContent" label="备份内容"></el-table-column>
          <el-table-column prop="vCenter" label="VCenter主机名"></el-table-column>
          <el-table-column prop="backupIP" label="备份IP"></el-table-column>
          <el-table-column prop="appName" label="应用名称"></el-table-column>
          <el-table-column prop="platform" label="操作系统类型"></el-table-column>
          <el-table-column prop="owner" label="负责人"></el-table-column>
          <el-table-column label="操作" width="120">
            <template v-slot="{ row }">
              <el-button icon="el-icon-user-solid" size="mini" type="text" @click="gotoApply([row.id])"></el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>

      <!-- 分页 -->
      <pagination
        v-show="total>0"
        :total="total"
        :page.sync="queryParams.pageNum"
        :limit.sync="queryParams.pageSize"
        @pagination="getList"
      />
    </div>

  </div>
</template>

<script>
import { listBackup } from "@/api/service/backup";

export default {
  name: 'BackupMgr',
  data() {
    return {
      loading: false,
      total: 0,
      queryParams: {
        backupSoftware: '',
        clientName: '',
        pageNum: 0,
        pageSize: 10
      },
      tableData: [
        // { backupSoftware: 'NetBackup', softwareVersion: '9.1.0.1', clientName: 'swtkvb5quvc', backupContent: 'SQL Server', backupIP: '10.122.145.53', appName: '--', platform: 'Linux', owner: 'zhangxy90@lenovo.com' }
      ],
      selectedRows: []
    };
  },
  mounted() {
    this.getList()
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
    getList() {
      this.loading = true
      listBackup(this.queryParams).then((resp) => {
        this.tableData = resp.rows
        this.total = resp.total;
        this.loading = false;
      })
    },
    handleSelectionChange (e) {
      this.selectedRows = e
    },
    gotoApply(ids) {
      ids = ids || this.selectedRows.map((r) => r.id)
      if (!ids.length) {
        this.$message.warning("未勾选内容，请先选择需要授权的内容！")
        return
      }
      this.$router.push({ path: 'applyDetail', query: { ids: ids } })
    },
    goto(path, id) {
      this.$router.push({ path, query: { id } })
    },
    reset() {
      this.queryParams = {
        backupSoftware: '',
        clientName: '',
        pageNum: 0,
        pageSize: 10
      }
    },
    createBackup() {
      this.goto('CreateBackup')
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
