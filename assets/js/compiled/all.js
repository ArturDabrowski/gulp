'use strict';

// var axiosConfig = {
//     headers: {
//         'Access-Control-Allow-Origin':'*',
//         'Access-Control-Allow-Methods': "POST, GET, PUT, DELETE, OPTIONS",
//         'Access-Control-Allow-Headers': 'X-Requested-With, content-type, X-Token, x-token'
//     }
// };

Vue.config.debug = true;
Vue.config.devtools = true;

// Vue.config.productionTip = false // should disable warnings in prod but not work
var EventBus = new Vue();

var event_bus = {
    data: function data() {
        return {
            active_view: 'first-view',
            // active_view: 'drag-drop-example',
            global_data: {}
        };
    },
    methods: {
        dispatch_save_data_event: function dispatch_save_data_event(key, data) {
            // function save data to global store
            EventBus.$emit('global-data-save', { key: key, data: data });
        },
        save_data: function save_data(key, new_data) {
            // calback for dispatch_save_data_event
            // this.global_data[key] = new_data
            this.$set(this.global_data, key, new_data);
        },
        dispatch_event: function dispatch_event(event_name, data) {
            // function to dispatch common events, example 'show loader'
            EventBus.$emit(event_name, data);
        },
        change_view: function change_view(view) {
            this.active_view = view;
        }
    },
    created: function created() {
        var scope = this;

        EventBus.$on('global-data-save', function (event_data) {
            scope.save_data(event_data['key'], event_data['data']);
        });

        EventBus.$on('change-view', function (view) {
            scope.change_view(view);
        });
    }
};
var social_mixin = {
    data: function data() {
        return {};
    },
    methods: {
        twitter_init: function twitter_init() {

            var scope = this;

            window.twttr = function (d, s, id) {
                var js,
                    fjs = d.getElementsByTagName(s)[0],
                    t = window.twttr || {};
                if (d.getElementById(id)) return t;
                js = d.createElement(s);
                js.id = id;
                js.src = "https://platform.twitter.com/widgets.js";
                fjs.parentNode.insertBefore(js, fjs);

                t._e = [];
                t.ready = function (f) {
                    t._e.push(f);
                };

                return t;
            }(document, "script", "twitter-wjs");

            function tweetIntentToAnalytics(intentEvent) {

                var twitter_data = {
                    'playerIdEncrypted': scope.player_id_encrypted,
                    'visitIdEncrypted': scope.visit_id_encrypted
                };

                axios.post(api_route + "/twitter-share-run", twitter_data).then(function (response) {
                    if (response.data["bonus_entry"] == true) {} else {}
                }).catch(function (e) {
                    console.log(e);
                });
            }
            twttr.ready(function (twttr) {
                twttr.events.bind('tweet', tweetIntentToAnalytics);
            });
        },
        initFB: function initFB() {
            //facebook widget
            window.fbAsyncInit = function () {
                FB.init({
                    appId: '523412544718938',
                    autoLogAppEvents: false,
                    xfbml: false,
                    version: 'v2.9'
                });
            };

            (function (d, s, id) {
                var js,
                    fjs = d.getElementsByTagName(s)[0];
                if (d.getElementById(id)) {
                    return;
                }
                js = d.createElement(s);js.id = id;
                js.src = "//connect.facebook.net/en_US/sdk.js";
                fjs.parentNode.insertBefore(js, fjs);
            })(document, 'script', 'facebook-jssdk');
        },
        shareFb: function shareFb() {
            var scope = this;

            FB.ui({
                method: 'share_open_graph',
                action_type: 'og.likes',
                display: 'dialog',
                action_properties: JSON.stringify({
                    object: {
                        'og:url': 'https://lim.bz/labs/uncap_the_world_dev/utw/red_stripe.html',
                        'og:title': 'Red stripe',
                        'og:description': '',
                        'og:image': 'https://lim.bz/labs/uncap_the_world_dev/utw/assets/img/bg.jpg'
                    }
                })
            }, function (response) {

                var loginStatus = 'unknown';
                FB.getLoginStatus(function (res) {
                    if (typeof res.status !== 'undefined') {
                        loginStatus = res.status;
                    }
                });

                var facebook_data = {
                    'playerIdEncrypted': scope.player_id_encrypted,
                    'visitIdEncrypted': scope.visit_id_encrypted
                };

                var url = api_route + "/facebook-share-confirm";
                axios.post(url, facebook_data).then(function (response) {
                    if (response.data["bonus_entry"] == true) {} else {}
                });
            });
        }
    },
    created: function created() {},
    mounted: function mounted() {

        this.initFB();
        this.twitter_init();
    }

};
var api_route = 'https://uncap-stage.lim.bz';

var data_mixin = {
    data: function data() {
        return {
            states: ['AK', 'AL', 'AR', 'AZ', 'CA', 'CO', 'CT', 'DC', 'DE', 'FL', 'GA', 'HI', 'IA', 'ID', 'IL', 'IN', 'KS', 'KY', 'LA', 'MA', 'MD', 'ME', 'MI', 'MN', 'MO', 'MS', 'MT', 'NC', 'ND', 'NE', 'NH', 'NJ', 'NM', 'NV', 'NY', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VA', 'VT', 'WA', 'WI', 'WV', 'WY']
        };
    }
};
var drag_drop_input = {
    methods: {

        add_dragged_images: function add_dragged_images(formdata) {

            var scope = this;

            Array.prototype.forEach.call(scope.global_data.file_list, function (file) //**pętla po plikach, formdata append, pobiera name z input[file] jako klucz i dodaje plik
            {
                formdata.append('images[]', file);
            });
        },
        clear_files: function clear_files() {
            this.dispatch_save_data_event('file_list', '');
        }
    },
    mounted: function mounted() {
        this.dispatch_save_data_event('file_list', '');
    }
};
Vue.component('drag-drop-input', {
    name: 'drag-drop-input',
    template: '\n   <div class="drag-drop-component upload_photo">\n        \n        <input type="file" name="files[]" id="file" class="box__file" multiple />\n                    \n        <div class="upload_photo__container clearfix">\n            <div class="upload_photo__list" v-for="file in global_data.file_list">\n                <p>{{file.name}}</p>\n                <p>{{(file.size/1048576).toFixed(2)}} MB</p>\n            </div>\n        </div>\n                            \n        <div class="drag_drop">\n            <div class="drag_drop__icon">\n               <img src="assets/img/drag_drop.png" alt="">\n                <p>Drag Files to Upload</p>\n            </div>\n        </div>\n    \n        \n    </div>  \n    ',
    mixins: [event_bus, drag_drop_input],
    data: function data() {
        return {};
    },
    computed: {},
    props: [],
    methods: {
        init_drag_drop: function init_drag_drop() {
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

                scope.dispatch_save_data_event('file_list', scope.file_list);
            });
        }
    },
    watch: {},
    created: function created() {},
    mounted: function mounted() {
        this.init_drag_drop();
    }
});
Vue.component('drag-drop-example', {
    name: 'drag-drop-example',
    template: '\n   <div class="drag_drop_example">\n        <form style="padding: 20px" enctype="multipart/form-data" novalidate>\n        \n            <drag-drop-input></drag-drop-input>\n            \n            <input name="title" type="text" placeholder="Title" style="width: 100%; margin-bottom: 10px">\n            <input name="email" type="email" placeholder="Email" style="width: 100%; margin-bottom: 10px">\n            <input name="autor" type="text" placeholder="Autor" style="width: 100%; margin-bottom: 10px">\n            \n            <button type="button" style="width: 100%" @click="send_form">SUBMIT</button>\n            \n        </form>\n    </div>  \n    ',
    mixins: [event_bus, drag_drop_input],
    data: function data() {
        return {};
    },
    computed: {},
    props: [],
    methods: {
        send_form: function send_form() {
            var scope = this;

            var form_data = new FormData(document.getElementsByTagName('form')[0]);

            scope.add_dragged_images(form_data); // add files to formData

            axios.post('/', form_data).then(function (response) {
                scope.clear_files();
            }).catch(function (error) {
                // scope.clear_files()

            });
        }
    },
    watch: {},
    created: function created() {},
    mounted: function mounted() {}
});
Vue.component('email-gate', {
    name: 'email-gate',
    template: '\n   <div class="email-gate">\n    \n        <form id="gateForm">\n            <h1>PLEASE ENTER YOUR E-MAIL ADDRESS AND STATE OD RESIDENCE</h1>\n            <div class="input input-left">\n                <input type="email" name="email" id="" placeholder="E-MAIL ADDRESS"> \n            </div>\n            <div class="input input-right"> \n                <select name="state" id="" placeholder="STATE"> \n                    <option>STATE OF RESIDENCE</option>\n                    <option :value="state" v-for="state in states">{{state}}</option>\n                </select><br>\n            </div>\n            <div class="checks">\n                <input type="checkbox" class="checks" id="terms" name="tc_accepted"  value="true"/>\n                <label for="terms">I agree to the <a href="#" target="_blank">Terms & Conditions</a></label>\n                <input type="checkbox" id="email_optin" name="email_optin" value="true" /> \n                <label for="email_optin">Sign me up to receive news and offers via email from Five Points Trading Company</label>\n            </div>\n            <div class="errorContainer">\n                <h2 class="errorText">{{error_text}}</h2> \n            </div>\n            <button type="button" class="submitButton" @click="postGateData">Submit</button>\n        </form>\n    </div>  \n    ',
    mixins: [data_mixin],
    data: function data() {
        return {
            error_text: ''
        };
    },
    computed: {},
    props: [],
    methods: {
        postGateData: function postGateData() {
            var scope = this;

            var form_data = new FormData(document.getElementById('gateForm'));

            axios.post(api_route + '/entry', form_data).then(function (response) {
                if (response.data.status == 'error') {
                    scope.error_text = response.data.errors[0];
                } else {
                    vm.switchPages();
                }
            }).catch(function (error) {
                console.log('siema');
            });
        }
    },
    watch: {},
    created: function created() {},
    mounted: function mounted() {}
});
Vue.component('first-view', {
    name: 'first-view',
<<<<<<< HEAD
    template: '\n    \n   <div class="first_view">\n       <div class="orangeBarContainer">\n            <div class="questionsContainer" v-if="questions != \'\'">\n                <div class="questionBox" id="RsQuestions" >  \n                    <img src="../../assets/img/red_stripe-color.png" class="imgColor">  \n                    <img src="../../assets/img/red-stripe.png" class="imgNoneColor" >      \n                    <div class="question">{{questions[0].question1[0].question}}</div>  \n                    <div class="checks answersBox">\n                        <div v-for="v in questions[0].question1.answers" id="myForm"> \n                            <input type="checkbox" class="chk" :value="v.answer" @change="checkboxes()">\n                            <label for="questionOne">{{v.answer}}</label>\n                        </div>\n                    </div>\n                    <div class="button button-submit">\n                        <button @click="sendAnswers(\'rs\')" class="submitButton questionFormButton">Send</button> \n                    </div> \n                </div>\n\n                <div class="questionBox" id="BmQuestions">\n                    <img src="../../assets/img/moretti-color.png" class="imgColor" >  \n                    <img src="../../assets/img/moretti.png" class="imgNoneColor">   \n                    <div class="question">{{questions[1].question2[0].question}}</div>\n                    <div class="checks answersBox"> \n                        <div v-for="v in questions[1].question2.answers" id="myForm">  \n                            <input type="checkbox" class="chk" :value="v.answer" @change="checkboxes()"/>\n                            <label for="questionOne">{{v.answer}}</label>  \n                        </div> \n                    </div>\n                    <div class="button button-submit"> \n                        <button @click="sendAnswers(\'bm\')" class="submitButton questionFormButton">Send</button>\n                    </div> \n                </div>   \n                <div class="questionBox" id="TiQuestions" >  \n                    <img src="../../assets/img/tiger-color.png" class="imgColor">  \n                    <img src="../../assets/img/tiger.png" class="imgNoneColor">   \n                    <div class="question">{{questions[2].question3[0].question}}</div>\n                    <div class="checks answersBox"> \n                        <div v-for="v in questions[2].question3.answers" id="myForm" class="checks">\n                            <input type="checkbox" class="chk" :value="v.answer" @change="checkboxes()"/>\n                            <label for="questionOne">{{v.answer}}</label>  \n                        </div>\n                    </div>  \n                    <div class="button button-submit">  \n                        <button @click="sendAnswers(\'ti\')" class="submitButton questionFormButton">Send</button>  \n                    </div> \n                </div>\n            </div> \n            <div class="bottlesContainer">\n                <div>\n                    <img src="/assets/img/right_arrow.png" @click="changeBottle" class="arrow">\n                    <!-- <img src="/assets/img/right_arrow.png"> -->\n                    <img src="/assets/img/red-stripe-bottle.png" class="bottleCenter" :class="i==0?\'bottleVisible\':\'bottleInvisible\'"> \n                    <img src="/assets/img/tiger-bottle.png" class="bottleCenter" :class="i==1?\'bottleVisible\':\'bottleInvisible\'">\n                    <img src="/assets/img/moretti-bottle.png" class="bottleCenter" :class="i==2?\'bottleVisible\':\'bottleInvisible\'">\n                </div> \n                <div class="bottleLeftContainer"> \n                    <img src="/assets/img/orange_moretti.png" class="bottleLeft" :class="i==0?\'bottleVisible\':\'bottleInvisible\'">   \n                    <img src="/assets/img/orange_red_stripe.png" class="bottleLeft" :class="i==1?\'bottleVisible\':\'bottleInvisible\'">\n                    <img src="/assets/img/orange_tiger.png" class="bottleLeft" :class="i==2?\'bottleVisible\':\'bottleInvisible\'">\n                </div>\n                <div class="bottleRightContainer">\n                    <img src="/assets/img/orange_tiger.png" class="bottleRight" :class="i==0?\'bottleVisible\':\'bottleInvisible\'">    \n                    <img src="/assets/img/orange_moretti.png" class="bottleRight" :class="i==1?\'bottleVisible\':\'bottleInvisible\'">\n                    <img src="/assets/img/orange_red_stripe.png" class="bottleRight" :class="i==2?\'bottleVisible\':\'bottleInvisible\'">\n                </div> \n            </div> \n        </div> \n        <div class="bottomSection">\n                <div>\n                     \n                </div> \n                <div class="">  \n                    \n                </div>\n                <div class="">\n                    \n                </div> \n            </div> \n        <div>{{error_text}}</div>\n    </div>   \n    ',
    mixins: [data_mixin],
    data: function data() {
        return {
            i: 0,
            questions: '',
            error_text: ''
=======
    template: '\n    \n   <div class="first_view">\n        <div class="questionsContainer" v-if="questions != \'\'">\n            <div class="questionBox" id="RsQuestions" @mouseover="logoOnRs" @mouseleave="logoOffRs">  \n                <img src="../../assets/img/red_stripe-color.png" v-show="logoEnabledRs == true">  \n                <img src="../../assets/img/red-stripe.png" v-show="logoDisabledRs==true">     \n                <div class="question">{{questions[0].question1[0].question}}</div>  \n                <div class="checks">\n                    <div v-for="v in questions[0].question1.answers" id="myForm"> \n                        <input type="checkbox" class="chk" :value="v.answer" @change="checkboxes()">\n                        <label for="questionOne">{{v.answer}}</label>\n                    </div>\n                </div>\n                <div class="button button-submit">\n                    <button @click="sendAnswers(\'rs\')" class="submitButton">Send</button> \n                </div> \n            </div>\n\n            <div class="questionBox" id="BmQuestions" @mouseover="logoOnBm" @mouseleave="logoOffBm">\n                <img src="../../assets/img/moretti-color.png" v-show="logoEnabledBm == true">  \n                <img src="../../assets/img/moretti.png" v-show="logoDisabledBm==true">  \n                <div class="question">{{questions[1].question2[0].question}}</div>\n                <div class="checks">\n                    <div v-for="v in questions[1].question2.answers" id="myForm">  \n                        <input type="checkbox" class="chk" :value="v.answer" @change="checkboxes()"/>\n                        <label for="questionOne">{{v.answer}}</label> \n                    </div> \n                </div>\n                <div class="button button-submit"> \n                    <button @click="sendAnswers(\'bm\')" class="submitButton">Send</button>\n                </div> \n            </div>  \n            <div class="questionBox" id="TiQuestions" @mouseover="logoOnTi" @mouseleave="logoOffTi">  \n                <img src="../../assets/img/tiger-color.png" v-show="logoEnabledTi == true">  \n                <img src="../../assets/img/tiger.png" v-show="logoDisabledTi==true">   \n                <div class="question">{{questions[2].question3[0].question}}</div>\n                \n                    <div v-for="v in questions[2].question3.answers" id="myForm" class="checks">\n                        <input type="checkbox" class="chk" :value="v.answer" @change="checkboxes()"/>\n                        <label for="questionOne">{{v.answer}}</label>  \n                    </div>\n                \n                <div class="button button-submit"> \n                    <button @click="sendAnswers(\'ti\')" class="submitButton">Send</button> \n                </div> \n            </div>\n        </div>\n        <div>{{error_text}}</div>\n    </div>  \n    ',
    mixins: [data_mixin],
    data: function data() {
        return {
            questions: '',
            error_text: '',
            logoEnabledRs: false,
            logoDisabledRs: true,
            logoEnabledBm: false,
            logoDisabledBm: true,
            logoEnabledTi: false,
            logoDisabledTi: true,
            styleOn: {
                'background-color': 'lightgrey'
            }
>>>>>>> 5d61e9188ce1147cb0dd9de404b7bca2696bd7e4
        };
    },
    computed: {},
    props: [],
    methods: {
        sendAnswers: function sendAnswers(brand) {
            var scope = this;
            if (brand === 'rs') {
                var rs_answers = {

                    brand: 'red-stripe',
                    question_id: this.questions[0].question1[0].id,
                    answer: $('#RsQuestions input[type="checkbox"]:checked').val()
                };

                axios.post(api_route + '/questions', rs_answers).then(function (response) {
                    console.log(response);
                }).catch(function (error) {
                    console.log(error);
                });
            }

            if (brand === 'bm') {
                var bm_answers = {

                    brand: 'birra-moretti',
                    question_id: this.questions[1].question2[0].id,
                    answer: $('#BmQuestions input[type="checkbox"]:checked').val()
                };

                axios.post(api_route + '/questions', bm_answers).then(function (response) {
                    console.log(response);
                }).catch(function (error) {
                    console.log(error);
                });
            }

            if (brand === 'ti') {
                var ti_answers = {

                    brand: 'tiger',
                    question_id: this.questions[2].question3[0].id,
                    answer: $('#TiQuestions input[type="checkbox"]:checked').val()
                };

                axios.post(api_route + '/questions', ti_answers).then(function (response) {
                    console.log(response);
                }).catch(function (error) {
                    console.log(error);
                });
            }
        },
        checkboxes: function checkboxes() {
            $('input.chk').on('change', function () {
                $('input.chk').not(this).prop('checked', false);
            });
        },
<<<<<<< HEAD
        changeBottle: function changeBottle() {
            if (this.i < 2) {
                this.i++;
            } else {
                this.i = 0;
            }
=======
        logoOnRs: function logoOnRs() {
            this.logoEnabledRs = true;
            this.logoDisabledRs = false;
        },
        logoOffRs: function logoOffRs() {
            this.logoEnabledRs = false;
            this.logoDisabledRs = true;
        },
        logoOnBm: function logoOnBm() {
            this.logoEnabledBm = true;
            this.logoDisabledBm = false;
        },
        logoOffBm: function logoOffBm() {
            this.logoEnabledBm = false;
            this.logoDisabledBm = true;
        },
        logoOnTi: function logoOnTi() {
            this.logoEnabledTi = true;
            this.logoDisabledTi = false;
        },
        logoOffTi: function logoOffTi() {
            this.logoEnabledTi = false;
            this.logoDisabledTi = true;
>>>>>>> 5d61e9188ce1147cb0dd9de404b7bca2696bd7e4
        }
    },
    watch: {},
    created: function created() {},
    mounted: function mounted() {
        var scope = this;

        axios.get(api_route + '/questions').then(function (response) {
            scope.questions = response.data['data'];
            console.log(scope.questions);
        }).catch(function (error) {});
    }
});
var vm = new Vue({
    el: '#front-app',
    mixins: [data_mixin],
    data: {
        active_view: 'email-gate'
        // activeView: 'first-view',
    },
    computed: {},
    methods: {
        switchPages: function switchPages() {

            this.active_view = 'first-view';
            console.log('olaboga');
            console.log(this.active_view);
        }

    },
    watch: {},
    created: function created() {
        axios.get(api_route + '/entry').then(function (response) {
            // console.log(response);

        }).catch(function (error) {});
    },
    mounted: function mounted() {

        $('.mobile-nav-ico').on('click', function () {
            $('.full-menu').toggleClass('open');
        });
    }
});