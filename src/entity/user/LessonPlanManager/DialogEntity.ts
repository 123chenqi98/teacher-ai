//  模态框控制
import {computed, ref} from "vue";
import {currentLesson} from "@/forms/user/teacherInfo/lessonPlanManagerForms/DataStatisticsForms.ts";

const newLessonModalOpen = ref(false)
const editLessonModalOpen = ref(false)
const detailModalOpen = ref(false)

const isEditMode = computed(() => !!currentLesson.id)


export { newLessonModalOpen, editLessonModalOpen, detailModalOpen,isEditMode }