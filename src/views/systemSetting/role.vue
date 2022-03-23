<template>
  <PageWrapper>
    <div class="roleForm">
      <el-form ref="searchFormRef" :model="form" label-width="100px" inline>
        <el-form-item :label="t('form.roleCode')" prop="roleCode">
          <el-input v-model="form.roleCode" clearable />
        </el-form-item>
        <el-form-item :label="t('form.roleName')" prop="roleName">
          <el-input v-model="form.roleName" placeholder="模糊搜索" clearable />
        </el-form-item>
        <el-form-item :label="t('form.useStatus')" prop="useStatus">
          <el-radio-group v-model="form.useStatus" @change="switchStatus">
            <el-radio label="0">可用</el-radio>
            <el-radio label="1">停用</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item class="ml-15">
          <Button @click="operateRole('add')" :name="t('button.addText')" />
          <Button @click="search" status="primary" :name="t('button.searchText')" />
          <Button @click="reset" :name="t('button.resetText')" />
        </el-form-item>
      </el-form>
    </div>
    <div class="roleTable mt-15">
      <el-table v-loading="tableLoading" :data="list" stripe>
        <el-table-column :label="t('table.roleCode')" prop="roleCode" />
        <el-table-column :label="t('table.roleName')" prop="roleName" />
        <el-table-column :label="t('table.remark')" prop="roleRemark" />
        <el-table-column :label="t('table.useStatus')" prop="useStatus">
          <template #default="scope">
            <p v-if="!scope.row.useStatus">可用</p>
            <p v-if="scope.row.useStatus">停用</p>
          </template>
        </el-table-column>
        <el-table-column :label="t('table.createTime')" prop="createTime" />
        <el-table-column :label="t('table.updateTime')" prop="updateTime" />
        <el-table-column :label="t('table.operate')" prop="operate" align="center">
          <template #default="scope">
            <div class="operate">
              <Button
                @click="operateRole('edit', scope.row)"
                :icon="Edit"
                type="text"
                :name="t('button.editText')"
              />
              <Button
                @click="operateRole('stop', scope.row)"
                v-if="scope.row.useStatus === 0"
                :icon="Delete"
                type="text"
                :name="t('button.stopText')"
              />
              <Button
                @click="operateRole('open', scope.row)"
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
      width="25%"
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
        :rules="roleFormRules"
      >
        <el-form-item label="账号名" prop="roleCode" v-if="dialogInfo.operate === 'edit'">
          <el-input v-model="dialogInfo.form.roleCode" disabled clearable />
        </el-form-item>
        <el-form-item label="角色名称" prop="roleName">
          <el-input v-model="dialogInfo.form.roleName" clearable />
        </el-form-item>
        <el-form-item label="角色备注" prop="roleRemark">
          <el-input v-model="dialogInfo.form.roleRemark" clearable />
        </el-form-item>
      </el-form>
    </Dialog>
  </PageWrapper>
</template>

<script lang="ts">
  import { defineComponent, onMounted, reactive, Ref, ref, unref } from 'vue';
  import { DEFAULT_PAGE_SIZE, initPageData, PaginationParams } from '@/components/Pagination/data';
  import { addRole, editRole, getRoleList, setRoleStatus } from '@/API/systemSetting/role';
  import {
    OperateRoleRequestParams,
    RoleFormType,
    RoleListItem,
  } from '@/API/systemSetting/model/roleModel';
  import { Edit, Delete } from '@element-plus/icons-vue';
  import { formResetFields, formValidate } from '@/utils/tool';
  import { DialogType, OperateType } from '#/page-common';
  import { useMessage } from '@/hooks/web/useMessage';
  import { cloneDeep } from 'lodash-es';
  import { useAppStore } from '@/store/modules/app';
  import { useI18n } from '@/hooks/web/useI18n';

  export default defineComponent({
    name: 'role',
    setup() {
      const form = reactive<RoleFormType>({
        roleName: '',
        roleCode: '',
        useStatus: '0',
      });
      const { t } = useI18n();
      let pageData = initPageData();
      const list = ref<RoleListItem[]>([]);
      const tableLoading = ref(false);
      const searchFormRef = ref();
      const curRow = ref({}) as Ref<RoleListItem>;
      const dialogInfo = reactive<DialogType<OperateRoleRequestParams>>({
        title: '新增角色',
        visible: false,
        loading: false,
        operate: 'add',
        form: {
          roleCode: '',
          roleName: '',
          roleRemark: '',
        },
      });
      const dialogFormRef = ref();
      const { createMessage, createConfirm } = useMessage();
      const appStore = useAppStore();
      const roleFormRules = {
        roleCode: [{ required: true, message: '账号名不能为空', trigger: 'blur' }],
        roleName: [{ required: true, message: '角色名称不能为空', trigger: 'blur' }],
        roleRemark: [{ required: true, message: '角色备注不能为空', trigger: 'blur' }],
      };

      // page change
      async function onPageChange(params: PaginationParams) {
        pageData.pageNum = params.pageNum;
        pageData.pageSize = params.pageSize;
        await loadList();
      }

      async function search() {
        pageData.pageNum = 1;
        await loadList();
      }

      function operateRole(type: OperateType, row?: RoleListItem) {
        switch (type) {
          case 'add':
            dialogInfo.visible = true;
            dialogInfo.operate = type;
            dialogInfo.title = '新增角色';
            break;
          case 'edit':
            dialogInfo.loading = true;
            dialogInfo.visible = true;
            dialogInfo.operate = type;
            dialogInfo.title = '编辑角色';
            curRow.value = cloneDeep(row!);
            break;
          case 'stop':
          case 'open':
            curRow.value = cloneDeep(row!);
            type === 'open' ? (curRow.value.useStatus = '0') : (curRow.value.useStatus = '1');
            const title = type === 'open' ? '启用' : '停用';
            const message = `确定要${title}角色名为${curRow.value.roleName}的角色吗？`;
            createConfirm({
              title,
              message,
              beforeClose: async (action, instance, done) => {
                if (action === 'confirm') {
                  instance.confirmButtonLoading = true;
                  try {
                    const params = {
                      roleName: curRow.value.roleName,
                      roleCode: curRow.value.roleCode,
                      useStatus: curRow.value.useStatus,
                      roleRemark: curRow.value.roleRemark,
                    };
                    await setRoleStatus(params);
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

      async function switchStatus() {
        await loadList();
      }

      function onOpened() {
        if (dialogInfo.operate === 'edit') {
          dialogInfo.form = {
            roleCode: unref(curRow).roleCode,
            roleName: unref(curRow).roleName,
            roleRemark: unref(curRow).roleRemark,
          };
          dialogInfo.loading = false;
        }
      }

      function onClose() {
        formResetFields(dialogFormRef);
        dialogInfo.visible = false;
      }

      async function onSubmit({ setSubmitLoading }) {
        await formValidate(dialogFormRef);
        setSubmitLoading(true);
        try {
          if (dialogInfo.operate === 'add') {
            await addRole(dialogInfo.form);
            createMessage({ message: '角色添加成功' });
          } else if (dialogInfo.operate === 'edit') {
            await editRole(dialogInfo.form);
            createMessage({ message: '角色编辑成功' });
          }
          dialogInfo.visible = false;
          await loadList();
        } catch (e) {
          console.error(e);
        } finally {
          setSubmitLoading(false);
        }
      }

      async function reset() {
        formResetFields(searchFormRef);
        pageData.pageSize = DEFAULT_PAGE_SIZE;
        pageData.pageNum = 1;
        await loadList();
      }

      async function loadList() {
        tableLoading.value = true;
        try {
          const params = {
            pageSize: pageData.pageSize,
            pageNum: pageData.pageNum,
            ...form,
          };
          const res = await getRoleList(params);
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

      onMounted(async () => {
        const getList = loadList();
        appStore.setPageMountedLoading([getList]);
      });

      return {
        searchFormRef,
        form,
        pageData,
        list,
        Edit,
        Delete,
        tableLoading,
        dialogInfo,
        dialogFormRef,
        roleFormRules,

        onPageChange,
        t,
        switchStatus,
        onSubmit,
        operateRole,
        search,
        reset,
        onOpened,
        onClose,
      };
    },
  });
</script>

<style scoped></style>
