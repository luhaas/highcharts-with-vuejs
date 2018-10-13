<script>
    import base from './base.vue'
    export default {
        extends: base,
        methods: {
            dataSource() {
                let series = this.createSeries();
                let plotOptions = `{ "series": { "stacking" : "normal" } }`;
                
                this.chartOptions.chart.type = 'bar';
                this.chartOptions.title.text = this.list.metrics.revenue_by_medium.title;
                this.chartOptions.subtitle.text = this.list.metrics.revenue_by_medium.description;
                this.chartOptions.xAxis.categories = this.createIntervalos();
                this.chartOptions.yAxis.title.text = `Receita de ${this.createData(this.list.start_date)} a ${this.createData(this.list.end_date)}`;
                this.chartOptions.series = series.Series.map(n => n);
                this.chartOptions.plotOptions = JSON.parse(plotOptions);
            }
        },
        mounted: function() {
            return this.dataSource();
        }
    }
</script>

<template>
    <div class="charts">
        <highcharts class="chart" :options="chartOptions"></highcharts>
    </div>
</template>