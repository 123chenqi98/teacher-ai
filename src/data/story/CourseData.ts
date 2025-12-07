// 数据接口定义
export interface TimelineEvent {
  id: string;
  date: string;
  title: string;
  description: string;
}

// 数据类型定义
interface CourseDataType {
  title: string;
  subtitle: string;
  events: TimelineEvent[];
}

// 数据导出
export const CourseData: CourseDataType = {
  title: "发展历程",
  subtitle: "从构想到产品落地，我们一直在前进",
  events: [
    {
      id: "event1",
      date: "2025年8月",
      title: "项目构想",
      description: "团队创始人张明和李华在一次教育科技研讨会上提出了利用AI技术改变教育模式的构想。"
    },
    {
      id: "event2",
      date: "2025年10月",
      title: "团队组建",
      description: "核心团队正式组建，包括来自教育、技术和AI领域的专业人士。"
    },
    {
      id: "event3",
      date: "2025年11月",
      title: "原型开发",
      description: "完成AI智能教师的首个产品原型，实现了基础的问答和辅导功能。"
    },
    {
      id: "event4",
      date: "2026年3月",
      title: "首轮融资",
      description: "获得了知名风险投资机构的500万美元A轮融资。"
    }
    ,
    {
      id: "event5",
      date: "2026年6月",
      title: "正式上线",
      description: "正式发布AI智能教师产品，开始了服务于教育行业的第一步。"
    }
  ]
};