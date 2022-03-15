<template>
  <div class="Pagination">
    <div class="Pagination-Content">
      <el-pagination
        :current-page="pageNum"
        layout="total, prev, pager, next, jumper, slot"
        :page-size="pageSize"
        :total="total"
        @current-change="onPageChange"
      />
      <div class="PageSize">
        <span class="text">{{ t('common.pageSize') }}</span>
        <el-input @change="onPageChange" v-model="page_size" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent, ref, watch } from 'vue';
  import { DEFAULT_PAGE_SIZE } from '@/components/Pagination/data';
  import { checkNumber, isString } from '@/utils/checkType';
  import { useI18n } from '@/hooks/web/useI18n';

  export default defineComponent({
    name: 'Pagination',
    props: {
      total: {
        type: Number,
        default: 0,
      },
      pageSize: {
        type: Number,
        default: DEFAULT_PAGE_SIZE,
      },
      pageNum: {
        type: Number,
        default: 1,
      },
    },
    emits: ['page-change'],
    setup(props, { emit }) {
      const page_size = ref(props.pageSize);
      const { t } = useI18n();

      watch(
        () => props.pageSize,
        (curPageSize) => {
          page_size.value = curPageSize;
        },
      );

      function onPageNumChange(val: number) {
        emit('page-change', {
          pageNum: val,
          pageSize: Number(page_size.value),
        });
      }

      function onPageSizeChange(val) {
        if (!checkNumber(val)) {
          page_size.value = DEFAULT_PAGE_SIZE;
        }
        emit('page-change', {
          pageSize: Number(page_size.value),
          pageNum: props.pageNum,
        });
      }

      function onPageChange(val: number | string) {
        if (isString(val)) {
          onPageSizeChange(val);
        } else {
          onPageNumChange(val);
        }
      }

      return {
        page_size,

        onPageChange,
        t,
      };
    },
  });
</script>

<style lang="scss" scoped>
  .Pagination {
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 80px 0 0 0;

    .Pagination-Content {
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .PageSize {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-left: 15px;

      .text {
        font-size: 14px;
      }

      .el-input {
        width: 60px;
        margin-left: 10px;
      }
    }
  }
</style>
