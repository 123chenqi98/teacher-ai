import { ref } from "vue";
// 登录日志示例数据
export const loginLogs = ref([
    { time: "2025-11-14 14:42:37", device: "Windows / Chrome", ip: "192.168.0.12", location: "上海", status: "成功" },
    { time: "2025-11-12 08:12:51", device: "iPhone / Safari", ip: "10.0.0.5", location: "北京", status: "成功" },
    { time: "2025-11-10 21:03:05", device: "Mac / Edge", ip: "203.1.1.8", location: "深圳", status: "失败" },
    { time: "2025-11-08 10:22:43", device: "Android / Firefox", ip: "182.128.1.10", location: "广州", status: "成功" },
    { time: "2025-11-06 15:30:20", device: "Windows / Chrome", ip: "192.168.0.12", location: "上海", status: "成功" },
    { time: "2025-11-04 09:15:12", device: "iPhone / Safari", ip: "10.0.0.5", location: "北京", status: "成功" },
    { time: "2025-11-02 12:45:30", device: "Mac / Edge", ip: "203.1.1.8", location: "深圳", status: "成功" },
    { time: "2025-11-01 07:20:15", device: "Android / Firefox", ip: "182.128.1.10", location: "广州", status: "成功" },
]);