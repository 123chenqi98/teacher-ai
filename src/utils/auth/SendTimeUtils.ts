import {ref} from "vue";

export const sendVerifyCodeTime = ref(0);
export function sendVerifyCodeCutTime (time: number) {
    // 发送验证功码时间
    // 设置初始时间
    sendVerifyCodeTime.value = time;
    const timer = setInterval(() => {
        if(sendVerifyCodeTime.value > 0){
            // 时间递减
            sendVerifyCodeTime.value--;
        }else{
            // 清除记时器
            clearInterval(timer)
        }
    }, 1000);
}