<template>
  <PageWrapper
    title='订单列表'>
    <div class="orderForm">
      <el-form ref="searchFormRef" :model="form" label-width="100px" inline>
        <el-form-item label="业务编号" prop="businessCodes">
          <el-select
            class="w-230px"
            @change="businessChange"
            v-model="form.businessCodes"
            clearable
            multiple
            filterable
            collapse-tags
            placeholder="请选择业务编码"
          >
            <el-option :label="SelectEnum.LABEL" :value="SelectEnum.VALUE" :key="SelectEnum.KEY" />
            <el-option
              v-for="item in businessList"
              :label="item.businessName"
              :value="item.businessCode"
              :key="item.businessId"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="客服名称" prop="userName" v-if="showUserName">
          <el-select
            v-model="form.userName"
            clearable
            filterable
            remote
            reserve-keyword
            @focus="searchDept(form.userName)"
            :remote-method="searchDept"
            placeholder="请选择客服名称"
          >
            <el-option
              v-for="item in deptList"
              :label="item.userName"
              :value="item.userName"
              :key="item.userId"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="客服名称" prop="userName" v-if="!showUserName">
          <el-select
            v-model="form.userName"
            clearable
            filterable
            remote
            reserve-keyword
            @focus="searchDept(form.userName)"
            :remote-method="searchDept"
            placeholder="请选择客服名称"
          >
            <el-option
              v-for="item in deptList"
              :label="item.userName"
              :value="item.userName"
              :key="item.userId"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="查验状态" prop="checkStatus">
          <el-select v-model="form.checkStatus" clearable placeholder="请选择查验状态">
            <el-option
              v-for="item in inspectionList"
              :label="item.label"
              :value="item.value"
              :key="item.key"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="进仓编号" prop="inboundNumber">
          <el-input v-model="form.inboundNumber" placeholder="请输入进仓编号" clearable />
        </el-form-item>
        <el-form-item label="实际开航日" prop="practicalSailingStartTime">
          <el-date-picker
            type="date"
            placeholder="开始日期"
            v-model="form.practicalSailingStartTime"
          />
        </el-form-item>
        <el-form-item prop="practicalSailingOverTime" class="ml-30px">
          <el-date-picker
            type="date"
            placeholder="结束日期"
            v-model="form.practicalSailingOverTime"
          />
        </el-form-item>
        <el-form-item label="订单单号" prop="orderNumber">
          <el-input v-model="form.orderNumber" placeholder="请输入订单单号" clearable />
        </el-form-item>
        <el-form-item label="次客服名" prop="nextUserName">
          <el-select
            v-model="form.nextUserName"
            clearable
            filterable
            remote
            reserve-keyword
            @focus="searchDept(form.nextUserName)"
            :remote-method="searchDept"
            placeholder="请选择客服名称"
          >
            <el-option
              v-for="item in deptList"
              :label="item.userName"
              :value="item.userName"
              :key="item.userId"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="提单号" prop="masterBillLading">
          <el-input v-model="form.masterBillLading" placeholder="支持模糊查询" clearable />
        </el-form-item>
        <el-form-item label="箱号" prop="container">
          <el-input v-model="form.container" placeholder="支持模糊查询" clearable />
        </el-form-item>
        <el-form-item label="船名代码" prop="shipsCode">
          <el-input v-model="form.shipsCode" placeholder="支持模糊查询" clearable />
        </el-form-item>
        <el-form-item label="航次" prop="voyage">
          <el-input v-model="form.voyage" placeholder="支持模糊查询" clearable />
        </el-form-item>
        <el-form-item label="客户名称" prop="clientName">
          <el-select
            v-model="form.clientName"
            clearable
            filterable
            remote
            reserve-keyword
            @focus="searchClient(form.clientName)"
            :remote-method="searchClient"
            placeholder="请选择客户编号"
          >
            <el-option
              v-for="item in customerList"
              :label="item.clientName"
              :value="item.clientCode"
              :key="item.clientCode"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="销售名称" prop="sellUserName" v-if="showSellUserName">
          <el-select
            v-model="form.sellUserName"
            clearable
            filterable
            remote
            reserve-keyword
            @focus="searchSellUser(form.sellUserName)"
            :remote-method="searchSellUser"
            placeholder="请选择销售名称"
          >
            <el-option
              v-for="item in saleList"
              :label="item.label"
              :value="item.name"
              :key="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="销售名称" prop="sellUserName" v-if="!showSellUserName">
          <el-select
            v-model="form.sellUserName"
            :disabled="isDisable"
            clearable
            filterable
            remote
            reserve-keyword
            @focus="searchSellUser(form.sellUserName)"
            :remote-method="searchSellUser"
            placeholder="请选择销售名称"
          >
            <el-option
              v-for="item in saleList"
              :label="item.label"
              :value="item.name"
              :key="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="部门" prop="businessGroupCode">
          <el-select
            v-model="form.businessGroupCode"
            clearable
            reserve-keyword
            :disabled="isDisableDept"
            placeholder="请选择部门"
          >
            <el-option
              v-for="item in sectorList"
              :label="item.businessGroupName"
              :value="item.businessGroupCode"
              :key="item.businessGroupCode"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="箱型" prop="cabinetTypeCode">
          <el-select v-model="form.cabinetTypeCode" clearable filterable placeholder="请选择柜型">
            <el-option
              v-for="item in cabinetTypeList"
              :label="item.cabinetTypeName"
              :value="item.cabinetTypeCode"
              :key="item.cabinetTypeCode"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="订单类型" prop="orderType">
          <el-select v-model="form.orderType" clearable placeholder="请选择订单类型">
            <el-option
              v-for="item in orderTypeList"
              :label="item.businessTypeName"
              :value="item.businessTypeId"
              :key="item.businessTypeId"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="付款方式" prop="payment">
          <el-select v-model="form.payment" clearable filterable placeholder="请选择付款方式">
            <el-option
              v-for="item in paymentList"
              :label="item.paymentName"
              :value="item.paymentCode"
              :key="item.packagingCode"
            />
          </el-select>
        </el-form-item>
        <el-collapse>
          <el-collapse-item title="显示更多筛选条件">
            <el-form-item label="费用计费状态" prop="costBillingStatus">
              <el-select v-model="form.costBillingStatus" clearable placeholder="请选择计费状态">
                <el-option
                  v-for="item in costBillingStatusList"
                  :label="item.label"
                  :value="item.value"
                  :key="item.key"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="预计开航日" prop="expectSailingStartTime">
              <el-date-picker
                type="date"
                placeholder="开始日期"
                v-model="form.expectSailingStartTime"
              />
            </el-form-item>
            <el-form-item prop="expectSailingOverTime" class="ml-30px">
              <el-date-picker
                type="date"
                placeholder="结束日期"
                v-model="form.expectSailingOverTime"
              />
            </el-form-item>
            <el-form-item label="建单时间" prop="createStartTime">
              <el-date-picker type="date" placeholder="开始日期" v-model="form.createStartTime" />
            </el-form-item>
            <el-form-item prop="createOverTime" class="ml-30px">
              <el-date-picker type="date" placeholder="结束日期" v-model="form.createOverTime" />
            </el-form-item>
            <el-form-item label="到港日" prop="arrivalStartTime">
              <el-date-picker type="date" placeholder="开始日期" v-model="form.arrivalStartTime" />
            </el-form-item>
            <el-form-item prop="arrivalOverTime" class="ml-30px">
              <el-date-picker type="date" placeholder="结束日期" v-model="form.arrivalOverTime" />
            </el-form-item>
            <el-form-item label="清关日" prop="clearingCustomsStartTime">
              <el-date-picker
                type="date"
                placeholder="开始日期"
                v-model="form.clearingCustomsStartTime"
              />
            </el-form-item>
            <el-form-item prop="clearingCustomsOverTime" class="ml-30px">
              <el-date-picker
                type="date"
                placeholder="结束日期"
                v-model="form.clearingCustomsOverTime"
              />
            </el-form-item>
            <el-form-item label="送达日" prop="deliveryStartTime">
              <el-date-picker type="date" placeholder="开始日期" v-model="form.deliveryStartTime" />
            </el-form-item>
            <el-form-item prop="deliveryOverTime" class="ml-30px">
              <el-date-picker type="date" placeholder="结束日期" v-model="form.deliveryOverTime" />
            </el-form-item>
            <el-form-item label="发货人" prop="consigner">
              <el-input v-model="form.consigner" placeholder="支持模糊查询" clearable />
            </el-form-item>
            <el-form-item label="收货人" prop="consignee">
              <el-input v-model="form.consignee" placeholder="支持模糊查询" clearable />
            </el-form-item>
            <el-form-item label="通知人" prop="notifier">
              <el-input v-model="form.notifier" placeholder="支持模糊查询" clearable />
            </el-form-item>
            <el-form-item label="中转港" prop="transferLoading">
              <el-select
                v-model="form.transferLoading"
                clearable
                filterable
                remote
                reserve-keyword
                :remote-method="searchTransferPortList"
                placeholder="请选择中转港"
              >
                <el-option
                  v-for="item in transferPortList"
                  :label="item.portEnglishName + ' & ' + item.oceanPortCode"
                  :value="item.oceanPortCode"
                  :key="item.oceanPortCode"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="目的港" prop="destination">
              <el-select
                v-model="form.destination"
                clearable
                filterable
                remote
                :remote-method="searchDestinationPortList"
                reserve-keyword
                placeholder="请选择目的地"
              >
                <el-option
                  v-for="item in destinationPortList"
                  :label="item.portEnglishName + ' & ' + item.oceanPortCode"
                  :value="item.portEnglishName"
                  :key="item.oceanPortCode"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="船公司" prop="shipCompany">
              <el-select
                v-model="form.shipCompany"
                remote
                filterable
                clearable
                :remote-method="searchShipCompanyList"
                placeholder="请选择船公司"
              >
                <el-option
                  v-for="item in shipList"
                  :label="item.clientName"
                  :value="item.clientCode"
                  :key="item.clientCode"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="订舱代理" prop="bookingCabinAgency">
              <el-select
                v-model="form.bookingCabinAgency"
                remote
                clearable
                filterable
                :remote-method="searchBookingAgentList"
                placeholder="请选择订舱代理"
              >
                <el-option
                  v-for="item in bookingAgentList"
                  :label="item.clientName"
                  :value="item.clientCode"
                  :key="item.clientCode"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="运输条款" prop="transitClauseCode">
              <el-select v-model="form.transitClauseCode" clearable placeholder="请选择订运输条款">
                <el-option
                  v-for="item in transportClauseList"
                  :label="item.transitClauseCode"
                  :value="item.transitClauseCode"
                  :key="item.transitClauseCode"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="航线代码" prop="oceanLaneCode">
              <el-select v-model="form.oceanLaneCode" clearable placeholder="请选择航线代码">
                <el-option
                  v-for="item in shippingRoutesList"
                  :label="item.laneChineseName"
                  :value="item.oceanLaneCode"
                  :key="item.oceanLaneCode"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="订单核销状态" prop="orderMaster">
              <el-select v-model="form.orderMaster" clearable placeholder="请选择状态">
                <el-option
                  v-for="item in orderMasterList"
                  :label="item.orderMasterName"
                  :value="item.id"
                  :key="item.id"
                />
              </el-select>
            </el-form-item>
          </el-collapse-item>
        </el-collapse>
      </el-form>
    </div>
    <div class="mt-15px">
      <Button @click="addOrder" status="success" :name="t('button.addText')" />
      <Button @click="search" status="primary" :name="t('button.searchText')" />
      <Button @click="reset" :name="t('button.resetText')" />
      <span class="order_text">{{ orderStatisticInfo.orderCabinet }}</span>
    </div>
    <div class="mt-25px">
      <el-radio-group v-model="orderStatus" @change="orderStatusChange">
        <el-radio-button label="totalNumber"
          >全部({{ orderStatisticInfo.totalNumber }})</el-radio-button
        >
        <el-radio-button label="newNumber"
          >新建({{ orderStatisticInfo.newNumber }})</el-radio-button
        >
        <el-radio-button label="productInNumber"
          >产品部信息确认中条数({{ orderStatisticInfo.productInNumber }})</el-radio-button
        >
        <el-radio-button label="productNumber"
          >产品部信息已确认条数({{ orderStatisticInfo.productNumber }})</el-radio-button
        >
        <el-radio-button label="abandonNumber"
          >已废弃({{ orderStatisticInfo.abandonNumber }})</el-radio-button
        >
        <el-radio-button label="settleNumber"
          >已结案条数({{ orderStatisticInfo.settleNumber }})</el-radio-button
        >
        <el-radio-button label="sailNumber"
          >已开航条数({{ orderStatisticInfo.sailNumber }})</el-radio-button
        >
        <el-radio-button label="arrivePortNumber"
          >已到港条数({{ orderStatisticInfo.arrivePortNumber }})</el-radio-button
        >
        <el-radio-button label="clearanceNumber"
          >已清关条数({{ orderStatisticInfo.clearanceNumber }})</el-radio-button
        >
        <el-radio-button label="arriveCostNoNumber"
          >已送达计费未完成({{ orderStatisticInfo.arriveCostNoNumber }})
        </el-radio-button>
      </el-radio-group>
    </div>
    <div class="mt-20px">
      <el-table :data="orderList" v-loading="tableLoading" border stripe highlight-current-row>
        <el-table-column type="expand">
          <template #default="scope">
            <div
              class="expand_item"
              v-for="(item, index) in scope.row.cabineStatusList"
              :key="index"
            >
              <div class="w-150px float-left">
                箱号：<span class="container_box">{{ item.containerNo }}</span>
              </div>
              <div class="box_step float-left w-3/5">
                <el-steps :active="item.steps.active">
                  <el-step
                    style="color: #00b094"
                    v-for="(col, colIndex) in item.steps.list"
                    :key="colIndex"
                    :title="col.title"
                    :description="col.time"
                    :icon="col.icon === '1' ? 'el-icon-success' : 'el-icon-error'"
                  />
                </el-steps>
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="orderNumber" label="订单单号" width="150">
          <template #default="scope">
            <span @click="goOrderDetail(scope.row.orderNumber)" class="orderNumber_text">{{
              scope.row.orderNumber
            }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="pseudoClientCode"
          label="客户编号"
          show-overflow-tooltip
          width="145"
        />
        <el-table-column prop="masterBillLading" label="提单号" show-overflow-tooltip width="150" />
        <el-table-column prop="expectSailingDate" label="预计开航日" sortable width="120" />
        <el-table-column prop="practicalSailingDate" label="实际开航日" sortable width="120" />
        <el-table-column prop="shipsCode" label="船名代码" show-overflow-tooltip width="100" />
        <el-table-column prop="voyage" show-overflow-tooltip label="航次" width="100" />
        <el-table-column prop="destination" show-overflow-tooltip label="目的港" width="150" />
        <el-table-column prop="sellUserName" label="销售" width="100" />
        <el-table-column prop="userName" label="客服" width="100" />
        <el-table-column prop="customsNumber" label="报关数量" width="100" />
        <el-table-column prop="orderCabinet" label="箱型箱量" show-overflow-tooltip width="125" />
        <el-table-column prop="orderType" label="订单类型" show-overflow-tooltip width="100">
          <template #default="scope">
            <p v-if="scope.row.orderType == 1">跨境</p>
            <p v-if="scope.row.orderType == 2">传统出口</p>
            <p v-if="scope.row.orderType == 3">海外业务</p>
            <p v-if="scope.row.orderType == 4">进口</p>
          </template>
        </el-table-column>
        <el-table-column prop="orderStatus" label="订单状态" show-overflow-tooltip width="120">
          <template #default="scope">
            <p v-if="scope.row.orderStatus == 0">已废弃</p>
            <p v-if="scope.row.orderStatus == 1">已结案</p>
            <p v-if="scope.row.orderStatus == 2">已开航</p>
            <p v-if="scope.row.orderStatus == 3">已到港</p>
            <p v-if="scope.row.orderStatus == 4">已清关</p>
            <p v-if="scope.row.orderStatus == 5">已到达目的地未收费</p>
            <p v-if="scope.row.orderStatus == 9">新建</p>
          </template>
        </el-table-column>
        <el-table-column prop="createTime" label="创建时间" show-overflow-tooltip width="120" />
        <el-table-column prop="updateTime" label="更新时间" show-overflow-tooltip width="120" />
        <el-table-column
          label="操作"
          align="center"
          header-align="center"
          width="110"
          fixed="right"
        >
          <template #default="scope">
            <el-dropdown @command="operateCommand">
              <el-button type="primary">
                菜单
                <el-icon class="el-icon--right">
                  <arrow-down />
                </el-icon>
              </el-button>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item :command="{ type: 'look', index: scope.$index, row: scope.row }"
                    >查看
                  </el-dropdown-item>
                  <el-dropdown-item :command="{ type: 'edit', index: scope.$index, row: scope.row }"
                    >编辑
                  </el-dropdown-item>
                  <el-dropdown-item
                    :command="{ type: 'delete', index: scope.$index, row: scope.row }"
                    >废弃
                  </el-dropdown-item>
                  <el-dropdown-item
                    :command="{ type: 'resume', index: scope.$index, row: scope.row }"
                    >恢复
                  </el-dropdown-item>
                  <el-dropdown-item :command="{ type: 'copy', index: scope.$index, row: scope.row }"
                    >复制
                  </el-dropdown-item>
                  <el-dropdown-item
                    :command="{ type: 'look_log', index: scope.$index, row: scope.row }"
                    >日志查看
                  </el-dropdown-item>
                  <el-dropdown-item
                    :command="{ type: 'update', index: scope.$index, row: scope.row }"
                    >报关数修改
                  </el-dropdown-item>
                  <el-dropdown-item
                    :command="{ type: 'refresh', index: scope.$index, row: scope.row }"
                    >刷新
                  </el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
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
  </PageWrapper>
</template>

<script lang="ts">
  import { defineComponent, onMounted, reactive, Ref, ref } from 'vue';
  import { useAppStore } from '@/store/modules/app';
  import { ArrowDown } from '@element-plus/icons-vue';
  import {
    getBusinessList,
    getCabinetTypeList,
    getCustomerList,
    getDeptList,
    getOrderTypeList,
    getPaymentList,
    getSaleList,
    getSectorList,
    inspectionList,
    orderMasterList,
    costBillingStatusList,
    getShippingPortList,
    getAddressList,
    getTransportClauseList,
    getShippingRoutesList,
  } from '@/API/common/select';
  import {
    AddressListItem,
    BusinessListItem,
    CabinetTypeListItem,
    CustomerListItem,
    DeptListItem,
    OrderTypeListItem,
    PaymentListItem,
    RequestAddressListParams,
    RequestClientListParams,
    RequestDeptListParams,
    RequestSaleListParams,
    RequestShippingPortListParams,
    SaleListItem,
    SectorItem,
    ShippingPortListItem,
    ShippingRoutesListItem,
    TransportClauseListItem,
  } from '@/API/common/model/selectModel';
  import {
    OrderFormType,
    OrderListItem,
    OrderStatisticType,
    OrderStatusType,
  } from '@/API/orderManage/model/orderListModel';
  import { ApiEnum, DeptEnum, RoleEnum, SelectEnum } from '@/enums/pageEnum';
  import { getUserInfo } from '@/utils/auth';
  import { getOrderList, getOrderStatistic } from '@/API/orderManage/orderList';
  import { dateFormat, formResetFields } from '@/utils/tool';
  import { PaginationParams } from '@/components/Pagination/data';
  import { OperateCommandType } from '#/page-common';
  import { useGo } from '@/hooks/web/usePage';
  import { useI18n } from '@/hooks/web/useI18n';

  export default defineComponent({
    name: 'order',
    components: {
      ArrowDown,
    },
    setup() {
      const form = reactive<OrderFormType>({
        businessCodes: '',
        userId: '',
        sellUserId: '',
        userName: '',
        checkStatus: '',
        inboundNumber: '',
        practicalSailingStartTime: '',
        practicalSailingOverTime: '',
        orderNumber: '',
        nextUserName: '',
        masterBillLading: '',
        container: '',
        shipsCode: '',
        voyage: '',
        clientName: '',
        sellUserName: '',
        businessGroupCode: '',
        cabinetTypeCode: '',
        orderType: '',
        payment: '',
        costBillingStatus: '',
        expectSailingStartTime: '',
        expectSailingOverTime: '',
        createStartTime: '',
        createOverTime: '',
        arrivalOverTime: '',
        arrivalStartTime: '',
        clearingCustomsStartTime: '',
        clearingCustomsOverTime: '',
        deliveryStartTime: '',
        deliveryOverTime: '',
        consigner: '',
        consignee: '',
        notifier: '',
        transferLoading: '',
        destination: '',
        shipCompany: '',
        bookingCabinAgency: '',
        transitClauseCode: '',
        oceanLaneCode: '',
        orderMaster: '',
        roleState: '',
      });
      const isDisableDept = ref(false);
      const orderStatus = ref<OrderStatusType>('totalNumber');
      const businessList = ref<BusinessListItem[]>([]);
      const bookingAgentList = ref<AddressListItem[]>([]);
      const transferPortList = ref<ShippingPortListItem[]>([]);
      const destinationPortList = ref<ShippingPortListItem[]>([]);
      const deptList = ref<DeptListItem[]>([]);
      const customerList = ref<CustomerListItem[]>([]);
      const saleList = ref<SaleListItem[]>([]);
      const sectorList = ref<SectorItem[]>([]);
      const paymentList = ref<PaymentListItem[]>([]);
      const orderTypeList = ref<OrderTypeListItem[]>([]);
      const shipList = ref<AddressListItem[]>([]);
      const transportClauseList = ref<TransportClauseListItem[]>([]);
      const shippingRoutesList = ref<ShippingRoutesListItem[]>([]);
      const cabinetTypeList = ref<CabinetTypeListItem[]>([]);
      const orderStatisticInfo = ref({}) as Ref<OrderStatisticType>;
      const orderList = ref<OrderListItem[]>([]);
      const pageData = reactive({
        pageNum: 1,
        pageSize: 10,
        total: 0,
      });
      const searchFormRef = ref();
      const tableLoading = ref(false);
      const showSellUserName = ref(false);
      const showUserName = ref(true);
      const isDisable = ref(false);
      const go = useGo();
      const appStore = useAppStore();
      const userInfo = getUserInfo();
      const orderStatusMap = {
        totalNumber: '',
        newNumber: '9',
        abandonNumber: '0',
        settleNumber: '1',
        sailNumber: '2',
        arrivePortNumber: '3',
        clearanceNumber: '4',
        arriveCostNoNumber: '5',
        productInNumber: '6',
        productNumber: '7',
      };
      const { t } = useI18n();

      async function loadBusinessList() {
        try {
          businessList.value = await getBusinessList();
        } catch (err) {
          businessList.value = [];
        }
      }

      async function loadOrderTypeList() {
        try {
          orderTypeList.value = await getOrderTypeList();
        } catch (err) {
          orderTypeList.value = [];
        }
      }

      async function loadPaymentList() {
        try {
          paymentList.value = await getPaymentList();
        } catch (err) {
          paymentList.value = [];
        }
      }

      async function loadDeptList(params: RequestDeptListParams) {
        try {
          deptList.value = await getDeptList(params);
        } catch (err) {
          deptList.value = [];
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
            case 'ship':
              shipList.value = res.list;
              break;
            case 'booking':
              bookingAgentList.value = res.list;
              break;
          }
        } catch (err) {
          switch (type) {
            case 'client':
              customerList.value = [];
              break;
            case 'ship':
              shipList.value = [];
              break;
            case 'booking':
              bookingAgentList.value = [];
              break;
          }
        }
      }

      async function loadShippingPortList(
        params: RequestShippingPortListParams,
        type?: 'transfer' | 'destination',
      ) {
        try {
          const res = await getShippingPortList(params);
          if (type) {
            if (type === 'transfer') {
              transferPortList.value = res;
            } else if (type === 'destination') {
              destinationPortList.value = res;
            }
          } else {
            transferPortList.value = res;
            destinationPortList.value = res;
          }
        } catch (err) {
          if (type) {
            if (type === 'transfer') {
              transferPortList.value = [];
            } else if (type === 'destination') {
              destinationPortList.value = [];
            }
          } else {
            transferPortList.value = [];
            destinationPortList.value = [];
          }
        }
      }

      async function loadSaleList(params: RequestSaleListParams) {
        try {
          saleList.value = await getSaleList(params);
        } catch (err) {
          saleList.value = [];
        }
      }

      async function loadCabinetTypeList() {
        try {
          cabinetTypeList.value = await getCabinetTypeList();
        } catch (err) {
          cabinetTypeList.value = [];
        }
      }

      async function loadSectorList() {
        try {
          sectorList.value = await getSectorList();
        } catch (err) {
          sectorList.value = [];
        }
      }

      async function loadTransportClauseList() {
        try {
          transportClauseList.value = await getTransportClauseList();
        } catch (err) {
          transportClauseList.value = [];
        }
      }

      async function loadShippingRoutesList() {
        try {
          shippingRoutesList.value = await getShippingRoutesList();
        } catch (err) {
          shippingRoutesList.value = [];
        }
      }

      async function loadAddressList(params: RequestAddressListParams, type: 'ship' | 'booking') {
        try {
          const res = await getAddressList(params);
          switch (type) {
            case 'ship':
              shipList.value = res.list;
              break;
            case 'booking':
              bookingAgentList.value = res.list;
              break;
          }
        } catch (err) {
          switch (type) {
            case 'ship':
              shipList.value = [];
              break;
            case 'booking':
              bookingAgentList.value = [];
              break;
          }
        }
      }

      async function loadOrderStatistics() {
        try {
          const params = {
            ...form,
            createStartTime: dateFormat(form.createStartTime),
            createOverTime: dateFormat(form.createOverTime),
            practicalSailingStartTime: dateFormat(form.practicalSailingStartTime),
            practicalSailingOverTime: dateFormat(form.practicalSailingOverTime),
            expectSailingStartTime: dateFormat(form.expectSailingStartTime),
            expectSailingOverTime: dateFormat(form.expectSailingOverTime),
            arrivalStartTime: dateFormat(form.arrivalStartTime),
            arrivalOverTime: dateFormat(form.arrivalOverTime),
            clearingCustomsStartTime: dateFormat(form.clearingCustomsStartTime),
            clearingCustomsOverTime: dateFormat(form.clearingCustomsOverTime),
            deliveryStartTime: dateFormat(form.deliveryStartTime),
            deliveryOverTime: dateFormat(form.deliveryOverTime),
          };
          orderStatisticInfo.value = await getOrderStatistic(params);
        } catch (err) {
          orderStatisticInfo.value = {
            abandonNumber: 0,
            arriveCostNoNumber: 0,
            arrivePortNumber: 0,
            clearanceNumber: 0,
            newNumber: 0,
            productInNumber: 0,
            productNumber: 0,
            sailNumber: 0,
            settleNumber: 0,
            totalNumber: 0,
            orderCabinet: '',
          };
        }
      }

      async function loadOrderList() {
        tableLoading.value = true;
        try {
          const params = {
            pageSize: pageData.pageSize,
            pageNum: pageData.pageNum,
            ...form,
            createStartTime: dateFormat(form.createStartTime),
            createOverTime: dateFormat(form.createOverTime),
            practicalSailingStartTime: dateFormat(form.practicalSailingStartTime),
            practicalSailingOverTime: dateFormat(form.practicalSailingOverTime),
            expectSailingStartTime: dateFormat(form.expectSailingStartTime),
            expectSailingOverTime: dateFormat(form.expectSailingOverTime),
            arrivalStartTime: dateFormat(form.arrivalStartTime),
            arrivalOverTime: dateFormat(form.arrivalOverTime),
            clearingCustomsStartTime: dateFormat(form.clearingCustomsStartTime),
            clearingCustomsOverTime: dateFormat(form.clearingCustomsOverTime),
            deliveryStartTime: dateFormat(form.deliveryStartTime),
            deliveryOverTime: dateFormat(form.deliveryOverTime),
            orderStatus: orderStatusMap[orderStatus.value],
          };
          const res = await getOrderList(params);
          orderList.value = res.list;
          pageData.total = res.total;
          pageData.pageNum = res.pageNum;
          pageData.pageSize = res.pageSize;
        } catch (err) {
          pageData.total = 0;
          orderList.value = [];
        } finally {
          tableLoading.value = false;
        }
      }

      function businessChange(val) {
        const length = val.length;
        const total = businessList.value.map((item) => item.businessCode);
        if (val.includes(SelectEnum.VALUE)) {
          if (val[length - 1] === SelectEnum.VALUE && length > total.length) {
            val.splice(length - 1, 1);
          } else {
            val.splice(0, total.length, ...total);
          }
        }
      }

      function addOrder() {
        go('/home/orderAdd');
      }

      function goOrderDetail(val: string) {
        go('/home/order_detail/' + val);
      }

      async function orderStatusChange() {
        await loadOrderStatistics();
        await loadOrderList();
      }

      async function reset() {
        formResetFields(searchFormRef);
        pageData.pageSize = 10;
        pageData.pageNum = 1;
        orderStatus.value = 'totalNumber';
        await loadOrderStatistics();
        await loadOrderList();
      }

      async function search() {
        pageData.pageNum = 1;
        await loadOrderStatistics();
        await loadOrderList();
      }

      async function onPageChange(params: PaginationParams) {
        pageData.pageSize = params.pageSize;
        pageData.pageNum = params.pageNum;
        await loadOrderStatistics();
        await loadOrderList();
      }

      function operateCommand(val: OperateCommandType<OrderListItem>) {
        console.log(val);
      }

      // transfer
      function searchTransferPortList(val: string) {
        loadShippingPortList(
          {
            pageNum: 1,
            pageSize: 100,
            portEnglishName: val,
          },
          'transfer',
        );
      }

      // destination
      function searchDestinationPortList(val: string) {
        loadShippingPortList(
          {
            pageNum: 1,
            pageSize: 100,
            portEnglishName: val,
          },
          'destination',
        );
      }

      function searchDept(val: string) {
        loadDeptList({
          businessGroupCode: DeptEnum.SERVICE_DEPT,
          roleName: val,
        });
      }

      function searchSellUser(val: string) {
        loadSaleList({
          userId: userInfo.userId,
          userName: val,
        });
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

      function searchShipCompanyList(val: string) {
        loadCustomerList(
          {
            clientName: val,
          },
          'ship',
        );
      }

      function searchBookingAgentList(val: string) {
        loadCustomerList(
          {
            clientName: val,
          },
          'booking',
        );
      }

      onMounted(async () => {
        // select list
        const getBusinessList = loadBusinessList();
        const getTransportClauseList = loadTransportClauseList();
        const getCabinetTypeList = loadCabinetTypeList();
        const getSectorList = loadSectorList();
        const getPaymentList = loadPaymentList();
        const getOrderTypeList = loadOrderTypeList();
        const getShipList = loadAddressList(
          {
            clientRoleCode: ApiEnum.SHIP_COMPANY,
            clientName: '',
          },
          'ship',
        );
        const getBookingAgentList = loadAddressList(
          {
            clientRoleCode: ApiEnum.BOOKING_AGENT,
            clientName: '',
          },
          'booking',
        );
        const getCustomerList = loadCustomerList(
          {
            type: '',
            clientName: '',
          },
          'client',
        );
        const getShippingPortList = loadShippingPortList({
          pageNum: 1,
          pageSize: 100,
          portEnglishName: '',
        });
        const getDeptList = loadDeptList({
          businessGroupCode: DeptEnum.SERVICE_DEPT,
          roleName: '',
        });
        const getSaleList = loadSaleList({
          userId: userInfo.userId,
          userName: '',
        });
        const getShippingRoutesList = loadShippingRoutesList();
        const getOrderStatistic = loadOrderStatistics();
        const getOrderList = loadOrderList();

        // set power
        if (userInfo.showPower === 1) {
          switch (userInfo.roleCode) {
            case RoleEnum.SELL:
              showSellUserName.value = false;
              isDisable.value = true;
              form.sellUserName = userInfo.userName;
              form.sellUserId = userInfo.userId;
              break;
            case RoleEnum.OVERSEAS_SERVICE:
              showUserName.value = true;
              form.roleState = 1;
              form.userName = userInfo.userName;
              form.userId = userInfo.userId;
              break;
            case RoleEnum.MARKET_MANAGE:
              showSellUserName.value = true;
              form.sellUserName = userInfo.userName;
              form.sellUserId = userInfo.userId;
              break;
          }
        }
        if (
          userInfo.businessGroupCode === DeptEnum.SELL_DEPT ||
          userInfo.businessGroupCode === DeptEnum.MARKET_DEPT
        ) {
          form.businessGroupCode = userInfo.businessGroupCode;
          isDisableDept.value = true;
        }
        // after request set loading
        appStore.setPageMountedLoading([
          getBusinessList,
          getDeptList,
          getCustomerList,
          getSaleList,
          getSectorList,
          getCabinetTypeList,
          getOrderTypeList,
          getPaymentList,
          getShippingPortList,
          getShipList,
          getBookingAgentList,
          getTransportClauseList,
          getShippingRoutesList,
          getOrderStatistic,
          getOrderList,
        ]);
      });

      return {
        form,
        businessList,
        deptList,
        SelectEnum,
        inspectionList,
        customerList,
        saleList,
        sectorList,
        isDisableDept,
        cabinetTypeList,
        orderTypeList,
        paymentList,
        destinationPortList,
        transferPortList,
        costBillingStatusList,
        shipList,
        bookingAgentList,
        transportClauseList,
        shippingRoutesList,
        orderMasterList,
        orderStatus,
        orderStatisticInfo,
        orderList,
        showSellUserName,
        isDisable,
        showUserName,
        tableLoading,
        pageData,
        searchFormRef,

        t,
        reset,
        goOrderDetail,
        addOrder,
        orderStatusChange,
        search,
        searchDept,
        operateCommand,
        onPageChange,
        searchSellUser,
        businessChange,
        searchClient,
        searchTransferPortList,
        searchDestinationPortList,
        searchShipCompanyList,
        searchBookingAgentList,
      };
    },
  });
</script>

<style scoped>
  .order_text {
    font-size: 14px;
    line-height: 32px;
    margin-left: 15px;
  }

  .orderNumber_text {
    color: #0099e1;
    border-bottom: 1px solid #0090e1;
    cursor: pointer;
  }

  .container_box {
    cursor: pointer;
    color: rgb(0, 144, 225);
    text-decoration: underline;
  }
</style>
<style>
  .expand_item .box_step .el-step__icon.is-icon .el-step__icon-inner.el-icon-success {
    font-size: 16px !important;
    font-weight: 400 !important;
    color: #00b094 !important;
  }

  .expand_item .box_step .el-step__head.is-finish .el-step__line .el-step__line-inner {
    border: 1px solid #00b094 !important;
  }

  .expand_item .box_step .el-step__icon.is-icon .el-step__icon-inner.el-icon-error {
    font-size: 16px !important;
    font-weight: 400 !important;
    color: #c8c8c8 !important;
  }

  .expand_item .box_step .el-step__main .el-step__title.is-finish {
    color: #333333 !important;
    font-size: 14px !important;
  }

  .expand_item .box_step .el-step__main .el-step__description.is-finish {
    color: #666666 !important;
    font-size: 13px !important;
  }
</style>
