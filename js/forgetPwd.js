window.onload=function()
{
	findPwd.onclick=function()
	{
		var db=openDatabase("customer","1.0","顾客信息",2*1024*1024);
		checkIfNone();
		var userName=document.getElementById("userName").value;
		var email=document.getElementById("email").value;
		var realName=document.getElementById("realName").value;
		var phoneNumber=document.getElementById("phoneNumber").value;
		db.readTransaction(function(tx)
		{
			tx.executeSql("select userName,email,realName,phoneNumber,userPwd from customerDetail",[],
			function(tx,result)
			{
				var flag=0;
				for(var i=0;i<result.rows.length;i++)
				{
					if(userName==result.rows[i].userName&&email==result.rows[i].email&&realName==result.rows[i].realName&&phoneNumber==result.rows[i].phoneNumber)
					{
						flag=1;
						document.getElementsByName("findPwd")[0].innerHTML="您的密码为：";
						document.getElementsByName("findPwd")[1].innerHTML=result.rows[i].userPwd;
						break;
					}
				}
				if(flag==1)
					alert("验证成功");
				else
					alert("验证失败");
			},
			function(tx,error)
			{
				alert("数据的读取失败"+error.message);
			});
		});
	}
	changePwd.onclick=function()
	{
		var db=openDatabase("customer","1.0","顾客信息",2*1024*1024);
		var userName=document.getElementById("userName").value;
		var email=document.getElementById("email").value;
		var realName=document.getElementById("realName").value;
		var phoneNumber=document.getElementById("phoneNumber").value;
		db.readTransaction(function(tx)
		{
			tx.executeSql("select userName,email,realName,phoneNumber,userPwd from customerDetail",[],
			function(tx,result)
			{
				var flag=0;
				for(var i=0;i<result.rows.length;i++)
				{
					if(userName==result.rows[i].userName&&email==result.rows[i].email&&realName==result.rows[i].realName&&phoneNumber==result.rows[i].phoneNumber)
					{
						flag=1;
						document.getElementsByName("changePwd")[0].innerHTML="请输入密码：";
						document.getElementsByName("changePwd")[1].innerHTML="<input type='password' id='userPwd' placeholder='请输入您要更改的密码'/>";
						document.getElementsByName("confirmPwd")[0].innerHTML="请确认密码：";
						document.getElementsByName("confirmPwd")[1].innerHTML="<input type='password' id='userRePwd' placeholder='请确认您的密码'/>";
						document.getElementById("saveUserPwd").innerHTML="<input class='button' onclick='save()' type='button' value='保存更改'></input>";
					}
				}
				if(flag==1)
					alert("验证成功");
				else
					alert("验证失败");
			},
			function(tx,error)
			{
				alert("数据的读取失败"+error.message);
			});
		});
	}
}
//保存密码
function save()
{
	var db=openDatabase("customer","1.0","顾客信息",2*1024*1024);
	var userRePwd=document.getElementById("userRePwd").value;
	var userName=document.getElementById("userName").value;
	if(checkPassword())
	{
		if(confirm("是否确认修改密码"))
		{
			var sql="update customerDetail set userPwd='"+userRePwd+"' where userName='"+userName+"'";
			//alert(userRePwd);
			db.transaction(function(tx)
			{
				tx.executeSql(sql,[],
				function(tx,result)
				{
					document.getElementsByName("changePwd")[0].innerHTML="&nbsp;";
					document.getElementsByName("changePwd")[1].innerHTML="&nbsp;";
					document.getElementsByName("confirmPwd")[0].innerHTML="&nbsp;";
					document.getElementsByName("confirmPwd")[1].innerHTML="&nbsp;";
					//该条语句实现后更改密码功能不可用了
					document.getElementById("saveUserPwd").innerHTML="<input class='button' id='changePwd' type='button' value='更改密码'></input>"
					alert("密码成功更改");
				},
				function(tx,error)
				{
					alert("数据保存失败"+error.message);
				});
			});
		}
		else
			return false;
	}
	//confirm("是否确认修改密码");
}
//检查各项空是否为空
function checkIfNone()
{
	if(document.getElementById("userName").value == "") 
	{
		alert("用户名不能为空");
		return false;
	} 
	else if(!checkEmail()) 
	{
		return false;
	}
	else if(document.getElementById("realName").value == "")
	{
		alert("真实姓名不能为空");
		return false;
	}
	else if(document.getElementById("phoneNumber").value == "") 
	{
		alert("手机号码不能为空");
		return false;
	} 
	else if(!checkPhNum())
	{
		alert("手机号码格式不正确，请重新输入");
		return false;
	}
}
//检查邮箱地址是否正确
function checkEmail()
{
	var myEmail=document.getElementById("email").value;
	if(myEmail=="")
	{
		alert("邮箱地址不能为空");
		return false;
	}
	else
	{
		var emailReg=new RegExp("^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$");
		if(!emailReg.test(myEmail))
			alert("邮箱格式不正确");
		return emailReg.test(myEmail);
	}
}
//检查手机密码是否正确
function checkPhNum(){
	var num=document.getElementById("phoneNumber").value;
	var mobileReg=new RegExp("1[3|4|5|8][0-9]{9}");
	return mobileReg.test(num);
}
//检查密码格式是否正确
function checkPassword(){
	var userPwd=document.getElementById("userPwd").value;
	var userRePwd=document.getElementById("userRePwd").value;
	if(userPwd=="")
	{
		alert("密码不能为空");
		return false;
	}
	else if(userPwd.length<6||userPwd.length>20)
	{
		alert("密码长度为6~20位，请进行确认！");
		return false;
	}
	else if(userRePwd=="")
	{
		alert("请确认密码，该处不能为空");
		return false;
	}
	else if(userPwd!=userRePwd)
	{
		alert("新密码与确认密码不一致");
		return false;
	}
	if(	/\d/.test(userPwd)&&/[a-z]/i.test(userPwd)||
		/\d/.test(userPwd)&&/[\@\#\$\%\&\*]/.test(userPwd)||
		/[\@\#\$\%\&\*]/.test(userPwd)&&/[a-z]/i.test(userPwd)
	  )
	{
		return true;	
	}
	else
	{
		alert("密码必须是由字母、数字和符号的两种以上组合!");
		return false;	
	}
	return false;
}
