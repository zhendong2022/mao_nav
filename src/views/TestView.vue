<template>
  <div class="test-page">
    <h1>🔍 环境变量测试页面</h1>
    <button @click="testEnvVars">检查环境变量</button>
    <div v-if="envResult" class="results">
      <h2>检测结果：</h2>
      <pre>{{ envResult }}</pre>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const envResult = ref('')

const testEnvVars = () => {
  const result = {
    '当前环境': import.meta.env.MODE,
    '构建时间': new Date().toLocaleString(),
    '环境变量检查': {
      VITE_ADMIN_PASSWORD: import.meta.env.VITE_ADMIN_PASSWORD ? '已配置' : '未配置',
      VITE_GITHUB_TOKEN: import.meta.env.VITE_GITHUB_TOKEN ? `已配置 (${import.meta.env.VITE_GITHUB_TOKEN.substring(0, 10)}...)` : '未配置',
      VITE_GITHUB_OWNER: import.meta.env.VITE_GITHUB_OWNER || '未配置',
      VITE_GITHUB_REPO: import.meta.env.VITE_GITHUB_REPO || '未配置',
      VITE_GITHUB_BRANCH: import.meta.env.VITE_GITHUB_BRANCH || '未配置'
    }
  }

  envResult.value = JSON.stringify(result, null, 2)
  console.log('环境变量测试结果:', result)
}
</script>

<style scoped>
.test-page {
  padding: 20px;
}

.results {
  margin-top: 20px;
  padding: 15px;
  background: #f8f9fa;
  border-radius: 5px;
}

pre {
  background: white;
  padding: 10px;
  border-radius: 3px;
  overflow-x: auto;
}

button {
  padding: 10px 20px;
  background: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
</style>
