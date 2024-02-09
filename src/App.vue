<template>
  <FinancialChart />
</template>

<script>
import FinancialChart from "./components/FinancialChart/FinancialChart.vue";

export default {
  name: "App",
  components: {
    FinancialChart,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
