import type { UserThemeConfig } from 'valaxy-theme-yun'
import { defineValaxyConfig } from 'valaxy'

// add icons what you will need
const safelist = [
  'i-ri-home-line',
]

/**
 * User Config
 */
export default defineValaxyConfig<UserThemeConfig>({
  // site config see site.config.ts

  theme: 'yun',

  themeConfig: {
    type: 'nimbo',

    banner: {
      enable: true,
      title: ['x', 'ye', 'yue', '的', '小', '站'],
      // 首页下方的流动云动画
      cloud: {
        enable: true, 
      },
      // 动画持续时间
      duration: 750,
    },

    nav: [
      { text: '文章', link: '/posts/', icon: 'i-ri-article-line' },
      { text: '友链', link: '/links/', icon: 'i-ri-link'}
    ],

    pages: [
      {
        name: '我的小伙伴们',
        url: '/links/',
        icon: 'i-ri-genderless-line',
        color: 'dodgerblue',
      },
      {
        name: '喜欢的女孩子',
        url: '/girls/',
        icon: 'i-ri-women-line',
        color: 'hotpink',
      },
    ],

    footer: {
      since: 2026,

      cloud: {
        enable: true,
      },

      powered: true,

      beian: {
        enable: false,
        icp: '',
        police: '苏公网安备xxxxxx号',
      },
    },

    notice: {
      enable: true,
      hideInPages: false,
      content: '欢迎来到我的小站!',
    },

    fireworks: {
      enable: true,
      colors: ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff'],
    },

    menu: {
      custom: {
        title: 'Menu',
        url: '/',
        icon: 'i-ri-menu-line',
      }
    },
    
    outlineTitle: '目录',
  },


  unocss: { safelist },
})
