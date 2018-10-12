<script>
    import Area from './charts/Area.vue'
    import Bar from './charts/Bar.vue'
    import axios from 'axios'

    const http = axios.create()

    export default {
        data () {
            return {
              selected: 'Area',
              currentView: 'Area'
            }
        },
        components: {
            Area, Bar
        },
        methods: {
            activate (elem) {
              this.selected = elem
            },
            handler () {
              var args = arguments
              for (var arg of args) {
                if (arg instanceof Function) {
                  arg()
                }
              }
            },
            select (elem) {
              this.currentView = elem
              this.activate(elem)
            }
        },
        mounted() {
            http.get('/MOCK_DATA.json').then(response => {
                this.$store.commit('SET_LIST', response.data)
            })
        },
    }
</script>

<template>
  <div id="app">
    <div class="select-chart">
      <p>Tipo de gráfico:</p>
      <div class="button-wrapper">
        <button @click="select('Area')" :class="{btnActive: selected === 'Area'}">Área</button>
        <button @click="select('Bar')" :class="{btnActive: selected === 'Bar'}">Bar</button>
      </div>
    </div>
    <keep-alive>
      <component :is="currentView"></component>
    </keep-alive>
  </div>
</template>