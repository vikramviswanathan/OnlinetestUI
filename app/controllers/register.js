import Ember from 'ember';

import CONFIG from 'online-test/config/environment';

import {
    validator,
    buildValidations
} from 'ember-cp-validations';

var Validations = buildValidations({
    fname: [
        validator('presence', true),
        validator('format', {
            regex: /^[A-Za-z]+$/
        })
    ],

    lname: [
        validator('presence', true),
        validator('format', {
            regex: /^[A-Za-z]+$/
        })
    ],

    phone: [
        validator('presence', true),
        validator('format', {
            type: 'phone',
            min: 10,
            max: 10
        })
    ],

    email: [
        validator('presence', true),
        validator('format', {
            type: 'email'
        })
    ],

    password: [
      validator('presence', true),
      validator('length', {
        min: 4,
        max: 10
      }),
      validator('format', {
        regex: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{4,10}$/,
        message: '{description} must include at least one upper case letter, one lower case letter, and a number'
      }),
      validator('length', {
        isWarning: true,
        min: 6,
        message: 'What kind of weak password is that?'
      })
    ],

    confirmpassword :[
         validator('confirmation', {
    on: 'password',
    message: 'password do not match'
  })
]

});



export default Ember.Controller.extend(Validations, {
    isShowingModal: false,
    showRegResponse: false,
    actions: {
        login1:function(){
            sessionStorage.setItem('token', "TEST");
            this.transitionToRoute('home');

},
        registerUser: function(transition, route) {
        //  transition.abort();
        //transition.refresh();
      //  this.get('target.router').refresh();
            let {
                fname,
                lname,
                phone,
                email,
                password
            } = this.getProperties('fname', 'lname', 'phone', 'email','password');

            var dataString = {
                "fname": fname,
                "lname": lname,
                "phone": phone,
                "email": email,
                "password":password,
            };
            console.log(CONFIG.GOURL);
            //alert('YOU ARE SUCCESSFULLY REGISTERED');
            this.toggleProperty('isShowingModal');
            this.set('loading_image_visibility', "show");
            var mycontroller = this;
            var uid;
            var message;
            return $.ajax({
            url: CONFIG.GOURL+'/registerUser',
            type: 'POST',
            accepts: 'application/json',
            data: JSON.stringify(dataString),
            success: function(response) {
                   console.log(JSON.stringify(response));
                   message=response.message.message;
                     console.log(response.message);
                   mycontroller.set('uid',uid);
                   mycontroller.set('message',message);
                   mycontroller.toggleProperty('showRegResponse');
                   mycontroller.toggleProperty('isShowingModal');
                   mycontroller.set('loading_image_visibility', "hide");
                 //  mycontroller.transitionToRoute('home');              
                  
            },
            error: function(result) {
                   console.log('DEBUG: GET Enquiries Failed');
            }
           });
        },

        regOK: function() {
            //this.get('target.router').refresh();
             var mycontroller = this;
            mycontroller.toggleProperty('showRegResponse');
            mycontroller.transitionToRoute('home');
        }
    }
});