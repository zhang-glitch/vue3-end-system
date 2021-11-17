<template>
  <div class="line-echart">
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
    lineData: {
      type: Array,
      required: true
    }
  },
  setup(props) {
    const options = computed(() => {
      return {
        xAxis: {
          type: 'category',
          data: props.xAxisData
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            data: props.lineData,
            type: 'line'
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
