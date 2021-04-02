var nowPicture = 2;
function changePicture(index) 
{
    var focusImg = document.getElementById("change");
    var imgSrc = "img/food_index/food_ad";
    imgSrc =imgSrc+ index + ".jpg";
	focusImg.src = imgSrc;
    var lis = document.getElementsByClassName("focusBox")[0].getElementsByTagName("li"); 
    for (var i = 0; i < lis.length; i++) 
        lis[i].className = "";
    lis[index - 1].className = "cur";
}
function setCurrentPic() 
{
    changePicture(nowPicture);
    nowPicture++;
    if (nowPicture == 5)
        nowPicture= 1;
}
window.onload = function () 
{
    changePicture(1);
    if(localStorage.getItem("userNames"))
    {
    	document.getElementById("onloaded").innerHTML="&nbsp;"+localStorage.getItem("userNames")+"&nbsp;";
    	document.getElementById("onloaded").style="font-size:30px;";
    }
}
window.setInterval("setCurrentPic()",1500);