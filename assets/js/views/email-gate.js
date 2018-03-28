Vue.component('email-gate', {
    name: 'email-gate',
    template:`
   <div class="email-gate">
    
        <form id="gateForm">
            <h1>PLEASE ENTER YOUR E-MAIL ADDRESS AND STATE OD RESIDENCE</h1>
            <div class="input input-left">
                <input type="email" name="email" id="" placeholder="E-MAIL ADDRESS"> 
            </div>
            <div class="input input-right"> 
                <select name="state" id="" placeholder="STATE"> 
                    <option>STATE OF RESIDENCE</option>
                    <option :value="state" v-for="state in states">{{state}}</option>
                </select><br>
            </div>
            <div class="checks">
                <input type="checkbox" class="checks" id="terms" name="tc_accepted"  value="true"/>
                <label for="terms">I agree to the <a href="#" target="_blank">Terms & Conditions</a></label>
                <input type="checkbox" id="email_optin" name="email_optin" value="true" /> 
                <label for="email_optin">Sign me up to receive news and offers via email from Five Points Trading Company</label>
            </div>
            <div class="errorContainer">
                <h2 class="errorText">{{error_text}}</h2> 
            </div>
            <button type="button" class="submitButton" @click="postGateData">Submit</button>
        </form>
    </div>  
    `,
    mixins: [data_mixin],
    data: function () {
        return {
            error_text: ''  
        }
    },
    computed: {},
    props:[],
    methods: {
        postGateData: function(){
            var scope = this;

            var form_data = new FormData(document.getElementById('gateForm'));
            
            axios.post( api_route+'/entry', form_data)
              .then(function (response) {
                    if (response.data.status == 'error') { 
                        scope.error_text = response.data.errors[0];  
                    } else {
                        vm.switchPages(); 
                    }    
              }) 
              .catch(function(error) {
                console.log('siema'); 
              });
        }
    },
    watch:{

    },
    created: function () {

    },
    mounted: function () {

    }
})