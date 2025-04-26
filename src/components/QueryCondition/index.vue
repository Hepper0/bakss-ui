<template>
  <span>
    <el-col :span="22">
      <el-row v-for="c in conditionList" style="display: flex;">
        <condition v-show="c.valid" style="width: 93%" @update="onConditionChange($event, c)"/>
         <el-button
           v-show="c.id !== 0 && c.valid"
           style="width: 5%"
           type="text"
           size="mini"
           @click="remove(c.id)"
         >
           <i class="el-icon-minus" style="font-weight: 1200" />
         </el-button>
      </el-row>
    </el-col>
    <el-col :span="1">
      <el-button
        type="text"
        size="mini"
        @click="append()"
      >
        <i class="el-icon-plus" style="font-weight: 1200" />
      </el-button>
    </el-col>
  </span>
</template>

<script>
import Condition from "./condition";
export default {
  name: "index",
  components: {Condition},
  data: function () {
    return {
      idx: 1,
      conditionList: [{ id: 0, type: undefined, value: undefined, valid: true}],
      queryParams: {
        id: undefined,
        backupSoftware: undefined,
        appType: undefined,
        clientName: undefined,
        backupIP: undefined,
        appName: undefined,
        platform: undefined,
      }
    }
  },
  methods: {
    append() {
      this.conditionList.push({ id: this.idx, type: undefined, value: undefined, valid: true })
      this.idx++
      console.log('condition list', this.conditionList)
    },
    remove(id) {
      console.log('remove', id)
      const t = this.conditionList.find(c => c.id === id)
      if (t) t.valid = false
    },
    onConditionChange(e, condition) {
      condition.type = e.type
      condition.value = e.value
      const params = {}
      this.conditionList.forEach(c => params[c.type] = c.value)
      this.$emit('update', params)
    }
  }
}
</script>

<style scoped>

</style>
