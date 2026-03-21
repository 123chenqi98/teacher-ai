import { ref } from 'vue'

// 表格数据
const tableData = ref([//
  {
    date: '202301',
    name: '2023-2024第一学期',
    startTime: '2023-9-1',
    endTime: '2024-1-30'
  },
  {
    date: '202302', 
    name: '2023-2024第二学期',
    startTime: '2024-3-1',
    endTime: '2024-6-30'
  },
  {
    date: '202401',
    name: '2024-2025第一学期',
    startTime: '2024-9-1',
    endTime: '2025-1-30'
  },
  {
    date: '202402',
    name: '2024-2025第二学期',
    startTime: '2025-3-1',
    endTime: '2025-6-30'
  },
  {
    date: '202501',
    name: '2025-2026第一学期',
    startTime: '2025-9-1',
    endTime: '2026-1-30'
  },
  {
    date: '202502',
    name: '2025-2026第二学期',
    startTime: '2026-3-1',
    endTime: '2026-6-30'
  }
])
export default tableData
