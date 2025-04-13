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
      <el-pagination class="pagination" background layout="prev, pager, next" :total="30"></el-pagination>
    </el-card>
    <div class="panel-container" style="padding: 24px; margin-top: 10px">
      <el-row class="form-item">
        <el-col :span="3" class="form-title">
          <b style="color: red">* </b><b>授权用户：</b>
        </el-col>
        <el-col :span="21">
          <el-select style="width: 500px" size="small" v-model="grantUser">
            <el-option v-for="u in userList" :label="u.name" :key="u.id" :value="u.name" />
          </el-select>
        </el-col>
      </el-row>
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
            type="datetimerange"
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
        <el-button @click="back" size="small" type="primary">取消</el-button>
        <el-button @click="submit" size="small" type="success">提交</el-button>
      </el-row>
    </div>
  </div>
</template>

<script>
import { applyPermission } from '@/api/review/apply'
import { getBackup } from "@/api/service/backup"
import { GRANT_BACKUP_PERMISSION } from '@/views/common/config'

const EXPIRATION_FOREVER = 1
const EXPIRATION_TEMPORARY = 2

export default {
  name: "grant",
  data: function () {
    return {
      EXPIRATION_FOREVER,
      EXPIRATION_TEMPORARY,
      tableData: [],
      expiration: EXPIRATION_FOREVER,
      dateRange: undefined,
      reason: undefined,
      grantUser: undefined,
      userList: [{ name: 'Aaa', id: 1},{ name: 'Baa', id: 2}],
      backupList: [{
        id: 1,
        backupSoftware: 'Veeam',
        clientName: 'swtx9ltz7mq',
        backupContent: 'SQL Server',
        appName: '--',
        backupIP: '10.122.145.38',
        platform: 'Linux',
        owner: 'wangk7@lenovo.com'
      },
        {
          id: 2,
          backupSoftware: 'Veeam',
          clientName: 'swtx9ltz7mq',
          backupContent: 'MySQL',
          appName: '--',
          backupIP: '10.122.145.39',
          platform: 'Linux',
          owner: 'wangk7@lenovo.com'
        }]
    }
  },
  computed: {
    user: function () {
      return this.$store.getters.user
    }
  },
  mounted() {
    const id = this.$route.query.id
    this.getDetailById(id)
  },
  methods: {
    getDetailById(id) {
      getBackup(id).then(resp => {
        this.backupList = [resp.data]
      })
    },
    submit() {
      console.log(this.user)
      const data = {
        backupIds: this.backupList.map((b) => b.id),
        appType: GRANT_BACKUP_PERMISSION,
        grantUser: this.grantUser,
        remark: this.reason,
        expiration: this.expiration,
      }
      if (this.expiration === EXPIRATION_TEMPORARY) {
        data['startTime'] = this.dateRange[0]
        data['endTime'] = this.dateRange[1]
      }
      applyPermission(data).then(() => {
        this.$message.success('申请提交成功!')
        this.$router.push({ path: '/review' })
      })

    },
    back() {
      history.back()
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
