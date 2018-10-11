<script>
    import base from './base.vue'
    import _ from 'lodash'
    import Highcharts from 'highcharts'
    import { DateConverter } from './../DateConverter'
    export default {
        methods: {
            dataSource() {
                var titulo = this.list.metrics.revenue_by_medium.title;
                var subtitulo = this.list.metrics.revenue_by_medium.description;
                var intervalos = this.createIntervalos();
                var series = this.createSeries();
                var dataInicio = DateConverter.txtparaData(this.list.start_date);
                var dataFim = DateConverter.txtparaData(this.list.end_date);
                this.setup(titulo,subtitulo,dataInicio,dataFim,intervalos,series);
            },
            createIntervalos() {
                var intervalos = [];
                this.list.metrics.revenue_by_medium.data.series.forEach(function(e, v){
                    console.log(e.name);
                    // data no formato aaaa-mm-dd
                    let data = e.name.split('-');
                    console.log(data);
                    // monta array com os dias
                    intervalos.push(data[2]);
                });
                return intervalos;
            },
            createSeries() {
                let arraySeries = this.list.metrics.revenue_by_medium.data.series;
                let propriedades = Object.keys(arraySeries[0].data);
                let series = `
                    {
                        "Series": [
                        ${propriedades.map(n => `
                            {
                                "name": "${n}",
                                "data": []
                            }
                            `).join(',')}
                        ]
                    }
                `;
                var objSeries = JSON.parse(series);
                objSeries.Series.forEach(function(serie, e){
                    arraySeries.forEach(function(e, v){
                        if(e.data[serie.name]){
                            let valueCurrency = e.data[serie.name].split(',').join('.');
                            serie.data = serie.data.concat(valueCurrency);
                        }
                    });
                });
                return objSeries;
            },
            setup(title, subtitle, inicio, fim, categorias, series) {
                return Highcharts.chart('container-for-bar', {
                    chart: {
                        type: 'bar'
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
                    legend: {
                        reversed: true
                    },
                    tooltip: {
                        formatter: function() {
                              return this.series.name + ' <b>R$ '+ this.y.toFixed(2).replace(".",",") + '</b>';
                      }
                    },
                    plotOptions: {
                        series: {
                            stacking: 'normal'
                        }
                    },
                    series: series.Series.map(n => n)
                });
            },
        },
    }
</script>

<template>
    <div id="container-for-bar"></div>
</template>