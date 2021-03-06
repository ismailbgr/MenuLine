var $$ = Dom7;

var app = new Framework7({
  root: '#app', // App root element


  name: 'MenuLine', // App name
  theme: 'auto', // Automatic theme detection

  // App root data
  data: function () {
    return {
      user: {
        firstName: 'John',
        lastName: 'Doe',
      },

    };
  },
  // App root methods
  methods: {
    helloWorld: function () {
      app.dialog.alert('Hello World!');
    },
  },
  // App routes
  routes: routes,
});
// Login Screen Demo
$$('#my-login-screen .login-button').on('click', function () {
  var username = $$('#my-login-screen [name="username"]').val();
  var password = $$('#my-login-screen [name="password"]').val();

  // Close login screen
  app.loginScreen.close('#my-login-screen');

  // Alert username and password
  app.dialog.alert('Username: ' + username + '<br>Password: ' + password);
});

if(location.hash){
  app.dialog.preloader("Yükleniyor")
  
  setTimeout(() => {
    app.views.main.router.navigate("/"+(location.hash).substring(1)+"/")
  app.dialog.close()
  }, 1000);

  
}

function goto(url) {

  app.dialog.preloader("Yükleniyor")
  
  setTimeout(() => {
    app.views.main.router.navigate("/"+(url)+"/")
  app.dialog.close()
  }, 1000);

  
}




function scan() {

  var dynamicPopup = app.popup.create({
    content: `
    <div class="popup">
    <div id="reader"></div>
          </div>
    
    `,
    // Events
    on: {
      open: function (popup) {
        console.log('Popup open');
      },
      opened: function (popup) {
        console.log('Popup opened');
      },
      close:function (popup){

        html5QrCode.stop()

      }
    }
  });

  dynamicPopup.open();

  const html5QrCode = new Html5Qrcode("reader");

var cameraId

Html5Qrcode.getCameras().then(devices => {
  /**
   * devices would be an array of objects of type:
   * { id: "id", label: "label" }
   */
  if (devices && devices.length) {

    cameraId = devices[devices.length-1].id;
    console.log(cameraId)
    // .. use this to start scanning.
  }
}).catch(err => {
  // handle err
}).then(()=>{



  console.log(cameraId)

html5QrCode.start(
cameraId,     // retreived in the previous step.
{
  fps: 30,    // sets the framerate to 10 frame per second
  qrbox: 250 // sets only 250 X 250 region of viewfinder to
              // scannable, rest shaded.
},
qrCodeMessage => {
  // do something when code is read. For example:
  console.log(`QR Code detected: ${qrCodeMessage}`);
  html5QrCode.stop().then(()=>{

    console.log(qrCodeMessage.substring(qrCodeMessage.indexOf("#")))
    dynamicPopup.close();
    
    app.views.main.router.navigate("/"+qrCodeMessage.substring(qrCodeMessage.indexOf("#")+1)+"/");

    
  })
},
errorMessage => {
  // parse error, ideally ignore it. For example:
  console.log(`QR Code no longer in front of camera.`);
})
.catch(err => {
// Start failed, handle it. For example,
console.log(`Unable to start scanning, error: ${err}`);
});




});


}

