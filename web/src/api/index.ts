import request from '@/utils/request'
import type { InsertWallRequest } from './types'

export const insertwall = (data: InsertWallRequest): Record<string, any> =>
  request.post('/insertwall', data)
