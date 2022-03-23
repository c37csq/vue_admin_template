<template>
  <PageWrapper>
    <div class="userForm">
      <el-form ref="searchFormRef" :model="form" label-width="100px" inline>
        <el-form-item :label="t('form.account')" prop="account">
          <el-input v-model="form.account" clearable />
        </el-form-item>
        <el-form-item :label="t('form.userName')" prop="userName">
          <el-input v-model="form.userName" :placeholder="t('common.fuzzyQuery')" clearable />
        </el-form-item>
        <el-form-item :label="t('form.useStatus')" prop="useStatus">
          <el-radio-group v-model="form.useStatus" @change="switchStatus">
            <el-radio label="0">可用</el-radio>
            <el-radio label="1">停用</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item :label="t('form.businessGroupCode')" prop="businessGroupCode">
          <el-select
            v-model="form.businessGroupCode"
            :placeholder="t('common.selectPlaceholder')"
            clearable
          >
            <el-option
              v-for="item in sectorList"
              :label="item.businessGroupName"
              :value="item.businessGroupCode"
              :key="item.businessGroupCode"
            />
          </el-select>
        </el-form-item>
        <el-form-item :label="t('form.roleCode')" prop="roleCode">
          <el-select v-model="form.roleCode" :placeholder="t('common.selectPlaceholder')" clearable>
            <el-option
              v-for="item in roleList"
              :label="item.roleName"
              :value="item.roleCode"
              :key="item.roleCode"
            />
          </el-select>
        </el-form-item>
        <el-form-item class="ml-15">
          <Button @click="operateUser('add')" :name="t('button.addText')" />
          <Button @click="search" status="primary" :name="t('button.searchText')" />
          <Button @click="reset" :name="t('button.resetText')" />
        </el-form-item>
      </el-form>
    </div>
    <div class="userTable mt-15">
      <el-table v-loading="tableLoading" :data="list" stripe>
        <el-table-column min-width="120" :label="t('table.account')" prop="account" />
        <el-table-column min-width="120" :label="t('table.userName')" prop="userName" />
        <el-table-column min-width="120" :label="t('table.telephone')" prop="phone" />
        <el-table-column min-width="250" :label="t('table.companyCode')" prop="companyCode" />
        <el-table-column min-width="250" :label="t('table.mailbox')" prop="mailbox" />
        <el-table-column min-width="120" :label="t('table.departName')" prop="businessGroupName" />
        <el-table-column min-width="120" :label="t('table.roleName')" prop="roleName" />
        <el-table-column min-width="120" :label="t('table.useStatus')" prop="useStatus">
          <template #default="scope">
            <p v-if="!scope.row.useStatus">{{ t('table.available') }}</p>
            <p v-if="scope.row.useStatus">{{ t('table.deactivate') }}</p>
          </template>
        </el-table-column>
        <el-table-column min-width="180" :label="t('table.createTime')" prop="createTime" />
        <el-table-column min-width="180" :label="t('table.updateTime')" prop="updateTime" />
        <el-table-column
          fixed="right"
          :label="t('table.operate')"
          prop="operate"
          align="center"
          min-width="200"
        >
          <template #default="scope">
            <div class="operate">
              <Button
                @click="operateUser('edit', scope.row)"
                :icon="Edit"
                type="text"
                :name="t('button.editText')"
              />
              <Button
                @click="operateUser('stop', scope.row)"
                v-if="scope.row.useStatus === 0"
                :icon="Delete"
                type="text"
                :name="t('button.stopText')"
              />
              <Button
                @click="operateUser('open', scope.row)"
                v-if="scope.row.useStatus === 1"
                :icon="Delete"
                type="text"
                :name="t('button.openText')"
              />
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <Pagination
      @page-change="onPageChange"
      :total="pageData.total"
      :pageSize="pageData.pageSize"
      :pageNum="pageData.pageNum"
    />
    <Dialog
      width="500px"
      @submit="onSubmit"
      @close="onClose"
      @opened="onOpened"
      :title="dialogInfo.title"
      v-model="dialogInfo.visible"
      center
    >
      <el-form
        v-loading="dialogInfo.loading"
        ref="dialogFormRef"
        class="w-4/5"
        label-width="90px"
        :model="dialogInfo.form"
        :rules="userFormRules"
      >
        <el-form-item label="账号名" prop="account">
          <el-input
            v-model="dialogInfo.form.account"
            :disabled="dialogInfo.operate === 'edit'"
            clearable
          />
        </el-form-item>
        <el-form-item v-if="dialogInfo.operate === 'add'" label="密码" prop="password">
          <el-input v-model="dialogInfo.form.password" clearable />
        </el-form-item>
        <el-form-item label="用户姓名" prop="userName">
          <el-input v-model="dialogInfo.form.userName" clearable />
        </el-form-item>
        <el-form-item label="手机号" prop="phone">
          <el-input v-model="dialogInfo.form.phone" clearable />
        </el-form-item>
        <el-form-item label="电话" prop="telephone">
          <el-input v-model="dialogInfo.form.telephone" clearable />
        </el-form-item>
        <el-form-item label="邮箱" prop="mailbox">
          <el-input v-model="dialogInfo.form.mailbox" clearable />
        </el-form-item>
        <el-form-item label="部门" prop="businessGroupCode">
          <el-select
            class="w-270px"
            v-model="dialogInfo.form.businessGroupCode"
            placeholder="请选择部门编号"
            clearable
          >
            <el-option
              v-for="item in sectorList"
              :label="item.businessGroupName"
              :value="item.businessGroupCode"
              :key="item.businessGroupCode"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="角色" prop="roleCode">
          <el-select
            class="w-270px"
            v-model="dialogInfo.form.roleCode"
            placeholder="请选择角色编号"
            clearable
          >
            <el-option
              v-for="item in roleList"
              :label="item.roleName"
              :value="item.roleCode"
              :key="item.roleCode"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="公司" prop="companyCode">
          <el-select
            class="w-270px"
            v-model="dialogInfo.form.companyCode"
            multiple
            placeholder="请选择公司"
            clearable
          >
            <el-option
              v-for="item in companyList"
              :label="item.companyName"
              :value="item.companyCode"
              :key="item.companyCode"
            />
          </el-select>
        </el-form-item>
      </el-form>
    </Dialog>
  </PageWrapper>
</template>

<script lang="ts">
  import { defineComponent, onMounted, reactive, Ref, ref, unref } from 'vue';
  import {
    OperateUserRequestParams,
    UserFormType,
    UserListItem,
  } from '@/API/systemSetting/model/userModel';
  import { getCompanyList, getRoleList, getSectorList } from '@/API/common/select';
  import { CompanyItem, RoleItem, SectorItem } from '@/API/common/model/selectModel';
  import { DEFAULT_PAGE_SIZE, initPageData, PaginationParams } from '@/components/Pagination/data';
  import { addUser, editUser, getUserList } from '@/API/systemSetting/user';
  import { formResetFields, formValidate } from '@/utils/tool';
  import { Edit, Delete } from '@element-plus/icons-vue';
  import { useAppStore } from '@/store/modules/app';
  import { DialogType, OperateType } from '#/page-common';
  import { cloneDeep } from 'lodash-es';
  import { useMessage } from '@/hooks/web/useMessage';
  import { useI18n } from '@/hooks/web/useI18n';

  export default defineComponent({
    name: 'user',
    setup() {
      const form = reactive<UserFormType>({
        userName: '',
        roleCode: '',
        useStatus: '0',
        account: '',
        businessGroupCode: '',
      });
      const { t } = useI18n();
      const roleList = ref<RoleItem[]>([]);
      const sectorList = ref<SectorItem[]>([]);
      const list = ref<UserListItem[]>([]);
      const companyList = ref<CompanyItem[]>([]);
      const tableLoading = ref(false);
      let pageData = initPageData();
      const searchFormRef = ref();
      const appStore = useAppStore();
      const dialogInfo = reactive<DialogType<OperateUserRequestParams>>({
        title: '新增用户',
        visible: false,
        loading: false,
        operate: 'add',
        form: {
          account: '',
          password: '',
          userName: '',
          phone: '',
          telephone: '',
          mailbox: '',
          businessGroupCode: '',
          roleCode: '',
          userId: 0,
          companyCode: [],
        },
      });
      const dialogFormRef = ref();
      const { createMessage, createConfirm } = useMessage();
      const userFormRules = {
        account: [{ required: true, message: '账号名不能为空', trigger: 'blur' }],
        password: [{ required: true, message: '密码不能为空', trigger: 'blur' }],
        userName: [{ required: true, message: '用户姓名不能为空', trigger: 'blur' }],
        phone: [{ required: true, message: '电话不能为空', trigger: 'blur' }],
        mailbox: [{ required: true, message: '邮箱不能为空', trigger: 'blur' }],
        businessGroupCode: [{ required: true, message: '部门不能为空', trigger: 'change' }],
        roleCode: [{ required: true, message: '角色不能为空', trigger: 'change' }],
        companyCode: [{ required: true, message: '公司不能为空', trigger: 'change' }],
      };
      const curRow = ref({}) as Ref<UserListItem>;

      async function loadList() {
        tableLoading.value = true;
        try {
          const params = {
            pageSize: pageData.pageSize,
            pageNum: pageData.pageNum,
            ...form,
          };
          const res = await getUserList(params);
          list.value = res.list;
          pageData.total = res.total;
          pageData.pageNum = res.pageNum;
          pageData.pageSize = res.pageSize;
        } catch (err) {
          pageData.total = 0;
          list.value = [];
        } finally {
          tableLoading.value = false;
        }
      }

      function onClose() {
        formResetFields(dialogFormRef);
        dialogInfo.visible = false;
      }

      async function loadRoleList() {
        try {
          roleList.value = await getRoleList();
        } catch (err) {
          roleList.value = [];
        }
      }

      async function loadSectorList() {
        try {
          sectorList.value = await getSectorList();
        } catch (err) {
          sectorList.value = [];
        }
      }

      async function loadCompanyList() {
        try {
          companyList.value = await getCompanyList();
        } catch (err) {
          companyList.value = [];
        }
      }

      // page change
      async function onPageChange(params: PaginationParams) {
        pageData.pageSize = params.pageSize;
        pageData.pageNum = params.pageNum;
        await loadList();
      }

      function onOpened() {
        if (dialogInfo.operate === 'edit') {
          dialogInfo.form = {
            account: unref(curRow).account,
            userName: unref(curRow).userName,
            phone: unref(curRow).phone,
            telephone: unref(curRow).telephone,
            mailbox: unref(curRow).mailbox,
            businessGroupCode: unref(curRow).businessGroupCode,
            roleCode: unref(curRow).roleCode,
            userId: unref(curRow).userId,
            companyCode: unref(curRow).companyCode.split(','),
          };
          dialogInfo.loading = false;
        }
      }

      onMounted(async () => {
        const getUserTableList = loadList();
        const getSectorSelectList = loadSectorList();
        const getRoleSelectList = loadRoleList();
        const getCompanyList = loadCompanyList();
        appStore.setPageMountedLoading([
          getUserTableList,
          getSectorSelectList,
          getRoleSelectList,
          getCompanyList,
        ]);
      });

      async function switchStatus() {
        await loadList();
      }

      async function onSubmit({ setSubmitLoading }) {
        await formValidate(dialogFormRef);
        setSubmitLoading(true);
        try {
          const form = cloneDeep(dialogInfo.form);
          form.companyCode = (form.companyCode as string[]).join(',');
          if (dialogInfo.operate === 'add') {
            await addUser(form);
            createMessage({ message: '用户添加成功' });
          } else if (dialogInfo.operate === 'edit') {
            delete form.account;
            await editUser(form);
            createMessage({ message: '用户修改成功' });
          }
          dialogInfo.visible = false;
          await loadList();
        } catch (e) {
          console.error(e);
        } finally {
          setSubmitLoading(false);
        }
      }

      function operateUser(type: OperateType, row?: UserListItem) {
        switch (type) {
          case 'add':
            dialogInfo.visible = true;
            dialogInfo.operate = type;
            dialogInfo.title = '新增用户';
            break;
          case 'edit':
            dialogInfo.loading = true;
            dialogInfo.visible = true;
            dialogInfo.operate = type;
            dialogInfo.title = '修改用户';
            curRow.value = cloneDeep(row!);
            break;
          case 'stop':
          case 'open':
            curRow.value = cloneDeep(row!);
            type === 'open' ? (curRow.value.useStatus = '0') : (curRow.value.useStatus = '1');
            const title = type === 'open' ? '启用' : '停用';
            const message = `确定要${title}用户名为${curRow.value.userName}的用户吗？`;
            createConfirm({
              title,
              message,
              beforeClose: async (action, instance, done) => {
                if (action === 'confirm') {
                  instance.confirmButtonLoading = true;
                  try {
                    const params = {
                      companyCode: curRow.value.companyCode,
                      userName: curRow.value.userName,
                      phone: curRow.value.phone,
                      telephone: curRow.value.telephone,
                      mailbox: curRow.value.mailbox,
                      userId: curRow.value.userId,
                      useStatus: curRow.value.useStatus,
                      businessGroupCode: curRow.value.businessGroupCode,
                      roleCode: curRow.value.roleCode,
                    };
                    await editUser(params);
                    createMessage({ message: `${title}成功！` });
                  } catch (e) {
                    console.error(e);
                  } finally {
                    done();
                    instance.confirmButtonLoading = false;
                  }
                } else {
                  done();
                }
              },
            }).then(() => {
              loadList();
            });
            break;
        }
      }

      async function search() {
        pageData.pageNum = 1;
        await loadList();
      }

      async function reset() {
        formResetFields(searchFormRef);
        pageData.pageSize = DEFAULT_PAGE_SIZE;
        pageData.pageNum = 1;
        await loadList();
      }

      return {
        form,
        roleList,
        sectorList,
        list,
        tableLoading,
        searchFormRef,
        pageData,
        Edit,
        Delete,
        dialogInfo,
        dialogFormRef,
        companyList,
        userFormRules,

        switchStatus,
        t,
        onSubmit,
        onOpened,
        onClose,
        onPageChange,
        reset,
        search,
        operateUser,
      };
    },
  });
</script>

<style scoped></style>
