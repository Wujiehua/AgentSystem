(function(window,document){
	var myCalendar=function(targetDom,callback){
		this.targetDom=targetDom;
		this.init();
		this.callback=callback;
	}
	myCalendar.prototype={
		init:function(){
			//初始化年份
			var currentYear=new Date().getFullYear();
			var initDate=document.querySelector('#'+this.targetDom).innerText;
			let initYear=initDate.split('-')[0];
			let initMonth=initDate.split('-')[1];
			currentYear=initYear[0]!=""?initYear:currentYear;

			var calendarText=
			"<div class='plan'>"+
				"<div class='year_div'>"+
					"<button id='myCalendar_minus' class='iconfont icon-arrow'></button>"+
						"<p><span id='year'>"+currentYear+"</span>年</p>"+
					"<button id='myCalendar_add' class='iconfont icon-arrow1'></button>"+
				"</div>"+
				"<ul class='month'>"+
					"<li uid='01'>01</li>"+
					"<li uid='02'>02</li>"+
					"<li uid='03'>03</li>"+
					"<li uid='04'>04</li>"+
					"<li uid='05'>05</li>"+
					"<li uid='06'>06</li>"+
					"<li uid='07'>07</li>"+
					"<li uid='08'>08</li>"+
					"<li uid='09'>09</li>"+
					"<li uid='10'>10</li>"+
					"<li uid='11'>11</li>"+
					"<li uid='12'>12</li>"+
				"</ul>"+
				"<div class='btn'>"+
					"<button class='close'>取消</button>"+
					"<button class='sure'>确定</button>"+
				"</div>"+
			"</div>";
			var container=document.createElement('div');
			container.id="myCalendar";
			container.innerHTML=calendarText;
			document.querySelector('body').appendChild(container);
			document.querySelector(".month li[uid='"+initMonth+"']").setAttribute('class','selected');
			this.event();
		},
		event:function(){
			var _this=this;
			document.getElementById('myCalendar_minus').addEventListener('click',function(){
				let year=new Date(document.getElementById('year').innerText).getFullYear();
				document.getElementById('year').innerText=year-1;
			});
			document.getElementById('myCalendar_add').addEventListener('click',function(){
				let year=new Date(document.getElementById('year').innerText).getFullYear();
				document.getElementById('year').innerText=year+1;
			});
			var lis=document.querySelectorAll('.month>li');
			for(var i=0;i<lis.length;i++){
				lis[i].onclick=function(){
					let id=this.innerText;
					//因为当前是一个li；要清除所有li需要重新获取li的集合
					for(let j=0;j<document.querySelectorAll('.month>li').length;j++){
						if(document.querySelectorAll('.month>li')[j].innerText==id){
							document.querySelectorAll('.month>li')[j].setAttribute('class','selected');
						}else{
							document.querySelectorAll('.month>li')[j].className="";
						}

					}

				}
			};
			document.querySelector('#myCalendar .close').onclick=function(){
				document.getElementById('myCalendar').remove();
			};
			document.querySelector('#myCalendar .sure').addEventListener('click',function(){
				let yearResult=document.getElementById('year').innerText;
				let monthResult=document.querySelectorAll('.month .selected')[0].innerText;
				document.getElementById(_this.targetDom).innerHTML=yearResult+'-'+monthResult;
				_this.btnClose(yearResult,monthResult);
			});
		},
		btnClose:function(yearResult,monthResult){
			console.log(yearResult);
			document.getElementById('myCalendar').remove();
			this.callback(yearResult,monthResult);
		}
	}
	//暴露方法
	window.myCalendar=myCalendar;
}(window,document))