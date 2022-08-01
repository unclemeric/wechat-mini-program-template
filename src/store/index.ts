import { defineStore } from 'pinia'
import Taro from '@tarojs/taro'
import { MUSIC_LANGS } from '../utils/constants'
// import { SongLrcItem, SongRecord } from '../utils/types'
// import { wxToast } from '../utils'

export interface Song {
  id?: string
  name: string
  languages: string
}

export const useMainStore = defineStore('main', {
  state: () => {
    return {
      backgroundAudioManager: {} as Taro.BackgroundAudioManager,
      playList: [] as Song[], // 播放列表歌曲
    }
  },
  getters: {
    Languages: (state) => {
      return MUSIC_LANGS
    },
  },
  actions: {
    addSong(name) {
      this.playList.push({
        id: new Date().getTime(),
        name,
        languages: MUSIC_LANGS[Math.floor(Math.random() * 10)],
      })
    },
  },
})
