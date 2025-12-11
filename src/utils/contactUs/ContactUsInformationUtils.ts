const getMapLink = (address: string): string => {
    // 空值保护：避免地址为空时编码报错
    if (!address) return "";
    const encodedAddress = encodeURIComponent(address);
    return `https://api.map.baidu.com/geocoder?address=${encodedAddress}&output=html`;
};

export { getMapLink };