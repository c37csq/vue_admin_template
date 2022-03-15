<template>
  <div class="login_page">
    <el-form>
      <el-form-item label="账号">
        <el-input v-model="loginForm.account" autocomplete="off" />
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="loginForm.password" type="password" autocomplete="off" />
      </el-form-item>
      <el-form-item label="公司">
        <el-select v-model="loginForm.companyCode">
          <el-option
            v-for="item in companyList"
            :value="item.companyCode"
            :key="item.companyId"
            :label="item.companyName"
          />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button @click="handleLogin">登陆</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
  import { defineComponent, onMounted, ref, reactive } from 'vue';
  import { getCompanyList } from '@/API/common/select';
  import { CompanyItem } from '@/API/common/model/selectModel';
  import { useAppUserStore } from '@/store/modules/user';
  import { DEFAULT_COMPANY_CODE } from '@/enums/cacheEnum';

  export default defineComponent({
    name: 'Login',
    setup() {
      const loginForm = reactive({
        account: '',
        password: '',
        companyCode: DEFAULT_COMPANY_CODE,
      });
      const loading = ref(false);
      const companyList = ref<CompanyItem[]>([]);
      const userStore = useAppUserStore();

      // 用户登陆
      const handleLogin = async () => {
        try {
          loading.value = true;
          const userInfo = await userStore.login({
            ...loginForm,
            mode: 'none', //不要默认的错误提示
          });
          console.log(userInfo);
          // if (userInfo) {
          //   notification.success({
          //     message: t('sys.login.loginSuccessTitle'),
          //     description: `${t('sys.login.loginSuccessDesc')}: ${userInfo.realName}`,
          //     duration: 3,
          //   });
          // }
        } catch (error) {}
      };

      onMounted(async () => {
        companyList.value = await getCompanyList();
      });

      return {
        loginForm,
        companyList,

        handleLogin,
      };
    },
  });
</script>

<style scoped lang="scss"></style>
