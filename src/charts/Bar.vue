<script>
    import base from './base.vue'
    export default {
        extends: base,
        methods: {
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
                            serie.data = serie.data.concat(parseFloat(valueCurrency));
                        }
                    });
                });
                console.log(objSeries);
                return objSeries;
            },
            setup(title, subtitle, inicio, fim, categorias, series) {
                //console.log(series);
                //console.log(categorias);

                return Highcharts.chart('container-for-area', {
                    colors: ['#00cbff', '#1d6fca', '#6638a2', '#ff0087', '#ffcb64', '#ff5100','#dddddd'],
                    chart: {
                        type: 'column'
                    },
                    title: {
                        text: title
                    },
                    xAxis: {
                        categories: categorias
                    },
                    yAxis: {
                        min: 0,
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
                        column: {
                            stacking: 'percent'
                        }
                    },
                    series: series.Series.map(n => n)
                });
            },
        },
        mounted: function() {
                var titulo = this.list.metrics.revenue_by_medium.title;
                var subtitulo = this.list.metrics.revenue_by_medium.description;
                var intervalos = this.createIntervalos();
                var series = this.createSeries();
                var dataInicio = this.createData(this.list.start_date);
                var dataFim = this.createData(this.list.end_date);
                var plotOptions = `{ "series": { "stacking" : "normal" } }`
                //this.setup(titulo,subtitulo,dataInicio,dataFim,intervalos,series);

                this.chartOptions.yAxis.title.text = 'teste';
                this.chartOptions.chart.type = 'bar';
                this.chartOptions.title.text = titulo;
                this.chartOptions.subtitle.text = subtitulo;
                this.chartOptions.xAxis.categories = intervalos;
                this.chartOptions.yAxis.title.text = `Receita de ${dataInicio} a ${dataFim}`;
                this.chartOptions.series = series.Series.map(n => n);
                this.chartOptions.plotOptions = JSON.parse(plotOptions);
        }
    }
</script>

<template>
    <div class="charts">
        <highcharts class="chart" :options="chartOptions"></highcharts>
    </div>
</template>