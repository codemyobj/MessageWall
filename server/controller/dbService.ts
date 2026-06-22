import {
  inserWall as dbInsertwall,
  insertFeedback as dbInsertFeedback,
  insertComment as dbInsertComment,
  removeWall as dbRemoveWall,
  removeFeedback as dbRemoveFeedback,
  removeComment as dbRemoveComment,
  selectWalls as dbSelectWalls,
  selectFeedbackCount,
  selectCommentCount,
  selectLikeCount,
  selectCommentPage as dbSelectCommentPage,
} from '../lib/db.ts'

export const insertWall = async (req, res) => {
  let data = req.body
  await dbInsertwall([
    data.type,
    data.message,
    data.name,
    data.userId,
    data.moment,
    data.label,
    data.color,
    data.imgurl,
  ]).then((result) => {
    res.json({ code: 200, message: '添加成功', data: result })
  })
}

// 添加反馈
export const insertFeedback = async (req, res) => {
  let data = req.body
  await dbInsertFeedback([
    data.wallId,
    data.userId,
    data.type,
    data.moment,
  ]).then((result) => {
    res.json({ code: 200, message: '添加成功', data: result })
  })
}

// 添加评论
export const insertComment = async (req, res) => {
  let data = req.body
  await dbInsertComment([
    data.wallId,
    data.userId,
    data.imgurl,
    data.comment,
    data.name,
    data.moment,
  ]).then((result) => {
    res.json({ code: 200, message: '添加成功', data: result })
  })
}

// 删除墙
export const removeWall = async (req, res) => {
  let data = req.body
  // if (data.imgurl) {
  // Mkdir
  // }
  await dbRemoveWall(data.id).then((result) => {
    res.json({ code: 200, message: '删除成功', data: result })
  })
}

// 删除反馈
export const removeFeedback = async (req, res) => {
  let data = req.body
  await dbRemoveFeedback(data.id).then((result) => {
    res.json({ code: 200, message: '删除成功', data: result })
  })
}

// 删除评论
export const removeComment = async (req, res) => {
  let data = req.body
  await dbRemoveComment(data.id).then((result) => {
    res.json({ code: 200, message: '删除成功', data: result })
  })
}

// 查询墙
export const selectWalls = async (req, res) => {
  let data = req.body
  await dbSelectWalls(data.page, data.pageSize, data.type, data.label).then(
    async (result) => {
      for (let i = 0; i < result.length; i++) {
        // 查询点赞数
        result[i].like = await selectFeedbackCount(result[i].id, 0)
        // 查询踩数
        result[i].report = await selectFeedbackCount(result[i].id, 1)
        // 要求撤销数
        result[i].revoke = await selectFeedbackCount(result[i].id, 2)
        // 是否点赞
        result[i].isLike = await selectLikeCount(result[i].id, data.userId)
        // 查询评论数
        result[i].comcount = await selectCommentCount(result[i].id)
      }
      res.send({ code: 200, message: '查询成功', data: result })
    },
  )
}

export const selectCommentPage = async (req, res) => {
  let data = req.body
  await dbSelectCommentPage(data.wallId, data.page, data.pageSize).then(
    (result) => {
      res.send({ code: 200, message: '查询成功', data: result })
    },
  )
}
