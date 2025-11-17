import { onMounted, ref } from "vue";
import type { Ref } from "vue";

/**
 * 通用滚动滑入动画 Hooks
 * @param options - 配置项（threshold：触发阈值，rootMargin：提前触发边距）
 * @returns visible - 元素可见状态
 * @returns observerRef - 观察者实例
 * @returns stopObserve - 停止监听的方法
 */
export function useScrollAnimate(options = { threshold: 0.1, rootMargin: "0px 0px 50px 0px" }): {
    visible: Ref<boolean>;
    observerRef: Ref<IntersectionObserver | null>;
    stopObserve: (target: HTMLElement | null) => void;
} {
    const visible = ref(false);
    const observerRef = ref<IntersectionObserver | null>(null);

    onMounted(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        visible.value = true;
                        observer.unobserve(entry.target); // 只触发一次动画
                    }
                });
            },
            { ...options }
        );

        observerRef.value = observer;
    });

    // 组件卸载时停止监听，避免内存泄漏
    const stopObserve = (target: HTMLElement | null) => {
        if (target && observerRef.value) {
            observerRef.value.unobserve(target);
            observerRef.value.disconnect();
        }
    };

    return { visible, observerRef, stopObserve };
}