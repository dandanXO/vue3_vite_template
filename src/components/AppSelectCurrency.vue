<script lang="ts" setup>
import type { IUserCurrencyList } from '~/stores/app'

const emit = defineEmits(['change'])

// 下拉搜索是否显示
const { bool: isMenuShown } = useBoolean(false)
const {
  currentCurrency,
  searchValue,
  renderCurrencyList,
  changeCurrentCurrency,
  clearSearchValue,
} = useCurrencyData()

const currentNetwork = ref('ERC20')
const networkList = [
  { label: 'ERC20', value: 'ERC20' },
  { label: 'TRC20', value: 'TRC20' },
]

// 选择币种
function selectCurrency(item: IUserCurrencyList, hide: () => void) {
  changeCurrentCurrency(item.type)
  hide()
  emit('change', item.type)
}

emit('change', currentCurrency.value)
</script>

<template>
  <div class="app-wallet app-currency">
    <VDropdown v-model:shown="isMenuShown" :distance="6" @apply-show="clearSearchValue">
      <div class="wallet-box">
        <BaseButton class="wallet wallet-only" type="text" size="md">
          <AppCurrencyIcon class="wallet-text" show-name :currency-type="currentCurrency" />
          <BaseIcon class="arrow" :class="{ 'arrow-up': isMenuShown }" name="uni-arrow-down" />
        </BaseButton>
      </div>
      <template #popper="{ hide }">
        <div class="dropdown-popper need-pad-y">
          <div class="popper-top">
            <BaseSearch
              v-model="searchValue"
              class="top-search" :clearable="searchValue?.length > 0" :white-style="true"
              place-holder="搜索"
            />
          </div>
          <div class="scroll-y justify-content popper-content">
            <div v-for="item of renderCurrencyList" :key="item.type" class="content-row" @click.stop="selectCurrency(item, hide)">
              <AppCurrencyIcon show-name :currency-type="item.type" />
            </div>
            <div v-show="!renderCurrencyList.length" class="balance-not">
              无法使用货币
            </div>
          </div>
        </div>
      </template>
    </VDropdown>
    <BaseSelect v-model="currentNetwork" :options="networkList" popper />
  </div>
</template>

<style lang="scss" scoped>
.app-wallet {
    .wallet-box {
        display: flex;
        justify-content: center;
    }

    .wallet {
        background-color: var(--tg-secondary-dark);
        border-radius: var(--tg-radius-sm) 0px 0px var(--tg-radius-sm);
        box-shadow: 0px 1px 2px 0px #{rgba($color: var(--tg-color-black-rgb), $alpha: 0.1)} inset,
        0px -1px 2px 0px #{rgba($color: var(--tg-color-black-rgb), $alpha: 0.1)} inset;

        .arrow {
            font-size: 10px;
            margin-left: 9px;
        }

        .arrow-up {
            transform: rotate(180deg);
        }
    }

    .wallet-only {
        border-radius: var(--tg-radius-sm);
    }

    .wallet-text {
        line-height: 1;
        color: var(--tg-text-white);
        font-size: var(--tg-font-size-default);
        font-style: normal;
        font-weight: 500;
    }
}

.app-currency {
    display: flex;
    justify-content: center;
    gap: var(--tg-spacing-12);
}

.dropdown-popper {
    max-height: inherit;
    max-width: inherit;
    display: flex;
    flex-direction: column;

    .popper-top {
        padding: 12px 0;

        .top-search {
            width: 85%;
            max-width: 140px;
            margin: auto;
        }
    }

    .popper-content {
        max-height: 20rem;
        overflow-y: auto;
        color: var(--tg-text-dark);
        font-size: var(--tg-font-size-default);
        font-weight: 500;
        flex: 1;

        &::-webkit-scrollbar-thumb {
            background: var(--tg-secondary-light);
        }

        .content-row {
            display: flex;
            align-items: center;
            padding: var(--tg-spacing-button-padding-vertical-s) var(--tg-spacing-button-padding-horizontal-xs);
            cursor: pointer;
            --tg-app-amount-width: 14ch;

            &:hover {
                background-color: var(--tg-text-lightgrey);
            }

        }

        .balance-not {
            text-align: center;
            padding: 3px 0 12px;
        }
    }

    .justify-content {
        .content-row {
            justify-content: center;
        }
    }

}
</style>