<template>
  <PageWrapper
    title='对方账单查询'>
    <Button @click="handleClick('D03995950')" name="D03995950" />
    <Button @click="handleClick('JR202202')" name="JR202202" />
  </PageWrapper>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import { useGo } from '@/hooks/web/usePage';
  export default defineComponent({
    name: 'payableList',
    setup() {
      const go = useGo();
      function handleClick(val) {
        go('/home/payableDetail/' + val);
      }

      return {
        handleClick,
      };
    },
  });
</script>

<style scoped></style>
