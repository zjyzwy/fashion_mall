function changePhotos(small)
{
	var bigOne=document.getElementById("bigOne");
	bigOne.src=small.src;
	var list=document.getElementById("photosList");
	var lists=list.getElementsByTagName("td");
	for(var i=0;i<lists.length;i++)
	{
		var images=lists[i].getElementsByTagName("img");
		images[0].style.borderColor="";
		images[0].style.borderWidth="0";
	}
	small.style.borderColor="red";
	small.style.borderWidth="2px";
}
//该函数QQ浏览器不可用
function changeDetail(detail)
{
	var details=document.getElementById("detail").getElementsByTagName("td");
	for(var i=0;i<details.length;i++)
		details[i].className="";
	if(detail.innerText=="商家位置")
		document.getElementById("detailPhotos").src="img/food_detail/map.jpg";
	else if(detail.innerText=="购买须知")
		document.getElementById("detailPhotos").src="img/food_detail/xuzhi.jpg";
	else if(detail.innerText=="本单详情")
		document.getElementById("detailPhotos").src="img/food_detail/xq.jpg";
	else if(detail.innerText=="商家介绍")
		document.getElementById("detailPhotos").src="img/food_detail/js0.jpg";
	detail.className="tab_active";
}
function lunBoAll()
{
	i++;
	var myTd=document.getElementById("lunBoAll");
	var lunBoImg=document.getElementById("picture");
	var names=["阳平肥肠","翠峰苑火锅","一块豆腐","善目寸料理店","红花牛火山石烧"];
    var prices=["￥79起","￥45起","￥52起","￥159起","￥88起"];
    var images=["<img src='img/food_show/love1.jpg' />","<img src='img/food_show/love2.jpg' />","<img src='img/food_show/love3.jpg' />",
    			"<img src='img/food_show/love4.jpg' />","<img src='img/food_show/love5.jpg' />"];
/*
    var str1="<span>"+images[i]+"</span><dt><span class='dtName'>"+names[i]+"</span></dt><dt><span class='prices'>"+prices[i]+"</span></dt>";
    var str2="<span>"+images[0]+"</span><dt><span class='dtName'>"+names[0]+"</span></dt><dt><span class='prices'>"+prices[0]+"</span></dt>";
    if(i<5)
    	myTd.innerHTML=str1;
    else
    {
    	myTd.innerHTML=str2;
    	i=0;
    }
*/
	if(i<5)
	{
		lunBoImg.src="img/food_show/love"+(i+1)+".jpg";
		document.getElementsByClassName("dtName")[0].innerHTML=names[i];
		document.getElementsByClassName("prices")[1].innerHTML=prices[i];
	}
    else
    {
    	lunBoImg.src="img/food_show/love1"+".jpg";
    	document.getElementsByClassName("dtName")[0].innerHTML=names[0];
    	document.getElementsByClassName("prices")[1].innerHTML=prices[0];
    	i=0;
    }
}
setInterval("lunBoAll()",1500);
window.onload=function()
{
	if(localStorage.getItem("userNames"))
    {
    	document.getElementById("onloaded").innerHTML="&nbsp;"+localStorage.getItem("userNames")+"&nbsp;";
    	document.getElementById("onloaded").style="font-size:30px;";
    }
}
