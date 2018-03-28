Vue.component('drag-drop-example', {
    name: 'drag-drop-example',
    template:
        `
   <div class="drag_drop_example">
        <form style="padding: 20px" enctype="multipart/form-data" novalidate>
        
            <drag-drop-input></drag-drop-input>
            
            <input name="title" type="text" placeholder="Title" style="width: 100%; margin-bottom: 10px">
            <input name="email" type="email" placeholder="Email" style="width: 100%; margin-bottom: 10px">
            <input name="autor" type="text" placeholder="Autor" style="width: 100%; margin-bottom: 10px">
            
            <button type="button" style="width: 100%" @click="send_form">SUBMIT</button>
            
        </form>
    </div>  
    `,
    mixins: [event_bus,drag_drop_input],
    data: function () {
        return {

        }
    },
    computed: {},
    props:[],
    methods: {
        send_form: function(){
            var scope = this;

            var form_data = new FormData(document.getElementsByTagName('form')[0])

            scope.add_dragged_images(form_data) // add files to formData

            axios.post('/', form_data)
                .then(function (response) {
                    scope.clear_files()
                })
                .catch(function (error) {
                    // scope.clear_files()

                })

        }
    },
    watch:{

    },
    created: function () {

    },
    mounted: function () {

    }
})