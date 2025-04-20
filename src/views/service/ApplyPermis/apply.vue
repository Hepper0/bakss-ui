<template>
  <div style="padding: 10px">
    <el-card>
      <div slot="header" class="clearfix">
        <span>需要授权的客户端列表</span>
      </div>
      <div class="panel-table-wrapper">
        <el-table :data="backupList" size="small">
          <el-table-column prop="backupSoftware" label="备份软件"></el-table-column>
          <el-table-column prop="clientName" label="客户端名称"></el-table-column>
          <el-table-column prop="backupContent" label="备份内容"></el-table-column>
          <el-table-column prop="appName" label="应用名称"></el-table-column>
          <el-table-column prop="backupIP" label="备份IP"></el-table-column>
          <el-table-column prop="platform" label="操作系统类型" />
          <el-table-column prop="owner" label="负责人" />
        </el-table>
      </div>
      <!-- 分页 -->
      <pagination
        v-show="total>0"
        :total="total"
        :page.sync="pageNum"
        :limit.sync="pageSize"
        @pagination="getList"
      />
    </el-card>
    <div class="panel-container" style="padding: 24px; margin-top: 10px">
      <el-row class="form-item">
        <el-col :span="3" class="form-title">
          <b style="color: red">* </b><b>权限类型：</b>
        </el-col>
        <el-col :span="21">
          <el-radio-group size="mini" v-model="expiration">
            <el-radio-button :label="EXPIRATION_FOREVER" name="forever">永久</el-radio-button>
            <el-radio-button :label="EXPIRATION_TEMPORARY" name="temporary">非永久</el-radio-button>
          </el-radio-group>
        </el-col>
      </el-row>
      <el-row class="form-item" v-show="expiration === EXPIRATION_TEMPORARY">
        <el-col :span="3" class="form-title">
          <b style="color: red">* </b><b>起止时间：</b>
        </el-col>
        <el-col :span="21">
          <el-date-picker
            v-model="dateRange"
            size="mini"
            type="daterange"
            range-separator="-"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            style="width: 500px"
          >
          </el-date-picker>
        </el-col>
      </el-row>
      <el-row class="form-item">
        <el-col :span="3" class="form-title">
          <b style="color: red">* </b><b>申请理由：</b>
        </el-col>
        <el-col :span="21">
          <el-input v-model="reason" style="width: 500px" type="textarea" :rows="5" />
        </el-col>
      </el-row>
      <el-row style="display: flex; justify-content: right">
        <el-button @click="backup" size="small" type="primary">取消</el-button>
        <el-button @click="submit" size="small" type="success">提交</el-button>
      </el-row>
    </div>
  </div>
</template>

<script>

import { listBackupByIds } from '@/api/service/backup'
import { applyPermission } from '@/api/review/apply'
import { APPLY_BACKUP_PERMISSION } from "@/views/common/config";
const EXPIRATION_FOREVER = 1
const EXPIRATION_TEMPORARY = 2

export default {
  name: "apply",
  data: function () {
    return {
      EXPIRATION_TEMPORARY,
      EXPIRATION_FOREVER,
      expiration: EXPIRATION_FOREVER,
      dateRange: undefined,
      reason: undefined,
      backupList: [
      //   {
      //   id: 1,
      //   backupSoftware: 'NetBackup',
      //   clientName: 'swtx9ltz7mq1',
      //   backupContent: 'SQL Server',
      //   appName: '--',
      //   backupIP: '10.122.145.38',
      //   platform: 'Linux',
      //   owner: 'wangk7@lenovo.com'
      // }, {
      //   id: 2,
      //   backupSoftware: 'NetBackup',
      //   clientName: 'swtx9ltz7mq2',
      //   backupContent: 'SQL Server',
      //   appName: '--',
      //   backupIP: '10.122.145.39',
      //   platform: 'Windows',
      //   owner: 'wangk8@lenovo.com'
      // }
      ],
      pageNum: 0,
      pageSize: 1,
      total: 0
    }
  },
  computed: {
    user: function () {
      return this.$store.getters.user
    },
    tableData: function () {
      return this.backupList.slice((this.pageNum - 1) * this.pageSize, this.pageNum * this.pageSize)
    }
  },
  mounted() {
    let ids = this.$route.query.ids
    if (typeof ids === 'string') {
      ids = [ids]
    }
    this.getDetailByIds(ids)
  },
  methods: {
    submit() {
      if (this.reason === undefined || this.reason === '') {
        this.$message.warning('请填写申请理由！')
        return
      }
      const data = {
        backupIds: this.backupList.map((b) => b.id),
        appType: APPLY_BACKUP_PERMISSION,
        grantUser: this.user.name,  // 本人申请
        remark: this.reason,
        expiration: this.expiration
      }
      if (this.expiration === EXPIRATION_TEMPORARY) {
        if (this.dateRange && this.dateRange.length === 2) {
          data['startTime'] = this.dateRange[0]
          data['endTime'] = this.dateRange[1]
        } else {
          this.$message.warning('未选择起止时间')
          return
        }
      }
      applyPermission(data).then(() => {
        this.$message.success('申请提交成功!')
        this.$router.push({ path: '/review' })
      })
    },
    getDetailByIds(ids) {
      let params = ids.map(id => 'ids='+id).join('&')
      listBackupByIds(params).then(resp => {
        this.backupList = resp.rows
        this.total = resp.total
        // this.pageSize = this.total
      })
    },
    backup() {
      history.back()
    },
    getList() {

    }
  }
}
</script>

<style scoped>
.form-title {
  font-family: 'Microsoft YaHei', sans-serif;
  font-size: 14px;
  text-align: right;
  margin-top: 5px
}

.form-item {
  padding: 10px;
}

</style>
