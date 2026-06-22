import mysql from 'mysql2'
import config from '../config/index.ts'

// 先连接MySQL但不指定数据库
const connectionConfig = {
  host: config.database.HOST,
  user: config.database.USER,
  password: config.database.PASSWORD,
  multipleStatements: true,
}

let query = (connection, sql, values) => {
  return new Promise((resolve, reject) => {
    connection.query(sql, values, (err, results) => {
      if (err) {
        reject(err)
      } else {
        resolve(results)
      }
    })
  })
}

async function initialize() {
  let connection
  try {
    console.log('开始初始化数据库...')

    // 1. 创建基础连接（不指定数据库）
    connection = mysql.createConnection(connectionConfig)

    // 2. 创建数据库
    const createDbSQL = `CREATE DATABASE IF NOT EXISTS ${config.database.WALL} DEFAULT CHARSET utf8mb4 COLLATE utf8mb4_unicode_ci;`
    await query(connection, createDbSQL, [])
    console.log(`数据库 ${config.database.WALL} 创建/验证完成`)

    // 3. 使用新创建的数据库
    await query(connection, `USE ${config.database.WALL};`, [])
    console.log(`已切换到数据库 ${config.database.WALL}`)

    // 4. 创建表结构
    const wallsTable = `CREATE TABLE IF NOT EXISTS walls(
      id INT PRIMARY KEY AUTO_INCREMENT,
      type INT NOT NULL COMMENT '0: text, 1: image',
      message VARCHAR(255) NOT NULL COMMENT '留言内容',
      name VARCHAR(100) NOT NULL COMMENT '留言者姓名',
      userId VARCHAR(100) NOT NULL COMMENT '留言者ID',
      moment DATETIME NOT NULL COMMENT '留言时间',
      label INT COMMENT '标签',
      color INT COMMENT '颜色',
      imgurl VARCHAR(255) COMMENT '图片地址'
    );`

    const feedbacksTable = `CREATE TABLE IF NOT EXISTS feedbacks(
      id INT NOT NULL AUTO_INCREMENT,
      wallId INT NOT NULL COMMENT '对应的留言ID',
      userId VARCHAR(100) NOT NULL COMMENT '反馈者ID',
      type INT NOT NULL COMMENT '反馈类型 0喜欢1举报2撤销',
      moment DATETIME NOT NULL COMMENT '反馈时间',
      PRIMARY KEY (id)
    );`

    const commentsTable = `CREATE TABLE IF NOT EXISTS comments(
      id INT NOT NULL AUTO_INCREMENT,
      wallId INT NOT NULL COMMENT '对应的留言ID',
      userId VARCHAR(100) NOT NULL COMMENT '评论者ID',
      imgurl VARCHAR(255) COMMENT '评论者头像',
      comment VARCHAR(255) NOT NULL COMMENT '评论内容',
      name VARCHAR(100) NOT NULL COMMENT '评论者姓名',
      moment DATETIME NOT NULL COMMENT '评论时间',
      PRIMARY KEY (id)
    );`

    await query(connection, wallsTable, [])
    console.log('walls表创建完成')

    await query(connection, feedbacksTable, [])
    console.log('feedbacks表创建完成')

    await query(connection, commentsTable, [])
    console.log('comments表创建完成')

    console.log('数据库初始化完成！')
  } catch (error) {
    console.error('数据库初始化失败:', error)
    throw error
  } finally {
    if (connection) {
      connection.end()
    }
  }
}

// 创建连接池（在数据库创建后使用）
const pool = mysql.createPool({
  host: config.database.HOST,
  user: config.database.USER,
  password: config.database.PASSWORD,
  database: config.database.WALL,
})

let poolQuery = (sql, values = []) => {
  return new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if (err) {
        reject(err)
      } else {
        connection.query(sql, values, (err, results) => {
          if (err) {
            reject(err)
          } else {
            resolve(results)
          }
          connection.release()
        })
      }
    })
  })
}

initialize()

// 新建留言
const inserWall = (value) => {
  let _sql =
    'insert into walls set type=?,message=?,name=?,userId=?,moment=?,label=?,color=?,imgurl=?'

  return poolQuery(_sql, value)
}

// 新建反馈
const insertFeedback = (value) => {
  let _sql = 'insert into feedbacks set wallId=?,userId=?,type=?,moment=?'

  return poolQuery(_sql, value)
}

// 新建评论
const insertComment = (value) => {
  let _sql =
    'insert into comments set wallId=?,userId=?,imgurl=?,comment=?,name=?,moment=?'

  return poolQuery(_sql, value)
}

// 删除墙 主表对应多条子表一并删除
const removeWall = (id) => {
  let _sql = `delete a,b,c from walls a left join feedbacks b on a.id=b.wallId left join comments c on a.id=c.wallId where id=${id}`
  return poolQuery(_sql)
}

// 删除反馈
const removeFeedback = (id) => {
  let _sql = `delete from feedbacks where id=${id}`
  return poolQuery(_sql, id)
}

// 删除评论
const removeComment = (id) => {
  let _sql = `delete from comments where id=${id}`
  return poolQuery(_sql)
}

// 查询所有留言
const selectWalls = (page, pageSize, type, label) => {
  let sql: string
  const limit = `${(page - 1) * pageSize},${pageSize}`
  if (label == -1) {
    sql = `select * from walls where type=${type} order by id desc limit ${limit};`
  } else {
    sql = `select * from walls where type=${type} and label=${label} order by id desc limit ${limit};`
  }

  return poolQuery(sql)
}

const selectCommentPage = (wallId, page, pageSize) => {
  const limit = `${(page - 1) * pageSize},${pageSize}`
  let sql = `select * from comments where wallId=${wallId} order by id desc limit ${limit};`
  return poolQuery(sql)
}

const selectFeedbackCount = (wallId, type) => {
  let sql = `select count(*) as count from feedbacks where wallId=${wallId} and type=${type};`
  return poolQuery(sql)
}

const selectCommentCount = (wallId) => {
  let sql = `select count(*) as count from comments where wallId=${wallId};`
  return poolQuery(sql)
}

const selectLikeCount = async (wallId, uid) => {
  let sql = `select count(*) as count from feedbacks where wallId=${wallId} and userId='${uid}' and type=0;`
  return poolQuery(sql)
}

export {
  inserWall,
  insertFeedback,
  insertComment,
  removeWall,
  removeFeedback,
  removeComment,
  selectWalls,
  selectCommentPage,
  selectFeedbackCount,
  selectCommentCount,
  selectLikeCount,
}
