<script lang="ts" setup name="app-slider">
interface SlideItem {
  id: string | number
  [key: string]: any
}

interface Props {
  api: string
  icon: string
  title: string
  data: Array<SlideItem>
  showViewAll?: boolean
}

withDefaults(defineProps<Props>(), {
  showViewAll: true,
})

const pageInfo = reactive({
  total: 0,
  pageSize: 0,
  page: 1,
})

const sliderOuter = ref()
const outerWidth = ref(0)

const gallery = ref()
const galleryClass = ref('')
const itemWidth = ref(0)
const pageWidth = computed(() => pageInfo.pageSize * itemWidth.value * outerWidth.value)

const { x } = useScroll(gallery) // , isScrolling, arrivedState, directions

const scrollLeftItemsCount = computed(() => {
  return Math.round(x.value / (itemWidth.value * outerWidth.value))
})

function nextPage() {
  x.value += pageWidth.value
}

function prevPage() {
  const temp = x.value - pageWidth.value
  if (temp > 0)
    x.value = temp
  else
    x.value = 0
}

function setOuterWidth() {
  const { width } = sliderOuter.value.getBoundingClientRect()
  outerWidth.value = width
}

onMounted(() => {
  window.addEventListener('resize', setOuterWidth)
  nextTick(() => {
    setOuterWidth()
  })
})

onUnmounted(() => {
  window.removeEventListener('resize', setOuterWidth)
})

watchEffect(() => {
  if (outerWidth.value >= 1150) {
    itemWidth.value = 0.1333
    galleryClass.value = 'gallery-1150'
    pageInfo.pageSize = 7
  }
  else if (outerWidth.value >= 1000) {
    itemWidth.value = 0.1538
    galleryClass.value = 'gallery-1150-1000'
    pageInfo.pageSize = 6
  }
  else if (outerWidth.value >= 850) {
    itemWidth.value = 0.1818
    galleryClass.value = 'gallery-1000-850'
    pageInfo.pageSize = 5
  }
  else if (outerWidth.value >= 700) {
    itemWidth.value = 0.2222
    galleryClass.value = 'gallery-850-700'
    pageInfo.pageSize = 4
  }
  else if (outerWidth.value >= 500) {
    itemWidth.value = 0.25
    galleryClass.value = 'gallery-700-500'
    pageInfo.pageSize = 4
  }
  else {
    itemWidth.value = 0.3333
    galleryClass.value = 'gallery-500'
    pageInfo.pageSize = 3
  }
})
</script>

<template>
  <section ref="sliderOuter" class="tg-app-slider">
    <div class="header">
      <div class="title">
        <a>
          <BaseIcon :name="icon" />
          <h3>{{ title }}</h3>
        </a>
      </div>
      <div class="arrows">
        <BaseButton type="round-line-left" :disabled="x <= 0" @click="prevPage">
          <BaseIcon name="uni-arrowleft-line" />
        </BaseButton>
        <BaseButton type="round-line-right" :disabled="scrollLeftItemsCount + pageInfo.pageSize >= data.length + 1" @click="nextPage">
          <BaseIcon name="uni-arrowright-line" />
        </BaseButton>
      </div>
    </div>
    <div ref="gallery" class="gallery scroll-x hide-scrollbar" :class="[galleryClass]">
      <div v-for="item, idx in data" :key="item.id" class="slide" :class="{ faded: idx >= scrollLeftItemsCount + pageInfo.pageSize }">
        <div class="item">
          <slot :item="item">
            <BaseGameItem :game-info="item" />
          </slot>
        </div>
      </div>
      <div v-if="showViewAll || $slots.viewAll" class="slide see-all" :class="{ faded: scrollLeftItemsCount + pageInfo.pageSize < data.length + 1 }">
        <div class="item">
          <slot name="viewAll">
            <img src="img/seeAll-en.avif">
            <div class="txt">
              <span>{{ $t('view_all') }}</span>
            </div>
          </slot>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.tg-app-slider {
  display: flex;
  flex-direction: column;
  // margin-bottom: -4px;
  width: 100%;
  margin-top: var(--tg-spacing-button-padding-vertical-xl);
  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    .title {
      a {
        font-size: 25px;
        color: var(--tg-text-white);
        display: inline-flex;
        position: relative;
        align-items: center;
        font-weight: 500;
        h3 {
          font-size: 18px;
          line-height: 1.5;
          margin-left: var(--tg-spacing-8);
        }
      }
    }
    .arrows {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      gap: var(--tg-spacing-6);
      button {
        width: 55px;
        height: 42px;
        padding: 0 !important;
      }
      button:disabled {
        cursor: default;
      }
      .app-svg-icon {
        font-size: 20px;
        --tg-icon-color: var(--tg-text-white);
      }
    }
  }
  .gallery {
    display: grid;
    grid-auto-flow: column;
    padding-top: 10px;
    overflow-x: auto;
    scroll-snap-type: x mandatory;
    scroll-behavior: smooth;
    // 以下数字代表 tg-app-slider 的宽度
    &.gallery-1150 {
      grid-auto-columns: calc(13.33% - 10px); // pageSize 7
      gap: 11px;
    }
    &.gallery-1150-1000 {
      grid-auto-columns: calc(15.38% - 15px); // 6
      gap: 16px;
    }
    &.gallery-1000-850 {
      grid-auto-columns: calc(18.18% - 15px); // 5
      gap: 16px;
    }
    &.gallery-850-700 {
      grid-auto-columns: calc(22.22% - 15px); // 4
      gap: 16px;
    }
    &.gallery-700-500 {
      grid-auto-columns: calc(25% - 5px); // 4
      gap: 6px;
    }
    &.gallery-500 {
      grid-auto-columns: calc(33.33% - 5px); // 3
      gap: 6px;
    }
    .slide {
      scroll-snap-align: start;
      will-change: opacity;
      transition: all .3s;
      &.faded {
        opacity: .2;
        cursor: pointer;
      }
      .item {
        border-radius: var(--tg-radius-md);
      }
      &.see-all {
        .item {
          text-align: center;
          overflow: hidden;
          cursor: pointer;
          position: relative;
          transition: all 0.3s ease;
          &:hover {
            transform: translateY(-7px);
          }
          img {
            display: block;
          }
          .txt {
            font-size: var(--tg-font-size-lg);
            color: var(--tg-text-white);
            position: absolute;
            inset: 0 0 0 0;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
          }
        }
      }
    }
  }
}
</style>