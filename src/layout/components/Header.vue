<template>
  <div class="header">
    <div @click="toggleCollapsed" class="header-left">
      <SvgIcon
        size="26"
        color="rgb(245, 245, 245)"
        :name="!getCollapsed ? 'menuFold' : 'menuExpand'"
      />
    </div>
    <div class="header-right">
      <span class="operate_book">
        <a
          class="operate_text"
          href="https://sh1-fms-template.obs.cn-east-3.myhuaweicloud.com/fms.docx"
          download
          >{{ t('common.operateManual') }}</a
        >
      </span>
      <span class="company_wrapper">
        <span>{{ t('common.companyText') }}</span>
        <el-select class="w-260px" @change="changeCompany" :model-value="companyCode">
          <el-option
            v-for="item in companyList"
            :label="item.companyName"
            :value="item.companyCode"
            :key="item.companyId"
          />
        </el-select>
      </span>
      <el-dropdown
        placement="bottom"
        class="translate_dropdown"
        trigger="click"
        @command="handleChangeLanguage"
      >
        <span class="translate">
          <SvgIcon size="26" color="#cccccc" name="translate" />
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item
              :class="getLocale === item.key ? 'lan_active' : ''"
              v-for="item in localeList"
              :key="item.key"
              :command="item"
              >{{ item.text }}</el-dropdown-item
            >
          </el-dropdown-menu>
        </template>
      </el-dropdown>

      <el-dropdown class="avatar_dropdown" @command="handleCommand">
        <span class="person_avatar">
          <div class="avatar_info">
            <el-avatar :size="40" :src="AvatarUrl" />
            <span class="text_name">{{ userInfo.userName }}</span>
          </div>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="personal">{{ t('common.personal') }}</el-dropdown-item>
            <el-dropdown-item command="logout">{{ t('common.logout') }}</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script lang="ts">
  import { computed, defineComponent, onMounted, ref, unref } from 'vue';
  import { useMenuSetting } from '@/hooks/setting/useMenuSetting';
  import { CompanyItem } from '@/API/common/model/selectModel';
  import { getCompanyList } from '@/API/common/select';
  import AvatarUrl from '@/assets/images/user.png';
  import { useAppUserStore } from '@/store/modules/user';
  import { LocaleItem, localeList } from '@/settings/localeSetting';
  import { useLocale } from '@/locales/useLocale';
  import { LocaleType } from '#/config';
  import { useI18n } from '@/hooks/web/useI18n';

  export default defineComponent({
    name: 'Header',
    setup() {
      const { getCollapsed, toggleCollapsed } = useMenuSetting();
      const companyList = ref<CompanyItem[]>([]);
      const userStore = useAppUserStore();
      const { t } = useI18n();

      const userInfo = computed(() => userStore.getUserInfo);
      const companyCode = computed(() => userStore.getCompanyCode);

      const { changeLocale, getLocale } = useLocale();

      function handleCommand(command: 'logout' | 'personal') {
        if (command === 'logout') {
          userStore.logout(true);
        }
      }

      function changeCompany(val: string) {
        userStore.setCompanyCode(val);
        location.reload();
      }

      async function handleChangeLanguage(item: LocaleItem) {
        if (unref(getLocale) === item.key) {
          return;
        }
        await changeLocale(item.key as LocaleType);
        location.reload();
      }

      onMounted(async () => {
        companyList.value = await getCompanyList();
      });

      return {
        getCollapsed,
        toggleCollapsed,
        companyList,
        companyCode,
        AvatarUrl,
        userInfo,
        localeList,
        getLocale,

        handleCommand,
        t,
        changeCompany,
        handleChangeLanguage,
      };
    },
  });
</script>

<style lang="scss" scoped>
  @import '@/styles/variable.scss';

  .header {
    height: $header-height;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: $header-bg-color;

    .header-left {
      height: 100%;
      display: flex;
      align-items: center;
      cursor: pointer;
      justify-content: center;
      padding-left: 10px;
      padding-right: 10px;
    }

    .header-left:hover {
      background: #0c2135;
    }

    .header-right {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 100%;

      .operate_book {
        display: inline-block;
        padding: 0 20px;
        height: 44px;
        border-radius: 20px;
        border: 1px solid #1890ff;
        margin-right: 25px;

        a {
          height: 100%;
          color: rgb(24, 144, 255);
          line-height: 44px;
          font-size: 22px;
        }
      }

      .operate_book:hover {
        background: #ecf5ff;
      }

      .company_wrapper {
        display: flex;
        height: 44px;
        align-items: center;
        cursor: pointer;
        padding: 0 20px;
        border-radius: 20px;
        border: 1px solid #1890ff;
        margin-right: 20px;

        span {
          display: inline-block;
          height: 100%;
          color: rgb(24, 144, 255);
          line-height: 44px;
          font-size: 22px;
          margin-right: 15px;
        }
      }

      .avatar_dropdown {
        height: 100%;
        .person_avatar {
          padding: 0 20px 0 0;
          cursor: pointer;
          display: flex;
          align-items: center;
          height: 100%;
          .el-avatar {
            background: $header-bg-color;
          }

          .avatar_info {
            display: flex;
            align-items: center;

            .text_name {
              display: inline-block;
              color: #ffffff;
              margin-left: 15px;
            }
          }
        }
      }

      .translate_dropdown {
        height: 100%;
        margin-right: 15px;

        .translate {
          cursor: pointer;
          display: flex;
          align-items: center;
          height: 100%;
          padding: 0 8px;
        }

        .translate:hover {
          background: #0c2135;
        }
      }
    }
  }
</style>
<style lang="scss">
  .el-dropdown-menu {
    .lan_active {
      color: #79bbff;
      background: #ecf5ff;
    }
  }
</style>
