<script lang="ts" setup>
</script>

<template>
  <div class="app-footer">
    <div class="footer-nav">
      <div>
        <div class="nav-head">
          体育
        </div>
        <div>主页</div>
        <div>滚球</div>
        <div>体育博彩规则</div>
      </div>
      <div>
        <div class="nav-head">
          娱乐城
        </div>
        <div>游戏</div>
        <div>VIP俱乐部</div>
        <div>促销活动</div>
      </div>
      <div>
        <div class="nav-head">
          支持
        </div>
        <div>公平性</div>
        <div>联盟计划</div>
        <div>负责任博彩</div>
        <div>Gameble Aware</div>
        <div>在线支持</div>
        <div>帮助中心</div>
      </div>
      <div>
        <div class="nav-head">
          社区
        </div>
        <div>博客</div>
        <div>论坛</div>
        <div>Facebook</div>
        <div>Twitter</div>
        <div>Instagram</div>
        <div>Youtube</div>
        <div>网购</div>
      </div>
      <div>
        <div class="nav-head">
          关于我们
        </div>
        <div>隐私政策</div>
        <div>许可证</div>
        <div>反洗钱规则</div>
        <div>服务条款</div>
        <div>自我排除</div>
        <div>Primedice</div>
      </div>
      <div>
        <div class="nav-head">
          语言
        </div>
        <div>中文</div>
        <div>赔率</div>
        <div>小数式</div>
      </div>
    </div>
    <BaseDivider />
    <div class="footer-support">
      <BaseAspectRatio
        v-for="i in 10"
        :key="i"
        ratio="116/35"
        width="133.33px"
        style="margin: 0 auto;"
      >
        <BaseIcon name="litecoin" style="width: 100%; height: 100%" />
      </BaseAspectRatio>
    </div>
    <BaseDivider />
    <div class="footer-sponsor">
      <BaseAspectRatio
        v-for="i in 4"
        :key="i"
        ratio="116/35"
        width="133.33px"
        style="margin: 0 auto;"
      >
        <BaseIcon name="litecoin" style="width: 100%; height: 100%" />
      </BaseAspectRatio>
    </div>
    <BaseDivider />
    <div class="footer-copyright">
      <BaseLogo />
      <div>© 2023 Stake.com | 版权所有</div>
      <div>1 USDT = US$1.00</div>
    </div>
    <div class="footer-description">
      Stake 由 Medium Rare N.V. 所属和经营，注册编号： 145353，注册地址：
      Korporaalweg 10, Willemstad, Curaçao。请通过 support@stake.com
      与我们联系。 支付代理公司是 Medium Rare Limited，地址于 7-9 Riga
      Feraiou, LIZANTIA COURT, Office 310, Agioi Omologites,
      1087 Nicosia, Cyprus 以及注册号：HE 410775 Stake
      由库拉索政府授权和监管，并根据颁发给 Antillephone 的 8048/JAZ
      号许可证运营。 Stake 已通过所有合规性审查，并获得合法授权，
      可进行所有机会与投注游戏的游戏操作。
    </div>
    <div class="footer-description">
      支持 support@stake.com | 合作伙伴 partners@stake.com | 新闻媒体 press@stake.com
    </div>
  </div>
</template>

<style scoped lang="scss">
.app-footer {
  /* background-color: #0F212E; */
  width: 100%;
  display: grid;
  grid-gap: 2rem;
  padding: 32px 0;
  .footer-nav{
    width: 100%;
    display: grid;
    grid-template-columns: repeat(auto-fit,minmax(14ch,1fr));
    grid-gap: 1rem;
    color: var(--tg-text-lightgrey);
    font-size: var(--tg-font-size-default);
    font-weight: var(--tg-font-weight-normal);

    .nav-head{
      font-size: var(--tg-font-size-base);
      font-weight: 500;
      color: var(--tg-text-white);
      margin-bottom: 10px;
    }
    .nav-head~div{
      padding: 4px 0;
      cursor: pointer;
      &:hover{
        color: var(--tg-text-white);
      }
    }
  }
  .footer-support{
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    gap:2rem;
  }
  .footer-sponsor{
    width: 100%;
    display: flex;
    gap:0.5rem;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    gap:2rem;
  }
  .footer-copyright{
    width: 100%;
    display: grid;
    justify-content: center;
    justify-items: center;
    align-items: center;
    color: var(--tg-text-lightgrey);
    gap:0.5rem;
    font-size: var(--tg-font-size-default);
  }
  .footer-description{
    width: 100%;
    line-height: 1.5;
    text-align: center;
    color: var(--tg-text-lightgrey);
    font-size: var(--tg-font-size-xs);
  }
}
</style>
