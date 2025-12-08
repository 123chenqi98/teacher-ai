// 团队成员数据定义
export interface TeamMember {
  id: string;
  name: string;
  position: string;
  avatar: string;
}

// 团队介绍数据
export interface TeamIntroduction {
  title: string;
  subtitle: string;
  members: TeamMember[];
}

// 团队数据导出
export const teamData: TeamIntroduction = {
  title: "我们的团队",
  subtitle: "由教育、技术和人工智能领域的专业人士组成，共同致力于改变教育的未来",
  members: [
    {
      id: "member1",
      name: "张明明",
      position: "创始人 & CEO",
      avatar: "/src/static/logo.png",
    },
    {
      id: "member2",
      name: "李华",
      position: "联合创始人 & CTO",
      avatar: "/src/static/logo.png",
    },
    {
      id: "member3",
      name: "王芳",
      position: "教育总监",
      avatar: "/src/static/logo.png",
    },
    {
      id: "member4",
      name: "赵伟",
      position: "AI研究员",
      avatar: "/src/static/logo.png",
    }
  ]
};