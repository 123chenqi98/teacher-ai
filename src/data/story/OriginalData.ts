// 数据接口定义
export interface TeamMember {
  id: string;
  subheading: string;
  content: string;
  avatar: string;
}

// 数据类型定义
export interface TeamIntroduction {
  title: string;
  subtitle: string;
  members: TeamMember[];
}

// 数据导出
export const origiData: TeamIntroduction = {
  title: "我们的初衷",
  subtitle: "教育是改变世界的最强大工具，但传统教育系统面临着诸多挑战",
  members: [
    {
      id: "member1",
      subheading: "教育资源不平等",
      content: "优质教育资源往往集中在发达地区，导致教育机会不均等。我们的AI教师将打破地域限制，为每一位学生提供平等的学习机会。",
      avatar: "/src/static/logo.png",
    },
    {
      id: "member2",
      subheading: "个性化学习需求",
      content: "传统教育难以满足学生的个性化需求。我们的AI教师能够根据每位学生的学习进度、兴趣和能力，提供量身定制的学习路径。",    
      avatar: "/src/static/logo.png",
    },
    {
      id: "member3",
      subheading: "反馈不及时",
      content: "学生常常无法获得及时的学习反馈。我们的AI教师能够实时分析学习情况，提供即时、有针对性的指导和反馈。",
      avatar: "/src/static/logo.png",
    },
  ]
};