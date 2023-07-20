export interface SongLrcItem {
  text: string
  time: string
}

export interface SongRecord {
  id?: string // 记录id
  musicInfoId: string // 歌曲id
  cycleStartTime: string // 循环播放开始时间
  startTime: string // 开始播放时间
  endTime: string // 结束播放时间
  playDuration: number // 播放时长
  playType: number // 1 单曲 2 循环
}