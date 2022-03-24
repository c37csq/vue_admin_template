<template>
  <div class="home_page">
    <div class="home_header">
      <h3>欢迎进入发现头程系统</h3>
    </div>
    <div class="cards">
      <div :class="['cards_content', isShow ? 'servenItems' : '']">
        <div @click="goProblemList" class="cards_item first">
          <el-card shadow="hover">
            <el-skeleton :loading="loading" animated>
              <template #template>
                <el-skeleton-item class="card_total" variant="p" />
                <el-skeleton-item class="card_title" variant="p" />
                <el-skeleton-item class="image_logo" variant="image" />
                <div class="card_status">
                  <el-skeleton-item class="skele_image" variant="image" />
                </div>
              </template>
              <template #default>
                <p class="card_total">{{ orderCountInfo.totalNumber }}</p>
                <p class="card_title">问题件总数</p>
                <img class="image_logo" :src="totalImage" />
                <div class="card_status">
                  <img class="h-12px" :src="totalStatus" />
                </div>
              </template>
            </el-skeleton>
          </el-card>
        </div>
        <div @click="goProblemList" class="cards_item" v-if="isShow">
          <el-card shadow="hover">
            <el-skeleton :loading="loading" animated>
              <template #template>
                <el-skeleton-item class="card_total" variant="p" />
                <el-skeleton-item class="card_title" variant="p" />
                <el-skeleton-item class="image_logo" variant="image" />
                <div class="card_status">
                  <el-skeleton-item class="skele_image" variant="image" />
                </div>
              </template>
              <template #default>
                <p class="card_total">{{ orderCountInfo.shipmentTimeout }}</p>
                <p class="card_title">未开航总数</p>
                <img class="image_logo" :src="notSailingOrder" />
                <div class="card_status">
                  <img class="h-12px" :src="notSailingStatus" />
                </div>
              </template>
            </el-skeleton>
          </el-card>
        </div>
        <div @click="goProblemList" class="cards_item">
          <el-card shadow="hover">
            <el-skeleton :loading="loading" animated>
              <template #template>
                <el-skeleton-item class="card_total" variant="p" />
                <el-skeleton-item class="card_title" variant="p" />
                <el-skeleton-item class="image_logo" variant="image" />
                <div class="card_status">
                  <el-skeleton-item class="skele_image" variant="image" />
                </div>
              </template>
              <template #default>
                <p class="card_total">{{ orderCountInfo.deliveryTimeout }}</p>
                <p class="card_title">送达超时订单</p>
                <img class="image_logo" :src="lateOrder" />
                <div class="card_status">
                  <img class="h-12px" :src="lateStatus" />
                </div>
              </template>
            </el-skeleton>
          </el-card>
        </div>
        <div @click="goProblemList" class="cards_item">
          <el-card shadow="hover">
            <el-skeleton :loading="loading" animated>
              <template #template>
                <el-skeleton-item class="card_total" variant="p" />
                <el-skeleton-item class="card_title" variant="p" />
                <el-skeleton-item class="image_logo" variant="image" />
                <div class="card_status">
                  <el-skeleton-item class="skele_image" variant="image" />
                </div>
              </template>
              <template #default>
                <p class="card_total">{{ orderCountInfo.checkTimeout }}</p>
                <p class="card_title">查验超时订单</p>
                <img class="image_logo" :src="reviewOrder" />
                <div class="card_status">
                  <img class="h-12px" :src="reviewStatus" />
                </div>
              </template>
            </el-skeleton>
          </el-card>
        </div>
        <div @click="goProblemList" class="cards_item">
          <el-card shadow="hover">
            <el-skeleton :loading="loading" animated>
              <template #template>
                <el-skeleton-item class="card_total" variant="p" />
                <el-skeleton-item class="card_title" variant="p" />
                <el-skeleton-item class="image_logo" variant="image" />
                <div class="card_status">
                  <el-skeleton-item class="skele_image" variant="image" />
                </div>
              </template>
              <template #default>
                <p class="card_total">{{ orderCountInfo.costEntryTimeout }}</p>
                <p class="card_title">费用录入超时订单</p>
                <img class="image_logo" :src="expenseEntryOrder" />
                <div class="card_status">
                  <img class="h-12px" :src="expenseEntryStatus" />
                </div>
              </template>
            </el-skeleton>
          </el-card>
        </div>
        <div @click="goProblemList" class="cards_item">
          <el-card shadow="hover">
            <el-skeleton :loading="loading" animated>
              <template #template>
                <el-skeleton-item class="card_total" variant="p" />
                <el-skeleton-item class="card_title" variant="p" />
                <el-skeleton-item class="image_logo" variant="image" />
                <div class="card_status">
                  <el-skeleton-item class="skele_image" variant="image" />
                </div>
              </template>
              <template #default>
                <p class="card_total">{{ orderCountInfo.costTakeTimeout }}</p>
                <p class="card_title">费用收取超时订单</p>
                <img class="image_logo" :src="expenseCollectionOrder" />
                <div class="card_status">
                  <img class="h-12px" :src="expenseCollectionStatus" />
                </div>
              </template>
            </el-skeleton>
          </el-card>
        </div>
        <div @click="goProblemList" class="cards_item">
          <el-card shadow="hover">
            <el-skeleton :loading="loading" animated>
              <template #template>
                <el-skeleton-item class="card_total" variant="p" />
                <el-skeleton-item class="card_title" variant="p" />
                <el-skeleton-item class="image_logo" variant="image" />
                <div class="card_status">
                  <el-skeleton-item class="skele_image" variant="image" />
                </div>
              </template>
              <template #default>
                <p class="card_total">{{ orderCountInfo.productDataSize }}</p>
                <p class="card_title">产品部待确认订单</p>
                <img class="image_logo" :src="confirmOrder" />
                <div class="card_status">
                  <img class="h-12px" :src="confirmStatus" />
                </div>
              </template>
            </el-skeleton>
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
      <el-skeleton :loading="loading" animated>
        <template #template>
          <div style="height: 300px; width: 100%; margin-top: 30px">
            <el-skeleton :rows="7" />
          </div>
        </template>
        <template #default>
          <div ref="chartRef" style="height: 300px; width: 100%"></div>
        </template>
      </el-skeleton>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent, onMounted, Ref, ref } from 'vue';
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
  import { OrderCountInfo, OrderNumListItem } from '@/API/sys/model/homeModel';
  import { useAppUserStore } from '@/store/modules/user';
  import { RoleEnum } from '@/enums/pageEnum';
  import { useGo } from '@/hooks/web/usePage';

  export default defineComponent({
    name: 'HomePage',
    setup() {
      const isShow = ref(false);
      const orderCountInfo = ref({}) as Ref<OrderCountInfo>;
      const orderNumList = ref<OrderNumListItem[]>([]);
      const chartRef = ref<HTMLDivElement | null>(null);
      const userStore = useAppUserStore();
      const statisticsType = ref('1');
      const loading = ref(true);
      const go = useGo();
      const options = ref([
        { name: '日', value: '1' },
        { name: '周', value: '2' },
      ]);
      const { setOptions, echarts } = useECharts(chartRef as Ref<HTMLDivElement>);
      let timeoutId = ref() as Ref<TimeoutHandle>;

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
        if (loading.value) return;
        go('/home/problemPieces');
      }

      async function getLineChartData() {
        if (loading.value) return;
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
        let setTimeoutPromise = new Promise((resolve) => {
          timeoutId.value = setTimeout(() => {
            resolve('成功');
          }, 1200);
        });
        Promise.all([setTimeoutPromise, getOrderCountInfo, getLineChartData]).then((_) => {
          clearTimeout(timeoutId.value);
          loading.value = false;
          setLineChartOption(orderNumList.value);
        });
      });

      return {
        chartRef,
        orderCountInfo,
        isShow,
        loading,
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
      }

      .cards_item.first {
        margin-right: 8px;
        margin-left: 0;
        .el-card {
          background: linear-gradient(136deg, rgb(53, 195, 255), rgb(24, 144, 255));
          p {
            color: #ffffff;
          }
        }
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
<style lang="scss">
  .el-skeleton {
    .card_total {
      font-size: 40px;
      height: 40px;
      width: 80%;
      margin: 0 0 25px 0 !important;
    }

    .card_title {
      font-size: 16px;
      height: 16px;
      width: 70%;
      margin-top: 0 !important;
    }

    .image_logo {
      width: 58px;
      height: 58px;
      border-radius: 50%;
    }

    .card_status {
      position: absolute;
      right: 16px;
      top: 16px;

      .skele_image {
        width: 16px;
        height: 16px;
        border-radius: 50%;
      }
    }
  }
</style>
