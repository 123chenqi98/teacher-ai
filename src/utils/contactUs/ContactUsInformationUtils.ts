import {ref} from "vue";


const getMapLink = (address: string): string => {
    // 空值保护：避免地址为空时编码报错
    if (!address) return "";
    const encodedAddress = encodeURIComponent(address);
    return `https://api.map.baidu.com/geocoder?address=${encodedAddress}&output=html`;
};
// 声明 ref 变量，匹配模板中的 ref="section1"
const section1 = ref<HTMLElement | null>(null);

export {
    getMapLink,
    section1,

};