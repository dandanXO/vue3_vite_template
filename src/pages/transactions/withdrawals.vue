<script lang="ts" setup>
const { t } = useI18n()

const tabList = reactive([
  { label: t('currency_byte_coin'), value: 'byte_coin' },
  { label: t('currency_law_coin'), value: 'real_coin' },
])
</script>

<template>
  <section class="tg-withdrawals-record-page">
    <AppTabRecord
      :tabs="tabList"
      :empty-text="$t('finance_withdraw_empty_text')"
      :download-text="$t('finance_withdraw_download_text')"
    />
  </section>
</template>

<style lang="scss" scoped>

</style>

<route lang="yaml">
meta:
  browserTitle: 提款交易 – Stake.com
  </route>
