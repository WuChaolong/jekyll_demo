init();
function init(){
    var postion = readCookie("nav-postion")||"top";
    setNav(postion);
    onSettings(postion);
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
            }
            console.log(this.value)
        };
        if(radios[i].value==postion){
            radios[i].checked = true;
        }
    }
}
function setNav(postion){
     document.body.classList=[];
     document.body.classList.add("nav-"+postion);
     createCookie("nav-postion",postion);
	 if(postion !=  "top"){
		 $("nav").addClass("pad20");
		 $("body").removeClass("padtop70");
		 //$("#icon-cont>ul").addClass("marginbt50");
		 if($("#icon-cont>ul>li").hasClass("shiftleft")){
			$("#icon-cont>ul>li").removeClass("shiftleft");
			$("#icon-cont>ul").removeClass("dishoriz");
		}
		(!document.getElementById("icon-cont").classList.contains('centeralign'))?document.getElementById("icon-cont").className += " centeralign":null;
	 }else{
		document.getElementById("icon-cont").classList.remove("centeralign");
		$("#icon-cont>ul>li").addClass("shiftleft");
		$("#icon-cont>ul").addClass("dishoriz");
		//$("#icon-cont>ul").removeClass("marginbt50");
		$("nav").removeClass("pad20");
		$("body").addClass("padtop70");
	 }
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