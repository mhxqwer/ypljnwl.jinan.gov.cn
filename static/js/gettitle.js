var getArgs=(function(){  
	var sc=document.getElementsByTagName('script');  
	var paramsArr=sc[sc.length-1].src.split('?')[1].split('&');  
	var args={},argsStr=[],param,t,name,value;  
	for(var ii=0,len=paramsArr.length;ii<len;ii++){  
		param=paramsArr[ii].split('=');  
		name=param[0],value=param[1];  
		if(typeof args[name]=="undefined"){ //参数尚不存在  
			args[name]=value;  
		}else if(typeof args[name]=="string"){ //参数已经存在则保存为数组  
			args[name]=[args[name]]  
			args[name].push(value);  
		}else{  //已经是数组的  
			args[name].push(value);  
		}  
	}
//组装成json格式  
	args.toString=function(){  
		for(var ii in args) argsStr.push(ii+':'+showArg(args[ii]));  
		return '{'+argsStr.join(',')+'}';  
	}  
	return function(){return args;} //以json格式返回获取的所有参数  
})();

$.ajax({
	url: getArgs()["ajaxUrl"],
	data:{"appid":getArgs()["appid"], 
		"showtip":getArgs()["showtip"], 
		"titlelimit":getArgs()["titlelimit"],
		"webid":getArgs()["webid"],
		"cataid":getArgs()["cataid"],
		"catatype":getArgs()["catatype"],
		"position":getArgs()["position"],
		"infoid":getArgs()["infoid"]},
	dataType: 'json',
	success: function(result) {
		//第一篇的上一篇隐藏，最后一篇的下一篇隐藏
		if(result.position == 'prev'){
			if(result.vc_meg != null && result.vc_meg.length>0){
				$('.prevPageLink').html(result.vc_meg);
				$('.prevPage').show();
			}else{
				$('.prevPage').hide();
			}
		};
		if(result.position == 'next'){
			if(result.vc_meg != null && result.vc_meg.length>0){
				$('.nextPageLink').html(result.vc_meg);
				$('.nextPage').show();
			}else{
				$('.nextPage').hide();
			}
		}
	},
	complete: function(XMLHttpRequest, textStatus) {
		 this; // 调用本次AJAX请求时传递的options参数
	}
});
