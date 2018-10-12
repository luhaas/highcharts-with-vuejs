<script>
    import { mapState } from 'vuex'    
    import Highcharts from 'highcharts'
    export default {
        computed: {
            ...mapState({
                list: state => state.list
            }),
            localList() {
                return this.list
            }
        },
        watch: {
            list() {
                this.dataSource()
            }
        },
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
            createData(texto){
                console.log(texto);
                if(!/^\d{4}-\d{2}-\d{2}$/.test(texto)) 
                    throw new Error('Deve estar no formato aaaa-mm-dd');
                var novaData = texto.split('-');              
                return `${novaData[2]}/${novaData[1]}/${novaData[0]}`;
            }
        },
        data() {
            return {
                chartOptions: {
                    colors: ['#00cbff', '#1d6fca', '#6638a2', '#ff0087', '#ffcb64', '#ff5100','#dddddd'],
                    chart: {
                        type: null
                    },
                    title: {        
                        text: null,
                        align: 'left'
                    },
                    subtitle: {        
                        text: null,
                        align: 'left'
                    },
                    xAxis: {
                        categories: null
                    },
                    yAxis: {
                        title: {
                            text: null
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
                    series: null
                }
            }
        }
    }
</script>