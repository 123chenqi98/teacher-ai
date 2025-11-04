<template>
  <div class="permission-tree">
    <div class="tree-header">
      <el-button size="small" @click="handleSelectAll">全选</el-button>
      <el-button size="small" @click="handleUnselectAll">反选</el-button>
      <el-button size="small" @click="handleExpandAll">展开全部</el-button>
      <el-button size="small" @click="handleCollapseAll">收起全部</el-button>
    </div>
    <el-tree
      ref="treeRef"
      :data="permissionTree"
      :props="defaultProps"
      show-checkbox
      node-key="id"
      :default-expand-all="defaultExpandAll"
      :default-checked-keys="defaultCheckedKeys"
      @check="handleCheck"
    >
      <template #default="{ node, data }">
        <span class="tree-node">
          <span class="node-label">{{ node.label }}</span>
          <span class="node-code" v-if="data.code">({{ data.code }})</span>
          <el-tag
            v-if="data.type"
            :type="data.type === 'menu' ? 'primary' : 'success'"
            size="small"
            style="margin-left: 8px"
          >
            {{ data.type === 'menu' ? '菜单' : '按钮' }}
          </el-tag>
        </span>
      </template>
    </el-tree>
    
    <!-- 权限预览 -->
    <div class="permission-preview" v-if="previewVisible">
      <h4>已选权限预览：</h4>
      <div class="preview-content">
        <el-tag
          v-for="permission in selectedPermissions"
          :key="permission.id"
          style="margin: 4px"
        >
          {{ permission.label }}
        </el-tag>
        <div v-if="selectedPermissions.length === 0" style="color: #999; padding: 10px;">
          暂无选中权限
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, computed } from 'vue';
import type { ElTree } from 'element-plus';
import type { PermissionNode } from '@/types/role';

const props = defineProps<{
  permissionTree: PermissionNode[];
  defaultCheckedKeys?: (number | string)[];
  defaultExpandAll?: boolean;
  previewVisible?: boolean;
}>();

const emit = defineEmits<{
  (e: 'change', checkedKeys: (number | string)[], checkedNodes: PermissionNode[]): void;
}>();

const treeRef = ref<InstanceType<typeof ElTree>>();
const defaultProps = {
  children: 'children',
  label: 'label'
};

// 获取所有节点ID（用于全选）
const getAllNodeIds = (nodes: PermissionNode[]): (number | string)[] => {
  const ids: (number | string)[] = [];
  const traverse = (nodeList: PermissionNode[]) => {
    nodeList.forEach(node => {
      ids.push(node.id);
      if (node.children && node.children.length > 0) {
        traverse(node.children);
      }
    });
  };
  traverse(nodes);
  return ids;
};

// 全选
const handleSelectAll = () => {
  const allIds = getAllNodeIds(props.permissionTree);
  treeRef.value?.setCheckedKeys(allIds);
};

// 反选
const handleUnselectAll = () => {
  treeRef.value?.setCheckedKeys([]);
};

// 展开全部
const handleExpandAll = () => {
  const allNodes = treeRef.value?.store._getAllNodes() || [];
  allNodes.forEach(node => {
    node.expanded = true;
  });
};

// 收起全部
const handleCollapseAll = () => {
  const allNodes = treeRef.value?.store._getAllNodes() || [];
  allNodes.forEach(node => {
    node.expanded = false;
  });
};

// 树节点选中变化
const handleCheck = (data: PermissionNode, checked: { checkedKeys: (number | string)[]; checkedNodes: PermissionNode[] }) => {
  emit('change', checked.checkedKeys, checked.checkedNodes);
};

// 选中的权限节点
const selectedPermissions = computed(() => {
  if (!treeRef.value) return [];
  const checkedNodes = treeRef.value.getCheckedNodes(true, false) as PermissionNode[];
  return checkedNodes;
});

// 监听默认选中keys变化，更新树选中状态
watch(() => props.defaultCheckedKeys, (keys) => {
  if (keys && keys.length > 0 && treeRef.value) {
    treeRef.value.setCheckedKeys(keys);
  }
}, { immediate: true });

// 暴露方法供父组件调用
defineExpose({
  getCheckedKeys: () => treeRef.value?.getCheckedKeys() || [],
  getCheckedNodes: () => treeRef.value?.getCheckedNodes(true, false) || [],
  setCheckedKeys: (keys: (number | string)[]) => treeRef.value?.setCheckedKeys(keys),
  clearChecked: () => treeRef.value?.setCheckedKeys([])
});
</script>

<style scoped>
.permission-tree {
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  padding: 10px;
}

.tree-header {
  margin-bottom: 10px;
  padding-bottom: 10px;
  border-bottom: 1px solid #ebeef5;
}

.tree-header .el-button {
  margin-right: 10px;
}

.tree-node {
  display: flex;
  align-items: center;
  flex: 1;
}

.node-label {
  font-weight: 500;
}

.node-code {
  color: #909399;
  font-size: 12px;
  margin-left: 8px;
}

.permission-preview {
  margin-top: 20px;
  padding-top: 20px;
  border-top: 1px solid #ebeef5;
}

.permission-preview h4 {
  margin: 0 0 10px 0;
  font-size: 14px;
  font-weight: 500;
}

.preview-content {
  max-height: 200px;
  overflow-y: auto;
  padding: 10px;
  background-color: #f5f7fa;
  border-radius: 4px;
}
</style>

