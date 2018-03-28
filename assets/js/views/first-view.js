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
                        <div v-for="v in questions[0].question1.answers"> 
                            <input type="checkbox" class="chk1" :value="v.answer" :id="v.answer" @change="checkboxes()">
                            <label :for="v.answer">{{v.answer}}</label>  
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
                        <div v-for="v in questions[1].question2.answers" >  
                            <input type="checkbox" class="chk2" :value="v.answer" :id="v.answer" @change="checkboxes()"/>
                            <label :for="v.answer">{{v.answer}}</label>  
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
                        <div v-for="v in questions[2].question3.answers" class="checks">
                            <input type="checkbox" class="chk3" :value="v.answer" :id="v.answer"  @change="checkboxes()"/>
                            <label :for="v.answer">{{v.answer}}</label>  
                        </div>
                    </div>  
                    <div class="button button-submit">  
                        <button @click="sendAnswers('ti')" class="submitButton questionFormButton">Send</button>  
                    </div> 
                </div>
            </div> 
            <div class="bottlesContainer">
                <div class="bottleCenterContainer">
                    <img src="/assets/img/right_arrow.png" @click="changeBottleRight" class="arrow arrow-right arrow-white">
                    <img src="/assets/img/right_arrow_grey.png" @click="changeBottleRight" class="arrow arrow-right arrow-grey">
                    <img src="/assets/img/right_arrow.png" @click="changeBottleLeft" class="arrow arrow-left arrow-white">
                    <img src="/assets/img/right_arrow_grey.png" @click="changeBottleLeft" class="arrow arrow-left arrow-grey">
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
                <div class="bottomSectionDescription" v-if="i==0">  
                     <h2><b>RED STRIPE</b></h2>
                     <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. A adipisci assumenda autem cum dicta dolorem earum eligendi eos explicabo magnam magni molestias odio officiis omnis provident quas quasi quis quod ratione rerum sunt, tenetur vitae! Amet consequuntur cupiditate exercitationem labore omnis pariatur quibusdam quos velit veniam voluptates. Est, eveniet magnam, minima natus necessitatibus neque numquam obcaecati quaerat quis recusandae saepe tenetur veniam. Autem expedita inventore laudantium quam quo. Animi cumque eos exercitationem .</p>
                     <h2><b>ABOUT US</b></h2>
                     <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Beatae commodi debitis eum incidunt minima saepe sequi vitae voluptate? Ab at consectetur corporis deleniti dignissimos doloribus, error expedita facilis hic id impedit inventore magni necessitatibus nostrum optio possimus quidem ratione reprehenderit repudiandae sint sit totam voluptas voluptates. Alias architecto at blanditiis cum cupiditate dolor dolores exercitationem explicabo fuga repellendus! Accusantium cum cupiditate, dicta doloremque dolores eligendi, eveniet facilis minima molestiae pariatur perferendis praesentium reprehenderit vero? Accusamus ex, ipsam minima molestias nemo neque qui! Architecto, assumenda beatae consequatur corporis delectus dolore, doloribus, eos natus necessitatibus pariatur praesentium ratione repellat vero voluptatem voluptates.</p>
                     <img src="/assets/img/red_stripe_post_card.png">
                </div> 
                <div class="bottomSectionDescription" v-else-if="i==1">  
                <h2><b>TIGER</b></h2>
                     <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. A adipisci assumenda autem cum dicta dolorem earum eligendi eos explicabo magnam magni molestias odio officiis omnis provident quas quasi quis quod ratione rerum sunt, tenetur vitae! Amet consequuntur cupiditate exercitationem labore omnis pariatur quibusdam quos velit veniam voluptates. Est, eveniet magnam, minima natus necessitatibus neque numquam obcaecati quaerat quis recusandae saepe tenetur veniam. Autem expedita inventore laudantium quam quo. Animi cumque eos exercitationem .</p>
                     <h2><b>ABOUT US</b></h2>
                     <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Beatae commodi debitis eum incidunt minima saepe sequi vitae voluptate? Ab at consectetur corporis deleniti dignissimos doloribus, error expedita facilis hic id impedit inventore magni necessitatibus nostrum optio possimus quidem ratione reprehenderit repudiandae sint sit totam voluptas voluptates. Alias architecto at blanditiis cum cupiditate dolor dolores exercitationem explicabo fuga repellendus! Accusantium cum cupiditate, dicta doloremque dolores eligendi, eveniet facilis minima molestiae pariatur perferendis praesentium reprehenderit vero? Accusamus ex, ipsam minima molestias nemo neque qui! Architecto, assumenda beatae consequatur corporis delectus dolore, doloribus, eos natus necessitatibus pariatur praesentium ratione repellat vero voluptatem voluptates.</p>
                     <img src="/assets/img/tiger_post_card.png">
                </div>
                <div class="bottomSectionDescription" v-else> 
                <h2><b>BIRRA MORETTI</b></h2>
                     <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. A adipisci assumenda autem cum dicta dolorem earum eligendi eos explicabo magnam magni molestias odio officiis omnis provident quas quasi quis quod ratione rerum sunt, tenetur vitae! Amet consequuntur cupiditate exercitationem labore omnis pariatur quibusdam quos velit veniam voluptates. Est, eveniet magnam, minima natus necessitatibus neque numquam obcaecati quaerat quis recusandae saepe tenetur veniam. Autem expedita inventore laudantium quam quo. Animi cumque eos exercitationem .</p>
                     <h2><b>ABOUT US</b></h2>
                     <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Beatae commodi debitis eum incidunt minima saepe sequi vitae voluptate? Ab at consectetur corporis deleniti dignissimos doloribus, error expedita facilis hic id impedit inventore magni necessitatibus nostrum optio possimus quidem ratione reprehenderit repudiandae sint sit totam voluptas voluptates. Alias architecto at blanditiis cum cupiditate dolor dolores exercitationem explicabo fuga repellendus! Accusantium cum cupiditate, dicta doloremque dolores eligendi, eveniet facilis minima molestiae pariatur perferendis praesentium reprehenderit vero? Accusamus ex, ipsam minima molestias nemo neque qui! Architecto, assumenda beatae consequatur corporis delectus dolore, doloribus, eos natus necessitatibus pariatur praesentium ratione repellat vero voluptatem voluptates.</p>
                     <img src="/assets/img/5_points_elements-08.png">
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
            $('input.chk1').on('change', function() {                 
                $('input.chk1').not(this).prop('checked', false);  
            });
            $('input.chk2').on('change', function() {                 
                $('input.chk2').not(this).prop('checked', false);  
            });
            $('input.chk3').on('change', function() {                 
                $('input.chk3').not(this).prop('checked', false);  
            });
        }, 
            changeBottleLeft: function(){
                if(this.i < 2){
                    this.i++
                } else {
                    this.i = 0; 
                }
            },
            changeBottleRight: function(){
                if(this.i > 0){
                    this.i--;
                } else if (this.i === 0) {
                    this.i = 2;  
                }  
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