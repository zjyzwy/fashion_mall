window.onload=function()
{
	/*
	userName.onclick=function()
	{
		document.getElementById("userName").value="";
	}
	userPwd.onclick=function()
	{
		document.getElementById("userPwd").value="";
	}
	*/
	var userName=document.getElementById("userName");
	var userPwd=document.getElementById("userPwd");
	if(localStorage.getItem("userName"))
	{
		userName.value=localStorage.getItem("userName");
		if(localStorage.getItem("userPwd"))
			userPwd.value=localStorage.getItem("userPwd");
	}
	login.onclick=function()
	{
		var userName=document.getElementById("userName").value;
		var userPwd=document.getElementById("userPwd").value;
		var db=openDatabase("customer","1.0","顾客信息",2*1024*1024);
		//事先打开数据库，避免第一次在该浏览器上使用该数据库报出数据读取失败的错误影响体验
		db.transaction(function(tx)
		{
			tx.executeSql("create table if not exists customerDetail("
							+"userName text not null,"
							+"email text not null,"
							+"userPwd text not null,"
							+"realName text not null,"
							+"userSex text not null,"
							+"phoneNumber integer,"
							+"company text not null,"
							+"content text not null)",[]);
		});
		//判断是否为空
		if(userName=="")
		{
			alert("用户名不能为空");
			return false;
		}
		else if(userPwd=="")
		{
			alert("密码不能为空");
			return false;
		}
		//是否保存密码
		var savePwd=document.getElementById("savePwd");
		if(savePwd.checked==true)
		{
			localStorage.setItem("userName",userName);
			localStorage.setItem("userPwd",userPwd)
		}
		if(savePwd.checked==false)
		{
			localStorage.removeItem("userName",userName);
			localStorage.removeItem("userPwd",userPwd);
		}
		//读取数据，验证用户是否已注册
		db.readTransaction(function(tx)
		{
			tx.executeSql("select userName,userPwd from customerDetail",[],
			function(tx,result)
			{
				var flag=0;
				for(var i=0;i<result.rows.length;i++)
				{
					if(userName==result.rows[i].userName&&userPwd!=result.rows[i].userPwd)
					{
						flag=1;
						break;
					}
					else if(userName==result.rows[i].userName&&userPwd==result.rows[i].userPwd)
					{
						flag=2;
						break;
					}
				}
				if(flag==0)
				{
					alert("该用户未进行注册");
					document.getElementById("userName").placeholder="admin";
					document.getElementById("userName").value="";
					document.getElementById("userPwd").value="";
				}
				else if(flag==1)
				{
					alert("密码输入错误");
					document.getElementById("userPwd").value="";
				}
				else if(flag==2)
				{
					localStorage.setItem("userNames",userName);  //用于改变登陆后的页面，将登陆改写为用户名
					location.href="index.html";
				}
			},
			function(tx,error)
			{
				alert("数据读取失败"+error.message);
			});
		});
	}
}

