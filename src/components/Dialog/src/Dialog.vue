<template>
  <el-dialog
    @opened="() => $emit('opened')"
    @close="() => $emit('close')"
    append-to-body
    lock-scroll
    close-on-press-escape
    draggable
    destroy-on-close
    v-bind="$attrs"
  >
    <template #title>
      <slot name="title"></slot>
      <span class="dialog_title_text">{{ !$slots.title ? title : '' }}</span>
    </template>
    <el-scrollbar class="scroll_container">
      <slot></slot>
    </el-scrollbar>
    <template v-if="showButton" #footer>
      <Button @click="onClose" :name="cancelButtonText || t('button.cancelText')" />
      <Button
        :loading="submitLoading"
        @click="onSubmit"
        status="primary"
        :name="confirmButtonText || t('button.okText')"
      />
    </template>
  </el-dialog>
</template>

<script lang="ts">
  import { defineComponent, ref } from 'vue';
  import { useI18n } from '@/hooks/web/useI18n';

  export default defineComponent({
    name: 'Dialog',
    props: {
      showButton: {
        type: Boolean,
        default: true,
      },
      cancelButtonText: {
        type: String,
      },
      confirmButtonText: {
        type: String,
      },
      title: {
        type: String,
      },
    },
    emits: ['opened', 'submit', 'close'],
    setup(_, { emit }) {
      const submitLoading = ref(false);
      const { t } = useI18n();

      // set loading
      function setSubmitLoading(loading: boolean) {
        submitLoading.value = loading;
      }

      function onSubmit() {
        emit('submit', {
          setSubmitLoading,
        });
      }

      function onClose() {
        emit('close');
      }

      return {
        submitLoading,

        onSubmit,
        onClose,
        t,
      };
    },
  });
</script>

<style lang="scss" scoped>
  .dialog_title_text {
    line-height: 24px;
    font-size: 18px;
    color: #303133;
  }
</style>
<style>
  .scroll_container .el-scrollbar__view {
    display: flex;
    justify-content: center;
  }
</style>
