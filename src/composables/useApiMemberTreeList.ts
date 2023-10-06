export type TTreeListType = '001' | '002' | '003' | '004' | '005' | '006' | '007' | '008'

/**
 * 获取后端辅助数据
 *
 * 001=数字货币分类
 *
 * 002=中国银行列表
 *
 * 003=越南银行列表
 *
 * 004=支付方式列表
 *
 * 005=支付类型列表
 *
 * 006=国家列表
 *
 * 007=币种列表
 *
 * 008=账变类型列表
 */
export function useApiMemberTreeList(type: TTreeListType) {
  const { data, loading, error, run } = useRequest(ApiMemberTreeList)

  run({
    level: type,
  })

  return {
    data,
    loading,
    error,
  }
}
