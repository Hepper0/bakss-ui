<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="server" prop="server">
        <el-select
          :default-first-option="true"
          v-model="queryParams.server"
          clearable
          @keyup.enter.native="handleQuery"
        >
          <el-option v-for="(item, index) in serverOptions" :key="index" :label="item.label"
                     :value="item.value"></el-option>
        </el-select>
      </el-form-item>
<!--      <el-form-item label="仓库名" prop="name">-->
<!--        <el-input-->
<!--          v-model="queryParams.name"-->
<!--          placeholder="请输入"-->
<!--          clearable-->
<!--          @keyup.enter.native="handleQuery"-->
<!--        />-->
<!--      </el-form-item>-->
<!--      <el-form-item label="路径" prop="path">-->
<!--        <el-input-->
<!--          v-model="queryParams.path"-->
<!--          placeholder="请输入"-->
<!--          clearable-->
<!--          @keyup.enter.native="handleQuery"-->
<!--        />-->
<!--      </el-form-item>-->
<!--      <el-form-item label="域名" prop="hostName">-->
<!--        <el-input-->
<!--          v-model="queryParams.hostName"-->
<!--          placeholder="请输入"-->
<!--          clearable-->
<!--          @keyup.enter.native="handleQuery"-->
<!--        />-->
<!--      </el-form-item>-->
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>

    <el-row :gutter="10" class="mb8" v-show="false">
      <el-col :span="1.5">
        <el-button
          type="primary"
          plain
          icon="el-icon-plus"
          size="mini"
          @click="handleAdd"
          v-hasPermi="['system:repository:add']"
        >新增</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="success"
          plain
          icon="el-icon-edit"
          size="mini"
          :disabled="single"
          @click="handleUpdate"
          v-hasPermi="['system:repository:edit']"
        >修改</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="danger"
          plain
          icon="el-icon-delete"
          size="mini"
          :disabled="multiple"
          @click="handleDelete"
          v-hasPermi="['system:repository:remove']"
        >删除</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="repositoryList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="ID" align="center" prop="ID" />
      <el-table-column label="名称" align="center" prop="name" />
      <el-table-column label="类型" align="center" prop="type" />
      <el-table-column label="HostId" align="center" prop="hostId" />
      <el-table-column label="选项" align="center" prop="options" />
      <el-table-column label="空闲空间" align="center" prop="freeSpace" />
      <el-table-column label="总空间" align="center" prop="totalSpace" />
      <el-table-column label="扩展类型" align="center" prop="extentType" />
      <el-table-column label="状态" align="center" prop="status" />
      <el-table-column label="路径" align="center" prop="path" />
      <el-table-column label="域名" align="center" prop="hostName" />
      <el-table-column label="父仓库ID" align="center" prop="parentRepId" />
      <el-table-column label="挂载HostId" align="center" prop="mountHostId" />
      <el-table-column v-show="false" label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['system:repository:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['system:repository:remove']"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    />

    <!-- 添加或修改仓库对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="ID" prop="ID">
          <el-input disabled v-model="form.ID" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="仓库名" prop="name">
          <el-input v-model="form.name" placeholder="请输入" />
        </el-form-item>
        <el-form-item disabled label="hostId" prop="hostId">
          <el-input v-model="form.hostId" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="空闲空间" prop="freeSpace">
          <el-input v-model="form.freeSpace" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="总空间" prop="totalSpace">
          <el-input v-model="form.totalSpace" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="描述" prop="description">
          <el-input v-model="form.description" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="路径" prop="path">
          <el-input v-model="form.path" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="域名" prop="hostName">
          <el-input v-model="form.hostName" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="父仓库ID" prop="parentRepId">
          <el-input v-model="form.parentRepId" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="" prop="isRotatedDriveRepository">
          <el-input v-model="form.isRotatedDriveRepository" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="" prop="mountHostId">
          <el-input v-model="form.mountHostId" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="" prop="optionsSet">
          <el-input v-model="form.optionsSet" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="" prop="extendOptionsSet">
          <el-input v-model="form.extendOptionsSet" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="" prop="enableBackupImmutability">
          <el-input v-model="form.enableBackupImmutability" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="" prop="immutabilityPeriod">
          <el-input v-model="form.immutabilityPeriod" placeholder="请输入" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { listRepository, getRepositoryDetail, deleteRepository } from "@/api/veeam/repo";
import { listConfig } from "@/api/veeam/basic"

export default {
  name: "Repository",
  data() {
    return {
      // 遮罩层
      loading: true,
      // 选中数组
      ids: [],
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      // 显示搜索条件
      showSearch: true,
      // 总条数
      total: 0,
      // 仓库表格数据
      repositoryList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        server: undefined,
        ID: null,
        type: null,
        hostId: null,
        extentType: null,
        status: null,
        name: null,
        path: null,
        hostName: null,
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
      },
      serverOptions: []
    };
  },
  created() {
    // this.getList();
  },
  mounted() {
    listConfig().then(resp => {
      this.serverOptions = resp.rows.filter(r => r.status).map(r => {
        return { label: r.hostname, value: `http://${r.ip}:${r.port}` }
      })
      this.refreshRepositoryData()
    })
  },
  methods: {
    /** 查询仓库列表 */
    getList() {
      this.loading = true;
      listRepository(1, 0, this.queryParams.server).then(response => {
        this.repositoryList = response.rows;
        this.total = response.total;
        this.loading = false;
      });
    },
    // 取消按钮
    cancel() {
      this.open = false;
      this.reset();
    },
    // 表单重置
    reset() {
      this.form = {
        ID: null,
        type: null,
        hostId: null,
        options: null,
        freeSpace: null,
        totalSpace: null,
        extentType: null,
        status: null,
        name: null,
        description: null,
        path: null,
        hostName: null,
        parentRepId: null,
        isRotatedDriveRepository: null,
        mountHostId: null,
        optionsSet: null,
        extendOptionsSet: null,
        enableBackupImmutability: null,
        immutabilityPeriod: null
      };
      this.resetForm("form");
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.pageNum = 1;
      this.getList();
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.resetForm("queryForm");
      this.handleQuery();
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map(item => item.ID)
      this.single = selection.length!==1
      this.multiple = !selection.length
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "添加仓库";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const ID = row.ID || this.ids
      getRepository(ID).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改仓库";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.ID != null) {
            updateRepository(this.form).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addRepository(this.form).then(response => {
              this.$modal.msgSuccess("新增成功");
              this.open = false;
              this.getList();
            });
          }
        }
      });
    },
    /** 删除按钮操作 */
    handleDelete(row) {
      const IDs = row.ID || this.ids;
      this.$modal.confirm('是否确认删除仓库编号为"' + IDs + '"的数据项？').then(function() {
        return delRepository(IDs);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => {});
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('system/repository/export', {
        ...this.queryParams
      }, `repository_${new Date().getTime()}.xlsx`)
    },
    refreshRepositoryData() {
      const reqList = []
      this.serverOptions.forEach(o => {
        reqList.push(listRepository(1, 0, o.value))
      })
      const repositoryList = []
      this.loading = true
      Promise.all(reqList).then((resp) => {
        this.loading = false
        resp.forEach(r => {
          repositoryList.push(...r.data)
        })
        this.repositoryList = repositoryList
        this.total = repositoryList.length
      }).catch(e => this.loading = false)
    }
  }
};
</script>
