<script setup lang='ts'>
interface Props {
  modelValue: boolean // 是否展开
}
const props = defineProps<Props>()
const emit = defineEmits(['update:modelValue'])
const isExpand = computed(() => props.modelValue)

function onClick() {
  emit('update:modelValue', !props.modelValue)
}

const widthBoundaryXl = 1200 // 宽度边界 1200
const widthBoundaryMd = 768 // 宽度边界 768
const { width } = useWindowSize()
const isFixedSmall = computed(() => width.value > widthBoundaryMd)
const isFixed = computed(() => width.value < widthBoundaryXl)
const isFullScreen = computed(() => width.value <= widthBoundaryMd)

// 左侧侧边栏宽度
const leftSidebarWidth = computed(() => {
  return `${isExpand.value ? 240 : 60}px`
})
const router = useRouter()

// casino
const casinoMenu = [
  { title: '收藏夹', path: '', icon: '', list: [] },
  { title: '近期游戏记录', path: '', icon: '', list: [] },
  { title: '挑战', path: '', icon: '', list: [] },
]
const casinoGameList = [
  { title: '老虎机', path: '', icon: '', list: [] },
  { title: '真人娱乐场', path: '', icon: '', list: [] },
  { title: '游戏节目', path: '', icon: '', list: [] },
  { title: '新游戏', path: '', icon: '', list: [] },
  { title: '新游戏', path: '', icon: '', list: [] },
  { title: '新游戏', path: '', icon: '', list: [] },
]
const casinoGameProvider = [{ title: '游戏提供商', path: '', icon: '', list: [] }]

// sports
const sportsMenu = [
  { title: '滚球盘', path: '', icon: '', list: [] },
  { title: '即将开赛', path: '', icon: '', list: [] },
  { title: '我的投注', path: '', icon: '', list: [] },
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
  },
  { title: '联盟计划', path: '', icon: 'spt-affiliate-pro', list: [] },
  { title: 'VIP俱乐部', path: '', icon: 'chess-vipclub', list: [] },
  { title: '博客', path: '', icon: 'chess-blog', list: [] },
  { title: '论坛', path: '', icon: 'tabbar-chat', list: [] },
]
const staticMenu2 = [
  {
    title: '赞助活动',
    path: '',
    icon: 'navbar-user',
    list: [
      { title: '赞助活动一', path: '', icon: '' },
      { title: '赞助活动二', path: '', icon: '' },
      { title: '赞助活动三', path: '', icon: '' },
    ],
  },
  { title: '负责任博彩', path: '', icon: '', list: [] },
  { title: '在线支持', path: '', icon: '', list: [] },
  {
    title: '语言：',
    path: '',
    icon: '',
    list: [
      { title: '中文', path: '', icon: '' },
      { title: '日文', path: '', icon: '' },
      { title: '英文', path: '', icon: '' },
    ],
  },
]
</script>

<template>
  <div
    class="left-sidebar" :style="{
      '--width': leftSidebarWidth,
    }" :class="{
      'fixed-small': isFixedSmall,
      'fixed': isFixed,
      'full-screen': isFullScreen,
    }"
  >
    <div v-show="!isFullScreen" class="header" :class="{ 'is-small': !isExpand }">
      <div class="button" @click="onClick">
        <BaseIcon name="uni-bars" />
      </div>
      <div class="game-type">
        <div class="casino" @click="router.push('/casino')">
          <span>娱乐城</span>
        </div>
        <div class="sports" @click="router.push('/sports')">
          <span>体育</span>
        </div>
      </div>
    </div>
    <AppSidebarBig
      v-show="isExpand" :sports-menu="sportsMenu" :casino-game-provider="casinoGameProvider"
      :casino-game-list="casinoGameList" :casino-menu="casinoMenu" :static-menu1="staticMenu1"
      :static-menu2="staticMenu2" :sport-hot-games="sportHotGames" :sport-esports="sportEsports" :sport-game-list="sportGameList"
      :sport-odd-type="sportOddType"
    />
    <!-- <AppSidebarSmall v-show="!isExpand" /> -->
  </div>
</template>

<style lang='scss' scoped>
.left-sidebar {
  width: var(--width);
  background-color: var(--tg-secondary-dark);
  transition: width 0.3s ease-in-out, top .2s ease-in-out;
  z-index: var(--tg-z-index-20);
  height: 100%;
  display: flex;
  flex-direction: column;

  &.fixed {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
  }

  &.full-screen {
    // H5模式
    width: 100%;
    top: var(--tg-header-height);
    padding-bottom: var(--tg-footer-height);
  }

  &.fixed-small {
    width: var(--width);
  }
}

.header {
  display: flex;
  padding: 0 var(--tg-spacing-16) 0 0;
  touch-action: none;
  box-shadow: var(--tg-box-shadow-lg);

  .button {
    font-size: var(--tg-font-size-base);
    min-width: 60px;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }

  .game-type {
    display: flex;
    align-items: center;
    gap: var(--tg-spacing-8);
    width: 100%;
    color: var(--tg-text-white);
    font-size: var(--tg-font-size-default);

    .casino,
    .sports {
      display: flex;
      flex: 1;
      align-items: center;
      justify-content: center;
      background-size: cover;
      background-repeat: no-repeat;
      min-height: var(--tg-spacing-36);
      background-image: url('/img/left-side-bar/casino_bg.png');
      cursor: pointer;
      border-radius: var(--tg-radius-default);

      &:hover {
        background-image: url('/img/left-side-bar/casino_bg_active.png');
      }

      &:active {
        span {
          transform: scale(0.95);
        }
      }
    }

    .sports {
      background-image: url('/img/left-side-bar/sports_bg.png');

      &:hover {
        background-image: url('/img/left-side-bar/sports_bg_active.png');
      }
    }

    .casino.active {
      background-image: url('/img/left-side-bar/casino_bg_active.png');
    }

    .sports.active {
      background-image: url('/img/left-side-bar/sports_bg_active.png');
    }
  }
}

.is-small {
  flex-direction: column;
  padding: 0 0 var(--tg-spacing-8);
  box-shadow: none;

  .button {
    box-shadow: var(--tg-box-shadow-lg);
  }

  .game-type {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--tg-spacing-8);
    width: 100%;
    padding: var(--tg-spacing-16) 0 0;

    span {
      display: none;
    }

    .casino,
    .sports {
      width: 44px;
      height: 44px;
      flex: unset;
    }
  }
}
</style>