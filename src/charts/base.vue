<script>
    import { mapState } from 'vuex'    
    import Highcharts from 'highcharts'
    export default {
        computed: {
            ...mapState({
                list: state => state.list
            })
        },
        watch: {
            list() {
                this.dataSource()
            }
        },
        methods: {
            // cria array de intervalos para a propriedade Categories do chart
            createIntervalos() {
                let intervalos = [];
                this.list.metrics.revenue_by_medium.data.series.forEach(function(e, v){
                    // data no formato aaaa-mm-dd
                    let data = e.name.split('-');
                    // monta array com os dias
                    intervalos.push(data[2]);
                });
                return intervalos;
            },
            // cria array para a propriedade Series do chart
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
                let objSeries = JSON.parse(series);
                objSeries.Series.forEach(function(serie, e){
                    arraySeries.forEach(function(e, v){
                        if(e.data[serie.name]){
                            let valueCurrency = e.data[serie.name].split(',').join('.');
                            serie.data = serie.data.concat(parseFloat(valueCurrency));
                        }
                    });
                });
                return objSeries;
            },
            // recebe data no formato aaaa-mm-dd e retorna no formato dd/mm/aaaa
            createData(texto){
                if(!/^\d{4}-\d{2}-\d{2}$/.test(texto)) 
                    throw new Error('Deve estar no formato aaaa-mm-dd');
                let novaData = texto.split('-');              
                return `${novaData[2]}/${novaData[1]}/${novaData[0]}`;
            }
        },
        data() {
            return {
                chartOptions: {
                    colors: ['#00cbff', '#1d6fca', '#6638a2', '#ff0087', '#ffcb64', '#ff5100','#dddddd'],
                    chart: {
                        type: null,
                        style: {
                            fontFamily: 'Poppins, sans-serif'
                        }
                    },
                    title: {        
                        text: null,
                        align: 'left',
                        style: {
                            fontSize: '16px',
                            fontWeight: 'bold',
                            textTransform: 'uppercase'
                        }
                    },
                    subtitle: {        
                        text: null,
                        align: 'left'
                    },
                    legend: {
                        layout: 'horizontal',
                        itemStyle: {
                            fontWeight: 'bold',
                            fontSize: '13px'
                        }
                    },
                    xAxis: {
                        categories: null,
                        gridLineWidth: 1,
                        labels: {
                            style: {
                                fontSize: '12px'
                            }
                        }
                    },
                    yAxis: {
                        minorTickInterval: 'auto',
                        title: {
                            text: null,
                            style: {
                                textTransform: 'uppercase'
                            }
                        }
                    },
                    tooltip: {
                        formatter: function() {
                              return this.series.name + ' <b>R$ '+ this.y.toFixed(2).replace(".",",") + '</b>';
                        },
                        borderWidth: 0,
                        backgroundColor: 'rgba(219,219,216,0.8)',
                        shadow: false
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