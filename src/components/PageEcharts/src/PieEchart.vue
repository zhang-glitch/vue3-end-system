<template>
  <div class="pie-echart">
    <template v-if="isRose">
      <echarts :echartsOption="roseList" width="100%"></echarts>
    </template>
    <template v-else>
      <echarts :echartsOption="options" width="100%"></echarts>
    </template>
  </div>
</template>
<script lang="ts">
import { defineComponent, computed } from 'vue'
import Echarts from '../../../base-ui/Echarts'

export default defineComponent({
  components: {
    Echarts
  },
  props: {
    pieData: {
      type: Array,
      required: true
    },
    isRose: {
      type: Boolean,
      default: false
    }
  },
  setup(props) {
    const options = computed(() => {
      return {
        tooltip: {
          trigger: 'item'
        },
        legend: {
          orient: 'horizontal',
          top: 'top'
        },
        series: [
          {
            name: '商品统计',
            type: 'pie',
            radius: '50%',
            data: props.pieData,
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      }
    })

    const roseList = computed(() => {
      return {
        legend: {
          top: 'bottom'
        },
        toolbox: {
          show: true,
          feature: {
            mark: { show: true },
            dataView: { show: true, readOnly: false },
            restore: { show: true },
            saveAsImage: { show: true }
          }
        },
        series: [
          {
            name: '商品统计',
            type: 'pie',
            radius: [20, 80],
            center: ['50%', '50%'],
            roseType: 'area',
            itemStyle: {
              borderRadius: 8
            },
            data: props.pieData
          }
        ]
      }
    })
    return {
      options,
      roseList
    }
  }
})
</script>
<style scoped></style>
