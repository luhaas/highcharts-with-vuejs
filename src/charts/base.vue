<script>
    import { mapState } from 'vuex'
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
            },
            filter() {
                this.dataSource()
            },
        },
        data() {
          return {
            chart: null
            }
        }
    }
</script>