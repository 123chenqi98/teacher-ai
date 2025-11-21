// 手机号脱敏
const maskPhone = (phone: string) =>
phone ? phone.replace(/(\d{3})\d{4}(\d{4})/, "$1****$2") : "未绑定";

// 邮箱脱敏
const maskEmail = (email: string) =>
email ? email.replace(/(^.).+(@.+$)/, "$1***$2") : "未绑定";

export { maskPhone, maskEmail };