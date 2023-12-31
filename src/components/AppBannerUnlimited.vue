<script setup lang='ts'>
interface IBannerData {
  imgUrl: string
  title: string
  desc: string
  value: number
}

const {
  appContentWidth,
  widthBoundaryXs,
  widthBoundarySm,
} = storeToRefs(useWindowStore())

const bannerData = [
  {
    imgUrl: 'https://stake.com/_app/immutable/assets/bespoke.732ab8da.png',
    title: 'Bespoke',
    desc: '与您的专属 VIP 服务代表合作，根据您的投注需求定制福利。',
    value: 1,
  },
  {
    imgUrl: 'https://stake.com/_app/immutable/assets/boost.82696ea3.png',
    title: '助推奖金',
    desc: '您可以预期每周和每月根据您的游戏量获得奖金。玩得越多，获得的奖金就越多。',
    value: 2,
  },
  {
    imgUrl: 'https://stake.com/_app/immutable/assets/cashback.246348a4.png',
    title: '近期游戏表现奖金',
    desc: '运气不佳？Stake 会在您每次升级时根据您的损失提供额外资金。',
    value: 3,
  },
  {
    imgUrl: 'https://stake.com/_app/immutable/assets/host.2f60d1cc.png',
    title: '专属 VIP 服务代表',
    desc: '被分配一名将支持并满足您的投注需求的专属 VIP 服务代表。',
    value: 4,
  },
  {
    imgUrl: 'https://stake.com/_app/immutable/assets/levelup.ca1eacfa.png',
    title: '升级奖金',
    desc: '在每达到下个级别后获取奖金。所达级别越高，升级奖金就越大。',
    value: 5,
  },
]
const offSet = ref(0)
const activeValue = ref(2)
const {
  bool: activeTransition,
  setTrue: setTransitionTrue,
  setFalse: setTransitionFalse,
} = useBoolean(false)
const sliderRef = ref<HTMLElement>()
const baseNumber = ref(0.3333)
const offSetNumber = ref(0)
const {
  bool: isDragging, setTrue:
  setDraggingTrue, setFalse:
  setDraggingFalse,
} = useBoolean(false)
const startPosition = ref(0)
const tempOffSet = ref(0)

const isXs = computed(() => appContentWidth.value < widthBoundaryXs.value)
const isSm = computed(() => {
  return appContentWidth.value < widthBoundarySm.value
  && appContentWidth.value > widthBoundaryXs.value
})
const mergeBannerData = computed(() => {
  return [...bannerData, ...bannerData, ...bannerData]
})
const cardWidth = computed(() => {
  return Number((appContentWidth.value * baseNumber.value).toFixed(2))
})
const sliderWidth = computed(() => cardWidth.value * 15)
const offSetInit = computed(() => cardWidth.value * 5)

// 左
const onPrev = throttle(() => {
  offSet.value = Number((offSet.value + cardWidth.value).toFixed(2))
  if (activeValue.value === 1)
    activeValue.value = 6
  setTransitionTrue()
  activeValue.value--
  if (offSet.value === -cardWidth.value) {
    setTimeout(() => {
      offSet.value = -(Number((cardWidth.value * 6).toFixed(2)))
    }, 900)
  }
  setTimeout(() => {
    setTransitionFalse()
  }, 800)
  offSetNumber.value = Math.abs(
    Number((offSet.value / cardWidth.value).toFixed()))
}, 1000, { leading: true, trailing: false })
// 右
const onNext = throttle(() => {
  offSet.value = Number((offSet.value - cardWidth.value).toFixed(2))
  if (activeValue.value === 5)
    activeValue.value = 0
  setTransitionTrue()
  activeValue.value++
  if (offSet.value === -(Number((cardWidth.value * 9).toFixed(2)))) {
    setTimeout(() => {
      offSet.value = -(Number((cardWidth.value * 4).toFixed(2)))
    }, 900)
  }
  setTimeout(() => {
    setTransitionFalse()
  }, 800)
  offSetNumber.value = Math.abs(
    Number((offSet.value / cardWidth.value).toFixed()))
}, 1000, { leading: true, trailing: false })
// 点击图片切换
const change = function (item: IBannerData) {
  if (isSm.value || isXs.value)
    return
  if (item.value < activeValue.value) {
    if (item.value === 1 && activeValue.value !== 2)
      onNext()
    else
      onPrev()
  }
  else if (item.value > activeValue.value) {
    if (item.value === 5 && activeValue.value !== 4)
      onPrev()
    else
      onNext()
  }
}
// 触碰
const onTouchstart = throttle((e: TouchEvent) => {
  setDraggingTrue()
  startPosition.value = e.touches[0].clientX
  tempOffSet.value = offSet.value
}, 1000, { leading: true, trailing: false })
// 移动
const onTouchMove = function (e: TouchEvent) {
  if (!isDragging.value)
    return
  const currentPosition = e.touches[0].clientX
  offSet.value = tempOffSet.value + (currentPosition - startPosition.value)
}
// 抬起
const onTouchEnd = throttle((e: TouchEvent) => {
  setDraggingFalse()
  const currentPosition = e.changedTouches[0].clientX
  offSet.value = tempOffSet.value
  if (startPosition.value > currentPosition)
    onNext()
  else if (startPosition.value < currentPosition)
    onPrev()
}, 1000, { leading: true, trailing: false })

watch(() => isSm.value, () => {
  if (isSm.value)
    baseNumber.value = 0.5
  else if (!isSm.value && !isXs.value)
    baseNumber.value = 0.3333
}, { immediate: true })
watch(() => isXs.value, () => {
  if (isXs.value)
    baseNumber.value = 1
  else if (!isSm.value && !isXs.value)
    baseNumber.value = 0.3333
}, { immediate: true })
watch(() => appContentWidth.value, () => {
  offSet.value = -Number(
    Math.abs(offSetNumber.value * cardWidth.value).toFixed(2))
})

onMounted(() => {
  setTimeout(() => {
    offSet.value = -offSetInit.value
    offSetNumber.value = Math.abs(
      Number((offSet.value / cardWidth.value).toFixed()))
  }, 0)
  // 滑动
  sliderRef.value?.addEventListener('touchstart', onTouchstart)
  sliderRef.value?.addEventListener('touchmove', onTouchMove)
  sliderRef.value?.addEventListener('touchend', onTouchEnd)
})
onUnmounted(() => {
  sliderRef.value?.removeEventListener('touchstart', onTouchstart)
  sliderRef.value?.removeEventListener('touchmove', onTouchMove)
  sliderRef.value?.removeEventListener('touchend', onTouchEnd)
})
</script>

<template>
  <div class="app-banner-unlimited">
    <div class="banner-wrap">
      <div ref="sliderRef" class="slider-wrap">
        <div
          class="slider"
          :style="{
            transform: `translate(${offSet}px, 0px)`,
            width: `${sliderWidth}px`,
          }"
          :class="{ 'is-transition': activeTransition }"
        >
          <div
            v-for="item in mergeBannerData"
            :key="item.value"
            class="slider-item"
            :class="{
              'active': item.value === activeValue && !isSm && !isXs,
              'active-sm': isSm,
              'active-xs': isXs,
            }"
            :style="{ width: `${cardWidth}px` }"
            @click.stop="change(item)"
          >
            <div class="item-box">
              <div class="item-img">
                <BaseImage :url="item.imgUrl" />
              </div>
              <p class="item-title">
                {{ item.title }}
              </p>
              <p class="item-desc">
                {{ item.desc }}
              </p>
            </div>
          </div>
        </div>
        <div class="slider-btn">
          <div class="button prev" @click="onPrev">
            <BaseIcon name="uni-arrow-left" />
          </div>
          <div class="button next" @click="onNext">
            <BaseIcon name="uni-arrow-right" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang='scss' scoped>
.app-banner-unlimited{
  .banner-wrap{
    width: 100%;
    max-width: 1200px;
    overflow: hidden;
    .slider-wrap{
      width: 100%;
      min-height: 430px;
      position: relative;
      .slider{
        display: flex;
        position: relative;
        overflow-x: auto;
        // width: 6000px;
        &.is-transition {
          transition: all .8s;
        }
        .slider-item{
          // width: 400px;
          min-height:430px;
          transform: scale(.85);
          transition: transform .7s ease,opacity 1s ease;
          .item-box{
            height: 100%;
            padding: var(--tg-spacing-16) var(--tg-spacing-28);
            background-color: var( --tg-secondary-dark);
            border-radius: var(--tg-radius-md);
            margin: 0 var(--tg-spacing-7);
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            gap: .5rem;
          }
          &.active{
            transform: scale(1);
            .item-box{
              background-color: var(--tg-secondary-grey);
            }
          }
          &.active-sm{
            transform: scale(1);
            margin: 0 var(--tg-spacing-16);
            .item-box{
              background-color: var(--tg-secondary-grey);
            }
          }
          &.active-xs{
            transform: scale(1);
            margin: var(--tg-spacing-16);
            .item-box{
              background-color: var(--tg-secondary-grey);
            }
          }
          .item-img{
            width: 160px;
            height: 160px;
            margin: var(--tg-spacing-40) 0 var(--tg-spacing-32);
          }
          .item-title{
            line-height: 1.3;
            font-size: var(--tg-font-size-lg);
            color: var(--tg-text-white);
            font-weight: var(--tg-font-weight-semibold);
          }
          .item-desc{
            padding: 0 var(--tg-spacing-40);
            margin-top: var(--tg-spacing-8);
            line-height: 1.5;
            text-align: center;
            color: var(--tg-text-lightgrey);
          }
        }
      }
      .slider-btn{
          .button{
            width: 16px;
            height: 16px;
            position: absolute;
            top:0;
            bottom: 0;
            margin: auto;
            transform: scale(.7);
            transition: all .2s;
            cursor: pointer;
            &:hover{
              transform: scale(.85);
            }
          }
          .next{
            right: 0;
          }
        }

    }
  }
}
</style>
