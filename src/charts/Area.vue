<script>
    import base from './base.vue'
    export default {
        extends: base,
        methods: {
            dataSource() {
                var titulo = this.list.metrics.revenue_by_medium.title;
                var subtitulo = this.list.metrics.revenue_by_medium.description;
                var intervalos = this.createIntervalos();
                var series = this.createSeries();
                console.log(this.list.start_date);
                var dataInicio = this.createData(this.list.start_date);
                var dataFim = this.createData(this.list.end_date);
                //this.setup(titulo,subtitulo,dataInicio,dataFim,intervalos,series);

                // var newChartOption = { Options : { colors: ["#00cbff", "#1d6fca", "#6638a2", "#ff0087", "#ffcb64", "#ff5100","#dddddd"],
                //     chart: {
                //         "type": null
                //     },
                //     title: {        
                //         text: this.list.metrics.revenue_by_medium.title,
                //         align: "left"
                //     },
                //     subtitle: {        
                //         text: this.list.metrics.revenue_by_medium.description,
                //         align: "left"
                //     },
                //     xAxis: {
                //         "categories": this.createIntervalos()
                //     },
                //     yAxis: {
                //         title: {
                //             text: "Receita de ${dataInicio} a ${dataFim}"
                //         }
                //     },
                //     tooltip: {
                //         formatter: function() {
                //               return this.series.name + ' <b>R$ '+ this.y.toFixed(2).replace(".",",") + '</b>';
                //       }
                //     },
                //     plotOptions: {
                //         area: {
                //             marker: {
                //                 enabled: false,
                //                 symbol: 'circle',
                //                 radius: 2,
                //                 states: {
                //                     hover: {
                //                         enabled: true
                //                     }
                //                 }
                //             }
                //         }
                //     },
                //     series: this.createSeries()
                // }};

                this.chartOptions.yAxis.title.text = 'teste';
                this.chartOptions.chart.type = 'area';
                this.chartOptions.title.text = titulo;
                this.chartOptions.subtitle.text = subtitulo;
                this.chartOptions.yAxis.title.text = `Receita de ${dataInicio} a ${dataFim}`;
                this.chartOptions.xAxis.categories = intervalos;
                this.chartOptions.series = series.Series.map(n => n);
                //this.chartOptions = newChartOption.Options;
            },
            setup(title, subtitle, inicio, fim, categorias, series) {
                //console.log(series);
                //console.log(categorias);

                return Highcharts.chart('container-for-area', {
                    colors: ['#00cbff', '#1d6fca', '#6638a2', '#ff0087', '#ffcb64', '#ff5100','#dddddd'],
                    chart: {
                        type: 'area'
                    },
                    title: {        
                        text: title,
                        align: 'left'
                    },
                    subtitle: {        
                        text: subtitle,
                        align: 'left'
                    },
                    xAxis: {
                        categories: categorias
                    },
                    yAxis: {
                        title: {
                            text: `Receita de ${inicio} a ${fim}`
                        }
                    },
                    tooltip: {
                        formatter: function() {
                              return this.series.name + ' <b>R$ '+ this.y.toFixed(2).replace(".",",") + '</b>';
                      }
                    },
                    plotOptions: {
                        area: {
                            marker: {
                                enabled: false,
                                symbol: 'circle',
                                radius: 2,
                                states: {
                                    hover: {
                                        enabled: true
                                    }
                                }
                            }
                        }
                    },
                    series: series.Series.map(n => n)
                });
            },
        }
    }
</script>

<template>
    <div class="charts">
         <highcharts class="chart" :options="chartOptions"></highcharts>
    </div>
</template>