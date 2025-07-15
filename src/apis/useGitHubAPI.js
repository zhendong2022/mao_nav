export function useGitHubAPI() {
  const GITHUB_API_BASE = 'https://api.github.com'

  // 从环境变量获取配置
  const getConfig = () => {
    const token = import.meta.env.VITE_GITHUB_TOKEN
    const owner = import.meta.env.VITE_GITHUB_OWNER
    const repo = import.meta.env.VITE_GITHUB_REPO
    const branch = import.meta.env.VITE_GITHUB_BRANCH

    if (!token) {
      throw new Error('GitHub Token 未配置，请在环境变量中设置 VITE_GITHUB_TOKEN')
    }
    if (!owner) {
      throw new Error('GitHub Owner 未配置，请在环境变量中设置 VITE_GITHUB_OWNER')
    }
    if (!repo) {
      throw new Error('GitHub Repo 未配置，请在环境变量中设置 VITE_GITHUB_REPO')
    }
    if (!branch) {
      throw new Error('GitHub Branch 未配置，请在环境变量中设置 VITE_GITHUB_BRANCH')
    }

    return { token, owner, repo, branch }
  }

  // 获取文件内容
  const getFileContent = async (path) => {
    const { token, owner, repo } = getConfig()

    const url = `${GITHUB_API_BASE}/repos/${owner}/${repo}/contents/${path}`
    const response = await fetch(url, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/vnd.github.v3+json',
        'X-GitHub-Api-Version': '2022-11-28'
      }
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(`GitHub API Error: ${error.message}`)
    }

    const data = await response.json()
    return {
      content: decodeURIComponent(escape(atob(data.content))), // 正确处理中文解码
      sha: data.sha,
      path: data.path
    }
  }

  // 更新文件内容
  const updateFileContent = async (path, content, message, sha) => {
    const { token, owner, repo, branch } = getConfig()

    const url = `${GITHUB_API_BASE}/repos/${owner}/${repo}/contents/${path}`
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/vnd.github.v3+json',
        'X-GitHub-Api-Version': '2022-11-28',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        message,
        content: btoa(unescape(encodeURIComponent(content))), // 处理中文编码
        sha,
        branch
      })
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(`GitHub API Error: ${error.message}`)
    }

    return await response.json()
  }

  // 生成mock_data.js文件内容
  const generateMockDataContent = (data) => {
    const formattedData = JSON.stringify(data, null, 2)
    return `export const mockData = ${formattedData}
`
  }

  // 从GitHub加载分类数据
  const loadCategoriesFromGitHub = async () => {
    try {
      const file = await getFileContent('src/mock/mock_data.js')

      // 解析JavaScript文件内容
      const content = file.content
      const exportMatch = content.match(/export const mockData = ({[\s\S]*})/)

      if (!exportMatch) {
        throw new Error('无法解析mock_data.js文件格式')
      }

      // 安全地解析JSON内容
      const dataString = exportMatch[1]
      const data = JSON.parse(dataString)

      return {
        ...data,
        _fileSha: file.sha
      }
    } catch (error) {
      console.error('从GitHub加载数据失败:', error)
      throw error
    }
  }

  // 保存分类数据到GitHub
  const saveCategoriesToGitHub = async (data) => {
    try {
      // 首先获取当前文件的SHA
      const currentFile = await getFileContent('src/mock/mock_data.js')

      // 生成新的文件内容
      const newContent = generateMockDataContent(data)

      // 提交信息
      const message = `chore: 更新导航数据 - ${new Date().toLocaleString('zh-CN')}`

      // 更新文件
      const result = await updateFileContent(
        'src/mock/mock_data.js',
        newContent,
        message,
        currentFile.sha
      )

      return result
    } catch (error) {
      console.error('保存到GitHub失败:', error)
      throw error
    }
  }

  // 验证GitHub连接
  const verifyGitHubConnection = async () => {
    try {
      const { token, owner, repo } = getConfig()

      const url = `${GITHUB_API_BASE}/repos/${owner}/${repo}`
      const response = await fetch(url, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/vnd.github.v3+json'
        }
      })

      if (!response.ok) {
        throw new Error('GitHub连接失败')
      }

      const repoInfo = await response.json()
      return {
        connected: true,
        repo: repoInfo.full_name,
        permissions: repoInfo.permissions
      }
    } catch (error) {
      return {
        connected: false,
        error: error.message
      }
    }
  }

  return {
    loadCategoriesFromGitHub,
    saveCategoriesToGitHub,
    verifyGitHubConnection,
    getFileContent,
    updateFileContent
  }
}
