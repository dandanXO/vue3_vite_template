<script setup lang='ts'>
interface Props {
  placeHolder?: string
  shape?: 'square' | 'round'
  modelValue: string
  clearable?: boolean
  whiteStyle?: boolean
}

withDefaults(defineProps<Props>(), {
  placeHolder: 'Search...',
  shape: 'round',
})
const emit = defineEmits(['update:modelValue', 'input', 'search', 'focus', 'blur'])

function onInput(event: any) {
  const v = event.target.value
  emit('update:modelValue', v)
  emit('input', v)
}

const isFocus = ref(false)
function onFocus() {
  isFocus.value = true
  emit('focus')
}
function onBlur() {
  isFocus.value = false
  emit('blur')
}
function onSearch() {
  emit('search')
}
function onClear() {
  emit('update:modelValue', '')
}
</script>

<template>
  <div class="base-search" :class="[shape, { whiteStyle, active: isFocus }]">
    <div v-show="$slots.left" class="left-box">
      <slot name="left" />
    </div>
    <div class="content-box">
      <BaseIcon name="uni-search" class="search-icon" />
      <input
        :value="modelValue" type="text" :placeholder="placeHolder" @input="onInput" @keypress.enter="onSearch"
        @blur="onBlur" @focus="onFocus"
      >

      <div v-if="clearable && modelValue" class="clear-icon" @click="onClear">
        <BaseIcon v-if="whiteStyle" name="uni-close" />
        <BaseIcon v-else name="uni-close-white" />
      </div>
    </div>
  </div>
</template>

<style lang='scss' scoped>
.base-search {
  border-width: var(--tg-border-width-sm);
  border-style: solid;
  border-color: var(--tg-secondary-main);
  background-color: var(--tg-secondary-dark);
  box-shadow: var(--tg-box-shadow);
  padding: 0 var(--tg-spacing-10);
  display: flex;
  align-items: stretch;
  position: relative;
  color: var(--tg-text-white);
  transition: all ease .25s;

  &:hover {
    border-color: var(--tg-text-grey);
  }

  .left-box {
    border-right-width: var(--tg-border-width-sm);
    border-right-style: solid;
    border-right-color: var(--tg-secondary-main);
    padding-right: var(--tg-spacing-5);
    margin-right: var(--tg-spacing-10);
    display: flex;
    align-items: center;
  }

  .search-icon {
    margin-right: var(--tg-spacing-5);
  }

  .clear-icon {
    font-size: var(--tg-font-size-default);
    position: absolute;
    right: var(--tg-spacing-18);
    cursor: pointer;
  }

  .content-box {
    flex: 1;
    display: flex;
    align-items: center;
    font-size: var(--tg-font-size-lg);
  }

  input {
    width: 85%;
    border: none;
    outline: none;
    background-color: transparent;
    padding: var(--tg-spacing-input-padding-vertical) var(--tg-spacing-input-padding-horizontal);
    font-size: var(--tg-font-size-default);
    color: var(--tg-text-white);

    &::placeholder {
      color: var(--tg-text-white);
      opacity: 0.3;
    }
  }

}

.active {
  border-color: var(--tg-text-grey);
}

.whiteStyle {
  background-color: var(--tg-text-white);
  color: var(--tg-secondary-main);

  input {

    &::placeholder {
      color: var(--tg-text-dark);
      opacity: 0.3;
    }
  }
}

.square {
  border-radius: var(--tg-radius-default);
}

.round {
  border-radius: 100px;
}
</style>