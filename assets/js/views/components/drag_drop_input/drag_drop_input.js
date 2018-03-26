Vue.component('drag-drop-input', {
    name: 'drag-drop-input',
    template:
        `
   <div class="drag-drop-component upload_photo">
        
        <input type="file" name="files[]" id="file" class="box__file" multiple />
                    
        <div class="upload_photo__container clearfix">
            <div class="upload_photo__list" v-for="file in global_data.file_list">
                <p>{{file.name}}</p>
                <p>{{(file.size/1048576).toFixed(2)}} MB</p>
            </div>
        </div>
                            
        <div class="drag_drop">
            <div class="drag_drop__icon">
               <img src="assets/img/drag_drop.png" alt="">
                <p>Drag Files to Upload</p>
            </div>
        </div>
    
        
    </div>  
    `,
    mixins: [event_bus, drag_drop_input],
    data: function () {
        return {

        }
    },
    computed: {},
    props:[],
    methods: {
        init_drag_drop: function () {
            var scope = this;

            // applying the effect for every form
            var form = document.querySelector('form');

            var input = form.querySelector('input[type="file"]'),
                drag_drop_container = document.querySelector('.drag_drop');

            form.classList.add('has-advanced-upload'); // letting the CSS part to know drag&drop is supported by the browser

            ['drag', 'dragstart', 'dragend', 'dragover', 'dragenter', 'dragleave', 'drop'].forEach(function (event) {
                form.addEventListener(event, function (e) //*** po to zeby sie zdjęcie nie otworzyło jak sie je przeciągnie
                {
                    // preventing the unwanted behaviours
                    e.preventDefault();
                    e.stopPropagation();
                });
            });

            ['dragover', 'dragenter'].forEach(function (event) {
                form.addEventListener(event, function () {
                    drag_drop_container.classList.add('drag_drop--active');
                });
            });

            ['dragleave', 'dragend', 'drop'].forEach(function (event) {
                form.addEventListener(event, function () {
                    drag_drop_container.classList.remove('drag_drop--active');
                });
            });

            form.addEventListener('drop', function (e) //***tutaj nastepuje przypisanie przeciągnietych plików do zmiennej droppedFiles i wyswietlenie nazw showFiles()
            {
                scope.file_list = e.dataTransfer.files; // the files that were dropped

                scope.dispatch_save_data_event('file_list', scope.file_list)

            });

        },
    },
    watch:{

    },
    created: function () {

    },
    mounted: function () {
        this.init_drag_drop()
    }
})