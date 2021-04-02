window.onload=function()
{
	/*
	button.onclick=function()
	{
		var db=openDatabase("customer","1.0","顾客信息",2*1024*1024);
		  db.transaction(function(tx)
		  {
		   tx.executeSql("drop table if exists customerDetail");
		  });
	}
	*/
	submiting.onclick=function()
	{
		if(document.getElementById("userName").value=="")
		{
			alert("用户名不能为空");
			return false;
		}
		else if(!checkEmail())
		{
			return false;
		}
		else if(!checkPassword())
		{
		 	return false;
		}
		else if(document.getElementById("realName").value=="")
		{
			alert("真实姓名不能为空");
			return false;
		}
		else if(document.getElementById("phoneNumber").value=="")
		{
			alert("手机号码不能为空");
			return false;
		}
		else if(!checkPhNum())
		{
			alert("手机号码格式不正确，请重新输入");
			return false;
		}
		else if(document.getElementById("company").value=="")
		{
			alert("单位名称不能为空");
			return false;
		}
		var flag=0;
		var i=0;
		for(i=0;i<document.getElementsByName("sex").length;i++)
		{
			if(document.getElementsByName("sex")[i].checked)
			{
				flag=1;
				break;
			}
		}
	//	confirm("是否进行注册");
		__init__();
		saveData(i);
	}
}
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
function checkPhNum(){
	var num=document.getElementById("phoneNumber").value;
	var mobileReg=new RegExp("1[3|4|5|8][0-9]{9}");
	return mobileReg.test(num);
}
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
		alert("请重新确认密码，该处不能为空");
		return false;
	}
	else if(userPwd!=userRePwd)
	{
		alert("新密码和确认密码不一致");
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
//创建数据库用户注册信息表
function __init__()
{
	var db=openDatabase("customer","1.0","顾客信息",2*1024*1024);
	db.transaction(function(tx)
	{
		tx.executeSql("create table if not exists customerDetail("
						+"userName text not null unique,"
						+"email text not null,"
						+"userPwd text not null,"
						+"realName text not null,"
						+"userSex text not null,"
						+"phoneNumber integer,"
						+"company text not null,"
						+"content text not null)",[],
		function(tx,result)
		{
		//	alert("数据库customer创建成功");
		},
		function(tx,error)
		{
			alert("数据库创建失败"+error.message);
		});
	});
	
}
//保存注册信息于数据库
function saveData(i)
{
	var db=openDatabase("customer","1.0","顾客信息",2*1024*1024);
	var userName=document.getElementById("userName").value;
	var email=document.getElementById("email").value;
	var userPwd=document.getElementById("userPwd").value;
	var realName=document.getElementById("realName").value;
	var userSex=document.getElementsByName("sex")[i].value;
	var phoneNumber=document.getElementById("phoneNumber").value;
	var company=document.getElementById("company").value;
	var content=document.getElementById("content").value;
	db.transaction(function(tx)
	{
		tx.executeSql("insert into customerDetail(userName,email,userPwd,realName,userSex,phoneNumber,company,content)values(?,?,?,?,?,?,?,?)",[userName,email,userPwd,realName,userSex,phoneNumber,company,content],
		function(tx,result)
		{
			alert("注册成功");
			document.getElementById("userName").value="";
			document.getElementById("email").value="";
			document.getElementById("userPwd").value="";
			document.getElementById("userRePwd").value="";
			document.getElementById("realName").value="";
			document.getElementsByName("sex")[i].checked=true;
			document.getElementById("phoneNumber").value="";
			document.getElementById("company").value="";
			document.getElementById("address").value="";
			document.getElementById("content").value="";
			location.href="login.html";
		},
		function(tx,error)
		{
			if(error.message=="could not execute statement due to a constraint failure (19 UNIQUE constraint failed: customerDetail.userName)")
				alert("该用户名已被注册");
			else
				alert("注册失败"+error.message);
		});
	});
}
/*
 * 测试代码  IE11,火狐不支持Web SQL 数据库
function getOpenDatabase() 
{
    try 
    {
        //如果支持则返回数据库连接句柄
        if(!!window.openDatabase) 
        {
            return window.openDatabase;
        }
        else
        {            
        	document.getElementById("bosy").innerHTML="不支持Web SQL 数据库";
        }
     }
    	catch (e)
    	{
        	return undefined;   
    	}     
}
*/

