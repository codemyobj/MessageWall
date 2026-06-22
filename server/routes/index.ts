import express from 'express'
import {
  insertWall,
  insertFeedback,
  insertComment,
  removeComment,
  removeFeedback,
  removeWall,
  selectCommentPage,
  selectWalls,
} from '../controller/dbService.ts'

// 定义一个路由处理器
const router = express.Router()

router.get('/', (req, res) => {
  res.type('html')
  res.render('test')
})

// 新建wall数据
router.post('/insertwall', async (req, res) => {
  insertWall(req, res)
})

// 新建反馈数据
router.post('/insertfeedback', async (req, res) => {
  insertFeedback(req, res)
})

// 新建评论数据
router.post('/insertcomment', async (req, res) => {
  insertComment(req, res)
})

// 删除wall数据
router.post('/removewall', async (req, res) => {
  removeWall(req, res)
})

// 删除反馈数据
router.post('/removefeedback', async (req, res) => {
  removeFeedback(req, res)
})

// 删除评论数据
router.post('/removecomment', async (req, res) => {
  removeComment(req, res)
})

// 获取wall数据
router.get('/selectwalls', async (req, res) => {
  selectWalls(req, res)
})

// 获取评论数据
router.get('/selectcommentpage', async (req, res) => {
  selectCommentPage(req, res)
})

export default router
