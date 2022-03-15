<template>
  <svg :class="[svgClass, spin && 'svg-icon-spin']" :style="getStyle" aria-hidden="true">
    <use :xlink:href="symbolId" />
  </svg>
</template>

<script lang="ts">
  import { computed, defineComponent } from 'vue';
  import type { CSSProperties } from 'vue';

  export default defineComponent({
    name: 'SvgIcon',
    props: {
      prefix: {
        type: String,
        default: 'icon',
      },
      name: {
        type: String,
        required: true,
      },
      size: {
        type: [Number, String],
        default: 16,
      },
      color: {
        type: String,
        default: '#ffffff',
      },
      spin: {
        type: Boolean,
        default: false,
      },
    },
    setup(props) {
      const symbolId = computed(() => `#${props.prefix}-${props.name}`);

      const getStyle = computed((): CSSProperties => {
        const { size, color } = props;
        let s = `${size}`;
        s = `${s.replace('px', '')}px`;
        return {
          width: s,
          height: s,
          color,
        };
      });
      const svgClass = computed(() => {
        if (props.name) return `svg-icon icon-${props.name}`;
        return 'svg-icon';
      });
      return { symbolId, getStyle, svgClass };
    },
  });
</script>

<style lang="scss" scoped>
  .svg-icon {
    display: inline-block;
    overflow: hidden;
    vertical-align: middle;
    fill: currentColor;
    vertical-align: -0.15em;
  }

  .svg-icon-spin {
    animation: loadingCircle 1s infinite linear;
  }
</style>
