<template>
  <div class="admin-container">
    <!-- 登录界面 -->
    <div v-if="!isAuthenticated" class="login-container">
      <div class="login-box">
        <h1>🔐 管理员登录</h1>
        <form @submit.prevent="handleLogin">
          <div class="form-group">
            <label for="password">管理密钥:</label>
            <input
              id="password"
              type="password"
              v-model="loginPassword"
              placeholder="请输入管理密钥"
              required
              class="form-input"
            />
          </div>
          <button type="submit" class="login-btn" :disabled="loading">
            {{ loading ? '验证中...' : '登录' }}
          </button>
        </form>
        <div v-if="loginError" class="error-message">
          {{ loginError }}
        </div>
      </div>
    </div>

    <!-- 管理界面 -->
    <div v-else class="admin-dashboard">
      <!-- 顶部导航 -->
      <header class="admin-header">
        <div class="header-content">
          <h1>🛠️ 导航站管理</h1>
          <div class="header-actions">
            <button @click="debugLoadData" class="debug-btn" hidden="true">🔍 调试加载</button>
            <span class="user-info">管理员</span>
            <button @click="logout" class="logout-btn">退出</button>
          </div>
        </div>
      </header>

      <!-- 主要内容 -->
      <main class="admin-main">
        <!-- 加载状态显示 -->
        <div v-if="loading" class="loading-overlay">
          <div class="loading-content">
            <div class="loading-spinner"></div>
            <p>正在加载数据...</p>
          </div>
        </div>

        <div class="admin-tabs">
          <button
            class="tab-btn"
            :class="{ active: activeTab === 'categories' }"
            @click="activeTab = 'categories'"
          >
            📁 分类管理
          </button>
          <button
            class="tab-btn"
            :class="{ active: activeTab === 'sites' }"
            @click="activeTab = 'sites'"
          >
            🌐 站点管理
          </button>
          <button
            class="tab-btn"
            :class="{ active: activeTab === 'settings' }"
            @click="activeTab = 'settings'"
          >
            ⚙️ 系统设置
          </button>
        </div>

        <!-- 分类管理 -->
        <div v-if="activeTab === 'categories'" class="tab-content">
          <CategoryManager
            :categories="categories"
            @update="handleCategoriesUpdate"
            @save="saveToGitHub"
            :loading="saving"
          />
        </div>

        <!-- 站点管理 -->
        <div v-if="activeTab === 'sites'" class="tab-content">
          <SiteManager
            :categories="categories"
            @update="handleCategoriesUpdate"
            @save="saveToGitHub"
            :loading="saving"
          />
        </div>

        <!-- 系统设置 -->
        <div v-if="activeTab === 'settings'" class="tab-content">
          <SystemSettings />
        </div>
      </main>
    </div>

    <!-- 自定义弹框 -->
    <CustomDialog
      :visible="dialogVisible"
      :type="dialogType"
      :title="dialogTitle"
      :message="dialogMessage"
      :details="dialogDetails"
      @close="closeDialog"
      @confirm="closeDialog"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import CategoryManager from '../components/admin/CategoryManager.vue'
import SiteManager from '../components/admin/SiteManager.vue'
import SystemSettings from '../components/admin/SystemSettings.vue'
import CustomDialog from '../components/admin/CustomDialog.vue'
import { useGitHubAPI } from '../apis/useGitHubAPI.js'

const router = useRouter()
const { saveCategoriesToGitHub, loadCategoriesFromGitHub } = useGitHubAPI()

// 认证状态
const isAuthenticated = ref(false)
const loginPassword = ref('')
const loginError = ref('')
const loading = ref(false)
const saving = ref(false)

// 管理界面状态
const activeTab = ref('categories')
const categories = ref([])
const navTitle = ref('猫猫导航') // 保存网站标题

// 自定义弹框状态
const dialogVisible = ref(false)
const dialogType = ref('success')
const dialogTitle = ref('')
const dialogMessage = ref('')
const dialogDetails = ref([])

// 验证管理员密钥
const handleLogin = async () => {
  loading.value = true
  loginError.value = ''

  try {
    const adminPassword = import.meta.env.VITE_ADMIN_PASSWORD
    if (!adminPassword) {
      throw new Error('管理密钥未配置，请配置环境变量')
    }

    if (loginPassword.value === adminPassword) {
      isAuthenticated.value = true
      localStorage.setItem('admin_authenticated', 'true')

      // 登录成功后加载数据，但不重复设置loading
      loading.value = false
      await loadCategories()
    } else {
      throw new Error('密钥错误，请重新输入')
    }
  } catch (error) {
    loginError.value = error.message
    loading.value = false
  }
}

// 退出登录
const logout = () => {
  isAuthenticated.value = false
  localStorage.removeItem('admin_authenticated')
  loginPassword.value = ''
  router.push('/')
}

// 调试加载数据
const debugLoadData = async () => {
  console.log('=== 开始调试加载数据 ===')
  console.log('当前环境变量:', {
    VITE_GITHUB_TOKEN: import.meta.env.VITE_GITHUB_TOKEN ? '已配置' : '未配置',
    VITE_GITHUB_OWNER: import.meta.env.VITE_GITHUB_OWNER,
    VITE_GITHUB_REPO: import.meta.env.VITE_GITHUB_REPO,
    VITE_GITHUB_BRANCH: import.meta.env.VITE_GITHUB_BRANCH
  })

  try {
    console.log('直接调用loadCategoriesFromGitHub...')
    const data = await loadCategoriesFromGitHub()
    console.log('调用成功，返回数据:', data)

    showDialog(
      'success',
      '🎉 调试成功',
      '直接调用GitHub API成功',
      [`• 数据类型: ${typeof data}`, `• 包含categories: ${!!data.categories}`, `• 分类数量: ${data.categories?.length || 0}`]
    )
  } catch (error) {
    console.error('直接调用失败:', error)
    showDialog(
      'error',
      '❌ 调试失败',
      '直接调用GitHub API失败',
      [`• 错误信息: ${error.message}`, `• 错误类型: ${error.constructor.name}`]
    )
  }
}

// 加载分类数据
const loadCategories = async () => {
  loading.value = true
  try {
    console.log('开始从GitHub加载数据...')
    const data = await loadCategoriesFromGitHub()
    console.log('GitHub数据加载成功:', data)
    categories.value = data.categories || []
    navTitle.value = data.title || '猫猫导航' // 保存标题

    // 显示加载成功提示
    showDialog(
      'success',
      '✅ 数据加载成功',
      '已成功从GitHub加载最新数据',
      [`• 分类数量: ${categories.value.length}`, `• 网站标题: ${navTitle.value}`]
    )
  } catch (error) {
    console.error('从GitHub加载数据失败:', error)

    // 显示GitHub错误，但尝试加载本地数据
    showDialog(
      'error',
      '⚠️ GitHub加载失败',
      'GitHub API调用失败，已切换到本地数据',
      [`• 错误详情: ${error.message}`, `• 建议：检查环境变量配置和网络连接`]
    )

    // 如果GitHub加载失败，从本地mock数据加载
    try {
      const { mockData } = await import('../mock/mock_data.js')
      categories.value = mockData.categories || []
      navTitle.value = mockData.title || '猫猫导航' // 保存标题
      console.log('本地数据加载成功，分类数量:', categories.value.length)
    } catch (fallbackError) {
      console.error('加载本地数据也失败:', fallbackError)
      showDialog(
        'error',
        '❌ 完全加载失败',
        'GitHub和本地数据都无法加载，请刷新页面重试',
        [`• GitHub API错误: ${error.message}`, `• 本地数据错误: ${fallbackError.message}`]
      )
    }
  } finally {
    loading.value = false
  }
}

// 处理分类更新
const handleCategoriesUpdate = (newCategories) => {
  categories.value = newCategories
}

// 显示弹框
const showDialog = (type, title, message, details = []) => {
  dialogType.value = type
  dialogTitle.value = title
  dialogMessage.value = message
  dialogDetails.value = details
  dialogVisible.value = true
}

// 关闭弹框
const closeDialog = () => {
  dialogVisible.value = false
}

// 保存到GitHub
const saveToGitHub = async () => {
  saving.value = true
  try {
    // 保存完整的数据结构，包括title字段
    await saveCategoriesToGitHub({
      categories: categories.value,
      title: navTitle.value
    })
    showDialog(
      'success',
      '🎉 保存成功',
      '您的更改已成功保存到GitHub仓库！',
      [
        '• 更改将在 2-3 分钟内自动部署到线上',
        '• 部署完成后，您可以在前台页面看到最新内容',
        '• 如有问题，请检查Vercel或CFpage是否触发自动部署'
      ]
    )
  } catch (error) {
    showDialog(
      'error',
      '❌ 保存失败',
      '保存过程中发生错误，请重试',
      [`• 错误详情: ${error.message}`]
    )
  } finally {
    saving.value = false
  }
}

// 组件挂载时检查认证状态
onMounted(() => {
  const savedAuth = localStorage.getItem('admin_authenticated')
  if (savedAuth === 'true') {
    isAuthenticated.value = true
    // 延迟加载，确保组件完全挂载
    setTimeout(() => {
      loadCategories()
    }, 100)
  }
})
</script>

<style scoped>
.admin-container {
  min-height: 100vh;
  background: #2c3e50;
}

/* 登录界面样式 */
.login-container {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 20px;
}

.login-box {
  background: white;
  padding: 40px;
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  width: 100%;
  max-width: 400px;
}

.login-box h1 {
  text-align: center;
  margin-bottom: 30px;
  color: #2c3e50;
  font-size: 24px;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  color: #555;
  font-weight: 500;
}

.form-input {
  width: 100%;
  padding: 12px;
  border: 2px solid #e1e1e1;
  border-radius: 6px;
  font-size: 16px;
  transition: border-color 0.3s ease;
}

.form-input:focus {
  outline: none;
  border-color: #3498db;
}

.login-btn {
  width: 100%;
  padding: 12px;
  background: #3498db;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.login-btn:hover:not(:disabled) {
  background: #2980b9;
}

.login-btn:disabled {
  background: #bdc3c7;
  cursor: not-allowed;
}

.error-message {
  margin-top: 15px;
  padding: 10px;
  background: #ffebee;
  color: #c62828;
  border-radius: 4px;
  text-align: center;
  font-size: 14px;
}

/* 管理界面样式 */
.admin-dashboard {
  min-height: 100vh;
  background: #f5f7fa;
}

.admin-header {
  background: white;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 100;
}

.header-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px 30px;
  max-width: 1200px;
  margin: 0 auto;
}

.header-content h1 {
  color: #2c3e50;
  margin: 0;
  font-size: 20px;
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 15px;
}

.user-info {
  color: #7f8c8d;
  font-size: 14px;
}

.debug-btn {
  padding: 8px 16px;
  background: #f39c12;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.3s ease;
  margin-right: 15px;
}

.debug-btn:hover {
  background: #e67e22;
}

.logout-btn {
  padding: 8px 16px;
  background: #e74c3c;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.3s ease;
}

.logout-btn:hover {
  background: #c0392b;
}

.admin-main {
  max-width: 1200px;
  margin: 0 auto;
  padding: 30px;
}

.admin-tabs {
  display: flex;
  background: white;
  border-radius: 8px;
  padding: 5px;
  margin-bottom: 30px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.tab-btn {
  flex: 1;
  padding: 12px 20px;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  color: #7f8c8d;
  border-radius: 4px;
  transition: all 0.3s ease;
}

.tab-btn.active {
  background: #3498db;
  color: white;
}

.tab-btn:hover:not(.active) {
  background: #f8f9fa;
  color: #2c3e50;
}

.tab-content {
  background: white;
  border-radius: 8px;
  padding: 30px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

/* 响应式设计 */
@media (max-width: 768px) {
  .header-content {
    padding: 15px 20px;
  }

  .admin-main {
    padding: 20px 15px;
  }

  .tab-content {
    padding: 20px 15px;
  }

  .admin-tabs {
    flex-direction: column;
  }

  .tab-btn {
    margin-bottom: 5px;
  }
}
</style>
