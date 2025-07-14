import { ref } from 'vue'
import { mockData } from '../mock/mock_data.js'

export function useNavigation() {
  const categories = ref([])
  const loading = ref(false)
  const error = ref(null)

  const fetchCategories = async () => {
    loading.value = true
    error.value = null

    try {
      // 开发环境用mock数据
      if (import.meta.env.DEV) {
        await new Promise(resolve => setTimeout(resolve, 500)) // 模拟网络延迟
        categories.value = mockData.categories
      } else {
        // 生产环境调用API
        const response = await fetch('/api/categories')
        if (!response.ok) throw new Error('Failed to fetch')
        categories.value = await response.json()
      }
    } catch (err) {
      error.value = err.message
      console.error('Error fetching categories:', err)
    } finally {
      loading.value = false
    }
  }

  return {
    categories,
    loading,
    error,
    fetchCategories
  }
}
