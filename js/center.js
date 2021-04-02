function changePhotos(small)
{
	var bigOne=document.getElementById("bigOnes");
	bigOne.src=small.src;
	var list=document.getElementById("photoList");
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
function changeDetails(details)
{
	//alert("成功调用");
	var detail=document.getElementById("tab").getElementsByTagName("li");
	for(var i=0;i<detail.length;i++)
		detail[i].className="";
	details.className="tab_active";
}
window.onload=function()
{
	if(localStorage.getItem("userNames"))
	{
		document.getElementById("onloaded").innerHTML="&nbsp;"+localStorage.getItem("userNames")+"&nbsp;";
		document.getElementById("onloaded").style="font-size:30px;";
	}
}
