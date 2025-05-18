<template>
  <div class="backup-management">
    <div class="panel-container">
      <!-- 搜索栏 -->
      <el-row :gutter="10">
        <el-col :span="10">
          <query-condition @update="(params) => this.queryParams = params"/>
<!--          <el-select style="width: 30%;margin-right: 15px" size="mini" clearable v-model="queryParams.backupSoftware" placeholder="请选择">-->
<!--            <el-option label="ID" value="ID"></el-option>-->
<!--            <el-option label="NetWorker" value="NetWorker"></el-option>-->
<!--          </el-select>-->
<!--          <el-input style="width: 60%" size="mini" v-model="queryParams.clientName" placeholder="请输入" clearable></el-input>-->
        </el-col>
        <el-col :span="12" class="search-buttons">
          <el-button size="mini" @click="getList" type="primary" icon="el-icon-search">搜索</el-button>
          <el-button size="mini" @click="reset" icon="el-icon-refresh">重置</el-button>
          <el-button size="mini" @click="createBackup" type="success">创建备份</el-button>
          <el-button size="mini" @click="gotoApply">申请备份管理员权限</el-button>
        </el-col>
      </el-row>
    </div>

    <div class="panel-container">
      <!-- 备份管理表格 -->
      <div class="panel-table-wrapper" style="background-color: #f1f1f1">
        <el-table v-loading="loading" size="small" :data="tableData" @selection-change="handleSelectionChange" stripe>
          <el-table-column type="selection" width="45"></el-table-column>
          <el-table-column prop="backupSoftware" label="备份软件"></el-table-column>
          <el-table-column prop="softwareVersion" label="软件版本"></el-table-column>
          <el-table-column prop="clientName" label="客户端名称"></el-table-column>
          <el-table-column prop="backupContent" label="备份内容"></el-table-column>
          <el-table-column prop="vCenter" label="VCenter主机名"></el-table-column>
          <el-table-column prop="backupIP" label="备份IP"></el-table-column>
          <el-table-column prop="appName" label="应用名称"></el-table-column>
          <el-table-column prop="platform" label="操作系统类型"></el-table-column>
          <el-table-column prop="owner" label="负责人"></el-table-column>
          <el-table-column label="操作" width="150">
            <template v-slot="{ row }">
              <el-tooltip class="item" effect="dark" content="编辑" placement="top-start">
                <el-button icon="el-icon-edit" size="mini" type="text" @click="editRow(row)"></el-button>
              </el-tooltip>
              <el-tooltip class="item" effect="dark" content="授权" placement="top-start">
                <el-button icon="el-icon-key" size="mini" type="text" @click="goto('backup/grant', row.id)"></el-button>
              </el-tooltip>
              <el-tooltip class="item" effect="dark" content="管理授权用户" placement="top-start">
                <el-button disabled icon="el-icon-s-custom" size="mini" type="text" @click="gotoApplyDetail([row.id])"></el-button>
              </el-tooltip>
              <el-tooltip class="item" effect="dark" content="更多操作" placement="top-start">
                <el-button icon="el-icon-more" size="mini" type="text" @click="goto('backup/more', row.id)"></el-button>
              </el-tooltip>
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
    <!-- 添加或修改Veeam服务器对话框 -->
    <el-dialog title="编辑备份" :visible.sync="open" width="1000px">
      <el-form ref="form" :model="form" :rules="rules" label-width="100px" style="padding: 0 30px">
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="备份软件" prop="backupSoftware">
              <el-input disabled v-model="form.backupSoftware" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="备份内容" prop="backupContent">
              <el-input disabled v-model="form.backupContent"/>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="备份类型" prop="jobType">
              <el-input disabled v-model="form.backType" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="备份IP" prop="backupIP">
              <el-input disabled v-model="form.backupIP" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="Master IP" prop="MasterIp">
              <el-input disabled v-model="form.backupIP" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="任务名称" prop="taskName">
              <el-input disabled v-model="form.appName" placeholder="请输入" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="环境" prop="env">
              <el-select style="width: 100%" v-model="form.env">
                <el-option label="Linux" value="Linux"></el-option>
                <el-option label="Windows" value="Windows"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="操作系统" prop="platform">
              <el-select style="width: 100%" v-model="form.platform"></el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="管理员" prop="manager">
              <el-select style="width: 100%" v-model="form.manager"></el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="负责人" prop="principal">
              <el-select style="width: 100%" v-model="form.principal"></el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>

import { myBackup } from "@/api/service/backup"
import QueryCondition from "@/components/QueryCondition"

export default {
  name: 'BackupMgr',
  data() {
    return {
      open: false,
      loading: false,
      total: 0,
      queryParams: {
        backupSoftware: '',
        clientName: '',
        pageNum: 0,
        pageSize: 10
      },
      tableData: [
        // { id: 1, backupSoftware: 'NetBackup', softwareVersion: '9.1.0.1', clientName: 'swtx9ltz7mq', backupContent: 'SQL Server', backupIP: '10.122.145.38', appName: '--', platform: 'Linux', owner: 'wangk7@lenovo.com' },
        // { id: 2, backupSoftware: 'NetBackup', softwareVersion: '9.1.0.1', clientName: 'swtkvb5quvc', backupContent: 'SQL Server', backupIP: '10.122.145.53', appName: '--', platform: 'Linux', owner: 'zhangxy90@lenovo.com' }
      ],
      selectedRows: [],
      form: {},
      rules: {}
    };
  },
  components: {
    QueryCondition
  },
  mounted() {
    this.getList()
  },
  methods: {
    editRow(row) {
      this.$message.info(`编辑 ${row.clientName}`);
      this.open = true
      this.form = row
    },
    handleCommand(command) {
      if (command === 'delete') {
        this.$message.warning('删除操作未实现');
      } else if (command === 'view') {
        this.$message.info('查看详情未实现');
      }
    },
    gotoApply() {
      const ids = this.selectedRows.map((r) => r.id)
      if (!ids.length) {
        this.$message.warning("未勾选内容，请先选择需要授权的内容！")
        return
      }
      if (!this.validate()) return
      this.gotoApplyDetail(ids)
    },
    validate() {
      const softSet = new Set(this.selectedRows.map(s => s.backupSoftware))
      if (softSet.size > 1) {
        this.$message.error("不允许同时勾选多种类型的备份！ " + [...softSet])
        return false
      }
        const noOwnerBackupList = this.selectedRows.filter(s => s.owner === undefined || s.owner === null || s.owner === '')
      if (noOwnerBackupList.length > 0) {
        this.$message.error("不允许给未分配负责人的备份分配权限！")
        return false
      }
      const ownerSet = new Set(this.selectedRows.filter(s => s.owner).map(s => s.owner))
      if (ownerSet.size > 1) {
        this.$message.error("不允许同时勾选不同负责人的备份！ " + [...ownerSet])
        return false
      }
      return true
    },
    goto(path, id) {
      this.$router.push({ path, query: { id } })
    },
    gotoApplyDetail(ids) {
      this.$router.push({ path: 'applyDetail', query: { ids } })
    },
    handleSelectionChange (e) {
      this.selectedRows = e
    },
    getList() {
      this.loading = true
      myBackup(this.queryParams).then((resp) => {
        this.tableData = resp.rows
        this.total = resp.total;
        this.loading = false;
      })
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
      this.goto('create')
    },
    submitForm() {

    },
    cancel() {
      this.open = false
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
