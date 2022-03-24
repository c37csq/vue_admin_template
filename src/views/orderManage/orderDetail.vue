<template>
  <PageWrapper :title="`订单 ${orderNumber}`">
    <div class="orderDetail">
      <el-tabs v-model="activeTab" type="card" @tab-click="handleTabClick">
        <el-tab-pane class="orderMaster" label="订单主档" name="orderMaster">
          <el-form
            :disabled="form.lockStatus === 1"
            ref="orderMasterForm"
            :model="form"
            label-width="120px"
          >
            <el-row>
              <el-col :span="5">
                <el-form-item label="订单ID">
                  <el-input v-model="form.orderId" disabled />
                </el-form-item>
                <el-form-item label="订单单号">
                  <el-input v-model="form.orderNumber" disabled />
                </el-form-item>
                <el-form-item label="业务编号">
                  <el-select v-model="form.businessCode" clearable placeholder="请选择费用类别编号">
                    <el-option
                      v-for="item in businessList"
                      :label="item.businessName"
                      :value="item.businessCode"
                      :key="item.businessId"
                    />
                  </el-select>
                </el-form-item>
                <el-form-item label="客户编号">
                  <el-select
                    v-model="form.clientCode"
                    clearable
                    filterable
                    remote
                    reserve-keyword
                    :remote-method="searchClient"
                    placeholder="请选择客户编号"
                    @change="changeClient"
                  >
                    <el-option
                      v-for="item in customerList"
                      :label="item.clientName"
                      :value="item.clientCode"
                      :key="item.clientCode"
                    />
                  </el-select>
                </el-form-item>
                <el-form-item label="客服名称">
                  <el-select
                    v-model="form.userId"
                    clearable
                    filterable
                    remote
                    placeholder="请选择"
                    :remote-method="searchServiceList"
                  >
                    <el-option
                      v-for="item in serviceList"
                      :label="item.userName"
                      :value="item.userId"
                      :key="item.userId"
                    />
                  </el-select>
                </el-form-item>
                <el-form-item label="次客服名称">
                  <el-select
                    v-model="form.nextUserId"
                    clearable
                    filterable
                    remote
                    placeholder="请选择"
                    :remote-method="searchSecondServiceList"
                  >
                    <el-option
                      v-for="item in secondServiceList"
                      :label="item.userName"
                      :value="item.userId"
                      :key="item.userId"
                    />
                  </el-select>
                </el-form-item>
                <el-form-item label="销售人员名称">
                  <el-select
                    v-model="form.sellUserId"
                    clearable
                    filterable
                    remote
                    placeholder="请选择"
                    :remote-method="searchSaleManList"
                  >
                    <el-option
                      v-for="item in salesmanList"
                      :label="item.userName"
                      :value="item.userId"
                      :key="item.userId"
                    />
                  </el-select>
                </el-form-item>
                <el-form-item label="查验状态" v-if="form.checkStatus === 1">
                  <el-input value="查验完成" disabled />
                </el-form-item>
                <el-form-item label="查验状态" v-if="form.checkStatus !== 1">
                  <el-select v-model="form.checkStatus" clearable placeholder="请选择查验状态">
                    <el-option
                      v-for="item in inspectionList"
                      :label="item.label"
                      :value="item.value"
                      :key="item.key"
                    />
                  </el-select>
                </el-form-item>
                <el-form-item>
                  <Button size="large" type="primary" name="保存" />
                </el-form-item>
              </el-col>
              <el-col :span="5">
                <el-form-item label="订单类型">
                  <el-input v-if="form.orderType === 1" model-value="跨境" disabled />
                  <el-input v-if="form.orderType === 2" model-value="传统出口" disabled />
                  <el-input v-if="form.orderType === 3" model-value="海外业务" disabled />
                  <el-input v-if="form.orderType === 4" model-value="进口" disabled />
                </el-form-item>
                <el-form-item label="订单状态">
                  <el-input v-if="form.orderStatus === 0" model-value="已废弃" disabled />
                  <el-input v-if="form.orderStatus === 1" model-value="已结案" disabled />
                  <el-input v-if="form.orderStatus === 2" model-value="已开航" disabled />
                  <el-input v-if="form.orderStatus === 3" model-value="已到港" disabled />
                  <el-input v-if="form.orderStatus === 4" model-value="已清关" disabled />
                  <el-input v-if="form.orderStatus === 5" model-value="已到目的地" disabled />
                  <el-input v-if="form.orderStatus === 6" model-value="产品部信息确认中" disabled />
                  <el-input v-if="form.orderStatus === 7" model-value="产品部信息已确认" disabled />
                  <el-input v-if="form.orderStatus === 9" model-value="新建" disabled />
                </el-form-item>
                <el-form-item label="计费状态">
                  <el-input v-if="form.billingStatus === 1" model-value="全部计费" disabled />
                  <el-input v-if="form.billingStatus === 2" model-value="部分计费" disabled />
                  <el-input v-if="form.billingStatus === 3" model-value="计费中" disabled />
                  <el-input v-if="form.billingStatus === 9" model-value="未计费" disabled />
                </el-form-item>
                <el-form-item label="总费用">
                  <el-input v-model="form.costSum" disabled />
                </el-form-item>
              </el-col>
              <el-col :span="5">
                <el-form-item label="预计开航日">
                  <el-date-picker
                    type="date"
                    placeholder="选择日期"
                    v-model="form.expectSailingDate"
                    :disabled="
                      form.orderStatus !== 0 &&
                      form.orderStatus !== 6 &&
                      form.orderStatus !== 7 &&
                      form.orderStatus !== 9
                    "
                  />
                </el-form-item>
                <el-form-item label="预计送达日">
                  <el-date-picker
                    type="date"
                    placeholder="选择日期"
                    v-model="form.expectDeliveryDate"
                  />
                </el-form-item>
                <el-form-item label="实际开航日">
                  <el-date-picker
                    type="date"
                    placeholder="选择日期"
                    v-model="form.practicalSailingDate"
                    :disabled="
                      !(
                        form.orderStatus !== 0 &&
                        form.orderStatus !== 6 &&
                        form.orderStatus !== 7 &&
                        form.orderStatus !== 9
                      )
                    "
                  />
                </el-form-item>
                <el-form-item label="到港日">
                  <el-date-picker
                    type="date"
                    placeholder="选择日期"
                    v-model="form.arrivalDate"
                    disabled
                  />
                </el-form-item>
                <el-form-item label="清关日">
                  <el-date-picker
                    type="date"
                    placeholder="选择日期"
                    v-model="form.clearingCustomsDate"
                    disabled
                  />
                </el-form-item>
                <el-form-item label="送达日">
                  <el-date-picker
                    type="date"
                    placeholder="选择日期"
                    v-model="form.deliveryDate"
                    disabled
                  />
                </el-form-item>
                <el-form-item label="查验日">
                  <el-date-picker
                    type="date"
                    placeholder="选择日期"
                    v-model="form.checkDate"
                    disabled
                  />
                </el-form-item>
              </el-col>
              <el-col :span="5">
                <el-form-item label="创建时间">
                  <el-date-picker
                    type="date"
                    disabled
                    placeholder="选择日期"
                    v-model="form.createTime"
                  />
                </el-form-item>
                <el-form-item label="更新时间">
                  <el-date-picker
                    type="date"
                    disabled
                    placeholder="选择日期"
                    v-model="form.updateTime"
                  />
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="订单主档" name="orderDetail" />
        <el-tab-pane label="箱型箱量" name="boxInfo" />
        <el-tab-pane label="费用" name="feeInfo" />
        <el-tab-pane label="资料上传" name="dataUpload" />
        <el-tab-pane label="文件导出" name="fileExport" />
        <el-tab-pane label="日志" name="logInfo" />
      </el-tabs>
    </div>
  </PageWrapper>
</template>

<script lang="ts">
  import { defineComponent, onMounted, ref, unref } from 'vue';
  import { useRouter } from 'vue-router';
  import {
    getBusinessList,
    getCustomerList,
    getDeptList,
    getSaleManList,
  } from '@/API/common/select';
  import {
    BusinessListItem,
    CustomerListItem,
    DeptListItem,
    RequestClientListParams,
    RequestDeptListParams,
    RequestSaleManListParams,
    SaleManListItem,
  } from '@/API/common/model/selectModel';
  import { useAppStore } from '@/store/modules/app';
  import {
    OrderCabinetInfoListItem,
    OrderCabinetInfoPreplanListItem,
    OrderDetailFormType,
    OrderrAccessoryInfoListItem,
    RequestOrderDetailParams,
  } from '@/API/orderManage/model/orderDetailModel';
  import { DeptEnum, RoleEnum } from '@/enums/pageEnum';
  import { getOrderDetail } from '@/API/orderManage/orderDetail';
  import { getUserInfo } from '@/utils/auth';

  export default defineComponent({
    name: 'orderDetail',
    setup() {
      const activeTab = ref('orderMaster');
      const { currentRoute } = useRouter();
      const { params } = unref(currentRoute);
      const businessList = ref<BusinessListItem[]>([]);
      const customerList = ref<CustomerListItem[]>([]);
      const secondServiceList = ref<DeptListItem[]>([]);
      const serviceList = ref<DeptListItem[]>([]);
      const salesmanList = ref<SaleManListItem[]>([]);
      const inspectionList = ref([
        { label: '不查验', value: '0', key: '0' },
        { label: '查验中', value: '2', key: '2' },
      ]);
      const userInfo = getUserInfo();
      const orderrAccessoryInfoList = ref<OrderrAccessoryInfoListItem[]>([]);
      const orderCabinetInfoList = ref<OrderCabinetInfoListItem[]>([]);
      const orderCabinetInfoPreplanList = ref<OrderCabinetInfoPreplanListItem[]>([]);

      const appStore = useAppStore();
      const orderNumber = params.id as string;
      let form = ref<OrderDetailFormType>({
        orderId: '',
        orderNumber: '',
        businessCode: '',
        clientCode: '',
        userId: '',
        userName: '',
        nextUserId: '',
        nextUserName: '',
        sellUserId: '',
        sellUserName: '',
        checkStatus: '',
        orderStatus: '',
        orderType: '',
        billingStatus: '',
        costSum: '',
        expectSailingDate: '',
        expectDeliveryDate: '',
        practicalSailingDate: '',
        arrivalDate: '',
        clearingCustomsDate: '',
        deliveryDate: '',
        checkDate: '',
        createTime: '',
        updateTime: '',
        lockStatus: '',
        customerServiceCode: '',
        businessGroupCode: '',
        orderrAccessoryInfoList: [],
        orderCabinetInfoList: [],
        orderCabinetInfoPreplanList: [],
        closingState: '',
      });

      function handleTabClick() {}

      async function loadOrderDetail(params: RequestOrderDetailParams) {
        try {
          form.value = await getOrderDetail(params);
          form.value.customerServiceCode = '';
          form.value.businessGroupCode = '';
          form.value.checkStatus = form.value.checkStatus + '';
          if (form.value.orderrAccessoryInfoList) {
            form.value.orderrAccessoryInfoList.forEach((item) => {
              item.loading = false;
            });
          }
          orderrAccessoryInfoList.value = form.value.orderrAccessoryInfoList;
          if (form.value.orderCabinetInfoList) {
            orderCabinetInfoList.value = form.value.orderCabinetInfoList;
          } else {
            orderCabinetInfoList.value = [];
          }
          if (form.value.orderCabinetInfoPreplanList) {
            orderCabinetInfoPreplanList.value = form.value.orderCabinetInfoPreplanList;
            unref(orderCabinetInfoPreplanList).forEach((item) => {
              item.show = false;
            });
          } else {
            orderCabinetInfoPreplanList.value = [];
          }
          if (userInfo.roleCode === RoleEnum.SELL) {
            form.value.closingState = 1;
          }
        } catch (err) {
          form.value = {} as OrderDetailFormType;
        }
      }

      async function loadBusinessList() {
        try {
          businessList.value = await getBusinessList();
        } catch (err) {
          businessList.value = [];
        }
      }

      async function loadSaleManList(params: RequestSaleManListParams) {
        try {
          salesmanList.value = await getSaleManList(params);
        } catch (err) {
          salesmanList.value = [];
        }
      }

      async function loadDeptList(params: RequestDeptListParams, type?: 'first' | 'second') {
        try {
          const res = await getDeptList(params);
          if (type) {
            if (type === 'first') {
              serviceList.value = res;
            } else {
              secondServiceList.value = res;
            }
          } else {
            secondServiceList.value = res;
            serviceList.value = res;
          }
        } catch (err) {
          if (type) {
            if (type === 'first') {
              serviceList.value = [];
            } else {
              secondServiceList.value = [];
            }
          } else {
            secondServiceList.value = [];
            serviceList.value = [];
          }
        }
      }

      async function loadCustomerList(
        params: RequestClientListParams,
        type: 'ship' | 'booking' | 'client',
      ) {
        try {
          const res = await getCustomerList(params);
          switch (type) {
            case 'client':
              customerList.value = res.list;
              break;
          }
        } catch (err) {
          switch (type) {
            case 'client':
              customerList.value = [];
              break;
          }
        }
      }

      function searchClient(val: string) {
        loadCustomerList(
          {
            type: '',
            clientName: val,
          },
          'client',
        );
      }

      function searchSaleManList(val: string) {
        loadSaleManList({
          businessGroupCode: DeptEnum.SELL_DEPT,
          userName: val,
        });
      }

      function searchServiceList(val) {
        loadDeptList(
          {
            businessGroupCode: DeptEnum.SERVICE_DEPT,
            roleName: val,
          },
          'first',
        );
      }

      function searchSecondServiceList(val) {
        loadDeptList(
          {
            businessGroupCode: DeptEnum.SERVICE_DEPT,
            roleName: val,
          },
          'second',
        );
      }

      function changeClient(val: string) {
        customerList.value.forEach((item) => {
          if (item.clientCode === val) {
            form.value.userId = item.userId || '';
            form.value.userName = item.userName || '';
            form.value.nextUserId = item.nextUserId || '';
            form.value.nextUserName = item.nextUserName || '';
            form.value.sellUserId = item.sellUserId || '';
            form.value.sellUserName = item.sellUserName || '';
          }
        });
      }

      onMounted(async () => {
        const getBusinessList = loadBusinessList();
        const getOrderDetail = loadOrderDetail({ orderNumber });
        const getCustomerList = loadCustomerList(
          {
            type: '',
            clientName: '',
          },
          'client',
        );
        const getDeptList = loadDeptList({
          businessGroupCode: DeptEnum.SERVICE_DEPT,
          roleName: '',
        });
        const getSaleManList = loadSaleManList({
          businessGroupCode: DeptEnum.SELL_DEPT,
          userName: '',
        });

        // after request set loading
        appStore.setPageMountedLoading([
          getBusinessList,
          getCustomerList,
          getDeptList,
          getSaleManList,
          getOrderDetail,
        ]);
      });

      return {
        activeTab,
        form,
        businessList,
        customerList,
        serviceList,
        secondServiceList,
        salesmanList,
        inspectionList,
        orderNumber,

        handleTabClick,
        searchSecondServiceList,
        searchServiceList,
        searchSaleManList,
        searchClient,
        changeClient,
      };
    },
  });
</script>

<style scoped>
  .orderDetail .orderMaster .el-form-item {
    margin-bottom: 30px;
  }
</style>
