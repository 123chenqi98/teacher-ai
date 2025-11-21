// 图表实例
import {objectives} from "@/data/user/goalManagement/TargetData.ts";
import * as echarts from 'echarts'

let progressChart: echarts.ECharts | null = null
// 初始化图表
const initCharts = () => {
    // 进度概览图
    const progressChartElement = document.getElementById('progressChart')
    if (progressChartElement) {
        progressChart = echarts.init(progressChartElement)
        const option = {
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow'
                }
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: [
                {
                    type: 'category',
                    data: objectives.value.map(obj => obj.title),
                    axisTick: {
                        alignWithLabel: true
                    }
                }
            ],
            yAxis: [
                {
                    type: 'value',
                    max: 100,
                    axisLabel: {
                        formatter: '{value}%'
                    }
                }
            ],
            series: [
                {
                    name: '目标进度',
                    type: 'bar',
                    barWidth: '60%',
                    data: objectives.value.map(obj => obj.progress),
                    itemStyle: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                            { offset: 0, color: '#83bff6' },
                            { offset: 0.5, color: '#188df0' },
                            { offset: 1, color: '#188df0' }
                        ])
                    },
                    emphasis: {
                        itemStyle: {
                            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                                { offset: 0, color: '#2378f7' },
                                { offset: 0.7, color: '#2378f7' },
                                { offset: 1, color: '#83bff6' }
                            ])
                        }
                    }
                }
            ]
        }
        progressChart.setOption(option)
    }
}

// 窗口大小改变时重置图表
const resizeCharts = () => {
    if (progressChart) {
        progressChart.resize()
    }
}

export {
    initCharts,
    resizeCharts
}
