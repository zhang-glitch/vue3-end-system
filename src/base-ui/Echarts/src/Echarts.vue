<template>
  <div class="echarts">
    <div ref="echartDivRef" :style="{ width: width, height: height }"></div>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, onMounted, PropType, watchEffect } from 'vue'
import useEcharts from '../hooks/useEcharts'
import * as echarts from 'echarts'

export default defineComponent({
  props: {
    width: {
      type: String,
      required: true
    },
    height: {
      type: String,
      default: '360px'
    },
    echartsOption: {
      type: Object as PropType<echarts.EChartsOption>,
      required: true
    }
  },
  setup(props) {
    const echartDivRef = ref<HTMLElement>()
    onMounted(() => {
      const { setOption } = useEcharts(echartDivRef.value!)
      watchEffect(() => {
        setOption(props.echartsOption)
      })
    })
    return {
      echartDivRef
    }
  }
})
</script>
<style scoped lang="less">
.echarts {
  width: 100%;
  height: 100%;
}
</style>
