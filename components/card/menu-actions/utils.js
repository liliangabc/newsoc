import { isEvent, isMarket, isClass, isMeetup, isMoment, isPostsDetail } from '~/plugins'

// 创建下拉菜单选项
export function createMenuOptions({ route, isMine, posts, type }) {
  let options = []
  // 帖子类型
  let pType = type || posts.type || route.params.type
  // 可编辑
  let canEdit = posts.canEdit == '1'
  // 可删除
  let canDelete = posts.canDelete == '1'
  // 没有卖出
  let noSold = posts.sold !== '1'
  // 选项
  let opShare = { label: 'Share', action: 'share' }
  let opReport = { label: 'Report', action: 'report' }
  let opEdit = { label: 'Edit', action: 'edit' }
  let opDelete = { label: 'Delete', action: 'delete' }
  let opGift = { label: 'Gift', action: 'gift' }
  let opSold = { label: 'Sold', action: 'sold' }
  let opInvite = { label: 'Invite', action: 'invite' }

  // 活动
  if (isEvent(pType)) {
    options = [opShare]
    if (isMine) {
      canEdit && options.push(opEdit)
      canDelete && options.push(opDelete)
    } else {
      options.push(...[opGift, opReport])
    }
  // 商品
  } else if (isMarket(pType)) {
    options = [opShare]
    if (isMine) {
      options.push(...[opEdit, opDelete])
      noSold && options.push(opSold)
    } else {
      options.push(...[opReport])
    }
  // 问题
  } else if (isClass(pType)) {
    options = [opShare, opInvite]
    if (isMine) {
      canEdit && options.push(opEdit)
      canDelete && options.push(opDelete)
    } else {
      options.push(...[opGift, opReport])
    }
  // 约会
  } else if (isMeetup(pType)) {
    options = [opShare]
    if (isMine) {
      options.push(...[opEdit, opDelete])
    } else {
      options.push(...[opGift, opReport])
    }
  // 动态
  } else if (isMoment(pType)) {
    if (isMine) {
      options = [opDelete]
    }
  }

  return options
}

// 获取举报类型
export function getReportType(postsType, isComment = false, isReply = false) {
  let type
  if (isEvent(postsType)) {
    type = isComment ? '111' : isReply ? '112' : '110'
  } else if (isMarket(postsType)) {
    type = isComment ? '121' : isReply ? '122' : '120'
  } else if (isClass(postsType)) {
    type = isComment ? '131' : isReply ? '132' : '130'
  } else if (isMeetup(postsType)) {
    type = '140'
  }
  return type
}

// 获取礼物类型
export function getGiftType(postsType, isComment = false) {
  let type
  if (isEvent(postsType)) {
    type = isComment ? '3' : '2'
  } else if (isMarket(postsType)) {
    type = '5'
  } else if (isClass(postsType)) {
    type = isComment ? '7' : '6'
  } else if (isMeetup(postsType)) {
    type = '8'
  }
  return type
}

// 创建评论下拉菜单
export function createCommentMenuOptions({ route, isMine, comment, type }) {
  let options = []
  // 帖子类型
  let pType = type || route.params.type
  // 可编辑
  let canEdit = comment.canEdit == '1'
  // 可删除
  let canDelete = comment.canDelete === undefined || comment.canDelete == '1'
  // 选项
  let opReport = { label: 'Report', action: 'report' }
  let opEdit = { label: 'Edit', action: 'edit' }
  let opDelete = { label: 'Delete', action: 'delete' }
  let opGift = { label: 'Gift', action: 'gift' }

  if (isMine) {
    canEdit && options.push(opEdit)
    canDelete && options.push(opDelete)
  } else {
    !isMarket(pType) && options.push(opGift)
    options.push(opReport)
  }

  return options
}