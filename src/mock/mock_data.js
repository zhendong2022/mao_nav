export const mockData = {
    categories: [
      {
        id: "my-favorites",
        name: "我的常用",
        icon: "💥",
        order: 0,
        sites: [
          {
            id: "linux-do",
            name: "Linux.do",
            url: "https://linux.do",
            description: "Linux技术社区，Peace and Love",
            icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAABOxJREFUWEfNV0tslFUU/s7/nmmHmWE6NRUqKZXER9OIuNFA3Ei6w6CUWiPGjRiaSLtoWZi4MnFBu2gxgYgLjRgqtNHIrsGFBqIbAdPUR4LQYIXGTseZ6WPmfx+9f+dvphRIDWPxzm7+e8/3nXPPOfc7hLssZiYAKhHZ4RZm3gtgD4Am27Z3EpEsvjGzp2naRQCTAM4R0ZcVZzQADhHxnaAEyKrFzALYKRtPADjuOE7n2NgYLly4iPHxcVy6dEVAl88SduzYjtbWVuzatRNtbW1QVXUYQBcR5ct2lm1WAq4iwMxa6DUzD7qu2z04OIRjxz7A1NQNF4BfUxOTa2pqZKKl48yMxcVFb3Fx3gMgNTZuUQ4ffhs9Pd1QFGXoHxI95X3LtkMSKwgws05EFjNvBDAxMjLacOhQF7LZjF1XV6/GYjESoJ7nwff9FZGTJAmyLAdk5ufneXZ2xkml0tqJE8fR3r5vGkALEf0VYqwiEHpeLBY3RyKRqb6+IxgY6DfT6YeMWCwGx3EC42tZgqSqqoIIMpk/zd7ePqO//yhKpVJjNBr9ozLKQQTCOy97nu3oeAVnz56xmpqa9Tt5uxYSYk8YlcnJa9b+/R36mTOfi79T5UgEOUEi28MMZeZbfX1HGgYG+q3m5m26ZVlrxbrnPl3Xce3aVau3t0/v7z86TUQPlx0nQSBIDJFwo6Oj3e3t7WZz8zbDtperryokNE0TJMyRkVFj376Xg8QMsMNSy2Qyufr6ehE4RCKRVUl2vyzEdZRKJVFEmJmZQTqdTooSDQjYtn365s2bnRMTE3Y8Htc8z0e5wu4Xd/m8yF9ZllAoFOyWlhZt06ZNw5qmvRoQyOVybBgGDMMQaX7H5lQ1JgCbpkmmaSKZTBLlcrm9RPQFM7ue5ylVBLqrKVmWXSJSmPklKhQKHzPzG+ImAIi+vR4rwCKiTyifz38D4HkAoo0Gj8s6rBDrW0FA9Pf1Ar7dN08QWFt//Y/C8r8g8MCv4MEm4QMvw7ARAeyC16cRgWQXKDcikdz5fI4hGWBlfVoxuSbBN5FIJJeenPy8e5rMG53y3GWb1aQGXim3qlaBJIGcvO1t2K6xsWU4EVPKjxFzgnKZXHysfukpkqoGudKQ6H8ACm0z4GRaPEV5+olZe5LInmUejPz2WXf0+wMmElEDfnUFCSQNyBfN4rOnjNKjrw3VEfUI7BWSLOvxrdrLbzVov560EI/q8KsjySDpQKFo2Y8d1Bee/nA6JVdIsrIiCgRiocAb3SiyG77bDeX3ry3EI7ooDrCI3b+VCQyIwYkUoFCy3Ede0OeeOw+liFQ8HsjzJVEaXlKoDbNF3gwVU7U/HoT2y0cmamFAiQK+GJTWmpwSIKmAWwQWYNqPv2ksPHUScNCYitJqWR6SuMqsbyOygkjUYsK4fqohOv46YMJGBCpkgwKtJiJye6WQtOSx0F6eySjBgQGt2PopzK0HppUFtAjPQ4wQ856jWZZ5UFrwuo3J92Bcfx9YdFwQfEEl+FUuDx4ceGBIqFEVc+s7MJvehV8rD6XWOppVXMfyIJljTvjAcWnB7VQzX0HNnoc8dwly4YeV+PFn4G3YASe1G076Rfi1yrAEdIlSq8yz2wv8rpklBpafAVWUaHholnkv+dgjWWiC5+6sEDIeZOWir2OSJZyrqxjPRak9cY/x/G9pa4SNlgBs7AAAAABJRU5ErkJggg=="
          },
          {
            id: "curlconverter",
            name: "curl converter",
            url: "https://curlconverter.com/",
            description: "curl命令转换工具",
            icon: "https://curlconverter.com/favicon.ico"
          },
          {
            id: "github",
            name: "GitHub",
            url: "https://github.com",
            description: "代码托管平台",
            icon: "https://github.com/favicon.ico"
          }
        ]
      },
      {
        id: "ai-tools",
        name: "AI智能",
        icon: "🤖",
        order: 1,
        sites: [
          {
            id: "chatgpt",
            name: "ChatGPT",
            url: "https://chat.openai.com",
            description: "OpenAI对话AI助手",
            icon: "https://chat.openai.com/favicon.ico"
          },
          {
            id: "claude",
            name: "Claude",
            url: "https://claude.ai",
            description: "Anthropic AI助手",
            icon: "https://claude.ai/favicon.ico"
          },
          {
            id: "midjourney",
            name: "Midjourney",
            url: "https://www.midjourney.com",
            description: "AI图像生成工具",
            icon: "https://www.midjourney.com/favicon.ico"
          },
          {
            id: "copilot",
            name: "GitHub Copilot",
            url: "https://github.com/features/copilot",
            description: "AI代码助手",
            icon: "https://github.com/favicon.ico"
          },
          {
            id: "cursor",
            name: "Cursor",
            url: "https://cursor.sh",
            description: "AI代码编辑器",
            icon: "https://cursor.sh/favicon.ico"
          }
        ]
      },
      {
        id: "dev-tools",
        name: "开发工具",
        icon: "🛠️",
        order: 2,
        sites: [
          {
            id: "github",
            name: "GitHub",
            url: "https://github.com",
            description: "代码托管平台",
            icon: "https://github.com/favicon.ico"
          },
          {
            id: "vscode",
            name: "VS Code",
            url: "https://code.visualstudio.com",
            description: "代码编辑器",
            icon: "https://code.visualstudio.com/favicon.ico"
          },
          {
            id: "gitee",
            name: "Gitee",
            url: "https://gitee.com",
            description: "国内代码托管平台",
            icon: "https://gitee.com/favicon.ico"
          },
          {
            id: "webstorm",
            name: "WebStorm",
            url: "https://www.jetbrains.com/webstorm/",
            description: "专业前端IDE",
            icon: "https://www.jetbrains.com/favicon.ico"
          },
          {
            id: "postman",
            name: "Postman",
            url: "https://www.postman.com",
            description: "API测试工具",
            icon: "https://www.postman.com/favicon.ico"
          }
        ]
      },
      {
        id: "design",
        name: "设计工具",
        icon: "🎨",
        order: 3,
        sites: [
          {
            id: "figma",
            name: "Figma",
            url: "https://figma.com",
            description: "UI设计工具",
            icon: "https://figma.com/favicon.ico"
          },
          {
            id: "sketch",
            name: "Sketch",
            url: "https://www.sketch.com",
            description: "界面设计工具",
            icon: "https://www.sketch.com/favicon.ico"
          },
          {
            id: "canva",
            name: "Canva",
            url: "https://www.canva.com",
            description: "在线设计平台",
            icon: "https://www.canva.com/favicon.ico"
          },
          {
            id: "adobe-xd",
            name: "Adobe XD",
            url: "https://www.adobe.com/products/xd.html",
            description: "用户体验设计工具",
            icon: "https://www.adobe.com/favicon.ico"
          }
        ]
      },
      {
        id: "learning",
        name: "学习资源",
        icon: "📚",
        order: 4,
        sites: [
          {
            id: "mdn",
            name: "MDN Web Docs",
            url: "https://developer.mozilla.org",
            description: "Web开发权威文档",
            icon: "https://developer.mozilla.org/favicon.ico"
          },
          {
            id: "w3school",
            name: "W3Schools",
            url: "https://www.w3schools.com",
            description: "Web技术教程",
            icon: "https://www.w3schools.com/favicon.ico"
          },
          {
            id: "runoob",
            name: "菜鸟教程",
            url: "https://www.runoob.com",
            description: "编程技术教程",
            icon: "https://www.runoob.com/favicon.ico"
          },
          {
            id: "coursera",
            name: "Coursera",
            url: "https://www.coursera.org",
            description: "在线课程平台",
            icon: "https://www.coursera.org/favicon.ico"
          }
        ]
      },
      {
        id: "community",
        name: "技术社区",
        icon: "👥",
        order: 5,
        sites: [
          {
            id: "stackoverflow",
            name: "Stack Overflow",
            url: "https://stackoverflow.com",
            description: "程序员问答社区",
            icon: "https://stackoverflow.com/favicon.ico"
          },
          {
            id: "juejin",
            name: "掘金",
            url: "https://juejin.cn",
            description: "技术分享社区",
            icon: "https://juejin.cn/favicon.ico"
          },
          {
            id: "csdn",
            name: "CSDN",
            url: "https://www.csdn.net",
            description: "技术博客平台",
            icon: "https://www.csdn.net/favicon.ico"
          },
          {
            id: "segmentfault",
            name: "SegmentFault",
            url: "https://segmentfault.com",
            description: "技术问答社区",
            icon: "https://segmentfault.com/favicon.ico"
          }
        ]
      },
      {
        id: "tools",
        name: "在线工具",
        icon: "⚙️",
        order: 6,
        sites: [
          {
            id: "json-formatter",
            name: "JSON Formatter",
            url: "https://jsonformatter.org",
            description: "JSON格式化工具",
            icon: "https://jsonformatter.org/favicon.ico"
          },
          {
            id: "regex101",
            name: "Regex101",
            url: "https://regex101.com",
            description: "正则表达式测试",
            icon: "https://regex101.com/favicon.ico"
          },
          {
            id: "caniuse",
            name: "Can I Use",
            url: "https://caniuse.com",
            description: "浏览器兼容性查询",
            icon: "https://caniuse.com/favicon.ico"
          },
          {
            id: "tinypng",
            name: "TinyPNG",
            url: "https://tinypng.com",
            description: "图片压缩工具",
            icon: "https://tinypng.com/favicon.ico"
          }
        ]
      },
      {
        id: "entertainment",
        name: "娱乐休闲",
        icon: "🎮",
        order: 7,
        sites: [
          {
            id: "bilibili",
            name: "哔哩哔哩",
            url: "https://www.bilibili.com",
            description: "弹幕视频网站",
            icon: "https://www.bilibili.com/favicon.ico"
          },
          {
            id: "youtube",
            name: "YouTube",
            url: "https://www.youtube.com",
            description: "视频分享平台",
            icon: "https://www.youtube.com/favicon.ico"
          },
          {
            id: "zhihu",
            name: "知乎",
            url: "https://www.zhihu.com",
            description: "知识问答社区",
            icon: "https://www.zhihu.com/favicon.ico"
          },
          {
            id: "douban",
            name: "豆瓣",
            url: "https://www.douban.com",
            description: "文艺生活社区",
            icon: "https://www.douban.com/favicon.ico"
          }
        ]
      },
      {
        id: "office",
        name: "办公协作",
        icon: "💼",
        order: 8,
        sites: [
          {
            id: "notion",
            name: "Notion",
            url: "https://www.notion.so",
            description: "全能工作空间",
            icon: "https://www.notion.so/favicon.ico"
          },
          {
            id: "slack",
            name: "Slack",
            url: "https://slack.com",
            description: "团队协作工具",
            icon: "https://slack.com/favicon.ico"
          },
          {
            id: "trello",
            name: "Trello",
            url: "https://trello.com",
            description: "项目管理工具",
            icon: "https://trello.com/favicon.ico"
          },
          {
            id: "feishu",
            name: "飞书",
            url: "https://www.feishu.cn",
            description: "企业协作平台",
            icon: "https://www.feishu.cn/favicon.ico"
          }
        ]
      },
      {
        id: "cloud",
        name: "云服务",
        icon: "☁️",
        order: 9,
        sites: [
          {
            id: "vercel",
            name: "Vercel",
            url: "https://vercel.com",
            description: "前端部署平台",
            icon: "https://vercel.com/favicon.ico"
          },
          {
            id: "netlify",
            name: "Netlify",
            url: "https://www.netlify.com",
            description: "静态网站托管",
            icon: "https://www.netlify.com/favicon.ico"
          },
          {
            id: "aws",
            name: "AWS",
            url: "https://aws.amazon.com",
            description: "亚马逊云服务",
            icon: "https://aws.amazon.com/favicon.ico"
          },
          {
            id: "aliyun",
            name: "阿里云",
            url: "https://www.aliyun.com",
            description: "阿里巴巴云计算",
            icon: "https://www.aliyun.com/favicon.ico"
          }
        ]
      }
    ],
    title: "猫猫导航"
  }
