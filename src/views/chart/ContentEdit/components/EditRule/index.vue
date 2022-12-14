<template>
  <sketch-rule
    v-if="configShow"
    :thick="thick"
    :scale="scale"
    :width="canvasBox().width"
    :height="canvasBox().height"
    :startX="startX"
    :startY="startY"
    :lines="lines"
  ></sketch-rule>
</template>

<script setup lang="ts">
import { ref, toRefs, computed, watch, nextTick, onBeforeUnmount } from 'vue'
import { useChartEditStore } from '@/store/modules/chartEditStore/chartEditStore'
import { useDesignStore } from '@/store/modules/designStore/designStore'
import { useChartLayoutStore } from '@/store/modules/chartLayoutStore/chartLayoutStore'

const chartEditStore = useChartEditStore()
const chartLayoutStore = useChartLayoutStore()
const designStore = useDesignStore()

const { width, height } = toRefs(chartEditStore.getEditCanvasConfig)
const { scale, lockScale } = toRefs(chartEditStore.getEditCanvas)
const { getLayers, getCharts, getDetails } = toRefs(chartLayoutStore)

const configShow = ref(true)

// x轴标尺开始的坐标数值
const startX = -10
// y轴标尺开始的坐标数值
const startY = -10
// 标尺的厚度
const thick = 20
// 初始化水平标尺上的参考线
const lines = {
  h: [],
  v: []
}

const canvasBox = () => {
  const layoutDom = document.getElementById('go-chart-edit-layout')
  if (layoutDom) {
    return {
      height: layoutDom.clientHeight - 40,
      width: layoutDom.clientWidth
    }
  }
  return {
    width: width.value,
    height: height.value
  }
}

// 颜色
const themeColor = computed(() => {
  return designStore.getAppTheme
})

// 处理标尺重制大小
const ruleChangeHandle = () => {
  configShow.value = false
  setTimeout(() => {
    configShow.value = true
  })
}

const ruleChangeHandleTimeOut = () => {
  if (lockScale.value) {
    setTimeout(() => {
      ruleChangeHandle()
    }, 500)
  }
}

watch(
  () => scale.value,
  () => ruleChangeHandle()
)

watch(
  () => getLayers.value,
  () => ruleChangeHandleTimeOut()
)

watch(
  () => getCharts.value,
  () => ruleChangeHandleTimeOut()
)

watch(
  () => getDetails.value,
  () => ruleChangeHandleTimeOut()
)

</script>

<style>
/* 使用 SCSS 会报错，直接使用最基础的 CSS 进行修改，
此库有计划 Vue3 版本，但是开发的时候还没发布 */

#mb-ruler {
  top: 0;
  left: 0;
}
/* 适配底部的工具栏不遮盖 */
#mb-ruler .v-container {
  height: calc(100% - 65px) !important;
}
/* 横线 */
#mb-ruler .v-container .lines .line {
  /* 最大缩放 200% */
  width: 200vw !important;
  border-top: 1px dashed v-bind('themeColor') !important;
}
#mb-ruler .v-container .indicator {
  border-bottom: 1px dashed v-bind('themeColor') !important;
}
/* 竖线 */
#mb-ruler .h-container .lines .line {
  /* 最大缩放 200% */
  height: 200vh !important;
  border-left: 1px dashed v-bind('themeColor') !important;
}
#mb-ruler .h-container .indicator {
  border-left: 1px dashed v-bind('themeColor') !important;
}
/* 坐标数值背景颜色 */
#mb-ruler .indicator .value {
  background-color: rgba(0, 0, 0, 0);
}
/* 删除按钮 */
#mb-ruler .line .del {
  padding: 0;
  color: v-bind('themeColor');
  font-size: 26px;
  font-weight: bolder;
}

#mb-ruler .corner {
  border-width: 0 !important;
}
</style>
