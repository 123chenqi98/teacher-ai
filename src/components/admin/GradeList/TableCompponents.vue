<!-- 表格组件 -->

<script setup lang="ts">
import { ref, computed } from 'vue'
import { ElTable, ElTableColumn, ElButton, ElPagination, ElDivider } from 'element-plus'
import '@/assets/admin/Grade/TableCss.css'
import tableData from '@/data/admin/GradeTableData'

// 输入标签
const input = ref<string[]>()
// 分页相关
const currentPage = ref(1)
const pageSize = ref(5)
const total = computed(() => tableData.value.length)

// 分页显示的数据
const paginatedData = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value
  const end = start + pageSize.value
  return tableData.value.slice(start, end)
})

// 分页处理方法
const handleSizeChange = (val: number) => {
  pageSize.value = val
  currentPage.value = 1 // 重置到第一页
}
// 分页切换方法
const handleCurrentChange = (val: number) => {
  currentPage.value = val
}

// 操作方法
const handleEdit = (row: any) => {
  console.log('编辑:', row)
}

const handleDelete = (row: any) => {
  console.log('删除:', row)
}


</script>

<template>
    <div class="search-input">
        <el-input-tag v-model="input" placeholder="请输入学期"/>
        <el-button class="search-button" type="primary">搜索</el-button>
        <el-button >重置</el-button>

    </div>
  <div style="padding: 20px">
    <el-button type="primary">新增</el-button>
    <el-button>导入</el-button>
    <el-button>导出</el-button>
    <el-divider />
    
    <!-- 表格 -->
    <el-table 
      :data="paginatedData" 
      style="width: 100%; border: 1px solid #dcdfe6"
      :border="true"
      :header-cell-style="{backgroundColor: '#f5f7fa', color: '#303133'}"
    >
      <el-table-column prop="date" label="学期代码" width="300" align="center" />
      <el-table-column prop="name" label="学期名称" width="300" align="center" />
      <el-table-column prop="startTime" label="开始时间" width="300" align="center" />
      <el-table-column prop="endTime" label="结束时间" width="300" align="center" />
      <el-table-column label="操作" width="288" align="center">
        <!-- 操作按钮 -->
        <template #default="scope">
          <el-button class="edit-button" size="small" @click="handleEdit(scope)">
            编辑
          </el-button>
          <el-button class="delete-button" size="small" @click="handleDelete(scope)">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页组件 -->
    <div class="pagination-wrapper">
      <el-pagination
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        :page-sizes="[5, 10, 20, 50]"
        :total="total"
        layout="total, sizes, prev, pager, next, jumper"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>



