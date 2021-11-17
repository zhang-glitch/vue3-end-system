<template>
  <div class="category">
    <el-row :gutter="10">
      <el-col :span="7">
        <zh-card cardTitle="分类商品数量(饼图)">
          <pie-echart :pieData="countList"></pie-echart>
        </zh-card>
      </el-col>
      <el-col :span="10">
        <zh-card cardTitle="不同城市商品销量">
          <map-echart :mapData="mapEchartData"></map-echart>
        </zh-card>
      </el-col>
      <el-col :span="7">
        <zh-card cardTitle="分类商品数量(玫瑰图)">
          <pie-echart :pieData="countList" :isRose="true"></pie-echart>
        </zh-card>
      </el-col>
    </el-row>
    <el-row :gutter="10" class="category-bottom">
      <el-col :span="12">
        <zh-card cardTitle="分类商品的销量">
          <line-echart v-bind="lineEchartData"></line-echart>
        </zh-card>
      </el-col>
      <el-col :span="12">
        <zh-card cardTitle="分类商品的收藏">
          <bar-echart v-bind="barEchartData"></bar-echart>
        </zh-card>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import ZhCard from '../../../../base-ui/Card'
import {
  PieEchart,
  MapEchart,
  BarEchart,
  LineEchart
} from '../../../../components/PageEcharts'
import { useStore } from '../../../../store'
export default defineComponent({
  name: 'category',
  components: {
    ZhCard,
    PieEchart,
    MapEchart,
    BarEchart,
    LineEchart
  },
  setup() {
    const store = useStore()
    // 请求数据
    store.dispatch('product/getCategoryCountListAction')
    store.dispatch('product/getCategorySaleListAction')
    store.dispatch('product/getCategoryFavorListAction')
    store.dispatch('product/getCategoryMapListAction')
    // 饼图数据
    const countList = computed(() => {
      return store.state.product.categoryCountList.map((item: any) => ({
        value: item.goodsCount,
        name: item.name
      }))
    })
    // 折线图数据
    const lineEchartData = computed(() => {
      const xAxisData: string[] = []
      const lineData: any[] = []
      const categorySaleList = store.state.product.categorySaleList
      for (let item of categorySaleList) {
        xAxisData.push(item.name)
        lineData.push(item.goodsCount)
      }
      return {
        xAxisData,
        lineData
      }
    })

    // 柱状图数据
    const barEchartData = computed(() => {
      const xAxisData: string[] = []
      const barData: any[] = []
      const categoryFavorList = store.state.product.categoryFavorList
      for (let item of categoryFavorList) {
        xAxisData.push(item.name)
        barData.push(item.goodsCount)
      }
      return {
        xAxisData,
        barData
      }
    })

    // 地图数据
    const mapEchartData = computed(() => {
      return store.state.product.categoryMapList.map((item: any) => {
        return {
          name: item.name,
          value: item.value
        }
      })
    })
    return {
      countList,
      lineEchartData,
      barEchartData,
      mapEchartData
    }
  }
})
</script>

<style scoped lang="less">
.category {
  width: 100%;
  background: #f3f2f5;

  .category-bottom {
    margin-top: 20px;
  }
}
</style>
