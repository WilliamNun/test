var msl;
var curr_time = new Date();
var dayIndex = 0;
var displayClass= "";
var specialcity;
var theday=curr_time.getDate();
//theather 用于存放数据的对象 有初始值 在连接API后会更改
var theWeather={
	month:curr_time.getMonth()+1,
	day:curr_time.getDate(),
	time:curr_time.getHours(),
	weatherId:'03',
	tem:"19",
	week:new Array("Sunday", "Monday", "Thusday", "Wednesday", "Thursday", "Friday", "Saturday")[curr_time.getDay()],
	future:[
		{tem:"28",weather:"小雨",weatherId:"03",month:curr_time.getMonth()+1,day:theday++%30,week:new Array("Sunday", "Monday", "Thusday", "Wednesday", "Thursday", "Friday", "Saturday")[curr_time.getDay()]},
		{tem:"28",weather:"晴",weatherId:"02",month:curr_time.getMonth()+2,day:theday++%30,week:new Array("Sunday", "Monday", "Thusday", "Wednesday", "Thursday", "Friday", "Saturday")[curr_time.getDay()]},
		{tem:"19",weather:"小雨",weatherId:"03",month:curr_time.getMonth()+2,day:theday++%30,week:new Array("Sunday", "Monday", "Thusday", "Wednesday", "Thursday", "Friday", "Saturday")[curr_time.getDay()]},
		{tem:"29",weather:"小雪",weatherId:"14",month:curr_time.getMonth()+2,day:theday++%30,week:new Array("Sunday", "Monday", "Thusday", "Wednesday", "Thursday", "Friday", "Saturday")[curr_time.getDay()]},
		{tem:"22",weather:"暴风",weatherId:"01",month:curr_time.getMonth()+2,day:theday++%30,week:new Array("Sunday", "Monday", "Thusday", "Wednesday", "Thursday", "Friday", "Saturday")[curr_time.getDay()]},
		{tem:"31",weather:"暴雨",weatherId:"04",month:curr_time.getMonth()+2,day:theday++%30,week:new Array("Sunday", "Monday", "Thusday", "Wednesday", "Thursday", "Friday", "Saturday")[curr_time.getDay()]},
		{tem:"32",weather:"暴风",weatherId:"01",month:curr_time.getMonth()+2,day:theday++%30,week:new Array("Sunday", "Monday", "Thusday", "Wednesday", "Thursday", "Friday", "Saturday")[curr_time.getDay()]}
	]
};
$('body').height($('.screen').height());
//将theweather对象作为参数 根据weatherid不同 执行不同方法
function weatherSwitch(weather){
	switch(weather["weatherId"]){
			case "01":
			windy.run(weather);
			break;
			case "03":
			case "04":
			case "05":
			case "06":
			case "07":
			case "08":
			case "09":
			case "10":
			case "11":
			case "12":
			case "21":
			case "22":
			case "23":
			case "24":
			case "25":
			rainy.run(weather);
			break;
			case "13":
			case "14":
			case "15":
			case "16":
			case "17":
			case "26":
			case "27":
			case "28":
			snowy.run(weather);
			break;
			case "00":
			case "02":
			sunny.run(weather);
			break;
			default:
			windy.run(weather);
		}
}
//输出不同的天气数据
function printData(theWeather){
	$('.place').text(theWeather.place);
	$('.date').text(theWeather.month+'.'+theWeather.day+'，'+theWeather.week);
	$('.tem').text(theWeather.tem+'C°');
	$('.weather').text(theWeather.weather);
}
//判断如果 在晚七点到早五点之间 执行夜间方法
function night(sea){

	if(theWeather.time>=19||theWeather.time<5){
		var className = '.'+sea;
		$(className).css('background-color','#22272f');
		if (sea === 'sun') {
			$('.sun_sun').children().attr("src","pic/moon.png");
			$('.sun_sun').css('animation-name','null');
			$('.sun_sun').css('width','15%');
			$('.sun_sun').css('left','-35%');
		}
	}
}
//整体初始化
function allReset(){
	$('.index').css("display","block");
			sunny.reset();
			rainy.reset();
			snowy.reset();
			windy.reset();
			msl.clear();
}
function slideIn(obj){
	$('.'+obj).fadeIn();
}
function slideOut(obj){
	$('.'+obj).fadeOut();
}
//切换到下一天
function nextDay(){
	if (dayIndex===4) {
		$('.arrow').css("display","none");
	}
	if (dayIndex<=4) {
		switch(displayClass){
			case "sunny":
			sunny.reset();
			break;
			case "rainy":
			rainy.reset();
			break;
			case "snowy":
			snowy.reset();
			break;
			case "windy":
			windy.reset();
			break;
		}
			if (!$('#fadeDay').hasClass('fadeInRight')) {
       			$(".fadeDay").addClass("fadeInRight");
     		}
     		if ($('#fadeDay').hasClass('fadeInLeft')) {
       			$(".fadeDay").removeClass("fadeInLeft");
     		}
			weatherSwitch(theWeather['future'][dayIndex]);
			dayIndex++;
	}
}
//切换到上一天
function lastDay(){
	if (dayIndex>=2) {
		switch(displayClass){
			case "sunny":
			sunny.reset();
			break;
			case "rainy":
			rainy.reset();
			break;
			case "snowy":
			snowy.reset();
			break;
			case "windy":
			windy.reset();
			break;
		}
			if (!$('.fadeDay').hasClass('fadeInLeft')) {
       			$(".fadeDay").addClass("fadeInLeft");
     		}
     		if ($('.fadeDay').hasClass('fadeInRight')) {
       			$(".fadeDay").removeClass("fadeInRight");
     		}
			weatherSwitch(theWeather['future'][dayIndex-2]);
			dayIndex--;
	}
	else{
		allReset();
	}
	
}
//晴天对象
var sunny ={
	place:'default',
	run:function(data){
		displayClass = "sunny";
		night('sun');
		printData(data);
		$('.index').fadeOut();
		slideIn('sun');
		switch(specialcity){
			case 'England':
				sunny.builderChange('England');
				break;
			case 'beijing':
				sunny.builderChange('China');
				break;
			default:

		}

	},
	//特殊城市方法
	builderChange:function(place){
		switch(place){
			case 'England':
				$('.sun_city').children().attr("src","pic/en1.png");
				$('.sun_car1').children().attr("src","pic/en_car1.png");
				$('.sun_car2').children().attr("src","pic/en_car2.png");
				$('.sun_car2').css('top','84%');
				$('.sun_car1').css('top','84%');
				break;
			case 'China':
				$('.sun_city').children().attr("src","pic/bj1.png");
				$('.sun_car2').css('top','84%');
				$('.sun_car1').css('top','84%');
				break;
			case 'France':
			break;
			case 'Italy':
			break;
			case 'Japan':
			break;
			default:
			alert("default");

		}
	},
	reset:function(){
		$('.sun_city').children().attr("src","pic/sun_city.png");
		$('.sun_car1').children().attr("src","pic/sun_car1.png");
		$('.sun_car2').children().attr("src","pic/sun_car2.png");
		$('.sun_car2').css('top','83%');
		$('.sun_car1').css('top','81%');
		$('.sun').css('background-color','#e27978');
		$('.sun_sun').children().attr("src","pic/sun.png");
		$('.sun_sun').css('animation-name','sunR');
		$('.sun_sun').css('width','25%');
		$('.sun_sun').css('left','0');
		$('.sun').css('display','none');
	}

}; 
var rainy ={
	place:'default',
	run:function(data){
		displayClass = "rainy";
		night('rain');
		printData(data);
		$('.index').fadeOut();
		slideIn('rain');
		switch(specialcity){
			case 'Italy':
				rainy.builderChange('Italy');
			break;
			default:

		}

	},
	builderChange:function(place){
		switch(place){
			case 'England':
			break;
			case 'China':
			break;
			case 'France':
			break;
			case 'Italy':
				$('.rain_ship').children().attr("src","pic/it_sharp.png");
				$('.rain_ship').css('left','15%');
				$('.rain_ship').css('top','70%');
				$('.rain_ship').css('width','45%');
				$('.rain_ship').css('margin-top','10%');
			break;
			case 'Japan':
			break;
			default:
			alert("default");

		}
	},
	reset:function(){
		$('.rain_ship').children().attr("src","pic/rain_ship.png");
		$('.rain_ship').css('left','37%');
		$('.rain_ship').css('top','61%');
		$('.rain_ship').css('width','auto');
		$('.rain_ship').css('margin-top','0');
		$('.rain').css('background-color','#9accb7');
		$('.rain').css('display','none');
	}

}; 
var snowy ={
	place:'default',
	run:function(data){
		displayClass = "snowy";
		night('snow');
		printData(data);
		$('.index').fadeOut();
		slideIn('snow');
		switch(specialcity){
			case 'Japan':
				snowy.builderChange('Japan');
				break;
			default:

		}

	},
	builderChange:function(place){
		switch(place){
			case 'England':
			break;
			case 'China':
			break;
			case 'France':
			break;
			case 'Italy':
			break;
			case 'Japan':
				$('.snow_water').children().attr("src","pic/to1.png");
				$('.snow_water').css('bottom','12%');
				break;
			default:
			alert("default");

		}
	},
	reset:function(){
		$('.snow_water').children().attr("src","pic/snow_water.png");
		$('.snow_water').css('bottom','-4%');
		$('.snow').css('background-color','#324668');
		$('.snow').css('display','none');
	}
};
var windy = {
	place:'default',
	run:function(data){
		displayClass = "windy";
		night('cloudy');
		printData(data);
		$('.index').fadeOut();
		slideIn('cloudy');
		switch(specialcity){
			case 'England':
			windy.builderChange('England');
			break;
			case 'beijing':
			windy.builderChange('China');
			break;
			case 'France':
			windy.builderChange('France');
			break;
			case 'Italy':
			windy.builderChange('Italy');
			break;
			default:
		}

	},
	builderChange:function(place){
		switch(place){
			case 'England':
			$('.cloud_tower').children().attr("src","pic/en2.png");
			$('.cloud_tower').css('padding-top','110%');
			break;
			case 'China':
			$('.cloud_tower').children().attr("src","pic/bj3.png");
			$('.cloud_tower').css('padding-top','117%');
			break;
			case 'France':
			$('.cloud_tower').children().attr("src","pic/france2.png");
			$('.cloud_tower').css('padding-top','100%');
			break;
			case 'Italy':
			$('.cloud_tower').children().attr("src","pic/it1.png");
			break;
			case 'Japan':
			break;
			default:
			alert("default");

		}
	},
	reset:function(){
		$('.cloud_tower').children().attr("src","pic/cloud_tower.png");
		$('.cloudy').css('background-color','#08b295');
		$('.cloudy').css('display','none');
	}
};
//pc端兼容性
 function browserRedirect() {
            var sUserAgent = navigator.userAgent.toLowerCase();
            var bIsIpad = sUserAgent.match(/ipad/i) == "ipad";
            var bIsIphoneOs = sUserAgent.match(/iphone os/i) == "iphone os";
            var bIsMidp = sUserAgent.match(/midp/i) == "midp";
            var bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) == "rv:1.2.3.4";
            var bIsUc = sUserAgent.match(/ucweb/i) == "ucweb";
            var bIsAndroid = sUserAgent.match(/android/i) == "android";
            var bIsCE = sUserAgent.match(/windows ce/i) == "windows ce";
            var bIsWM = sUserAgent.match(/windows mobile/i) == "windows mobile";
        
            if (bIsIpad || bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM) {
                console.log("phone");
            } else {
            	$('.action').css('display','none');
            	$('.arrow').click(function(){
					nextDay();
				});
                $('.sun_car1').css('margin-top','3%');
				$('.sun_car2').css('margin-top','3%');            }
        }





$(function() {
	browserRedirect();
	//初始化输入框
    msl = $('#magicsuggest').magicSuggest({
  		resultAsString: true,
  		highlight: false,
  		allowFreeEntries:false,
  		editable: true,
  		expandOnFocus:true,
  		placeholder:"请输入需要查询的城市",
  		hideTrigger:true,
  		maxSelection :1,
  		noSuggestionText:"not found",
  		data: [
  		'伦敦','东京','巴黎','罗马','北京','上海','香港','重庆','天津','合肥','安庆','蚌埠','亳州','巢湖','滁州','阜阳','贵池','淮北','淮化','淮南','黄山','九华山','六安','马鞍山','宿州','铜陵','屯溪','芜湖','宣城','福州','福安', '龙岩', '南平', '宁德', '莆田', '泉州', '三明', '邵武', '石狮', '晋江', '永安', '武夷山', '厦门', '漳州', '兰州', '白银', '定西', '敦煌', '甘南', '金昌', '酒泉', '临夏', '平凉', '天水', '武都', '武威', '西峰', '嘉峪关','张掖', '广州', '潮阳', '潮州', '澄海', '东莞', '佛山', '河源', '惠州', '江门', '揭阳', '开平', '茂名', '梅州', '清远', '汕头', '汕尾', '韶关', '深圳', '顺德', '阳江', '英德', '云浮', '增城', '湛江', '肇庆', '中山', '珠海', '南宁', '百色', '北海', '桂林', '防城港', '河池', '贺州', '柳州', '来宾', '钦州', '梧州', '贵港', '玉林', '贵阳', '安顺', '毕节', '都匀', '凯里', '六盘水', '铜仁', '兴义', '玉屏', '遵义', '海口', '三亚', '五指山', '琼海', '儋州', '文昌', '万宁', '东方', '定安', '屯昌', '澄迈', '临高', '万宁', '白沙黎族', '昌江黎族', '乐东黎族', '陵水黎族', '保亭黎族', '琼中黎族', '西沙群岛', '南沙群岛', '中沙群岛', '石家庄','保定', '北戴河','沧州', '承德', '丰润', '邯郸', '衡水', '廊坊', '南戴河','秦皇岛','唐山', '新城', '邢台', '张家口','哈尔滨','北安', '大庆', '大兴安岭','鹤岗', '黑河', '佳木斯','鸡西','牡丹江','齐齐哈尔','七台河','双鸭山','绥化', '伊春', '郑州', '安阳', '鹤壁', '潢川', '焦作', '济源', '开封', '漯河', '洛阳', '南阳', '平顶山','濮阳', '三门峡','商丘', '新乡', '信阳', '许昌', '周口', '驻马店','武汉', '恩施', '鄂州', '黄冈', '黄石', '荆门', '荆州', '潜江', '十堰', '随州', '武穴', '仙桃', '咸宁', '襄阳', '襄樊', '孝感', '宜昌', '长沙', '常德', '郴州', '衡阳', '怀化', '吉首', '娄底', '邵阳', '湘潭', '益阳', '岳阳', '永州', '张家界','株洲', '南京', '常熟', '常州', '海门', '淮安', '江都', '江阴', '昆山', '连云港','南通', '启东', '沭阳', '宿迁', '苏州', '太仓', '泰州', '同里', '无锡', '徐州', '盐城', '扬州', '宜兴', '仪征', '张家港','镇江', '周庄', '南昌', '抚州', '赣州', '吉安', '景德镇','井冈山','九江', '庐山', '萍乡', '上饶', '新余', '宜春', '鹰潭', '长春', '白城', '白山', '珲春', '辽源', '梅河', '吉林', '四平', '松原', '通化', '延吉', '长治','太原','大同','候马','晋城','离石','临汾','宁武','朔州','忻州','阳泉','榆次','运城','西安','安康','宝鸡','汉中','渭南','商州','绥德','铜川','咸阳','延安','榆林','成都','巴中','达州','德阳', '都江堰', '峨眉山','涪陵','广安','广元', '九寨沟','康定','乐山','泸州', '马尔康','绵阳','眉山','南充','内江', '攀枝花','遂宁','汶川','西昌','雅安','宜宾','自贡','资阳', '乌鲁木齐','阿克苏','阿勒泰','阿图什','博乐','昌吉','东山','哈密','和田','喀什','克拉玛依','库车','库尔勒','奎屯','石河子','塔城','吐鲁番','伊宁','拉萨','阿里','昌都','林芝','那曲', '日喀则','山南', '昆明','大理','保山','楚雄','大理','东川','个旧','景洪','开远','临沧','丽江','六库','潞西','曲靖','思茅','文山','西双版纳','玉溪','中甸','昭通','杭州','安吉','慈溪','定海','奉化','海盐','黄岩','湖州','嘉兴','金华','临安','临海','丽水','宁波','瓯海','平湖','千岛湖', '衢州','江山','瑞安','绍兴','嵊州','台州','温岭','温州','余姚','舟山'
  		]
	});
	//传入城市名称或ip 调用api修改theweather对象
	function findWeather(place){
		var appkey = '';
		var url;
		var city="";
		var lineIp="";
		//判断传入的是城市名称还是ip
		if(isNaN(place.substr(0,1))){
			city = place;
			url = 'http://v.juhe.cn/weather/index';
		}
		else{
			lineIp = place;
			url = 'http://v.juhe.cn/weather/ip';
		}
		//请求数据
		$.getJSON(url+"?callback=?", {
			"cityname" : city,
			"ip":lineIp,
			"dtype" : "jsonp",
			"key" : "1d0dab79c236a693f5a43bc0650dbe08"
		}, function(data) {
			var errorcode = data.error_code;
			if( errorcode ===0){
				//数据正常返回
				if(place==="北京"){
					specialcity='beijing';
				}
				var future = data["result"]["future"];
				console.log(future);
				var city = data["result"]["today"];
				theWeather.place = city['city'];
				theWeather.tem = data["result"]['sk']['temp'];
				theWeather.weather = city['weather'];
				theWeather.weatherId = city['weather_id']['fa'];
				var forindex = 0;
				for(var name in future){   
				console.log(future[name]);    
			    	theWeather.future[forindex].tem  =future[name]["temperature"].split("℃")[0];
					theWeather.future[forindex].weather  =future[name]["weather"];
					theWeather.future[forindex].weatherId  =future[name]["weather_id"]["fa"];
					forindex++;
			    }  
			    weatherSwitch(theWeather);
			    dayIndex = 1;
			    $('.arrow').css("display","block");
				
			}else{
				//国外的城市找不到
				switch(place){
					case '伦敦':
					specialcity ='England';
					theWeather.place="伦敦";
					break;
					case '巴黎':
					specialcity = 'France';
					theWeather.place="巴黎";
					break;
					case '罗马':
					specialcity ='Italy';
					theWeather.place="罗马";
					break;
					case '东京':
					specialcity = 'Japan';
					theWeather.place="东京";
					break;
					default:
					alert("没有这个城市");
				}
				weatherSwitch(theWeather);
			    dayIndex = 1;
			    $('.arrow').css("display","block");
			}
		});
	}
	//将输入框的值 传到api
	$('#magicsuggest').bind("click",function(){
		var mslOut = msl.getSelection()[0]; 
		if (mslOut!==undefined){
			findWeather(mslOut['name']);
		}
	});
	$('.action').click(function(){
		var mslOut = $("input")[0].value; 
		if (mslOut!==undefined){
			findWeather(mslOut);
		}
		else{
			alert('请重新输入');
		}
	});

	$('#magicsuggest').bind("keydown",function(e){
		if(e["keyCode"]===13){
			var mslOut = msl.getSelection()[0]; 
			if (mslOut!==undefined){
				findWeather(mslOut['name']);
			}
		}
	});
	//定位事件
	$('.location').bind("click",function(){
			findWeather(returnCitySN["cip"]);
			console.log(returnCitySN["cip"]);
	});

	//左滑动 右滑动 前一天 后一天
	var pressX = 0, pressY = 0;
	 addObj = document.getElementsByClassName("screen")[0].childNodes;
	for (var i = 1; i < addObj.length; i++) {
		addObj[i].addEventListener('touchstart', function(event) {
        // 如果这个元素的位置内只有一个手指的话
	        if (event.targetTouches.length === 1) {
	            var touch = event.targetTouches[0];
	            // 把元素放在手指所在的位置
	            pressX = touch.pageX;
	            pressY = touch.pageY;
	            console.log(pressY+pressX);
	        }
    	}, false);

    	addObj[i].addEventListener('touchmove', function(event) {
        // 如果这个元素的位置内只有一个手指的话
	        if (event.targetTouches.length === 1) {
	            var touch = event.targetTouches[0];
	            var spanX = touch.pageX - pressX;
	            var spanY = touch.pageY - pressY;
	            event.preventDefault();
	            if (Math.abs(spanX) > Math.abs(spanY)) {
	                //水平方向
	                if (spanX > 0) {
	                //向右
	                console.log("left");
	                } else {
	                //向左
	                console.log("right");
	                }
	            } 
	        }
    	}, false);

		addObj[i].addEventListener('touchend', function(event) {
 			var touch = event.changedTouches[0];
      		if (dayIndex!==0) {
      			if(touch.pageX<pressX){	
	       			nextDay();	
	     		}
	     		else if(touch.pageX>pressX){
					lastDay();
	     		}
      		}
   event.stopPropagation();
    	}, false);

	}

	

});



































