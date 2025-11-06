// 分类统计报表数据处理工具

// 数据类型定义
export interface StatisticsItem {
  name: string;
  [key: string]: any;
}

export interface CategoryData {
  [category: string]: StatisticsItem[];
}

export interface TimeRangeData {
  [range: string]: CategoryData;
}

// 模拟数据生成函数
export const generateComprehensiveData = (): TimeRangeData => {
  // 生成基于时间范围的数据变化
  const generateTimeBasedValue = (base: number, range: string) => {
    const multipliers = {
      week: 0.8,
      month: 1.0,
      quarter: 1.5,
      year: 2.5
    };
    return Math.floor(base * (multipliers[range as keyof typeof multipliers] || 1.0));
  };

  // 生成随机变化的数值
  const varyValue = (value: number, variation: number = 0.1) => {
    return value * (1 + (Math.random() - 0.5) * variation);
  };

  const data: TimeRangeData = {
    week: {
      subject: [
        { name: '语文', 总使用量: generateTimeBasedValue(280, 'week'), 平均分数: varyValue(85.6), 参与人数: generateTimeBasedValue(420, 'week'), 完成率: varyValue(0.92, 0.05) },
        { name: '数学', 总使用量: generateTimeBasedValue(320, 'week'), 平均分数: varyValue(78.9), 参与人数: generateTimeBasedValue(480, 'week'), 完成率: varyValue(0.89, 0.05) },
        { name: '英语', 总使用量: generateTimeBasedValue(300, 'week'), 平均分数: varyValue(82.3), 参与人数: generateTimeBasedValue(440, 'week'), 完成率: varyValue(0.91, 0.05) },
        { name: '物理', 总使用量: generateTimeBasedValue(220, 'week'), 平均分数: varyValue(76.4), 参与人数: generateTimeBasedValue(320, 'week'), 完成率: varyValue(0.85, 0.05) },
        { name: '化学', 总使用量: generateTimeBasedValue(200, 'week'), 平均分数: varyValue(79.2), 参与人数: generateTimeBasedValue(300, 'week'), 完成率: varyValue(0.87, 0.05) },
        { name: '生物', 总使用量: generateTimeBasedValue(180, 'week'), 平均分数: varyValue(81.5), 参与人数: generateTimeBasedValue(280, 'week'), 完成率: varyValue(0.88, 0.05) },
        { name: '历史', 总使用量: generateTimeBasedValue(150, 'week'), 平均分数: varyValue(83.2), 参与人数: generateTimeBasedValue(240, 'week'), 完成率: varyValue(0.90, 0.05) },
        { name: '地理', 总使用量: generateTimeBasedValue(160, 'week'), 平均分数: varyValue(80.8), 参与人数: generateTimeBasedValue(250, 'week'), 完成率: varyValue(0.86, 0.05) },
        { name: '政治', 总使用量: generateTimeBasedValue(140, 'week'), 平均分数: varyValue(82.7), 参与人数: generateTimeBasedValue(220, 'week'), 完成率: varyValue(0.89, 0.05) }
      ],
      grade: [
        { name: '初一', 总使用量: generateTimeBasedValue(520, 'week'), 平均分数: varyValue(81.5), 参与人数: generateTimeBasedValue(680, 'week'), 完成率: varyValue(0.76, 0.05) },
        { name: '初二', 总使用量: generateTimeBasedValue(580, 'week'), 平均分数: varyValue(79.8), 参与人数: generateTimeBasedValue(750, 'week'), 完成率: varyValue(0.78, 0.05) },
        { name: '初三', 总使用量: generateTimeBasedValue(650, 'week'), 平均分数: varyValue(83.2), 参与人数: generateTimeBasedValue(820, 'week'), 完成率: varyValue(0.79, 0.05) },
        { name: '高一', 总使用量: generateTimeBasedValue(620, 'week'), 平均分数: varyValue(80.2), 参与人数: generateTimeBasedValue(780, 'week'), 完成率: varyValue(0.81, 0.05) },
        { name: '高二', 总使用量: generateTimeBasedValue(700, 'week'), 平均分数: varyValue(78.5), 参与人数: generateTimeBasedValue(880, 'week'), 完成率: varyValue(0.83, 0.05) },
        { name: '高三', 总使用量: generateTimeBasedValue(800, 'week'), 平均分数: varyValue(82.7), 参与人数: generateTimeBasedValue(980, 'week'), 完成率: varyValue(0.87, 0.05) }
      ],
      region: [
        { name: '华东', 总使用量: generateTimeBasedValue(380, 'week'), 平均分数: varyValue(83.6), 参与人数: generateTimeBasedValue(480, 'week'), 完成率: varyValue(0.82, 0.05) },
        { name: '华南', 总使用量: generateTimeBasedValue(320, 'week'), 平均分数: varyValue(81.2), 参与人数: generateTimeBasedValue(400, 'week'), 完成率: varyValue(0.81, 0.05) },
        { name: '华北', 总使用量: generateTimeBasedValue(420, 'week'), 平均分数: varyValue(84.3), 参与人数: generateTimeBasedValue(530, 'week'), 完成率: varyValue(0.81, 0.05) },
        { name: '西南', 总使用量: generateTimeBasedValue(250, 'week'), 平均分数: varyValue(79.8), 参与人数: generateTimeBasedValue(320, 'week'), 完成率: varyValue(0.82, 0.05) },
        { name: '东北', 总使用量: generateTimeBasedValue(200, 'week'), 平均分数: varyValue(80.5), 参与人数: generateTimeBasedValue(280, 'week'), 完成率: varyValue(0.80, 0.05) },
        { name: '西北', 总使用量: generateTimeBasedValue(180, 'week'), 平均分数: varyValue(78.9), 参与人数: generateTimeBasedValue(250, 'week'), 完成率: varyValue(0.79, 0.05) }
      ],
      device: [
        { name: 'PC端', 总使用量: generateTimeBasedValue(920, 'week'), 平均分数: varyValue(82.3), 参与人数: generateTimeBasedValue(1080, 'week'), 完成率: varyValue(0.87, 0.05) },
        { name: '移动端', 总使用量: generateTimeBasedValue(1050, 'week'), 平均分数: varyValue(80.1), 参与人数: generateTimeBasedValue(1360, 'week'), 完成率: varyValue(0.78, 0.05) },
        { name: '平板', 总使用量: generateTimeBasedValue(320, 'week'), 平均分数: varyValue(81.7), 参与人数: generateTimeBasedValue(380, 'week'), 完成率: varyValue(0.85, 0.05) }
      ]
    },
    month: {
      subject: [
        { name: '语文', 总使用量: generateTimeBasedValue(980, 'month'), 平均分数: varyValue(85.6), 参与人数: generateTimeBasedValue(1250, 'month'), 完成率: varyValue(0.92, 0.05) },
        { name: '数学', 总使用量: generateTimeBasedValue(1200, 'month'), 平均分数: varyValue(78.9), 参与人数: generateTimeBasedValue(1430, 'month'), 完成率: varyValue(0.89, 0.05) },
        { name: '英语', 总使用量: generateTimeBasedValue(1050, 'month'), 平均分数: varyValue(82.3), 参与人数: generateTimeBasedValue(1320, 'month'), 完成率: varyValue(0.91, 0.05) },
        { name: '物理', 总使用量: generateTimeBasedValue(780, 'month'), 平均分数: varyValue(76.4), 参与人数: generateTimeBasedValue(980, 'month'), 完成率: varyValue(0.85, 0.05) },
        { name: '化学', 总使用量: generateTimeBasedValue(720, 'month'), 平均分数: varyValue(79.2), 参与人数: generateTimeBasedValue(910, 'month'), 完成率: varyValue(0.87, 0.05) },
        { name: '生物', 总使用量: generateTimeBasedValue(650, 'month'), 平均分数: varyValue(81.5), 参与人数: generateTimeBasedValue(830, 'month'), 完成率: varyValue(0.88, 0.05) },
        { name: '历史', 总使用量: generateTimeBasedValue(550, 'month'), 平均分数: varyValue(83.2), 参与人数: generateTimeBasedValue(720, 'month'), 完成率: varyValue(0.90, 0.05) },
        { name: '地理', 总使用量: generateTimeBasedValue(580, 'month'), 平均分数: varyValue(80.8), 参与人数: generateTimeBasedValue(750, 'month'), 完成率: varyValue(0.86, 0.05) },
        { name: '政治', 总使用量: generateTimeBasedValue(520, 'month'), 平均分数: varyValue(82.7), 参与人数: generateTimeBasedValue(680, 'month'), 完成率: varyValue(0.89, 0.05) }
      ],
      grade: [
        { name: '初一', 总使用量: generateTimeBasedValue(1800, 'month'), 平均分数: varyValue(81.5), 参与人数: generateTimeBasedValue(2300, 'month'), 完成率: varyValue(0.76, 0.05) },
        { name: '初二', 总使用量: generateTimeBasedValue(2000, 'month'), 平均分数: varyValue(79.8), 参与人数: generateTimeBasedValue(2550, 'month'), 完成率: varyValue(0.78, 0.05) },
        { name: '初三', 总使用量: generateTimeBasedValue(2200, 'month'), 平均分数: varyValue(83.2), 参与人数: generateTimeBasedValue(2700, 'month'), 完成率: varyValue(0.79, 0.05) },
        { name: '高一', 总使用量: generateTimeBasedValue(1800, 'month'), 平均分数: varyValue(80.2), 参与人数: generateTimeBasedValue(2100, 'month'), 完成率: varyValue(0.81, 0.05) },
        { name: '高二', 总使用量: generateTimeBasedValue(2100, 'month'), 平均分数: varyValue(78.5), 参与人数: generateTimeBasedValue(2350, 'month'), 完成率: varyValue(0.83, 0.05) },
        { name: '高三', 总使用量: generateTimeBasedValue(2400, 'month'), 平均分数: varyValue(82.7), 参与人数: generateTimeBasedValue(2580, 'month'), 完成率: varyValue(0.87, 0.05) }
      ],
      region: [
        { name: '华东', 总使用量: generateTimeBasedValue(1250, 'month'), 平均分数: varyValue(83.6), 参与人数: generateTimeBasedValue(1520, 'month'), 完成率: varyValue(0.82, 0.05) },
        { name: '华南', 总使用量: generateTimeBasedValue(980, 'month'), 平均分数: varyValue(81.2), 参与人数: generateTimeBasedValue(1200, 'month'), 完成率: varyValue(0.81, 0.05) },
        { name: '华北', 总使用量: generateTimeBasedValue(1450, 'month'), 平均分数: varyValue(84.3), 参与人数: generateTimeBasedValue(1780, 'month'), 完成率: varyValue(0.81, 0.05) },
        { name: '西南', 总使用量: generateTimeBasedValue(750, 'month'), 平均分数: varyValue(79.8), 参与人数: generateTimeBasedValue(920, 'month'), 完成率: varyValue(0.82, 0.05) },
        { name: '东北', 总使用量: generateTimeBasedValue(620, 'month'), 平均分数: varyValue(80.5), 参与人数: generateTimeBasedValue(780, 'month'), 完成率: varyValue(0.80, 0.05) },
        { name: '西北', 总使用量: generateTimeBasedValue(580, 'month'), 平均分数: varyValue(78.9), 参与人数: generateTimeBasedValue(720, 'month'), 完成率: varyValue(0.79, 0.05) }
      ],
      device: [
        { name: 'PC端', 总使用量: generateTimeBasedValue(2800, 'month'), 平均分数: varyValue(82.3), 参与人数: generateTimeBasedValue(3200, 'month'), 完成率: varyValue(0.87, 0.05) },
        { name: '移动端', 总使用量: generateTimeBasedValue(3200, 'month'), 平均分数: varyValue(80.1), 参与人数: generateTimeBasedValue(4100, 'month'), 完成率: varyValue(0.78, 0.05) },
        { name: '平板', 总使用量: generateTimeBasedValue(950, 'month'), 平均分数: varyValue(81.7), 参与人数: generateTimeBasedValue(1120, 'month'), 完成率: varyValue(0.85, 0.05) }
      ]
    },
    quarter: {
      subject: [
        { name: '语文', 总使用量: generateTimeBasedValue(2800, 'quarter'), 平均分数: varyValue(85.6), 参与人数: generateTimeBasedValue(3500, 'quarter'), 完成率: varyValue(0.92, 0.05) },
        { name: '数学', 总使用量: generateTimeBasedValue(3200, 'quarter'), 平均分数: varyValue(78.9), 参与人数: generateTimeBasedValue(3800, 'quarter'), 完成率: varyValue(0.89, 0.05) },
        { name: '英语', 总使用量: generateTimeBasedValue(3000, 'quarter'), 平均分数: varyValue(82.3), 参与人数: generateTimeBasedValue(3600, 'quarter'), 完成率: varyValue(0.91, 0.05) },
        { name: '物理', 总使用量: generateTimeBasedValue(2200, 'quarter'), 平均分数: varyValue(76.4), 参与人数: generateTimeBasedValue(2800, 'quarter'), 完成率: varyValue(0.85, 0.05) },
        { name: '化学', 总使用量: generateTimeBasedValue(2100, 'quarter'), 平均分数: varyValue(79.2), 参与人数: generateTimeBasedValue(2600, 'quarter'), 完成率: varyValue(0.87, 0.05) },
        { name: '生物', 总使用量: generateTimeBasedValue(1800, 'quarter'), 平均分数: varyValue(81.5), 参与人数: generateTimeBasedValue(2300, 'quarter'), 完成率: varyValue(0.88, 0.05) },
        { name: '历史', 总使用量: generateTimeBasedValue(1600, 'quarter'), 平均分数: varyValue(83.2), 参与人数: generateTimeBasedValue(2000, 'quarter'), 完成率: varyValue(0.90, 0.05) },
        { name: '地理', 总使用量: generateTimeBasedValue(1700, 'quarter'), 平均分数: varyValue(80.8), 参与人数: generateTimeBasedValue(2100, 'quarter'), 完成率: varyValue(0.86, 0.05) },
        { name: '政治', 总使用量: generateTimeBasedValue(1500, 'quarter'), 平均分数: varyValue(82.7), 参与人数: generateTimeBasedValue(1900, 'quarter'), 完成率: varyValue(0.89, 0.05) }
      ],
      grade: [
        { name: '初一', 总使用量: generateTimeBasedValue(5200, 'quarter'), 平均分数: varyValue(81.5), 参与人数: generateTimeBasedValue(6500, 'quarter'), 完成率: varyValue(0.76, 0.05) },
        { name: '初二', 总使用量: generateTimeBasedValue(5800, 'quarter'), 平均分数: varyValue(79.8), 参与人数: generateTimeBasedValue(7200, 'quarter'), 完成率: varyValue(0.78, 0.05) },
        { name: '初三', 总使用量: generateTimeBasedValue(6500, 'quarter'), 平均分数: varyValue(83.2), 参与人数: generateTimeBasedValue(7800, 'quarter'), 完成率: varyValue(0.79, 0.05) },
        { name: '高一', 总使用量: generateTimeBasedValue(5600, 'quarter'), 平均分数: varyValue(80.2), 参与人数: generateTimeBasedValue(6800, 'quarter'), 完成率: varyValue(0.81, 0.05) },
        { name: '高二', 总使用量: generateTimeBasedValue(6000, 'quarter'), 平均分数: varyValue(78.5), 参与人数: generateTimeBasedValue(7300, 'quarter'), 完成率: varyValue(0.83, 0.05) },
        { name: '高三', 总使用量: generateTimeBasedValue(6800, 'quarter'), 平均分数: varyValue(82.7), 参与人数: generateTimeBasedValue(7600, 'quarter'), 完成率: varyValue(0.87, 0.05) }
      ],
      region: [
        { name: '华东', 总使用量: generateTimeBasedValue(3800, 'quarter'), 平均分数: varyValue(83.6), 参与人数: generateTimeBasedValue(4500, 'quarter'), 完成率: varyValue(0.82, 0.05) },
        { name: '华南', 总使用量: generateTimeBasedValue(3200, 'quarter'), 平均分数: varyValue(81.2), 参与人数: generateTimeBasedValue(3900, 'quarter'), 完成率: varyValue(0.81, 0.05) },
        { name: '华北', 总使用量: generateTimeBasedValue(4200, 'quarter'), 平均分数: varyValue(84.3), 参与人数: generateTimeBasedValue(5000, 'quarter'), 完成率: varyValue(0.81, 0.05) },
        { name: '西南', 总使用量: generateTimeBasedValue(2500, 'quarter'), 平均分数: varyValue(79.8), 参与人数: generateTimeBasedValue(3100, 'quarter'), 完成率: varyValue(0.82, 0.05) },
        { name: '东北', 总使用量: generateTimeBasedValue(2000, 'quarter'), 平均分数: varyValue(80.5), 参与人数: generateTimeBasedValue(2600, 'quarter'), 完成率: varyValue(0.80, 0.05) },
        { name: '西北', 总使用量: generateTimeBasedValue(1800, 'quarter'), 平均分数: varyValue(78.9), 参与人数: generateTimeBasedValue(2300, 'quarter'), 完成率: varyValue(0.79, 0.05) }
      ],
      device: [
        { name: 'PC端', 总使用量: generateTimeBasedValue(8200, 'quarter'), 平均分数: varyValue(82.3), 参与人数: generateTimeBasedValue(9500, 'quarter'), 完成率: varyValue(0.87, 0.05) },
        { name: '移动端', 总使用量: generateTimeBasedValue(9200, 'quarter'), 平均分数: varyValue(80.1), 参与人数: generateTimeBasedValue(11500, 'quarter'), 完成率: varyValue(0.78, 0.05) },
        { name: '平板', 总使用量: generateTimeBasedValue(2800, 'quarter'), 平均分数: varyValue(81.7), 参与人数: generateTimeBasedValue(3300, 'quarter'), 完成率: varyValue(0.85, 0.05) }
      ]
    },
    year: {
      subject: [
        { name: '语文', 总使用量: generateTimeBasedValue(9800, 'year'), 平均分数: varyValue(85.6), 参与人数: generateTimeBasedValue(12500, 'year'), 完成率: varyValue(0.92, 0.05) },
        { name: '数学', 总使用量: generateTimeBasedValue(12000, 'year'), 平均分数: varyValue(78.9), 参与人数: generateTimeBasedValue(14300, 'year'), 完成率: varyValue(0.89, 0.05) },
        { name: '英语', 总使用量: generateTimeBasedValue(10500, 'year'), 平均分数: varyValue(82.3), 参与人数: generateTimeBasedValue(13200, 'year'), 完成率: varyValue(0.91, 0.05) },
        { name: '物理', 总使用量: generateTimeBasedValue(7800, 'year'), 平均分数: varyValue(76.4), 参与人数: generateTimeBasedValue(9800, 'year'), 完成率: varyValue(0.85, 0.05) },
        { name: '化学', 总使用量: generateTimeBasedValue(7200, 'year'), 平均分数: varyValue(79.2), 参与人数: generateTimeBasedValue(9100, 'year'), 完成率: varyValue(0.87, 0.05) },
        { name: '生物', 总使用量: generateTimeBasedValue(6500, 'year'), 平均分数: varyValue(81.5), 参与人数: generateTimeBasedValue(8300, 'year'), 完成率: varyValue(0.88, 0.05) },
        { name: '历史', 总使用量: generateTimeBasedValue(5500, 'year'), 平均分数: varyValue(83.2), 参与人数: generateTimeBasedValue(7200, 'year'), 完成率: varyValue(0.90, 0.05) },
        { name: '地理', 总使用量: generateTimeBasedValue(5800, 'year'), 平均分数: varyValue(80.8), 参与人数: generateTimeBasedValue(7500, 'year'), 完成率: varyValue(0.86, 0.05) },
        { name: '政治', 总使用量: generateTimeBasedValue(5200, 'year'), 平均分数: varyValue(82.7), 参与人数: generateTimeBasedValue(6800, 'year'), 完成率: varyValue(0.89, 0.05) }
      ],
      grade: [
        { name: '初一', 总使用量: generateTimeBasedValue(18000, 'year'), 平均分数: varyValue(81.5), 参与人数: generateTimeBasedValue(23000, 'year'), 完成率: varyValue(0.76, 0.05) },
        { name: '初二', 总使用量: generateTimeBasedValue(20000, 'year'), 平均分数: varyValue(79.8), 参与人数: generateTimeBasedValue(25500, 'year'), 完成率: varyValue(0.78, 0.05) },
        { name: '初三', 总使用量: generateTimeBasedValue(22000, 'year'), 平均分数: varyValue(83.2), 参与人数: generateTimeBasedValue(27000, 'year'), 完成率: varyValue(0.79, 0.05) },
        { name: '高一', 总使用量: generateTimeBasedValue(18000, 'year'), 平均分数: varyValue(80.2), 参与人数: generateTimeBasedValue(21000, 'year'), 完成率: varyValue(0.81, 0.05) },
        { name: '高二', 总使用量: generateTimeBasedValue(21000, 'year'), 平均分数: varyValue(78.5), 参与人数: generateTimeBasedValue(23500, 'year'), 完成率: varyValue(0.83, 0.05) },
        { name: '高三', 总使用量: generateTimeBasedValue(24000, 'year'), 平均分数: varyValue(82.7), 参与人数: generateTimeBasedValue(25800, 'year'), 完成率: varyValue(0.87, 0.05) }
      ],
      region: [
        { name: '华东', 总使用量: generateTimeBasedValue(12500, 'year'), 平均分数: varyValue(83.6), 参与人数: generateTimeBasedValue(15200, 'year'), 完成率: varyValue(0.82, 0.05) },
        { name: '华南', 总使用量: generateTimeBasedValue(9800, 'year'), 平均分数: varyValue(81.2), 参与人数: generateTimeBasedValue(12000, 'year'), 完成率: varyValue(0.81, 0.05) },
        { name: '华北', 总使用量: generateTimeBasedValue(14500, 'year'), 平均分数: varyValue(84.3), 参与人数: generateTimeBasedValue(17800, 'year'), 完成率: varyValue(0.81, 0.05) },
        { name: '西南', 总使用量: generateTimeBasedValue(7500, 'year'), 平均分数: varyValue(79.8), 参与人数: generateTimeBasedValue(9200, 'year'), 完成率: varyValue(0.82, 0.05) },
        { name: '东北', 总使用量: generateTimeBasedValue(6200, 'year'), 平均分数: varyValue(80.5), 参与人数: generateTimeBasedValue(7800, 'year'), 完成率: varyValue(0.80, 0.05) },
        { name: '西北', 总使用量: generateTimeBasedValue(5800, 'year'), 平均分数: varyValue(78.9), 参与人数: generateTimeBasedValue(7200, 'year'), 完成率: varyValue(0.79, 0.05) }
      ],
      device: [
        { name: 'PC端', 总使用量: generateTimeBasedValue(28000, 'year'), 平均分数: varyValue(82.3), 参与人数: generateTimeBasedValue(32000, 'year'), 完成率: varyValue(0.87, 0.05) },
        { name: '移动端', 总使用量: generateTimeBasedValue(32000, 'year'), 平均分数: varyValue(80.1), 参与人数: generateTimeBasedValue(41000, 'year'), 完成率: varyValue(0.78, 0.05) },
        { name: '平板', 总使用量: generateTimeBasedValue(9500, 'year'), 平均分数: varyValue(81.7), 参与人数: generateTimeBasedValue(11200, 'year'), 完成率: varyValue(0.85, 0.05) }
      ]
    }
  };

  return data;
};

// 数据处理函数
export class StatisticsProcessor {
  private static comprehensiveData = generateComprehensiveData();

  // 根据筛选条件获取数据
  static getData(timeRange: string, categoryType: string): StatisticsItem[] {
    if (!this.comprehensiveData[timeRange] || !this.comprehensiveData[timeRange][categoryType]) {
      return [];
    }
    
    // 返回数据副本以避免直接修改
    return JSON.parse(JSON.stringify(this.comprehensiveData[timeRange][categoryType]));
  }

  // 计算统计汇总数据
  static calculateSummary(data: StatisticsItem[]) {
    if (!data || data.length === 0) {
      return {
        totalUsage: 0,
        avgParticipants: 0,
        avgCompletionRate: 0,
        avgScore: 0,
        topCategory: '',
        lowestCategory: ''
      };
    }

    const totalUsage = data.reduce((sum, item) => sum + item.总使用量, 0);
    const avgParticipants = data.reduce((sum, item) => sum + item.参与人数, 0) / data.length;
    const avgCompletionRate = data.reduce((sum, item) => sum + item.完成率, 0) / data.length;
    const avgScore = data.reduce((sum, item) => sum + item.平均分数, 0) / data.length;
    
    // 找出使用量最高和最低的分类
    const sortedData = [...data].sort((a, b) => b.总使用量 - a.总使用量);
    const topCategory = sortedData[0]?.name || '';
    const lowestCategory = sortedData[sortedData.length - 1]?.name || '';

    return {
      totalUsage,
      avgParticipants,
      avgCompletionRate,
      avgScore,
      topCategory,
      lowestCategory
    };
  }

  // 格式化数值
  static formatNumber(value: number, decimals: number = 0): string {
    if (value >= 10000) {
      return (value / 10000).toFixed(decimals) + '万';
    }
    return value.toLocaleString();
  }

  // 计算环比增长
  static calculateGrowth(current: number, previous: number): string {
    if (previous === 0) return '100%';
    const growth = ((current - previous) / previous) * 100;
    return (growth >= 0 ? '+' : '') + growth.toFixed(1) + '%';
  }

  // 根据日期范围过滤数据
  static filterByDateRange(data: StatisticsItem[], dateRange: [Date, Date] | null): StatisticsItem[] {
    if (!dateRange || !dateRange[0] || !dateRange[1]) {
      return data;
    }
    
    // 这里可以根据实际数据结构实现日期过滤逻辑
    // 由于是模拟数据，暂时直接返回原始数据
    return data;
  }

  // 对数据进行排序
  static sortData(data: StatisticsItem[], field: string, order: 'asc' | 'desc' = 'desc'): StatisticsItem[] {
    return [...data].sort((a, b) => {
      const aValue = a[field];
      const bValue = b[field];
      
      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return order === 'asc' ? aValue - bValue : bValue - aValue;
      }
      
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return order === 'asc' ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
      }
      
      return 0;
    });
  }

  // 获取TOP N数据
  static getTopN(data: StatisticsItem[], n: number, field: string = '总使用量'): StatisticsItem[] {
    return this.sortData(data, field, 'desc').slice(0, n);
  }

  // 导出数据为CSV格式
  static exportToCSV(data: StatisticsItem[]): string {
    if (!data || data.length === 0) return '';
    
    // 获取所有字段名
    const headers = Object.keys(data[0]);
    const csvRows = [];
    
    // 添加表头
    csvRows.push(headers.join(','));
    
    // 添加数据行
    for (const row of data) {
      const values = headers.map(header => {
        const value = row[header];
        // 处理字符串和数字类型的值
        if (typeof value === 'string') {
          // 给包含逗号或引号的字符串添加引号
          return `"${value.replace(/"/g, '""')}"`;
        }
        return value;
      });
      csvRows.push(values.join(','));
    }
    
    return csvRows.join('\n');
  }

  // 生成下载链接
  static generateDownloadLink(content: string, filename: string): string {
    const blob = new Blob([content], { type: 'text/csv;charset=utf-8;' });
    const link = URL.createObjectURL(blob);
    return link;
  }

  // 导出数据文件
  static downloadCSV(data: StatisticsItem[], filename: string): void {
    const csvContent = this.exportToCSV(data);
    const link = document.createElement('a');
    const url = this.generateDownloadLink(csvContent, filename);
    
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.style.display = 'none';
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // 释放URL对象
    setTimeout(() => URL.revokeObjectURL(url), 100);
  }
}