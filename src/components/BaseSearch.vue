<script setup lang='ts'>
interface Props {
  placeHolder?: string
  shape?: 'square' | 'round'
  modelValue: string
  clearable?: boolean
  whiteStyle?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  placeHolder: 'Search...',
  shape: 'round',
})
const emit = defineEmits(
  ['update:modelValue', 'input', 'search', 'focus', 'blur', 'clear', 'close'],
)

const { bool: isFocus, setTrue, setFalse } = useBoolean(false)

function onInput(event: any) {
  const v = event.target.value
  emit('update:modelValue', v)
  emit('input', v)
}
function onFocus() {
  setTrue()
  emit('focus')
}
function onBlur() {
  setFalse()
  emit('blur')
}
function onSearch() {
  emit('search')
}
function onClear() {
  emit('update:modelValue', '')
  emit('clear')
  if (!props.modelValue)
    emit('close')
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
        :value="modelValue"
        type="text"
        :placeholder="placeHolder"
        @input="onInput"
        @keypress.enter="onSearch"
        @blur="onBlur" @focus="onFocus"
      >

      <div v-if="clearable" class="clear-icon" @click="onClear">
        <BaseIcon v-if="whiteStyle" name="uni-close" />
        <BaseIcon v-else name="uni-close-white" />
      </div>
    </div>
  </div>
</template>

<style lang='scss' scoped>
.search-icon.app-svg-icon {
  color: var(--tg-text-grey);
}
.base-search {
  border-width: var(--tg-border-width-sm);
  border-style: solid;
  border-color: var(--tg-border-color-main);
  background-color: var(--tg-secondary-dark);
  box-shadow: var(--tg-box-shadow);
  padding: 0 var(--tg-spacing-16);
  display: flex;
  align-items: stretch;
  position: relative;
  color: var(--tg-text-white);
  transition: all ease .25s;

  &:hover:not(.whiteStyle) {
     border-color: var(--tg-border-color-deep-grey);
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

  // .search-icon {
  //   margin-right: var(--tg-spacing-5);
  // }

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
    line-height: 1;
    // color: var(--tg-text-white);

    &::placeholder {
      color: var(--tg-text-white);
      opacity: 0.3;
      font-weight: var(--tg-font-weight-semibold);
    }
  }

}

.active {
   border-color: var(--tg-border-color-deep-grey);
}

.whiteStyle {
  background-color: var(--tg-text-white);
  color: var(--tg-text-secondary-main);
  border-color: var(--tg-border-color-grey);

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
