import { jsonTokenPost, jsonTokenGet } from "@/net/jsonRequst.ts";

// 将 callback 风格封装为 Promise，便于在组合式 API 中使用
const post = <T = any>(url: string, data: any): Promise<T> =>
  new Promise((resolve, reject) => {
    jsonTokenPost(
      url,
      data,
      (res: any) => resolve(res),
      (res: any) => reject(res),
      (err: any) => reject(err)
    );
  });

const get = <T = any>(url: string): Promise<T> =>
  new Promise((resolve, reject) => {
    jsonTokenGet(
      url,
      (res: any) => resolve(res),
      (res: any) => reject(res),
      (err: any) => reject(err)
    );
  });

// 发送两步验证验证码（后端决定发送到手机或邮箱，或两者）
export const sendTwoFactorCodeApi = (payload: { channel?: "phone" | "email" } = {}) => {
  return post("/user/security/two-factor/send", payload);
};

// 验证两步验证码
export const verifyTwoFactorCodeApi = (payload: { code: string }) => {
  return post("/user/security/two-factor/verify", payload);
};

// 开启两步验证
export const enableTwoFactorApi = () => {
  return post("/user/security/two-factor/enable", {});
};

// 关闭两步验证
export const disableTwoFactorApi = () => {
  return post("/user/security/two-factor/disable", {});
};

// 更新账号安全设置（密码、绑定信息）
export const updateSecuritySettingsApi = (payload: {
  currentPassword?: string;
  newPassword?: string;
  phone?: string;
  email?: string;
}) => {
  return post("/user/security/settings/update", payload);
};

// 获取登录日志（可用于后续扩展）
export const fetchLoginLogsApi = () => {
  return get("/user/security/login-logs");
};