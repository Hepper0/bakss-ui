<template>
  <div class="backup-management">
    <div class="panel-container">
      <!-- 搜索栏 -->
      <el-row :gutter="10">
        <el-col :span="6">
          <el-select size="mini" clearable v-model="column" placeholder="请选择">
            <el-option label="ID" value="ID"></el-option>
            <el-option label="NetWorker" value="NetWorker"></el-option>
          </el-select>
        </el-col>
        <el-col :span="6">
          <el-input size="mini" v-model="data" placeholder="请输入" clearable></el-input>
        </el-col>
        <el-col :span="12" class="search-buttons">
          <el-button size="mini" @click="getList" type="primary" icon="el-icon-search">搜索</el-button>
          <el-button size="mini" icon="el-icon-refresh">重置</el-button>
        </el-col>
      </el-row>
    </div>

    <div class="panel-container">
      <!-- 备份管理表格 -->
      <div class="panel-table-wrapper" style="background-color: #f1f1f1">
        <el-table :data="tableData" stripe>
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column prop="id" label="ID"></el-table-column>
          <el-table-column prop="backupSoftware" label="备份软件"></el-table-column>
          <el-table-column prop="appType" label="申请类型">
            <template v-slot="{ row }">
              <span>{{ APPLY_TYPE[row.appType] }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="appUser" label="申请人"></el-table-column>
          <el-table-column prop="reviewStatus" label="审批状态">
            <template v-slot="{ row }">
              <span v-if="row.status === CANCEL_APPLICATION" style="color: rgb(205 197 195)">撤销申请</span>
              <span v-else :style="{ color: reviewColor[row.reviewStatus] }">{{ reviewStatus[row.reviewStatus] }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="backupStatus" label="执行状态">
            <template v-slot="{ row }">
              <span :style="{ color: backupColor[row.backupStatus] }">{{ backupStatus[row.backupStatus] }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="createTime" label="创建日期"></el-table-column>
          <el-table-column label="操作" width="120">
            <template v-slot="{ row }">
              <el-button icon="el-icon-document" size="mini" type="text" @click="gotoDetail(row)"></el-button>
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
import { listApplication } from '@/api/application/application'
import { APPLY_TYPE, CANCEL_APPLICATION, getComponentType } from '@/views/common/config'

const reviewStatus = ['待审批', '审批同意', '审批不同意']
const reviewColor = ['#ffba00', '#42d885', '#ff4949']
const backupStatus = ['待执行', '执行中', '执行成功', '执行失败']
const backupColor = ['rgb(205 197 195)', '#ffba00', '#42d885', '#ff4949']

export default {
  name: 'application',
  data: function() {
    return {
      reviewStatus,
      reviewColor,
      CANCEL_APPLICATION,
      APPLY_TYPE,
      backupStatus,
      backupColor,
      column: undefined,
      data: undefined,
      queryParams: {
        appUser: undefined,
        pageNum: 0,
        pageSize: 10
      },
      tableData: [
        // { backupFile: 'NetBackup', softwareVersion: '9.1.0.1', clientName: 'swtx9ltz7mq', backupContent: 'SQL Server', backupIP: '10.122.145.38', appName: '--', platform: 'Linux', owner: 'wangk7@lenovo.com' },
        // { backupFile: 'NetBackup', softwareVersion: '9.1.0.1', clientName: 'swtkvb5quvc', backupContent: 'SQL Server', backupIP: '10.122.145.53', appName: '--', platform: 'Linux', owner: 'zhangxy90@lenovo.com' }
      ],
      total: 0,
    };
  },
  computed: {
    user: function () {
      return this.$store.getters.user
    },
  },
  mounted() {
    this.getList()
  },
  methods: {
    getList() {
      this.queryParams.appUser = this.user.name
      listApplication(this.queryParams).then(resp => {
        this.tableData = resp.rows
        this.total = resp.total
      })
    },
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
      this.$router.push({ path: '/application/detail', query: { id: row.id, taskType: getComponentType(row.appType) } })
    },
    reset() {
      this.data = undefined
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
