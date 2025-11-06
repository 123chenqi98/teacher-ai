<script setup lang="ts">
import { ref, onMounted, watch, onBeforeUnmount } from 'vue';
import * as echarts from 'echarts';
import { openModal } from '@/utils/modal';
import FeatureHelpModal from '@/components/modals/FeatureHelpModal.vue';

// 组件props
const props = defineProps({
  title: {
    type: String,
    default: '分类统计报表'
  },
  description: {
    type: String,
    default: '多维度分析数据分布与趋势'
  }
});

// 状态管理
const loading = ref(false);
const chartType = ref<'bar' | 'line' | 'pie'>('bar'); // 明确指定图表类型
const categoryType = ref('subject'); // subject, grade, region, device
const timeRange = ref('month'); // week, month, quarter, year
const dateRange = ref<Date[] | null>(null); // 日期范围选择
 
const statisticsData = ref<any[]>([]);
const chartData = ref<any[]>([]);
const topData = ref<any[]>([]);

// 引用
const mainChartRef = ref<HTMLDivElement | null>(null);
const distributionChartRef = ref<HTMLDivElement | null>(null);
let mainChart: echarts.ECharts | null = null;
let distributionChart: echarts.ECharts | null = null;

// 图表配置
const chartTypes = [
  { label: '柱状图', value: 'bar' },
  { label: '折线图', value: 'line' },
  { label: '饼图', value: 'pie' }
];

const categoryTypes = [
  { label: '学科分类', value: 'subject' },
  { label: '年级分布', value: 'grade' },
  { label: '区域分布', value: 'region' },
  { label: '设备使用', value: 'device' }
];

const timeRanges = [
  { label: '最近一周', value: 'week' },
  { label: '最近一月', value: 'month' },
  { label: '最近一季度', value: 'quarter' },
  { label: '最近一年', value: 'year' }
];

// 模拟数据生成函数
const generateMockData = () => {
  const mockData: any = {
    subject: [
      { name: '语文', 总使用量: 980, 平均分数: 85.6, 参与人数: 1250, 完成率: 0.92 },
      { name: '数学', 总使用量: 1200, 平均分数: 78.9, 参与人数: 1430, 完成率: 0.89 },
      { name: '英语', 总使用量: 1050, 平均分数: 82.3, 参与人数: 1320, 完成率: 0.91 },
      { name: '物理', 总使用量: 780, 平均分数: 76.4, 参与人数: 980, 完成率: 0.85 },
      { name: '化学', 总使用量: 720, 平均分数: 79.2, 参与人数: 910, 完成率: 0.87 },
      { name: '生物', 总使用量: 650, 平均分数: 81.5, 参与人数: 830, 完成率: 0.88 }
    ],
    grade: [
      { name: '高一', 总使用量: 1800, 平均分数: 80.2, 参与人数: 2100, 完成率: 0.86 },
      { name: '高二', 总使用量: 2100, 平均分数: 78.5, 参与人数: 2350, 完成率: 0.89 },
      { name: '高三', 总使用量: 2400, 平均分数: 82.7, 参与人数: 2580, 完成率: 0.93 }
    ],
    region: [
      { name: '华东', 总使用量: 1250, 平均分数: 83.6, 参与人数: 1520, 完成率: 0.82 },
      { name: '华南', 总使用量: 980, 平均分数: 81.2, 参与人数: 1200, 完成率: 0.81 },
      { name: '华北', 总使用量: 1450, 平均分数: 84.3, 参与人数: 1780, 完成率: 0.81 },
      { name: '西南', 总使用量: 750, 平均分数: 79.8, 参与人数: 920, 完成率: 0.82 },
      { name: '东北', 总使用量: 620, 平均分数: 80.5, 参与人数: 780, 完成率: 0.80 }
    ],
    device: [
      { name: 'PC端', 总使用量: 2800, 平均分数: 82.3, 参与人数: 3200, 完成率: 0.87 },
      { name: '移动端', 总使用量: 3200, 平均分数: 80.1, 参与人数: 4100, 完成率: 0.78 },
      { name: '平板', 总使用量: 950, 平均分数: 81.7, 参与人数: 1120, 完成率: 0.85 }
    ]
  };
  
  return mockData[categoryType.value];
};

// 处理数据格式化
const formatDataForChart = () => {
  const data = statisticsData.value;
  
  // 提取前5名用于主图表
  const sortedData = [...data].sort((a, b) => b.总使用量 - a.总使用量);
  chartData.value = sortedData.slice(0, 5);
  
  // 提取全部用于分布图表
  topData.value = sortedData;
  
  renderMainChart();
  renderDistributionChart();
};

// 渲染主图表
const renderMainChart = () => {
  if (!mainChartRef.value || chartData.value.length === 0) return;
  
  if (!mainChart) {
    mainChart = echarts.init(mainChartRef.value);
  }
  
  const categories = chartData.value.map(item => item.name);
  const values = chartData.value.map(item => item.总使用量);
  
  const option: echarts.EChartsOption = {
    backgroundColor: 'transparent',
    tooltip: {
      trigger: 'axis',
      backgroundColor: 'rgba(255, 255, 255, 0.95)',
      borderColor: '#ddd',
      textStyle: {
        color: '#333'
      }
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    }
  };
  
  if (chartType.value === 'pie') {
    option.series = [{
      type: 'pie',
      radius: ['40%', '70%'],
      center: ['50%', '50%'],
      avoidLabelOverlap: false,
      label: {
        show: false,
        position: 'center'
      },
      emphasis: {
        label: {
          show: true,
          fontSize: '18',
          fontWeight: 'bold',
          color: '#333'
        }
      },
      labelLine: {
        show: false
      },
      data: categories.map((name, index) => ({
        value: values[index],
        name,
        itemStyle: {
          color: getChartColor(index)
        }
      }))
    }];
  } else {
    option.xAxis = {
      type: 'category',
      data: categories,
      axisLabel: {
        color: 'var(--color-muted)',
        rotate: 45
      },
      axisLine: {
        lineStyle: {
          color: 'var(--color-border)'
        }
      }
    };
    option.yAxis = {
      type: 'value',
      axisLabel: {
        color: 'var(--color-muted)'
      },
      splitLine: {
        lineStyle: {
          color: 'var(--color-border)',
          type: 'dashed'
        }
      }
    };
    option.series = [{
      type: chartType.value,
      data: values,
      smooth: chartType.value === 'line',
      itemStyle: {
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          { offset: 0, color: '#b99cff' },
          { offset: 1, color: '#7c4dff' }
        ])
      },
      areaStyle: chartType.value === 'line' ? {
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          { offset: 0, color: 'rgba(124, 77, 255, 0.3)' },
          { offset: 1, color: 'rgba(124, 77, 255, 0.05)' }
        ])
      } : undefined
    }];
  }
  
  mainChart.setOption(option);
};

// 渲染分布图表
const renderDistributionChart = () => {
  if (!distributionChartRef.value || topData.value.length === 0) return;
  
  if (!distributionChart) {
    distributionChart = echarts.init(distributionChartRef.value);
  }
  
  const categories = topData.value.map(item => item.name);
  const completionRates = topData.value.map(item => (item.完成率 * 100).toFixed(1));
  
  const option: echarts.EChartsOption = {
    backgroundColor: 'transparent',
    tooltip: {
      trigger: 'axis',
      backgroundColor: 'rgba(255, 255, 255, 0.95)',
      borderColor: '#ddd',
      formatter: (params: any) => {
        const data = params[0];
        const item = topData.value[data.dataIndex];
        return `${item.name}<br/>完成率: ${completionRates[data.dataIndex]}%<br/>参与人数: ${item.参与人数}`;
      }
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      data: categories,
      axisLabel: {
        color: 'var(--color-muted)',
        rotate: 45
      },
      axisLine: {
        lineStyle: {
          color: 'var(--color-border)'
        }
      }
    },
    yAxis: {
      type: 'value',
      max: 100,
      axisLabel: {
        color: 'var(--color-muted)',
        formatter: '{value}%'
      },
      splitLine: {
        lineStyle: {
          color: 'var(--color-border)',
          type: 'dashed'
        }
      }
    },
    series: [{
      type: 'bar',
      data: completionRates,
      itemStyle: {
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          { offset: 0, color: '#d9c8ff' },
          { offset: 1, color: '#b99cff' }
        ]),
        borderRadius: [4, 4, 0, 0]
      }
    }]
  };
  
  distributionChart.setOption(option);
};

// 获取图表颜色
const getChartColor = (index: number) => {
  const colors = [
    '#7c4dff', '#b99cff', '#d9c8ff', '#3a2d5b', '#2b2246',
    '#6d4cda', '#a385e0', '#c2aefa', '#5a418f', '#4a3876'
  ];
  return colors[index % colors.length];
};

// 获取进度条颜色
const getProgressColor = (rate: number) => {
  if (rate >= 0.9) return '#67c23a';
  if (rate >= 0.7) return '#e6a23c';
  return '#f56c6c';
};

// 打开详情
const openDetail = (row: any) => {
  openModal(FeatureHelpModal, {
    featureName: `${row.name}详情`,
    description: `查看${row.name}的详细统计数据，当前为演示弹窗。`
  });
};

// 导出单项数据
const exportItem = (row: any) => {
  openModal(FeatureHelpModal, {
    featureName: `导出${row.name}数据`,
    description: `导出${row.name}的统计数据，当前为演示弹窗。`
  });
};

// 刷新数据
const refreshData = () => {
  loading.value = true;
  
  // 模拟API请求延迟
  setTimeout(() => {
    statisticsData.value = generateMockData();
    formatDataForChart();
    loading.value = false;
  }, 500);
};

// 导出报表
const exportReport = () => {
  openModal(FeatureHelpModal, {
    featureName: '导出报表',
    description: '报表导出功能将把当前数据导出为Excel格式，当前为演示弹窗。'
  });
};

// 打印报表
const printReport = () => {
  openModal(FeatureHelpModal, {
    featureName: '打印报表',
    description: '报表打印功能将当前统计数据生成打印视图，当前为演示弹窗。'
  });
};

// 图表缩放处理
const handleResize = () => {
  // 响应式调整图表大小
  const isMobile = window.innerWidth < 768;
  const isTablet = window.innerWidth < 1024 && window.innerWidth >= 768;
  
  // 调整图表容器高度
  if (mainChartRef.value) {
    mainChartRef.value.style.height = isMobile ? '200px' : isTablet ? '250px' : '320px';
  }
  if (distributionChartRef.value) {
    distributionChartRef.value.style.height = isMobile ? '200px' : isTablet ? '250px' : '320px';
  }
  
  mainChart?.resize();
  distributionChart?.resize();
};

// 监听变化
watch([chartType, categoryType, timeRange, dateRange], () => {
  refreshData();
});

// 生命周期
onMounted(() => {
  refreshData();
  // 初始渲染时应用响应式尺寸
  handleResize();
  // 使用节流优化resize事件
  let resizeTimer: number;
  const throttledResize = () => {
    clearTimeout(resizeTimer);
    resizeTimer = window.setTimeout(handleResize, 200);
  };
  window.addEventListener('resize', throttledResize);
  
  // 存储清理函数引用，以便在卸载时调用
  const cleanup = () => {
    window.removeEventListener('resize', throttledResize);
    mainChart?.dispose();
    distributionChart?.dispose();
  };
  
  // 监听组件卸载
  onBeforeUnmount(() => cleanup());
});

onBeforeUnmount(() => {
  window.removeEventListener('resize', handleResize);
  mainChart?.dispose();
  distributionChart?.dispose();
});
</script>

<template>
  <div class="category-statistics elevated-card">
    <!-- 报表标题与操作区 -->
    <div class="report-header">
      <div class="title-section">
        <h2 class="section-title purple-gradient-text">{{ props.title }}</h2>
        <p class="description">{{ props.description }}</p>
      </div>
      <div class="action-buttons">
        <el-button size="small" type="primary" :loading="loading" @click="refreshData">
          <el-icon><Refresh /></el-icon>
          <span class="btn-text">刷新数据</span>
        </el-button>
        <el-button size="small" @click="exportReport">
          <el-icon><Download /></el-icon>
          <span class="btn-text">导出报表</span>
        </el-button>
        <el-button size="small" @click="printReport">
          <el-icon><Printer /></el-icon>
          <span class="btn-text">打印报表</span>
        </el-button>
      </div>
    </div>
    
    <!-- 筛选条件区 -->
    <div class="filter-section">
      <el-row :gutter="12" align="middle">
        <el-col :xs="24" :sm="12" :md="8" :lg="6">
          <el-select v-model="categoryType" placeholder="选择分类类型" style="width: 100%">
            <el-option 
              v-for="item in categoryTypes" 
              :key="item.value" 
              :label="item.label" 
              :value="item.value" 
            />
          </el-select>
        </el-col>
        <el-col :xs="24" :sm="12" :md="8" :lg="6">
          <el-select v-model="chartType" placeholder="图表类型" style="width: 100%">
            <el-option 
              v-for="item in chartTypes" 
              :key="item.value" 
              :label="item.label" 
              :value="item.value" 
            />
          </el-select>
        </el-col>
        <el-col :xs="24" :sm="12" :md="8" :lg="6">
          <el-select v-model="timeRange" placeholder="时间范围" style="width: 100%">
            <el-option 
              v-for="item in timeRanges" 
              :key="item.value" 
              :label="item.label" 
              :value="item.value" 
            />
          </el-select>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="6">
          <el-date-picker
            v-model="dateRange"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            style="width: 100%"
          />
        </el-col>
      </el-row>
    </div>
    
    <!-- 图表展示区 -->
    <div class="charts-section">
      <el-row :gutter="16">
        <el-col :xs="24" :md="12">
          <div class="chart-card elevated-card">
            <h3 class="chart-title">TOP5 使用量统计</h3>
            <div ref="mainChartRef" class="chart-container"></div>
          </div>
        </el-col>
        <el-col :xs="24" :md="12">
          <div class="chart-card elevated-card">
            <h3 class="chart-title">完成率分布</h3>
            <div ref="distributionChartRef" class="chart-container"></div>
          </div>
        </el-col>
      </el-row>
    </div>
    
    <!-- 数据卡片区 -->
    <div class="data-cards">
      <el-row :gutter="16">
        <el-col :xs="24" :sm="12" :md="6">
          <div class="data-card elevated-card">
            <div class="card-content">
              <div class="card-label">总使用量</div>
              <div class="card-value">{{ statisticsData.reduce((sum, item) => sum + item.总使用量, 0).toLocaleString() }}</div>
              <div class="card-change">较上期 <span class="positive">+12.5%</span></div>
            </div>
          </div>
        </el-col>
        <el-col :xs="24" :sm="12" :md="6">
          <div class="data-card elevated-card">
            <div class="card-content">
              <div class="card-label">平均参与人数</div>
              <div class="card-value">{{ Math.round(statisticsData.reduce((sum, item) => sum + item.参与人数, 0) / (statisticsData.length || 1)).toLocaleString() }}</div>
              <div class="card-change">较上期 <span class="positive">+8.3%</span></div>
            </div>
          </div>
        </el-col>
        <el-col :xs="24" :sm="12" :md="6">
          <div class="data-card elevated-card">
            <div class="card-content">
              <div class="card-label">平均完成率</div>
              <div class="card-value">{{ ((statisticsData.reduce((sum, item) => sum + item.完成率, 0) / (statisticsData.length || 1)) * 100).toFixed(1) }}%</div>
              <div class="card-change">较上期 <span class="positive">+2.1%</span></div>
            </div>
          </div>
        </el-col>
        <el-col :xs="24" :sm="12" :md="6">
          <div class="data-card elevated-card">
            <div class="card-content">
              <div class="card-label">平均分数</div>
              <div class="card-value">{{ (statisticsData.reduce((sum, item) => sum + item.平均分数, 0) / (statisticsData.length || 1)).toFixed(1) }}</div>
              <div class="card-change">较上期 <span class="negative">-1.2%</span></div>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
    
    <!-- 数据表格区 -->
    <div class="table-section">
      <div class="table-card elevated-card">
        <el-table 
          :data="statisticsData" 
          size="small" 
          stripe 
          :loading="loading"
          style="width: 100%"
        >
          <el-table-column prop="name" label="分类名称" min-width="120" />
          <el-table-column prop="总使用量" label="总使用量" min-width="100" sortable>
            <template #default="{ row }">
              <span>{{ row.总使用量.toLocaleString() }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="平均分数" label="平均分数" min-width="100" sortable>
            <template #default="{ row }">
              <span>{{ row.平均分数.toFixed(1) }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="参与人数" label="参与人数" min-width="100" sortable>
            <template #default="{ row }">
              <span>{{ row.参与人数.toLocaleString() }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="完成率" label="完成率" min-width="100" sortable>
            <template #default="{ row }">
              <el-progress 
                :percentage="(row.完成率 * 100).toFixed(1)" 
                :format="() => `${(row.完成率 * 100).toFixed(1)}%`" 
                :color="getProgressColor(row.完成率)"
                :stroke-width="14"
                size="small"
              />
            </template>
          </el-table-column>
          <el-table-column label="操作" min-width="120" fixed="right">
            <template #default="{ row }">
              <el-button size="small" type="primary" plain @click="openDetail(row)">
                详情
              </el-button>
              <el-button size="small" type="info" plain @click="exportItem(row)">
                导出
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<style scoped>
.category-statistics {
  padding: 16px;
}

.report-header {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  gap: 15px;
}

.title-section {
  flex: 1;
  min-width: 200px;
}

.section-title {
  font-size: 20px;
  font-weight: 600;
  margin: 0;
  margin-bottom: 4px;
  background: linear-gradient(135deg, #722ED1 0%, #9254DE 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.description {
  color: var(--color-muted);
  margin: 0;
  font-size: 14px;
}

.action-buttons {
  display: flex;
  gap: 8px;
  margin-top: 10px;
}

.filter-section {
  margin-bottom: 20px;
  padding: 16px;
  background: var(--color-surface);
  border-radius: 8px;
  border: 1px solid var(--color-border);
}

.charts-section {
  margin-bottom: 20px;
}

.chart-card {
  padding: 16px;
  height: 100%;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.chart-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.chart-title {
  font-size: 16px;
  font-weight: 600;
  margin: 0 0 16px 0;
  color: var(--color-text);
}

.chart-container {
  height: 320px;
}

.data-cards {
  margin-bottom: 20px;
}

.data-card {
  padding: 16px;
  height: 100%;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.data-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.card-content {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.card-label {
  font-size: 14px;
  color: var(--color-muted);
  margin-bottom: 8px;
}

.card-value {
  font-size: 28px;
  font-weight: 600;
  color: var(--color-text);
  margin-bottom: 4px;
}

.card-change {
  font-size: 14px;
  color: var(--color-muted);
}

.positive {
  color: #67c23a;
}

.negative {
  color: #f56c6c;
}

.table-section {
  margin-bottom: 20px;
}

.table-card {
  padding: 16px;
  overflow-x: auto;
}

/* 响应式设计 */
@media (max-width: 1024px) {
  .report-header {
    flex-direction: column;
    align-items: flex-start;
  }
  
  .action-buttons {
    align-self: flex-end;
  }
  
  .chart-container {
    height: 300px;
  }
}

@media (max-width: 768px) {
  .report-header {
    flex-direction: column;
    align-items: flex-start;
  }
  
  .action-buttons {
    width: 100%;
    justify-content: flex-start;
    flex-wrap: wrap;
  }
  
  .action-buttons .el-button {
    flex: 1;
    justify-content: center;
  }
  
  .btn-text {
    display: none;
  }
  
  .chart-container {
    height: 250px;
  }
  
  .card-value {
    font-size: 24px;
  }
}

@media (max-width: 480px) {
  .category-statistics {
    padding: 12px;
  }
  
  .chart-container {
    height: 200px;
  }
  
  .section-title {
    font-size: 18px;
  }
  
  .card-value {
    font-size: 20px;
  }
  
  :deep(.el-table__row) {
    font-size: 14px;
  }
  
  :deep(.el-table th),
  :deep(.el-table td) {
    padding: 8px;
  }
}

/* 辅助样式 */
:deep(.el-select),
:deep(.el-date-editor) {
  width: 100%;
}

:deep(.el-select:focus-within),
:deep(.el-date-editor:focus-within) {
  box-shadow: 0 0 0 2px rgba(114, 46, 209, 0.1);
}

/* 优化表格响应式 */
@media (max-width: 768px) {
  .table-card {
    padding: 8px;
    overflow-x: auto;
  }
  
  .table-section {
    margin-bottom: 16px;
  }
}
</style>