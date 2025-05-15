<template>
  <div class="container">
    <div class="panel-container">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="代办任务" name="todo">
          <TaskList />
        </el-tab-pane>
        <el-tab-pane label="已完成的任务" name="done">
          <TaskList task-type="done"/>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import TaskList from './TaskList'

export default {
  name: "index",
  data: function () {
    return {
      activeName: 'todo',
    }
  },
  mounted() {
    this.activeName = this.$route.query.taskType || this.$cache.local.get('taskTab') || 'todo'
  },
  components: {
    TaskList
  },
  methods: {
    handleClick(e) {
      this.$cache.local.set('taskTab', e.name)
    },
  }
}
</script>

<style scoped>

</style>
