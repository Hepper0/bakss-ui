<template>
  <div style="padding: 10px">
    <el-card>
      <div slot="header" class="clearfix">
        <span>需要授权的客户端列表</span>
      </div>
      <div class="panel-table-wrapper">
        <el-table :data="backupHistory" size="small">
          <el-table-column prop="backupSoftware" label="备份软件"></el-table-column>
          <el-table-column prop="client" label="客户端名称"></el-table-column>
          <el-table-column prop="backupType" label="备份内容"></el-table-column>
          <el-table-column prop="appName" label="应用名称"></el-table-column>
          <el-table-column prop="backupIP" label="备份IP"></el-table-column>
          <el-table-column prop="platform" label="操作系统类型" />
          <el-table-column prop="principal" label="负责人" />
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
          <el-select style="width: 500px" size="small">
            <el-option>A</el-option>
            <el-option>B</el-option>
          </el-select>
        </el-col>
      </el-row>
      <el-row class="form-item">
        <el-col :span="3" class="form-title">
          <b style="color: red">* </b><b>权限类型：</b>
        </el-col>
        <el-col :span="21">
          <el-button-group>
            <el-button size="small">永久</el-button>
            <el-button size="small">非永久</el-button>
          </el-button-group>
        </el-col>
      </el-row>
      <el-row class="form-item">
        <el-col :span="3" class="form-title">
          <b style="color: red">* </b><b>起止时间：</b>
        </el-col>
        <el-col :span="21">
          <el-date-picker
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
          <el-input style="width: 500px" type="textarea" :rows="5" />
        </el-col>
      </el-row>
      <el-row style="display: flex; justify-content: right">
        <el-button size="small" type="primary">取消</el-button>
        <el-button size="small" type="success">提交</el-button>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  name: "grant",
  methods: {}
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
