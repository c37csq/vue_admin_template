<template>
  <el-button :class="getButtonClass" :size="size" :color="getColor" v-bind="$attrs">
    {{ name }}
  </el-button>
</template>

<script lang="ts">
  import { computed, defineComponent } from 'vue';
  import { ButtonEnum } from '@/enums/componentEnum';

  export default defineComponent({
    name: 'Button',
    inheritAttrs: false,
    props: {
      name: {
        type: String,
        required: true,
      },
      size: {
        type: String,
        validator: (v: string) => ['small', 'default', 'large'].includes(v),
        default: 'default',
      },
      status: {
        type: String,
        validator: (v: string) => ['primary', 'info', 'success', 'default'].includes(v),
        default: 'default',
      },
    },
    setup(props) {
      const getColor = computed(() => ButtonEnum[props.status || ''] || '');
      const getButtonClass = computed(() => `button-${props.status}`);

      return {
        getColor,
        getButtonClass,
      };
    },
  });
</script>

<style scoped>
  .button-primary,
  .button-info,
  .button-success {
    color: #ffffff;
  }

  .el-button--text {
    display: flex;
    align-items: center;
  }

  .button-info:hover,
  .button-info:focus {
    opacity: 0.8;
    border: 1px solid rgb(255, 131, 74);
    background: rgb(255, 131, 74);
  }

  .button-success:hover,
  .button-success:focus {
    opacity: 0.8;
    border: 1px solid rgb(0, 176, 148);
    background: rgb(0, 176, 148);
  }
</style>
