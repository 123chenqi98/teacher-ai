import {ref} from "vue";
import type {NotificationItem} from "@/data/user/notificationCenterData/NotificationInterface.ts";

const detailVisible = ref(false)
const detailItem = ref<NotificationItem | null>(null)
const openDetail = (item: NotificationItem) => {
    detailItem.value = item
    detailVisible.value = true
}

export {
    detailVisible,
    detailItem,
    openDetail
}