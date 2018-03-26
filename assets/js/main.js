var vm = new Vue({
    el: '#front-app',
    mixins: [data_mixin], 
    data: {
        active_view: 'email-gate', 
        // activeView: 'first-view',
    },
    computed: {},
    methods: {
        switchPages: function(){
            
            this.active_view = 'first-view'
            console.log('olaboga');
            console.log(this.active_view);
        }

    },
    watch:{

    },
    created: function () {
        axios.get(api_route + '/entry')
        .then(function (response) {
            // console.log(response);
            
        })
        .catch(function (error) {

        });
    }, 
    mounted: function () {


        $('.mobile-nav-ico').on('click', function(){
            $('.full-menu').toggleClass('open');   
        }) 

    }
}) 