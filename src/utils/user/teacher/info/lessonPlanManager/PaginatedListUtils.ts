// 分页后的列表
import {computed} from "vue";
import {currentPage, pageSize} from "@/entity/auth/teacherInfo/LessonPlanManager.ts";
import {filteredList} from "@/utils/user/teacher/info/lessonPlanManager/StatisticsDataUtils.ts";

const paginatedListUtils = computed(() => {
    const start = (currentPage.value - 1) * pageSize.value
    return filteredList.value.slice(start, start + pageSize.value)
})


export {paginatedListUtils}