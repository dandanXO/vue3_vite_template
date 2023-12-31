<script setup lang='ts'>
interface TabItem {
  [text: string]: any
  value: string | number
  label: string
  icon?: string
  path?: string
}
interface Props {
  list: TabItem[]
  modelValue: string | number
  shape?: 'square' | 'round'
  full?: boolean
  center?: boolean
  size?: 'small' | 'large'
}
const props = withDefaults(defineProps<Props>(), {
  shape: 'round',
  center: true,
  size: 'small',
})
const emit = defineEmits(['update:modelValue', 'change'])

const router = useRouter()

function onClick(tab: TabItem) {
  if (tab.value === props.modelValue || tab.disabled)
    return

  // event.target.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' })
  emit('update:modelValue', tab.value)
  emit('change', tab.value)
  if (tab.path)
    router.push(tab.path)
}
</script>

<template>
  <div class="base-tab" :class="{ center }">
    <div class="scroll-x base-tab-wrap" :class="{ full }">
      <div class="tab-wrap" :class="[shape]">
        <div
          v-for="t, i in list" :key="i" class="tab"
          :class="[`tab-${size}`,
                   { active: t.value === modelValue, disabled: t.disabled }]"
          @click="onClick(t)"
        >
          <div class="content">
            <slot name="tab" :item="t">
              <BaseIcon v-if="t.icon" :name="t.icon" />
              {{ t.label }}
            </slot>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
:root {
  --tg-tab-style-wrap-bg-color: var(--tg-secondary-dark);
  --tg-tab-style-inner-padding-y: var(--tg-spacing-11);
  --tg-tab-style-inner-padding-x: var(--tg-spacing-20);
}
</style>

<style lang='scss' scoped>
.base-tab {
  display: flex;
  max-width: 100%;
}

.base-tab-wrap {
  display: flex;
  max-width: 100%;

  .tab-wrap {
    padding: var(--tg-spacing-5) var(--tg-spacing-6);
    background-color: var(--tg-tab-style-wrap-bg-color);
    flex: 1;
    display: flex;
    gap: var(--tg-spacing-5);
  }

  .square {
    border-radius: var(--tg-radius-default);

    .tab {
      border-radius: var(--tg-radius-default);
    }
  }

  .round {
    border-radius: 100px;

    .tab {
      border-radius: 100px;
    }
  }

  .tab {
    flex: 1;
    font-size: var(--tg-font-size-default);
    color: var(--tg-text-white);
    padding: var(--tg-tab-style-inner-padding-y) var(--tg-tab-style-inner-padding-x);
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all ease .25s;
    font-weight: var(--tg-font-weight-semibold);

    &.tab-large {
      --tg-tab-style-inner-padding-y: var(--tg-spacing-15);
    }

    .content {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      flex: 1 0;
      white-space: nowrap;

      .app-svg-icon {
        margin-right: var(--tg-spacing-8);
      }
    }

    &:active {
      .content {
        transform: scale(0.96);
      }
    }

    &:hover {
      background-color: var(--tg-secondary-main);
      --tg-icon-color: var(--tg-text-white);
    }

    &.active {
      background-color: var(--tg-secondary-main);
      --tg-icon-color: var(--tg-text-white);
    }

    &.disabled {
      cursor: not-allowed;
      opacity: 0.5;
    }
  }

}

.full {
  flex: 1;
}

.center {
  justify-content: center;
}
</style>
