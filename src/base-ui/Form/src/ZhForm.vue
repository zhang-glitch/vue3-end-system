<template>
  <div class="zh-form">
    <div class="form-header">
      <slot name="header"></slot>
    </div>
    <el-form :label-width="labelWidth">
      <el-row>
        <template v-for="formItem in formItems" :key="formItem.label">
          <el-col v-bind="colLayout">
            <el-form-item
              :label="formItem.label"
              :rules="formItem.rules"
              :style="itemStyle"
              v-if="!formItem.isHidden"
            >
              <!-- 渲染普通input和password -->
              <template
                v-if="formItem.type === 'input' || formItem.type === 'password'"
              >
                <el-input
                  :type="formItem.type"
                  v-model="formValues[`${formItem.field}`]"
                ></el-input>
              </template>
              <!-- 渲染select表单 -->
              <template v-if="formItem.type === 'select'">
                <el-select
                  :placeholder="formItem.placeholder"
                  v-model="formValues[`${formItem.field}`]"
                >
                  <el-option
                    v-for="optionItem in formItem.options"
                    :key="optionItem.title"
                    :label="optionItem.title"
                    :value="optionItem.value"
                  ></el-option>
                </el-select>
              </template>
              <!-- 渲染date表单 -->
              <template v-if="formItem.type === 'datepicker'">
                <el-date-picker
                  v-bind="formItem.otherOptions"
                  style="width: 100%"
                  v-model="formValues[`${formItem.field}`]"
                ></el-date-picker>
              </template>
            </el-form-item>
          </el-col>
        </template>
      </el-row>
    </el-form>
    <div class="form-footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, PropType, ref, watch } from 'vue'
import { IFormItem } from './type'

export default defineComponent({
  props: {
    modelValue: {
      type: Object,
      required: true
    },
    formItems: {
      type: Array as PropType<IFormItem[]>,
      default: () => {
        return []
      }
    },
    labelWidth: {
      type: String,
      default: '100px'
    },
    itemStyle: {
      type: Object,
      default: () => {
        return {
          padding: '10px 40px'
        }
      }
    },
    colLayout: {
      type: Object,
      default: () => ({
        xl: 6, // >1920px 4个
        lg: 8,
        md: 12,
        sm: 24,
        xs: 24
      })
    }
  },
  setup(props, { emit }) {
    // 这里取出表单数据的拷贝，如果修改表单数据的时候，即清空数据，由于这里的代码只能执行一次，所以不能被清除。我们可以使用watch来监听，然后当表单数据清空后，我们就可以重新拷贝了。
    const formValues = ref({ ...props.modelValue })
    // watch(
    //   () => props.modelValue,
    //   (newModelValue) => {
    //     formValues.value = newModelValue
    //   }
    // )
    watch(
      formValues,
      (newFormValues) => {
        emit('update:modelValue', newFormValues)
      },
      {
        deep: true
      }
    )
    return {
      formValues
    }
  }
})
</script>
<style scoped lang="less">
.zh-form {
  padding: 20px 10px;
  .form-header {
    text-align: center;
  }
  .form-footer {
    text-align: right;
  }
}
</style>
