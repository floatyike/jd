function getTop(elem){
			var sum=elem.offsetTop;
			while(elem.offsetParent){
				sum+=elem.offsetParent.offsetTop;
				elem=elem.offsetParent;
			}
			return sum;
	};
window.addEventListener("load",function(){floor.init()});
var floor={
	UPLEVEL:0,//亮灯范围的上线据文档顶部显示据顶部的距离
	DOWNLEVEL:0,//亮灯范围的下线据文档顶部显示据顶部的距离document.body.scrollTop
	distance:0,
	DURATION:1000,
	STEPS:100,
	moved:0,
	step:0,
	INTERVAL:0,
	timer:null,
	init:function(){
		this.INTERVAL=this.DURATION/this.STEPS;
		var fHeight=parseFloat(getComputedStyle($("#f1")).height);
		this.UPLEVEL=(window.innerHeight-fHeight)/2;
		this.DOWNLEVEL=this.UPLEVEL+fHeight;
		window.addEventListener("scroll",this.checkLight.bind(this));
		$("#elevator>ul").addEventListener("mouseover",this.showEtitle);
		$("#elevator>ul").addEventListener("mouseout",this.hideEtitle);
		$("#elevator>ul").addEventListener("click",this.move.bind(this));
	},
	move:function(e){
		if(e.target.nodeName=="A"){
			if(this.timer!=null){
				clearTimeout(this.timer);
				this.timer=null;
				this.moved=0;
				}
			var scrollTop=document.body.scrollTop;
			var  i=parseInt(e.target.parentNode.firstElementChild.innerHTML);
			var	span=$("#f"+i+">header>span");
			var totalTop=getTop(span);
			this.distance=totalTop-this.UPLEVEL-scrollTop;
			this.step=this.distance/this.STEPS;
			this.timer=setTimeout(this.moveStep.bind(this),this.INTERVAL);

			
		}
	},
	moveStep:function(){
		scrollBy(0,this.step);
		this.moved++;
		if(this.moved<this.STEPS){
			this.timer=setTimeout(this.moveStep.bind(this),this.INTERVAL);
		}else{
			clearTimeout(this.timer);
			this.timer=null;
			this.moved=0;
		}
	},
	showEtitle:function(e){
		target=e.target||e.srcElement;
		if(target.nodeName=="A"){
			target=target.parentNode;
		}if(target.nodeName=="LI"){
			target.$("a:first-child").style.display="none";
			target.$("a:first-child+a").style.display="block";
		}
	},
	hideEtitle:function(e){
		target=e.target||e.srcElement;//||e.src.
		if(target.nodeName=="A"){
			target=target.parentNode;
		}if(target.nodeName=="LI"){
			var i=parseInt(target.$("a:first-child").innerHTML);
			var span=$("#f"+i+">header>span");
			if(span.className!="hover"){
			target.$("a:first-child").style.display="block";
			target.$("a:first-child+a").style.display="none";
			}
		}
	},

	checkLight:function(){
		var scrollTop=document.body.scrollTop;
		var spans=$(".floor>header>span");
		for(var i=0;i<spans.length;i++){
			var totalTop=getTop(spans[i]);
			var innerTop=totalTop-scrollTop;
			//var li=indexOf($("#elevator>ul>li"));
			var li=$("#elevator>ul>li")[i];//?????
			var a1=li.$("a:first-child");//??
			var a2=li.$("a:first-child+a");



			if(innerTop>=this.UPLEVEL&&innerTop<=this.DOWNLEVEL){
				spans[i].className="hover";
				a1.style.display="none";
				a2.style.display="block";
			}else{
				spans[i].className="";
				a1.style.display="block";
				a2.style.display="none";
			}
		}
		var lightSpan=$(".floor>header>span.hover");//span.hover元素类??????????????
		$("#elevator").style.display=lightSpan!=null?"block":"none";
	},
	

}