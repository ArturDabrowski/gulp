Vue.component('first-view', {
    name: 'first-view', 
    template:`
    
   <div class="first_view">
        <div class="questionsContainer" v-if="questions != ''">
            <div class="questionBox" id="RsQuestions" @mouseover="logoOnRs" @mouseleave="logoOffRs">  
                <img src="../../assets/img/red_stripe-color.png" v-show="logoEnabledRs == true">  
                <img src="../../assets/img/red-stripe.png" v-show="logoDisabledRs==true">     
                <div class="question">{{questions[0].question1[0].question}}</div>  
                <div class="checks">
                    <div v-for="v in questions[0].question1.answers" id="myForm"> 
                        <input type="checkbox" class="chk" :value="v.answer" @change="checkboxes()">
                        <label for="questionOne">{{v.answer}}</label>
                    </div>
                </div>
                <div class="button button-submit">
                    <button @click="sendAnswers('rs')" class="submitButton">Send</button> 
                </div> 
            </div>

            <div class="questionBox" id="BmQuestions" @mouseover="logoOnBm" @mouseleave="logoOffBm">
                <img src="../../assets/img/moretti-color.png" v-show="logoEnabledBm == true">  
                <img src="../../assets/img/moretti.png" v-show="logoDisabledBm==true">  
                <div class="question">{{questions[1].question2[0].question}}</div>
                <div class="checks">
                    <div v-for="v in questions[1].question2.answers" id="myForm">  
                        <input type="checkbox" class="chk" :value="v.answer" @change="checkboxes()"/>
                        <label for="questionOne">{{v.answer}}</label> 
                    </div> 
                </div>
                <div class="button button-submit"> 
                    <button @click="sendAnswers('bm')" class="submitButton">Send</button>
                </div> 
            </div>  
            <div class="questionBox" id="TiQuestions" @mouseover="logoOnTi" @mouseleave="logoOffTi">  
                <img src="../../assets/img/tiger-color.png" v-show="logoEnabledTi == true">  
                <img src="../../assets/img/tiger.png" v-show="logoDisabledTi==true">   
                <div class="question">{{questions[2].question3[0].question}}</div>
                
                    <div v-for="v in questions[2].question3.answers" id="myForm" class="checks">
                        <input type="checkbox" class="chk" :value="v.answer" @change="checkboxes()"/>
                        <label for="questionOne">{{v.answer}}</label>  
                    </div>
                
                <div class="button button-submit"> 
                    <button @click="sendAnswers('ti')" class="submitButton">Send</button> 
                </div> 
            </div>
        </div>
        <div>{{error_text}}</div>
    </div>  
    `,
    mixins: [data_mixin], 
    data: function () {
        return {
            questions: '',
            error_text: '', 
            logoEnabledRs:false, 
            logoDisabledRs:true,
            logoEnabledBm:false, 
            logoDisabledBm:true,
            logoEnabledTi:false, 
            logoDisabledTi:true,
            styleOn: {
                'background-color': 'lightgrey'
              },
            styleOff: {
                'background-color': 'orange'
              }
        }  
    }, 
    computed: {}, 
    props:[], 
    methods: {
        sendAnswers: function(brand){
            var scope = this;
            if (brand === 'rs') {
            var rs_answers = {
                 
                brand: 'red-stripe',
                question_id: this.questions[0].question1[0].id,
                answer: $('#RsQuestions input[type="checkbox"]:checked').val()
            }
            
            axios.post( api_route+'/questions', rs_answers)
              .then(function (response) {
                console.log(response); 
              }) 
              .catch(function(error) {
                console.log(error); 
              }); 
            } 

            if (brand === 'bm') {
                var bm_answers = {
                     
                    brand: 'birra-moretti',
                    question_id: this.questions[1].question2[0].id,
                    answer: $('#BmQuestions input[type="checkbox"]:checked').val()
                }
                
                axios.post( api_route+'/questions', bm_answers)
                  .then(function (response) {
                    console.log(response); 
                  }) 
                  .catch(function(error) {
                    console.log(error); 
                  });
                } 

            if (brand === 'ti') {
                var ti_answers = {
                        
                    brand: 'tiger',
                    question_id: this.questions[2].question3[0].id,
                    answer: $('#TiQuestions input[type="checkbox"]:checked').val()
                }
                
                axios.post( api_route+'/questions', ti_answers)
                    .then(function (response) {
                    console.log(response); 
                    }) 
                    .catch(function(error) {
                    console.log(error); 
                    });
                } 

        },
        checkboxes: function(){
            $('input.chk').on('change', function() {                 
                $('input.chk').not(this).prop('checked', false);  
            });
        },
        logoOnRs: function(){
            this.logoEnabledRs = true;
            this.logoDisabledRs = false;
            return this.styleOn;
        },
        logoOffRs: function(){
            this.logoEnabledRs = false;
            this.logoDisabledRs = true;
            return this.styleOff;
        },
        logoOnBm: function(){
            this.logoEnabledBm = true;
            this.logoDisabledBm = false;
        },
        logoOffBm: function(){
            this.logoEnabledBm = false;
            this.logoDisabledBm = true;
        },
        logoOnTi: function(){
            this.logoEnabledTi = true;
            this.logoDisabledTi = false;
        },
        logoOffTi: function(){
            this.logoEnabledTi = false;
            this.logoDisabledTi = true;
        },
    }, 
    watch:{},
    created: function () {}, 
    mounted: function () { 
        var scope = this;
 
        axios.get(api_route + '/questions')
            .then(function (response) {
                scope.questions = response.data['data'];
                console.log(scope.questions);
            })
            .catch(function (error) {
 
            });

            
            
    }
})  