// ==================== 班级列表表单验证 ====================
export const classListFormValidation = {
  className: {
    label: '班级名称',
    placeholder: '请输入班级名称（如：高三(1)班）',
    requiredTip: '班级名称为必填项',
    validateRule: '长度1-20字，仅支持中文、数字、括号'
  },
  grade: {
    label: '年级',
    placeholder: '请选择年级',
    requiredTip: '年级为必填项'
  },
  subject: {
    label: '学科',
    placeholder: '请选择学科（可多选）',
    requiredTip: '至少选择1个学科'
  },
  headTeacher: {
    label: '班主任',
    placeholder: '请输入班主任姓名',
    requiredTip: '班主任为必填项',
    validateRule: '长度2-10字，仅支持中文'
  },
  classIntro: {
    label: '班级简介',
    placeholder: '可选填写班级简介（最多200字）',
    validateRule: '最多200字'
  }
}
