<script lang="ts" setup>
interface Props {
  title?: string
  icon?: string
  showMore?: boolean
  loading?: boolean
  level?: string | number
  init?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  init: true,
})

const emit = defineEmits(['more', 'open', 'close'])

const { bool: isOpen, setBool } = useBoolean(props.init)

const openCount = ref(0)

function loadMore() {
  emit('more')
}

function toggle() {
  setBool(!isOpen.value)
  if (isOpen.value) {
    openCount.value += 1
    emit('open', openCount.value)
  }
  else {
    emit('close')
  }
}
</script>

<template>
  <div
    class="base-secondary-accordion"
    :class="[isOpen ? 'is-open' : '', `level-${level}`]"
  >
    <div class="no-active-scale header" @click="toggle">
      <slot name="header">
        <div class="container">
          <div class="container">
            <BaseIcon v-if="icon" :name="icon" />
            <div class="container">
              <div class="center">
                <span>{{ title }}</span>
              </div>
              <slot name="sideThird" :is-open="isOpen" />
            </div>
            <slot name="sideSecond" :is-open="isOpen" />
          </div>
          <slot name="side" :is-open="isOpen" />
        </div>
      </slot>
      <div class="arrow">
        <BaseIcon
          name="uni-arrow-down" :style="{ transform: `rotate(${isOpen ? 0 : 90}deg)` }"
        />
      </div>
    </div>
    <div v-if="isOpen" class="content" :class="{ 'is-open': isOpen }">
      <slot :is-open="isOpen" />
    </div>
    <div v-if="showMore" class="show-more">
      <hr>
      <div class="load-more-box">
        <BaseButton type="text" @click="loadMore">
          <span v-if="!loading">加载更多</span>
          <span v-else class="ani-scale">
            <BaseIcon name="spt-soccer" />
          </span>
        </BaseButton>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
:root {
  --tg-secondaryAccordion-header-background: var(--tg-secondary-grey);
  --tg-secondaryAccordion-header-title-color: var(--tg-text-grey-light);
  --tg-secondaryAccordion-content-background: var(--tg-secondary-grey);
  --tg-secondaryAccordion-content-border-color: var(--tg-secondary-main);
}
</style>

<style lang="scss" scoped>
.load-more-box {
  padding-left: var(--tg-spacing-16);
  padding-top: var(--tg-spacing-12);
  padding-bottom: var(--tg-spacing-12);
  display: flex;
  align-items: center;
  justify-content: flex-start;
}
@keyframes aniScale {
  0% {
    transform: scale(0.85);
  }
  50% {
    transform: scale(1.5);
  }
  100% {
    transform: scale(0.85);
  }
}
.ani-scale {
  animation: 800ms linear 0ms infinite normal both running aniScale;
}
.level-1 {
  --tg-secondaryAccordion-header-background: var(--tg-text-grey-deep);
  --tg-secondaryAccordion-header-title-color: var(--tg-text-white);
  --tg-secondaryAccordion-content-background: var(--tg-primary-main);
  --tg-secondaryAccordion-content-border-color: var(--tg-text-grey-deep);
}
.level-2 {
  --tg-secondaryAccordion-header-background: var(--tg-secondary-grey);
  --tg-secondaryAccordion-header-title-color: var(--tg-text-grey-light);
  --tg-secondaryAccordion-content-background: var(--tg-secondary-grey);
  --tg-secondaryAccordion-content-border-color: var(--tg-secondary-main);
}
.level-3 {
  --tg-secondaryAccordion-header-background: var(--tg-secondary-dark);
  --tg-secondaryAccordion-header-title-color: var(--tg-text-grey-light);
  --tg-secondaryAccordion-content-background: var(--tg-secondary-dark);
  --tg-secondaryAccordion-content-border-color: var(--tg-secondary-main);
  .arrow {
    --tg-icon-color: var(--tg-text-white);
  }
}
.base-secondary-accordion {
  display: flex;
  flex-direction: column;
  width: 100%;
  position: relative;
  z-index: 0;
  box-shadow: var(--tg-box-shadow), var(--tg-shadow-inset);
  border-radius: var(--tg-radius-default);
  background: var(--header-background);
  --header-background: var(--tg-secondaryAccordion-header-background);
  --title-color: var(--tg-secondaryAccordion-header-title-color);
  --content-background: var(--tg-secondaryAccordion-content-background);
  --content-border: var(--tg-secondaryAccordion-content-border-color);
  &.is-open {
    .header {
      border-radius: var(--tg-radius-default) var(--tg-radius-default) 0 0;
    }
  }
  .arrow {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: var(--tg-font-size-xs);
    width: var(--tg-spacing-18);
    height: var(--tg-spacing-18);
    svg {
      transition: all 50ms;
    }
  }
  .header {
    width: 100%;
    z-index: 4;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: 0 0;
    padding: var(--tg-spacing-12) var(--tg-spacing-16);
    color: var(--title-color);
    cursor: pointer;
    border-radius: var(--tg-radius-default);
    font-size: var(--tg-font-size-default);
    font-weight: var(--tg-font-weight-semibold);
    line-height: 1.5;
    .container {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: var(--tg-spacing-8);
      width: 100%;
    }
    .center {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: center;
      gap: var(--tg-spacing-8);
      color: var(--tg-text-white);
      > span {
        display: inline-flex;
        align-items: center;
        text-align: left;
        justify-content: flex-start;
      }
    }
  }
  .content {
    background: var(--content-background);
    display: flex;
    flex-direction: column;
    width: 100%;
    border-radius: 0 0 var(--tg-radius-default) var(--tg-radius-default);
    &.is-open {
      border-top: 2px solid var(--content-border);
    }
  }
  .show-more {
    --tg-spacing-button-padding-vertical-xs: 0;
    --tg-spacing-button-padding-horizontal-xs: 0;
    hr {
      background: var(--tg-secondary-main);
      height: 2px;
      width: 100%;
      margin-top: var(--tg-spacing-8);
    }
  }
}
</style>
