const EventBus = new Vue()

var event_bus = {
    data: function () {
        return {
            active_view: 'first-view',
            // active_view: 'drag-drop-example',
            global_data: {

            }
        }
    },
    methods: {
        dispatch_save_data_event: function(key,data){ // function save data to global store
            EventBus.$emit('global-data-save',{key: key, data: data})
        },
        save_data: function (key, new_data) { // calback for dispatch_save_data_event
            // this.global_data[key] = new_data
            this.$set(this.global_data, key, new_data)
        },
        dispatch_event: function(event_name,data){ // function to dispatch common events, example 'show loader'
            EventBus.$emit(event_name,data)
        },
        change_view: function(view){
            this.active_view = view
        }
    },
    created: function () {
        var scope = this;

        EventBus.$on('global-data-save', function (event_data) {
            scope.save_data(event_data['key'], event_data['data'])
        })

        EventBus.$on('change-view', function (view) {
            scope.change_view(view)
        })

    }
}