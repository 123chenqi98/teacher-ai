// 数据接口定义
export interface TeamMember {
  content: string;
}

// 数据类型定义
export interface TeamIntroduction {
  title: string;
  subtitle: string;
  members: TeamMember[];
}

// 数据导出
export const heroData: TeamIntroduction = {
  title: "AI智能教师",
  subtitle: "教育的未来",
  members: [
    {
      content: "利用人工智能技术，为每一位学习者提供个性化、高质量的教育体验，打破地域和资源限制",
    },
  ]
};