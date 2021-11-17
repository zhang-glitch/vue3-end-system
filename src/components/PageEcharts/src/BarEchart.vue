<template>
  <div class="bar-echart">
    <echarts :echartsOption="options" width="100%"></echarts>
  </div>
</template>
<script>
import { defineComponent, computed } from 'vue'
import Echarts from '../../../base-ui/Echarts'

export default defineComponent({
  components: {
    Echarts
  },
  props: {
    xAxisData: {
      type: Array,
      required: true
    },
    barData: {
      type: Array,
      required: true
    }
  },
  setup(props) {
    const options = computed(() => {
      return {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            data: props.xAxisData,
            axisTick: {
              alignWithLabel: true
            }
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: [
          {
            name: 'Direct',
            type: 'bar',
            barWidth: '60%',
            data: props.barData
          }
        ]
      }
    })
    return {
      options
    }
  }
})
</script>
<style scoped></style>
