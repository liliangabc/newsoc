/**
 * 卡片下拉菜单动作状态管理模块
 * 
 * 视图组件采用一个入口组件引入每个动作子组件的方式架构
 * 通过状态触发动作子组件的显示与隐藏 以及数据传递
 * 视图入口组件仅在布局组件中被单次引入
 * 动作子组件包括：分享 举报 编辑 礼物 邀请等模态框
 */

export default {
  state: {
    // 分享参数包括：type(帖子类型) id(帖子ID) title(帖子标题) description(帖子描述) imageUrl(帖子贴图)
    share: null,

    // 举报参数包括：relateId(关联ID) type(举报类型)
    report: null,

    // 编辑参数包括：type(帖子类型) id(帖子ID) posts(帖子详情)
    edit: null,

    // 礼物参数包括：type(礼物类型) receiver(接收者ID) relateId(关联帖子ID)
    gift: null,

    // 邀请参数包括：courseId(课程ID) postId(帖子ID)
    invite: null,
    
    // 商品交换参数包括: posts(对方商品)
    exchange: null
  },
  mutations: {
    // 切换显示与隐藏模态框
    ['actions/toggleModal'](state, { cmd, params = null }) {
      state[cmd] = params
    },
    ['actions/closeAll'](state) {
      for (let key in state) state[key] = null
    }
  },
  actions: {

  }
}