// 核心滚动方法
export const scrollToTarget = () => {
    // 1. 通过 ID 获取目标 DOM 节点（必须确保 ID 全局唯一）
    const targetEl = document.querySelector('#section1');

    // 容错：如果目标元素未找到，提示并退出
    if (!targetEl) {
        console.warn('未找到目标区域（ID: section1）');
        return;
    }

    // 2. 平滑滚动到目标位置
    targetEl.scrollIntoView({
        behavior: 'smooth', // 平滑动画
        block: 'start'      // 滚动到元素顶部（可选：center/end）
    });

    // 【可选】如果有固定导航栏，添加偏移量（比如导航栏高 80px）
    // const navHeight = 80;
    // const top = targetEl.getBoundingClientRect().top + window.scrollY - navHeight;
    // window.scrollTo({ top, behavior: 'smooth' });
};