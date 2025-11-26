import {nextTick} from "vue";
import * as echarts from "echarts";
import {
    activityData, comprehensiveTrendData, resourceDistributionData,
    taskCompletionData,
    usageTrendData
} from "@/data/user/analyticsDashboardData/AnalyticsDashboardData.ts";

const initCharts = () => {
    // 确保DOM已经渲染后再初始化图表
    nextTick(() => {
        // 使用时长趋势图
        const usageTrendChart = echarts.init(document.getElementById('usageTrendChart')!)
        usageTrendChart.setOption({
            tooltip: {trigger: 'axis'},
            xAxis: {
                type: 'category',
                data: usageTrendData.value.map(item => item.name),
                axisLabel: {
                    color: '#666'
                }
            },
            yAxis: {
                type: 'value',
                axisLabel: {
                    color: '#666'
                }
            },
            series: [{
                type: 'line',
                data: usageTrendData.value.map(item => item.value),
                smooth: true,
                itemStyle: {
                    color: '#409eff'
                },
                areaStyle: {
                    color: '#409eff',
                    opacity: 0.3
                }
            }]
        })

        // 任务完成情况饼图
        const taskCompletionChart = echarts.init(document.getElementById('taskCompletionChart')!)
        taskCompletionChart.setOption({
            tooltip: {trigger: 'item'},
            series: [{
                type: 'pie',
                radius: ['50%', '70%'],
                data: taskCompletionData.value,
                emphasis: {
                    itemStyle: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                },
                label: {
                    show: true,
                    formatter: '{b}: {d}%'
                }
            }]
        })

        // 活跃度分析柱状图
        const activityChart = echarts.init(document.getElementById('activityChart')!)
        activityChart.setOption({
            tooltip: {trigger: 'axis'},
            xAxis: {
                type: 'category',
                data: activityData.value.map(item => item.name),
                axisLabel: {
                    color: '#666'
                }
            },
            yAxis: {
                type: 'value',
                axisLabel: {
                    color: '#666'
                }
            },
            series: [{
                type: 'bar',
                data: activityData.value.map(item => item.value),
                itemStyle: {
                    color: '#67c23a'
                }
            }]
        })

        // 资源使用分布饼图
        const resourceDistributionChart = echarts.init(document.getElementById('resourceDistributionChart')!)
        resourceDistributionChart.setOption({
            tooltip: {trigger: 'item'},
            series: [{
                type: 'pie',
                radius: ['50%', '70%'],
                data: resourceDistributionData.value,
                emphasis: {
                    itemStyle: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                },
                label: {
                    show: true,
                    formatter: '{b}: {d}%'
                }
            }]
        })

        // 综合指标趋势对比折线图
        const comprehensiveTrendChart = echarts.init(document.getElementById('comprehensiveTrendChart')!)
        comprehensiveTrendChart.setOption({
            tooltip: {trigger: 'axis'},
            legend: {
                data: comprehensiveTrendData.value.map(item => item.name),
                top: 'bottom'
            },
            xAxis: {
                type: 'category',
                data: ['1月', '2月', '3月', '4月', '5月'],
                axisLabel: {
                    color: '#666'
                }
            },
            yAxis: {
                type: 'value',
                axisLabel: {
                    color: '#666'
                }
            },
            series: comprehensiveTrendData.value.map((item, index) => {
                const colors = ['#409eff', '#67c23a', '#e6a23c']
                return {
                    name: item.name,
                    type: 'line',
                    data: item.values,
                    smooth: true,
                    itemStyle: {
                        color: colors[index]
                    }
                }
            })
        })
    }).then()
}

export { initCharts }