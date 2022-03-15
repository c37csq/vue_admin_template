<template>
  <div class="home_page">
    <div class="home_header">
      <h3>欢迎进入发现头程系统</h3>
    </div>
    <div class="cards">
      <div :class="['cards_content', isShow ? 'servenItems' : '']">
        <div @click="goProblemList" class="cards_item first">
          <el-card class="problemList_total" shadow="hover">
            <p class="card_total">{{ orderCountInfo.totalNumber }}</p>
            <p class="card_title">问题件总数</p>
            <img class="image_logo" :src="totalImage" />
            <div class="card_status">
              <img class="h-12px" :src="totalStatus" />
            </div>
          </el-card>
        </div>
        <div @click="goProblemList" class="cards_item" v-if="isShow">
          <el-card shadow="hover">
            <p class="card_total">{{ orderCountInfo.shipmentTimeout }}</p>
            <p class="card_title">未开航总数</p>
            <img class="image_logo" :src="notSailingOrder" />
            <div class="card_status">
              <img class="h-12px" :src="notSailingStatus" />
            </div>
          </el-card>
        </div>
        <div @click="goProblemList" class="cards_item">
          <el-card shadow="hover">
            <p class="card_total">{{ orderCountInfo.deliveryTimeout }}</p>
            <p class="card_title">送达超时订单</p>
            <img class="image_logo" :src="lateOrder" />
            <div class="card_status">
              <img class="h-12px" :src="lateStatus" />
            </div>
          </el-card>
        </div>
        <div @click="goProblemList" class="cards_item">
          <el-card shadow="hover">
            <p class="card_total">{{ orderCountInfo.checkTimeout }}</p>
            <p class="card_title">查验超时订单</p>
            <img class="image_logo" :src="reviewOrder" />
            <div class="card_status">
              <img class="h-12px" :src="reviewStatus" />
            </div>
          </el-card>
        </div>
        <div @click="goProblemList" class="cards_item">
          <el-card shadow="hover">
            <p class="card_total">{{ orderCountInfo.costEntryTimeout }}</p>
            <p class="card_title">费用录入超时订单</p>
            <img class="image_logo" :src="expenseEntryOrder" />
            <div class="card_status">
              <img class="h-12px" :src="expenseEntryStatus" />
            </div>
          </el-card>
        </div>
        <div @click="goProblemList" class="cards_item">
          <el-card shadow="hover">
            <p class="card_total">{{ orderCountInfo.costTakeTimeout }}</p>
            <p class="card_title">费用收取超时订单</p>
            <img class="image_logo" :src="expenseCollectionOrder" />
            <div class="card_status">
              <img class="h-12px" :src="expenseCollectionStatus" />
            </div>
          </el-card>
        </div>
        <div @click="goProblemList" class="cards_item last">
          <el-card shadow="hover">
            <p class="card_total">{{ orderCountInfo.productDataSize }}</p>
            <p class="card_title">产品部待确认订单</p>
            <img class="image_logo" :src="confirmOrder" />
            <div class="card_status">
              <img class="h-12px" :src="confirmStatus" />
            </div>
          </el-card>
        </div>
      </div>
    </div>
    <div class="bar_chart">
      <div class="title">
        <h1>订单统计</h1>
      </div>
      <div class="select_time">
        <el-select v-model="statisticsType">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.name"
            :value="item.value"
          />
        </el-select>
        <Button @click="getLineChartData" name="查询" type="primary" />
      </div>
      <div ref="chartRef" style="height: 300px; width: 100%"></div>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent, onActivated, onMounted, Ref, ref } from 'vue';
  import { useECharts } from '@/hooks/web/useECharts';
  import totalImage from '@/assets/images/total.png';
  import totalStatus from '@/assets/images/white.png';
  import lateOrder from '@/assets/images/LateOrder.png';
  import lateStatus from '@/assets/images/blue.png';
  import reviewOrder from '@/assets/images/reviewOrder.png';
  import reviewStatus from '@/assets/images/red.png';
  import expenseEntryOrder from '@/assets/images/expenseEntryOrder.png';
  import expenseEntryStatus from '@/assets/images/yellow.png';
  import expenseCollectionOrder from '@/assets/images/expenseCollectionOrder.png';
  import expenseCollectionStatus from '@/assets/images/green.png';
  import confirmOrder from '@/assets/images/confirmOrder.png';
  import confirmStatus from '@/assets/images/red.png';
  import notSailingOrder from '@/assets/images/notSailingOrder.png';
  import notSailingStatus from '@/assets/images/yellow.png';
  import { getChartData, getOrderCount } from '@/API/sys/home';
  import { useAppStore } from '@/store/modules/app';
  import { OrderCountInfo, OrderNumListItem } from '@/API/sys/model/homeModel';
  import { useAppUserStore } from '@/store/modules/user';
  import { RoleEnum } from '@/enums/pageEnum';
  import { useGo } from '@/hooks/web/usePage';

  export default defineComponent({
    name: 'HomePage',
    setup() {
      const appStore = useAppStore();
      const isShow = ref(false);
      const orderCountInfo = ref({}) as Ref<OrderCountInfo>;
      const orderNumList = ref<OrderNumListItem[]>([]);
      const chartRef = ref<HTMLDivElement | null>(null);
      const userStore = useAppUserStore();
      const statisticsType = ref('1');
      const go = useGo();
      const options = ref([
        { name: '日', value: '1' },
        { name: '周', value: '2' },
      ]);
      const { setOptions, echarts, resize } = useECharts(chartRef as Ref<HTMLDivElement>);

      async function loadOrderCountInfo() {
        try {
          const res = await getOrderCount();
          orderCountInfo.value = res[0];
        } catch {
          orderCountInfo.value = {
            totalNumber: 0,
            deliveryTimeout: 0,
            checkTimeout: 0,
            costEntryTimeout: 0,
            costTakeTimeout: 0,
            productDataSize: 0,
            shipmentTimeout: 0,
          };
        }
      }

      async function loadLineChartData(params: { statisticsType: string }) {
        try {
          orderNumList.value = await getChartData(params);
          setLineChartOption(orderNumList.value);
        } catch {
          orderNumList.value = [];
        }
      }

      type dataArrItem = {
        value: [string, number];
      };

      function setLineChartOption(data: OrderNumListItem[]) {
        let dataArr: dataArrItem[] = [];
        data.forEach((item) => {
          const date = item.statisticData.substring(5, item.statisticData.length);
          dataArr.push({
            value: [date, item.statisticCount],
          });
        });
        setOptions({
          title: {
            text: '订单累计',
            left: 15,
            textStyle: {
              width: 82,
              height: 13,
              fontSize: 13,
              fontWeight: 400,
              color: '#fff',
              lineHeight: 20,
            },
          },
          grid: {
            left: 0,
            bottom: 0,
            right: 18,
            top: 40,
            containLabel: true,
          },
          tooltip: {
            trigger: 'axis',
          },
          yAxis: {
            type: 'value',
          },
          xAxis: {
            type: 'category',
            boundaryGap: false,
            axisLine: {
              lineStyle: {
                color: '#fff',
              },
            },
            axisLabel: {
              show: true,
              fontSize: 12,
              fontWeight: 400,
              color: '#43425D',
              lineHeight: 17,
            },
          },
          series: [
            {
              label: {
                show: true,
                color: '#fff',
              },
              data: dataArr,
              type: 'line',
              symbol: 'circle',
              symbolSize: 4,
              itemStyle: {
                color: '#98C9FA',
              },
              lineStyle: {
                color: '#98C9FA',
              },
              areaStyle: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0, color: '#98C9FA' },
                  { offset: 0.5, color: '#98C9FA' },
                  { offset: 1, color: '#FCFDFF' },
                ]),
              },
            },
          ],
        });
      }

      function goProblemList() {
        go('/home/problemPieces');
      }

      async function getLineChartData() {
        await loadLineChartData({
          statisticsType: statisticsType.value,
        });
      }

      onMounted(() => {
        const userInfo = userStore.getUserInfo;
        const getOrderCountInfo = loadOrderCountInfo();
        const getLineChartData = loadLineChartData({
          statisticsType: statisticsType.value,
        });
        if (userInfo.roleCode === RoleEnum.OVERSEAS_SERVICE) {
          isShow.value = true;
        }
        appStore.setPageMountedLoading([getOrderCountInfo, getLineChartData]);
      });

      onActivated(() => {
        if (resize) {
          resize();
        }
      });

      return {
        chartRef,
        orderCountInfo,
        isShow,
        totalImage,
        totalStatus,
        lateOrder,
        lateStatus,
        reviewOrder,
        reviewStatus,
        expenseEntryOrder,
        expenseEntryStatus,
        expenseCollectionOrder,
        expenseCollectionStatus,
        confirmStatus,
        confirmOrder,
        notSailingStatus,
        notSailingOrder,
        options,
        orderNumList,
        statisticsType,

        goProblemList,
        getLineChartData,
      };
    },
  });
</script>

<style lang="scss" scoped>
  .home_header {
    width: 100%;
    background: #ffffff;
    padding: 16px 20px;

    h3 {
      height: 21px;
      line-height: 21px;
      font-size: 16px;
      font-weight: 550;
      color: #2c3e50;
    }
  }

  .cards {
    height: 200px;
    margin: 16px 0;
    width: 100%;

    .cards_content {
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 100%;
      width: 100%;

      .cards_item {
        height: 100%;
        margin: 0 8px;
        width: 16.6%;

        .el-card {
          position: relative;
          height: 100%;
          background: #ffffff;
          cursor: pointer;

          .card_title {
            font-size: 16px;
            margin: 10px 0 15px 0;
          }

          .card_total {
            font-size: 40px;
            margin: 0 0 25px 0;
          }

          .image_logo {
            width: 58px;
          }

          .card_status {
            position: absolute;
            right: 16px;
            top: 16px;
          }
        }

        .problemList_total {
          background: linear-gradient(136deg, #35c3ff, #1890ff);

          p {
            color: #ffffff;
          }
        }
      }

      .cards_item.first {
        margin-right: 8px;
        margin-left: 0;
      }

      .cards_item.last {
        margin-left: 8px;
        margin-right: 0;
      }
    }

    .cards_content.sevenItems {
      .cards_item {
        width: 14.3%;
      }
    }
  }

  .bar_chart {
    width: 100%;
    padding: 20px;
    background: #ffffff;

    .title {
      width: 100%;
      display: inline-block;

      h1 {
        color: #444444;
        font-size: 20px;
        font-weight: 600;
        text-align: left;
      }
    }

    .select_time {
      display: flex;
      align-items: center;
      margin-top: 20px;

      .el-button {
        margin-left: 15px;
      }
    }
  }
</style>
