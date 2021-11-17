import * as echarts from 'echarts'
const chinaData = require('../map-data/mapData.json')
// 注册地图
echarts.registerMap('china', chinaData)

export default function useEcharts(domRef: HTMLElement) {
  const echartInstance = echarts.init(domRef)

  const setOption = (options: echarts.EChartsOption) => {
    echartInstance.setOption(options)
  }

  const updateSize = () => {
    echartInstance.resize()
  }

  window.addEventListener('resize', () => {
    echartInstance.resize()
  })

  return {
    setOption,
    updateSize
  }
}
