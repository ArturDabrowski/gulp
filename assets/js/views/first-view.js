Vue.component('first-view', {
    name: 'first-view', 
    template:`
    
   <div class="first_view">
       <div class="orangeBarContainer">
            <div class="questionsContainer" v-if="questions != ''">
                <div class="questionBox" id="RsQuestions" >  
                    <img src="../../assets/img/red_stripe-color.png" class="imgColor">  
                    <img src="../../assets/img/red-stripe.png" class="imgNoneColor" >      
                    <div class="question">{{questions[0].question1[0].question}}</div>  
                    <div class="checks answersBox">
                        <div v-for="v in questions[0].question1.answers" id="myForm"> 
                            <input type="checkbox" class="chk" :value="v.answer" @change="checkboxes()">
                            <label for="questionOne">{{v.answer}}</label>
                        </div>
                    </div>
                    <div class="button button-submit">
                        <button @click="sendAnswers('rs')" class="submitButton questionFormButton">Send</button> 
                    </div> 
                </div>

                <div class="questionBox" id="BmQuestions">
                    <img src="../../assets/img/moretti-color.png" class="imgColor" >  
                    <img src="../../assets/img/moretti.png" class="imgNoneColor">   
                    <div class="question">{{questions[1].question2[0].question}}</div>
                    <div class="checks answersBox"> 
                        <div v-for="v in questions[1].question2.answers" id="myForm">  
                            <input type="checkbox" class="chk" :value="v.answer" @change="checkboxes()"/>
                            <label for="questionOne">{{v.answer}}</label>  
                        </div> 
                    </div>
                    <div class="button button-submit"> 
                        <button @click="sendAnswers('bm')" class="submitButton questionFormButton">Send</button>
                    </div> 
                </div>   
                <div class="questionBox" id="TiQuestions" >  
                    <img src="../../assets/img/tiger-color.png" class="imgColor">  
                    <img src="../../assets/img/tiger.png" class="imgNoneColor">   
                    <div class="question">{{questions[2].question3[0].question}}</div>
                    <div class="checks answersBox"> 
                        <div v-for="v in questions[2].question3.answers" id="myForm" class="checks">
                            <input type="checkbox" class="chk" :value="v.answer" @change="checkboxes()"/>
                            <label for="questionOne">{{v.answer}}</label>  
                        </div>
                    </div>  
                    <div class="button button-submit">  
                        <button @click="sendAnswers('ti')" class="submitButton questionFormButton">Send</button>  
                    </div> 
                </div>
            </div> 
            <div class="bottlesContainer">
                <div>
                    <img src="/assets/img/right_arrow.png" @click="changeBottle" class="arrow">
                    <!-- <img src="/assets/img/right_arrow.png"> -->
                    <img src="/assets/img/red-stripe-bottle.png" class="bottleCenter" :class="i==0?'bottleVisible':'bottleInvisible'"> 
                    <img src="/assets/img/tiger-bottle.png" class="bottleCenter" :class="i==1?'bottleVisible':'bottleInvisible'">
                    <img src="/assets/img/moretti-bottle.png" class="bottleCenter" :class="i==2?'bottleVisible':'bottleInvisible'">
                </div> 
                <div class="bottleLeftContainer"> 
                    <img src="/assets/img/orange_moretti.png" class="bottleLeft" :class="i==0?'bottleVisible':'bottleInvisible'">   
                    <img src="/assets/img/orange_red_stripe.png" class="bottleLeft" :class="i==1?'bottleVisible':'bottleInvisible'">
                    <img src="/assets/img/orange_tiger.png" class="bottleLeft" :class="i==2?'bottleVisible':'bottleInvisible'">
                </div>
                <div class="bottleRightContainer">
                    <img src="/assets/img/orange_tiger.png" class="bottleRight" :class="i==0?'bottleVisible':'bottleInvisible'">    
                    <img src="/assets/img/orange_moretti.png" class="bottleRight" :class="i==1?'bottleVisible':'bottleInvisible'">
                    <img src="/assets/img/orange_red_stripe.png" class="bottleRight" :class="i==2?'bottleVisible':'bottleInvisible'">
                </div> 
            </div> 
        </div> 
        <div class="bottomSection">
                <div>
                     
                </div> 
                <div class="">  
                    
                </div>
                <div class="">
                    
                </div> 
            </div> 
        <div>{{error_text}}</div>
    </div>   
    `,
    mixins: [data_mixin],   
    data: function () {
        return { 
            i:0,
            questions: '',
            error_text: '', 
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
            changeBottle: function(){
                if(this.i < 2){
                    this.i++
                } else {
                    this.i = 0; 
                }
            }
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