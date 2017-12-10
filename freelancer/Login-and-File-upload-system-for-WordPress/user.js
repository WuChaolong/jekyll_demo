function onSignIn(googleUser) {
  var profile = googleUser.getBasicProfile();
  console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
  console.log('Name: ' + profile.getName());
  console.log('Image URL: ' + profile.getImageUrl());
  console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
  console.log('profile:'+JSON.stringify(profile));
  isLogin(profile);
}

function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      console.log('User signed out.');
    });
}
function isLogin(profile){
    var user = document.getElementById("user");
    user.src = profile.getImageUrl();
    user.title = JSON.stringify(profile);
    user.alt = profile.getName();
    document.body.classList.add("is-login");
    var drive = document.getElementById("drive");
    drive.src="https://drive.google.com/drive/folders/1H-V6-ZhGfE93CrMS-qwKXDrGmxMLFjpQ?usp=sharing";
}