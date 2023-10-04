import { httpClient } from '~/http'

/** 后端返回数组时候的数据结构 */
interface IResponseList<T> {
  d: T[] | null
  t: number
  s: number
}

/**
 * 用户登录
 */
export function ApiMemberLogin(
  data: {
    username: string
    password: string
    device_number: string
  },
) {
  return httpClient.post<string>('/member/login', data)
}

/**
 * 用户注册
 */
export function ApiMemberReg(
  data: {
    email: string
    username: string
    password: string
    birthday?: string
    parent_id?: string// 上级id，没有留空
    device_number: string
  },
) {
  return httpClient.post<string>('/member/reg', data)
}

/**
 * 发送短信或者邮件验证码
 */
export function ApiSmsSend(
  data: {
    tel: string
    flag: 'text' | 'voice'
    ty: 1 | 2
  },
) {
  return httpClient.post<{
    data: string
  }>('/api/v1/home/ip', data)
}

/**
 * 游戏列表
 */
export function ApiMemberGameList(params?: {
  page?: number
  page_size?: number
  game_type?: 1 | 3// 游戏类型:1=真人,3=电子
  is_hot?: 1 | 2 // 是否热门 1是 2否
  is_new?: 1 | 2 // 是否新游戏 1是 2否
  tag_id?: number // 游戏标签
  platform_id?: string // 场馆id（evo真人）（需要转成字符串）
  sort?: string // 排序sorting,en_name,created_at 三个字段支持排序，格式为 sorting:asc sorting:desc
}) {
  return httpClient.get<IResponseList<{
    id: string
    platform_id: string
    name: string
    en_name: string
    pt_name: string
    th_name: string
    vn_name: string
    client_type: string
    game_type: number
    game_id: string
    img: string
    online: number
    is_hot: number
    sorting: number
    created_at: number
    is_new: number
    tag_id: string
    is_fav: number
  }>>('/member/game/list', params)
}

/**
 * 游戏详情
 */
export function ApiMemberGameDetail(id: string) {
  return httpClient.get<{
    id: string
    platform_id: string
    name: string
    zh_name: string
    en_name: string
    pt_name: string
    th_name: string
    vn_name: string
    client_type: string
    game_type: number
    game_id: string
    img: string
    online: number
    is_hot: number
    sorting: number
    created_at: number
    is_new: number
    tag_id: string
    currency: string
    lang: string
    is_fav: number
  }>(`/member/game/detail?id=${id}`)
}

/**
 * 启动游戏
 */
export function ApiGameLunch(pid: string, game_id: string, cur: string) {
  return httpClient.get<string>(`/game/launch/${pid}`, { code: game_id, cur })
}

/**
 * 搜索游戏
 */
export function ApiMemberGameSearch(params: { w: string }) {
  return httpClient.get<IResponseList<{
    id: string
    platform_id: string
    name: string
    zh_name: string
    en_name: string
    pt_name: string
    th_name: string
    vn_name: string
    client_type: string
    game_type: number
    game_id: string
    img: string
    online: number
    is_hot: number
    sorting: number
    created_at: number
    is_new: number
    tag_id: string
    currency: string
    lang: string
    is_fav: number
  }>>('/member/game/search', params)
}

/*
* 游戏收藏列表
*/
export function ApiMemberFavList(params?: { page?: number; page_size?: number }) {
  return httpClient.get<IResponseList<{
    id: string
    platform_id: string
    name: string
    zh_name: string
    en_name: string
    pt_name: string
    th_name: string
    vn_name: string
    client_type: string
    game_type: number
    game_id: string
    img: string
    online: number
    is_hot: number
    sorting: number
    created_at: number
    is_new: number
    tag_id: string
    currency: string
    lang: string
    is_fav: number
  }>>('/member/fav/list', params)
}

/**
 * 新增收藏
*/
export function ApiMemberFavInsert(id: string) {
  return httpClient.get(`/member/fav/insert?id=${id}`)
}

/**
 * 删除收藏
*/
export function ApiMemberFavDelete(id: string) {
  return httpClient.get(`/member/fav/delete?id=${id}`)
}

/*
* 推荐游戏列表
*/
export function ApiMemberGameRecList(params?: {
  page?: number
  page_size?: number
  sort?: string // 排序sorting,en_name,created_at 三个字段支持排序，格式为 sorting:asc sorting:desc
}) {
  return httpClient.get<IResponseList<{
    id: string
    platform_id: string
    name: string
    zh_name: string
    en_name: string
    pt_name: string
    th_name: string
    vn_name: string
    client_type: string
    game_type: number
    game_id: string
    img: string
    online: number
    is_hot: number
    sorting: number
    created_at: number
    is_new: number
    tag_id: string
    currency: string
    lang: string
    is_fav: number
  }>>('/member/game/rec/list', params)
}

/*
* 场馆列表
*/
export function ApiMemberPlatformList(params?: { page?: number; page_size?: number }) {
  return httpClient.get<IResponseList<{
    id: string
    en_name: string
    game_type: number
    state: number
    maintained: number
    seq: number
    logo: string
    created_at: number
    updated_at: number
    updated_uid: string
    updated_name: string
    zh_name: string
    pt_name: string
    vn_name: string
    th_name: string
    game_num: number
    name: string
  }>>('/member/platform/list', params)
}

/**
 * 虚拟钱包列表
 */
export function ApiMemberWalletList(
  params: {
    contract_type: string
    currency_name: string
    page: number
    page_size: number
  },
) {
  return httpClient.get<string>('/member/wallet/list', params)
}

/**
 * 保险库加减
 */
export function ApiMemberBalanceLockerUpdate(data: {
  type: 'add' | 'remove'
  currency_name: string
  amount: string
}) {
  return httpClient.post('/member/balance_locker/update', data)
}

/**
 * 保险库详情
 */
export function ApiMemberBalanceLockerShow() {
  return httpClient.post('/member/balance_locker/show')
}
