<template>
  <PageWrapper :title="`应付发票 ${payInvoiceId}`"> 应付发票 </PageWrapper>
</template>

<script lang="ts">
  import { defineComponent, unref } from 'vue';
  import { useRouter } from 'vue-router';

  export default defineComponent({
    name: 'payableDetail',
    setup() {
      const { currentRoute } = useRouter();
      const { params } = unref(currentRoute);
      const payInvoiceId = params.id;

      return {
        payInvoiceId,
      };
    },
  });
</script>

<style scoped></style>
