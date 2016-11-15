/*封装$*/
window.$=HTMLElement.prototype.$=function(selector){
    var elems=(this==window?document:this)
        .querySelectorAll(selector);
    return elems.length==0?null:elems.length==1?elems[0]:elems;
}
/*广告图片数组*/
var imgs=[
    {"i":0,"img":"images/index/banner_01.jpg"},
    {"i":1,"img":"images/index/banner_02.jpg"},
    {"i":2,"img":"images/index/banner_03.jpg"},
    {"i":3,"img":"images/index/banner_04.jpg"},
    {"i":4,"img":"images/index/banner_05.jpg"},
];
var slider={
	LIWIDTH:670,
	distance:0,
	DURATION:1000,
	STEPS:100,
	moved:0,
	step:0,
	INTERVEL:0,
	timer:null,
	WAIT:1000,
	canAuto:true,
	init:function(){
		this.INTERVAL=this.DURATION/this.STEPS;
		this.updateView();
		var me=this;
		$("#idxs").addEventListener("mouseover",function(e){
			if(e.target.nodeName=="LI"&&e.target.className!="hover"){
				var starti=$("#idxs>.hover").innerHTML;//??
				var endi=e.target.innerHTML;
				me.move(endi-starti);
			}
		});
		$("#slider").addEventListener("mouseover",function(){me.canAuto=false;});
		$("#slider").addEventListener("mouseout",function(){me.canAuto=true;});
		this.autoMove();
	},
	autoMove:function(){
		var me=this;
		this.timer=setTimeout(function(){
			if(me.canAuto){
			me.move(1);
		}else{
			me.autoMove();
		}
	  },this.WAIT);
	},
	move:function(n){
		if(this.timer!=null){
			clearTimeout(this.timer);
			this.timer=null;
			this.moved=0;
			$("#imgs").style.left=0;
		}
		this.distance=n*this.LIWIDTH;
		this.step=this.distance/this.STEPS;
		if(n<0){
			var dels=imgs.splice(imgs.length+n,-n);
			Array.prototype.unshift.apply(imgs,dels);
			$("#imgs").style.left=n*this.LIWIDTH+"px";
			this.updateView();
		}
		this.timer=setTimeout(this.moveStep.bind(this,n),this.INTERVAL);
	},
	moveStep:function(n){
		var left=parseFloat(getComputedStyle($("#imgs")).left);
		$("#imgs").style.left=left-this.step+"px";
		this.moved++;
		if(this.moved<this.STEPS){
			this.timer=setTimeout(this.moveStep.bind(this,n),this.INTERVAL);
		}else{
			clearTimeout(this.timer);
			this.timer=null;
			this.moved=0;
			if(n>0){
				var dels=imgs.splice(0,n);
				imgs=imgs.concat(dels);
				/////?????
				this.updateView();
			}
			 $("#imgs").style.left="";
			this.autoMove();
		}
	},
	updateView:function(){
		//this.LIWIDTH=$("imgs").length;
		$("#imgs").style.width=imgs.length*this.LIWIDTH+"px";
		for(var i=0,strImg="",strIdx="";i<imgs.length;i++){
			strImg+="<li><img src="+imgs[i].img+"></li>";
			//strImg+='<li><img src="'+imgs[i].img+'"></li>';
			strIdx+="<li>"+(i+1)+"</li>";

		}
		 $("#imgs").innerHTML=strImg;
		 $("#idxs").innerHTML=strIdx;
		$("#idxs>li")[imgs[0].i].className="hover";//??????


	},


};
window.addEventListener("load",function(){slider.init()});
	
