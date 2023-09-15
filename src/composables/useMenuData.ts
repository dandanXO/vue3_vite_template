// casino
const casinoMenu = [
  { title: '收藏夹', path: '', icon: '', list: [], domId: '' },
  { title: '近期游戏记录', path: '', icon: '', list: [], domId: '' },
  { title: '挑战', path: '', icon: '', list: [], domId: '' },
]
const casinoGameList = [
  { title: '老虎机', path: '', icon: '', list: [], domId: '' },
  { title: '真人娱乐场', path: '', icon: '', list: [], domId: '' },
  { title: '游戏节目', path: '', icon: '', list: [], domId: '' },
  { title: '新游戏', path: '', icon: '', list: [], domId: '' },
  { title: '新游戏', path: '', icon: '', list: [], domId: '' },
  { title: '新游戏', path: '', icon: '', list: [], domId: '' },
]
const casinoGameProvider = [{ title: '游戏提供商', path: '', icon: '', list: [], domId: '' }]

// sports
const sportsMenu = [
  { title: '滚球盘', path: '', icon: '', list: [], domId: '' },
  { title: '即将开赛', path: '', icon: '', list: [], domId: '' },
  { title: '我的投注', path: '', icon: '', list: [], domId: '' },
]
const sportHotGames = [
  {
    title: '足球',
    path: '',
    icon: '',
    list: [
      { title: '激斗峡谷', path: '', icon: '' },
      { title: '激斗峡谷', path: '', icon: '' },
      { title: '激斗峡谷', path: '', icon: '' },
      { title: '激斗峡谷', path: '', icon: '' },
    ],
    domId: 'sports-hot-game-football',
  },
  {
    title: '网球',
    path: '',
    icon: '',
    list: [
      { title: '激斗峡谷', path: '', icon: '' },
      { title: '激斗峡谷', path: '', icon: '' },
      { title: '激斗峡谷', path: '', icon: '' },
      { title: '激斗峡谷', path: '', icon: '' },
    ],
    domId: 'sports-hot-game-tennis',
  },
  {
    title: '美式橄榄球',
    path: '',
    icon: '',
    list: [
      { title: '激斗峡谷', path: '', icon: '' },
      { title: '激斗峡谷', path: '', icon: '' },
      { title: '激斗峡谷', path: '', icon: '' },
      { title: '激斗峡谷', path: '', icon: '' },
    ],
    domId: 'sports-hot-game-use-football',
  },
  {
    title: '棒球',
    path: '',
    icon: '',
    list: [
      { title: '激斗峡谷', path: '', icon: '' },
      { title: '激斗峡谷', path: '', icon: '' },
      { title: '激斗峡谷', path: '', icon: '' },
      { title: '激斗峡谷', path: '', icon: '' },
    ],
    domId: 'sports-hot-game-use-baseball',
  },
  {
    title: '篮球',
    path: '',
    icon: '',
    list: [
      { title: '激斗峡谷', path: '', icon: '' },
      { title: '激斗峡谷', path: '', icon: '' },
      { title: '激斗峡谷', path: '', icon: '' },
      { title: '激斗峡谷', path: '', icon: '' },
    ],
    domId: 'sports-hot-game-use-basketball',
  },
]
const sportEsports = [
  {
    title: '所有电子竞技',
    path: '',
    icon: '',
    list: [
      { title: '彩虹六号', path: '', icon: '' },
      { title: '传说对决', path: '', icon: '' },
      { title: '刀塔2', path: '', icon: '' },
      { title: '激斗峡谷', path: '', icon: '' },
      { title: '激斗峡谷', path: '', icon: '' },
      { title: '激斗峡谷', path: '', icon: '' },
      { title: '激斗峡谷', path: '', icon: '' },
    ],
    domId: 'sports-e-sports',
  },
]
const sportGameList = [
  {
    title: '体育项目',
    path: '',
    icon: '',
    list: [
      { title: '澳洲足球', path: '', icon: '' },
      { title: '板球', path: '', icon: '' },
      { title: '棒球', path: '', icon: '' },
      { title: '足球', path: '', icon: '' },
      { title: '篮球', path: '', icon: '' },
      { title: '桌球', path: '', icon: '' },
      { title: '登山', path: '', icon: '' },
    ],
    domId: 'sports-game-list',
  },
]
const sportOddType = [
  {
    title: '赔率：',
    path: '',
    icon: '',
    list: [
      { title: '小数式', path: '', icon: '' },
      { title: '分数式', path: '', icon: '' },
      { title: '美式', path: '', icon: '' },
      { title: '印尼格式', path: '', icon: '' },
      { title: '香港格式', path: '', icon: '' },
      { title: '马来格式', path: '', icon: '' },
    ],
    domId: 'sports-odd-type',
  },
]

const staticMenu1 = [
  {
    title: '个人资料',
    path: '',
    icon: 'navbar-user',
    list: [
      { title: '钱包', path: '', icon: 'navbar-user' },
      { title: '保险库', path: '', icon: 'navbar-user' },
      { title: 'VIP', path: '', icon: 'navbar-user' },
      { title: '统计数据', path: '', icon: 'navbar-user' },
      { title: '通知', path: '', icon: 'navbar-user' },
      { title: '体育投注', path: '', icon: 'navbar-user' },
      { title: '设置', path: '', icon: 'navbar-user' },
      { title: '登出', path: '', icon: 'navbar-user' },
    ],
    domId: 'static-menu-user',
  },
  {
    title: '促销活动',
    path: '',
    icon: 'chess-gameshow',
    list: [
      { title: '推荐活动一', path: '', icon: 'navbar-user' },
      { title: '推荐活动二', path: '', icon: 'navbar-user' },
      { title: '推荐活动三', path: '', icon: 'navbar-user' },
      { title: '查看全部', path: '', icon: 'navbar-user' },
    ],
    domId: 'static-menu-promotion',
  },
  { title: '联盟计划', path: '', icon: 'spt-affiliate-pro', list: [], domId: '' },
  { title: 'VIP俱乐部', path: '', icon: 'chess-vipclub', list: [], domId: '' },
  { title: '博客', path: '', icon: 'chess-blog', list: [], domId: '' },
  { title: '论坛', path: '', icon: 'tabbar-chat', list: [], domId: '' },
]
const staticMenu2 = [
  {
    title: '赞助活动',
    path: '',
    icon: 'spt-sponsorship',
    list: [
      { title: '赞助活动一', path: '', icon: '' },
      { title: '赞助活动二', path: '', icon: '' },
      { title: '赞助活动三', path: '', icon: '' },
    ],
    domId: 'static-menu-sponsor',
  },
  { title: '负责任博彩', path: '', icon: 'spt-secure', list: [], domId: '' },
  { title: '在线支持', path: '', icon: 'spt-online-support', list: [], domId: '' },
  {
    title: '语言：',
    path: '',
    icon: 'chess-language',
    list: [
      { title: '中文', path: '', icon: '' },
      { title: '日文', path: '', icon: '' },
      { title: '英文', path: '', icon: '' },
    ],
    domId: 'static-menu-language',
  },
]

export function useMenuData() {
  return {
    casinoMenu,
    casinoGameList,
    casinoGameProvider,
    sportsMenu,
    sportHotGames,
    sportEsports,
    sportGameList,
    sportOddType,
    staticMenu1,
    staticMenu2,
  }
}