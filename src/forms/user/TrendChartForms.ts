import {ref, onMounted, nextTick, onBeforeUnmount} from "vue";
import { trendData } from "@/data/user/userDashboardData/TrendChartData.ts";
import * as echarts from 'echarts';

// 关键修复：用 ref 绑定图表容器（Vue 推荐方式，避免 DOM 查找失败）
export const chartRef = ref<HTMLDivElement | null>(null);
let myChart: echarts.ECharts | null = null;
const resizeHandler = () => {
    if (myChart) {
        myChart.resize();
    }
};

// 初始化图表函数（抽离为独立函数，便于复用和容错）
export const initChart = () => {
    // 容错：如果容器不存在，直接返回
    if (!chartRef.value) {
        console.warn('图表容器未找到');
        return;
    }

    // 销毁已有实例（避免重复初始化）
    if (myChart) {
        myChart.dispose();
    }

    // 初始化图表实例
    myChart = echarts.init(chartRef.value);

    // 图表配置项（简化配置，确保基础渲染）
    const option: echarts.EChartsOption = {
        tooltip: {
            trigger: 'axis',
            textStyle: { fontSize: 12 },
            padding: 8
        },
        legend: {
            top: 0,
            textStyle: { fontSize: 12 },
            itemWidth: 10,
            itemHeight: 10
        },
        grid: {
            top: 30,
            left: '5%',
            right: '5%',
            bottom: 30,
            containLabel: true
        },
        xAxis: {
            type: 'category',
            data: trendData.value.dates,
            axisLabel: { fontSize: 11, color: '#6b7280' },
            axisLine: { lineStyle: { color: '#e5e7eb' } },
            splitLine: { show: false }
        },
        yAxis: {
            type: 'value',
            axisLabel: { fontSize: 11, color: '#6b7280' },
            axisLine: { lineStyle: { color: '#e5e7eb' } },
            splitLine: { lineStyle: { color: '#f3f4f6' } }
        },
        series: trendData.value.series.map((series) => ({
            name: series.name,
            type: 'line',
            data: series.data,
            lineStyle: { color: series.color, width: 2 },
            itemStyle: { color: series.color },
            symbol: 'circle', // 统一图标，避免复杂配置
            symbolSize: 4,
            smooth: true,
            areaStyle: { color: series.color, opacity: 0.1 }
        }))
    };

    // 应用配置项（容错处理）
    try {
        myChart.setOption(option);
        // 验证：打印图表实例，确认初始化成功
        console.log('图表初始化成功', myChart);
    } catch (error) {
        console.error('图表配置错误', error);
    }
};
export default initChart

// 提供组合式函数，在组件内调用以注册生命周期
export const setupTrendChart = () => {
    onMounted(() => {
        nextTick(() => {
            initChart();
        });
        window.addEventListener('resize', resizeHandler);
    });
    onBeforeUnmount(() => {
        window.removeEventListener('resize', resizeHandler);
        if (myChart) {
            myChart.dispose();
            myChart = null;
        }
    });
};
