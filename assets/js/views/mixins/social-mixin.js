var social_mixin = {
    data: function(){
      return {

      }
    },
    methods: {
        twitter_init: function(){

            var scope = this;

            window.twttr = (function(d, s, id) {
                var js, fjs = d.getElementsByTagName(s)[0],
                    t = window.twttr || {};
                if (d.getElementById(id)) return t;
                js = d.createElement(s);
                js.id = id;
                js.src = "https://platform.twitter.com/widgets.js";
                fjs.parentNode.insertBefore(js, fjs);

                t._e = [];
                t.ready = function(f) {
                    t._e.push(f);
                };

                return t;
            }(document, "script", "twitter-wjs"));

            function tweetIntentToAnalytics(intentEvent){


                var twitter_data = {
                    'playerIdEncrypted': scope.player_id_encrypted,
                    'visitIdEncrypted': scope.visit_id_encrypted,
                }


                axios.post(api_route + "/twitter-share-run",twitter_data)
                    .then(response => {
                        if(response.data["bonus_entry"] == true) {

                        }
                        else{

                        }
                    })
                    .catch(e => {
                        console.log(e);
                    })
            }
            twttr.ready(function (twttr) {
                twttr.events.bind('tweet', tweetIntentToAnalytics);
            });

        },
        initFB: function(){
            //facebook widget
            window.fbAsyncInit = function() {
                FB.init({
                    appId            : '523412544718938',
                    autoLogAppEvents : false,
                    xfbml            : false,
                    version          : 'v2.9'
                });
            };

            (function(d, s, id){
                var js, fjs = d.getElementsByTagName(s)[0];
                if (d.getElementById(id)) {return;}
                js = d.createElement(s); js.id = id;
                js.src = "//connect.facebook.net/en_US/sdk.js";
                fjs.parentNode.insertBefore(js, fjs);
            } (document, 'script', 'facebook-jssdk'));
        },
        shareFb: function() {
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
            }, function(response) {

                var loginStatus = 'unknown';
                FB.getLoginStatus(function(res){
                    if (typeof res.status !== 'undefined') {
                        loginStatus = res.status;
                    }
                });

                var facebook_data = {
                    'playerIdEncrypted': scope.player_id_encrypted,
                    'visitIdEncrypted': scope.visit_id_encrypted,
                }

                var url = api_route + "/facebook-share-confirm";
                axios.post(url, facebook_data)
                    .then(response => {
                        if(response.data["bonus_entry"] == true) {


                        }
                        else{

                        }
                    })
            });

        },
    },
    created: function(){

    },
    mounted: function(){

        this.initFB()
        this.twitter_init()

    },

}