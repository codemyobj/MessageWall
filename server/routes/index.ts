import express from 'express'

// 定义一个路由处理器
const router = express.Router()

router.get('/test', (req, res) => {
  res.type('html')
  res.render('test')
})

export default router
