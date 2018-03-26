 var drag_drop_input= {
    methods: {

        add_dragged_images: function(formdata){

            var scope = this;

            Array.prototype.forEach.call(scope.global_data.file_list, function (file) //**pętla po plikach, formdata append, pobiera name z input[file] jako klucz i dodaje plik
            {
                formdata.append('images[]', file);
            });
        },
        clear_files: function(){
            this.dispatch_save_data_event('file_list', '')
        }
    },
     mounted: function(){
         this.dispatch_save_data_event('file_list','')
     }
 }