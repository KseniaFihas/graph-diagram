<template>
  <div>
    <div ref="scichartRoot" style="width: 100%; height: 500px"></div>
  </div>
</template>

<script>
import stockService from "../../services/stockService.js";
import {
  SciChartSurface,
  XyDataSeries,
  NumericAxis,
  CategoryAxis,
  FastLineRenderableSeries,
} from "scichart";

export default {
  name: "FinancialChart",
  data() {
    return {
      stockData: null,
      isDataLoading: false,
    };
  },
  methods: {
    async getStockData() {
      this.isDataLoading = true;
      this.stockData = await stockService.getStockData("gpw:PLKGHM000017");
      this.isDataLoading = false;
    },
    createChart() {
      if (!this.stockData || this.stockData.length === 0) {
        console.error("No stock data available");
        return;
      }

      const dates = this.stockData.map((item) => new Date(item.dt * 1000));
      const prices = this.stockData.map((item) => item.price);

      const amounts = this.stockData.map((item) => item.amount);

      const dataSeries = new XyDataSeries(this.$refs.scichartRoot, {
        dataSeriesName: "Stock Data",
        xValues: dates,
        yValues: prices,
        additionalColumns: { Amount: amounts },
      });

      const xAxis = new CategoryAxis(this.$refs.scichartRoot);
      const yAxis = new NumericAxis(this.$refs.scichartRoot);

      const lineSeries = new FastLineRenderableSeries(this.$refs.scichartRoot, {
        dataSeries,
        strokeThickness: 2,
        stroke: "#4682b4",
      });

      const surface = new SciChartSurface(this.$refs.scichartRoot, {
        xAxes: [xAxis],
        yAxes: [yAxis],
        renderableSeries: [lineSeries],
      });

      surface.render();
    },
  },
  async created() {
    await this.getStockData();
    this.createChart();
  },
};
</script>

<style scoped>
#scichart-root {
  width: 100%;
  height: 500px;
}
</style>
