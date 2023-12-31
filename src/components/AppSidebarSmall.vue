<script lang="ts" setup name="app-sidebar-small">
import type { MenuItem } from '~/composables/useApiMenuData'

interface Props {
  isSwitching?: boolean
}

withDefaults(defineProps<Props>(), {})

const route = useRoute()
const { isLogin } = storeToRefs(useAppStore())
const {
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
  menuItemClick,
} = useApiMenuData()

const routePath = computed(() => route.path)
const isCasino = computed(() => route.name?.toString().includes('casino'))
const isSports = computed(() => route.name?.toString().includes('sports'))
const menuData = computed(() => {
  if (isCasino.value) {
    return [
      casinoMenu,
      casinoGameList,
      casinoGameProvider,
      staticMenu1,
      staticMenu2,
    ]
  }
  else if (isSports.value) {
    return [
      sportsMenu,
      sportHotGames,
      sportEsports,
      sportGameList,
      sportOddType,
      staticMenu1,
      staticMenu2,
    ]
  }
  return [
    staticMenu1,
    staticMenu2,
  ]
})

function itemClick(item: MenuItem) {
  if (item.token && !isLogin.value)
    return
  menuItemClick(item)
}
</script>

<template>
  <section class="tg-app-sidebar-small">
    <ul
      v-for="menu, idx in menuData"
      :key="idx"
      class="tiny-menu flex-col-center"
    >
      <li
        v-for="menuitem in menu.value"
        :key="menuitem.title" class="flex-col-center tiny-menu-item"
        :class="{
          active: routePath === menuitem.path,
          disabled: menuitem.token && !isLogin,
        }"
      >
        <VTooltip placement="top">
          <div class="trigger" @click="itemClick(menuitem)">
            <BaseIcon :name="menuitem.icon" />
            <div
              v-if="menuitem.list && menuitem.list.length"
              class="flex-col-center arrow-right"
            >
              <BaseIcon name="uni-arrow-right" />
            </div>
          </div>
          <template #popper>
            <div class="tiny-menu-item-title">
              {{ menuitem.title }}
            </div>
          </template>
        </VTooltip>
      </li>
    </ul>
  </section>
</template>

<style lang="scss" scoped>
.flex-col-center {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.tg-app-sidebar-small {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: var(--tg-spacing-8);
  padding-left: var(--tg-spacing-8);
  overflow: hidden;
  .tiny-menu {
    border-radius: var(--tg-radius-default);
    background: var(--tg-primary-main);
    cursor: pointer;
    .tiny-menu-item {
      position: relative;
      font-size: var(--tg-font-size-default);
      width: 44px;
      height: 44px;
      .app-svg-icon {
        transition: color 0.2s;
        transform: scale(1.1);
      }
      &:hover, &.active {
        background: var(--tg-secondary-main);
        border-radius: var(--tg-radius-default);
        --tg-icon-color: var(--tg-text-white);
      }
      &.disabled{
        cursor: not-allowed;
        opacity: 0.5;
      }
      > .v-popper, .trigger {
        width: 100%;
        height: 100%;
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
      }
      .arrow-right {
        position: absolute;
        right: 0;
        font-size: 6.5px;
        width: 14px;
      }
    }
  }
}
</style>
