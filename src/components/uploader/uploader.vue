<template>
  <div class="uploader-component">
    <div class="uploader-item photo" v-for="(item, index) in list" :key="index" @click="previewImage(index)">
      <nut-icon name="circle-close" class="close" color="red" @click="removeFile($event, index)" />
      <div class="upload-desc">{{ item.state === 0 ? `上传中${item.progress}%` : item.msg }}</div>
      <div class="upload-progress">
        <div class="upload-mask" :style="`left: ${item.state === 1 ? 0 : item.progress}%`"></div>
      </div>
      <image :src="item.type == 'image' ? item.path : item.poster" mode="aspectFill" />
    </div>
    <div class="uploader-item" v-if="list.length == 0 || list.length < maximum" @click="chooseImage">
      <nut-icon name="uploader" />
      <!-- <div class="uploader-text">添加</div> -->
    </div>
  </div>
</template>
<script lang="ts">
import { onUnmounted, reactive, toRefs, watch } from 'vue'
import Taro from '@tarojs/taro'
import { wxConfirm } from '../../utils'
import './index.scss'

interface UploadedFile {
  path: string
  state: number // 待上传
  progress: number
  msg?: string
  type: 'image' | 'video'
  poster?: string
}

export default {
  props: {
    // 初始文件列表 已上传文件
    fileList: {
      type: Array,
      default: () => [],
    },
    // 最大上传数 默认9张
    maximum: {
      type: Number,
      default: () => 20,
    },
    // 上传服务器url
    url: {
      type: String,
      required: true,
    },
    // 请求头
    header: {
      type: Object,
      default: () => {},
    },
    // 后端接收文件字段
    name: {
      type: String,
      default: () => 'file',
    },
  },
  setup(prop, _context) {
    const abortList: Array<Number> = []
    const list: Array<UploadedFile> = prop.fileList.map((file: any) => {
      return {
        path: file.path,
        state: 1, // 待上传
        progress: 100,
        msg: '上传完成',
        type: file.type,
        poster: file.poster,
      }
    })
    const state = reactive({
      defaultImage: '',
      maximum: prop.maximum,
      list: list || [],
    })

    // 监听传入进来的文件列表转换成UploadedFile对象
    const stop = watch(
      () => prop.fileList,
      (_new, _old) => {
        if (JSON.stringify(_new) != JSON.stringify(_old)) {
          state.list = _new.map(
            (file:any): UploadedFile => {
              let obj: UploadedFile = {
                path: file.path,
                state: 1, // 待上传
                progress: 100,
                msg: '上传完成',
                type: file.type,
                poster: file.poster,
              }
              return obj
            }
          )
        }
      }
    )
    const removeFile = (e, index) => {
      e.stopPropagation()
      wxConfirm({ msg: '是否确认删除当前文件？' }, () => {
        if (state.list[index] && state.list[index].state === 0) {
          abortList.push(index) // 加入到取消行列
        }
        state.list.splice(index, 1)
        _context.emit('upload-result', state.list)
      })
    }
    const chooseImage = () => {
      // if (state.maximum - state.list.length === 0) {
      //   wxAlert(`最多只能上传${state.maximum}张图片！`)
      //   return false
      // }
      Taro.chooseMedia({
        count: state.maximum,
        sizeType: ['original', 'compressed'],
        mediaType: ['image', 'video'],
        sourceType: ['album', 'camera'],
        camera: 'back',
        success: (res) => {
          const tempFilePaths = res.tempFiles
          tempFilePaths.forEach((it) => {
            // thumbTempFilePath 缩略图
            let obj: UploadedFile = {
              path: it.tempFilePath,
              state: 0, // 待上传
              progress: 0,
              type: res.type === 'image' ? 'image' : 'video',
              poster: it.thumbTempFilePath,
            }
            state.list.push(obj)
          })
          state.list.forEach((file, idx) => {
            const uploadTask = Taro.uploadFile({
              url: prop.url,
              filePath: file.path,
              name: prop.name,
              header: prop.header || {},
              success: (res) => {
                const data = res.data
                const obj = JSON.parse(data)
                if (obj.success) {
                  file.state = 1
                  file.path = obj['data']
                  if (file.poster) {
                    Taro.uploadFile({
                      url: prop.url,
                      filePath: file.poster,
                      name: prop.name,
                      header: prop.header || {},
                      success: (res1) => {
                        const posterData = res1.data
                        const posterObj = JSON.parse(posterData)
                        if (posterObj.success) {
                          file.progress = 100 // 缩略图设置完成视频才显示100%上传成功
                          file.msg = '上传完成'
                          file.poster = posterObj.data // 设置缩略图
                          const result = state.list.find(it => it.path.includes('://tmp'))
                          if(!result){
                            _context.emit('upload-result', state.list) 
                          }
                        }
                      },
                    })
                  } else {
                    file.progress = 100 // 缩略图设置完成视频才显示100%上传成功
                    file.msg = '上传完成'
                    const result = state.list.find(it => it.path.includes('://tmp'))
                    if(!result){
                      _context.emit('upload-result', state.list) 
                    }
                  }
                } else {
                  file.state = -1
                  file.progress = 0
                  file.msg = obj.msg || obj.message || obj.error
                }
                //do something
              },
            })
            uploadTask.progress((res) => {
              if (abortList.includes(idx)) {
                uploadTask.abort()
                abortList.splice(abortList.indexOf(idx), 1)
                return false
              }
              if (res.progress === 100) {
              } else {
                file.progress = res.progress // 这里只显示到99，最后1在uploadTask里面成功后直接设置100
              }
            })
          })
        },
      })
    }
    const previewImage = (i) => {
      // const urls = state.list.map((file) => file.path)
      // Taro.previewImage({
      //   current: path, // 当前显示图片的http链接
      //   urls: urls, // 需要预览的图片http链接列表
      // })
      console.log(state.list)
      const sources = state.list.map((file) => {
        // , file.type === 'video' ? { poster: prefix + '/video.png' } : {}
        return Object.assign({ url: file.path, type: file.type, poster: file.poster })
      })
      wx.previewMedia({
        sources: sources,
        current: i,
      })
    }
    onUnmounted(() => {
      stop()
    })
    // const inputChange = (e) => {
    // context.emit('change', e.detail.value)
    // }
    return {
      ...toRefs(state),
      chooseImage,
      removeFile,
      previewImage,
    }
  },
}
</script>
<style lang="less"></style>
