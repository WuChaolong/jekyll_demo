init();
function init(){
    var postion = readCookie("nav-postion")||"top";
    setNav(postion);
    onSettings(postion);
    $('#navbarSupportedContent').on('show.bs.collapse', function () {
      console.log(this);
//       this.parentNode.classList.remove("collapse-hidden");
      this.parentNode.classList.add("collapse-shown");
//       var collapseBackdrop = $('#collapseBackdrop')[0];
//       collapseBackdrop.classList.add("show");


    })
    $('#navbarSupportedContent').on('hide.bs.collapse', function () {
      console.log(this);
      this.parentNode.classList.remove("collapse-shown");
//       this.parentNode.classList.add("collapse-hidden");
//       var collapseBackdrop = $('#collapseBackdrop')[0];
//       collapseBackdrop.classList.remove("show");
    })
}
function onSettings(postion){
    var radios = document.getElementsByName("positionRadios");
    
    var prev = null;
    for(var i = 0;i<radios.length;i++){
        radios[i].onclick = function() {
            (prev)? console.log(prev.value):null;
            if(this !== prev) {
                prev = this;

                setNav(this.value);
//                 animation();
                
                $("#collapseMenu").collapse({"toggle": true, 'parent': '#navaccordion'});
                $("#navbarSupportedContent").collapse({"toggle": true, 'parent': '#navaccordion' });
            }
            console.log(this.value)
        };
        if(radios[i].value==postion){
            radios[i].checked = true;
        }
    }
}
function animation(){
    document.body.classList.add("nav-fill");
    setTimeout('document.body.classList.remove("nav-fill");',500);
}
function setNav(postion){

     document.body.classList=[];
     document.body.classList.add("nav-"+postion);
     createCookie("nav-postion",postion);
}

function createCookie(name,value,days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days*24*60*60*1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + value + expires + "; path=/";
}

function readCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}

function eraseCookie(name) {
    createCookie(name,"",-1);
}