/*
	# purpose popup
	# author  lut000
	# date    2016-07-19
	# edition 1.0
	# terminal pc
	# required jquery
*/
!function(g){
	function atten(){
		this.box=null;			//包含框
		this.bg=null;			//背景元素
		this.tar=null;		//文本内容
		this.btn_box=null;		//按钮框
		this.btn1=null;		//确定按钮
		this.btn2=null;		//取消按钮
		this.v_list={							//相关属性
			ww:"",
			wh:"",
			suFunc:null,
			is_delay:false,
			times:800,
			_html:'<!-- 弹出提示 --><div id="msg-box" style="display: none;z-index: 9999;position: fixed;left: 30%;top:20%;width: 450px;padding: 40px 0;margin: auto;font-size:14px;border-radius: 5px;text-align: center;background-color: #fff;"><p class="atten-p">网络似乎出现了问题，请稍后再试。</p><div class="btn-div" style="margin-top: 40px;"><a class="js-sure" href="javascript:void(0);" target="_self" title="" style="margin-right:15px;display: inline-block;*display: inline-block;padding: 0px 25px;height:35px;line-height:35px;font-size:16px;border-radius: 0px;text-decoration: none;color: #fff;background-color: #FB3352">确定</a><a class="js-cancel" href="javascript:void(0);" target="_self" title="" style="display: inline-block;*display: inline-block;padding: 0px 25px;height:35px;line-height:35px;font-size:16px;border-radius: 0px;text-decoration: none;color: #fff;background-color: #FB3352">取消</a></div></div><div id="msg-bg" style="display: none;z-index: 9998;position: fixed;left: 0px;top: 0;width: 100%;height:100%;opacity: 0.7;filter:alpha(opacity=70);background-color: #000;"></div>'
		}
	}
	atten.prototype={
		init:function(){				//初始化参数
			var a=this;
			a.box=$("#msg-box");			
			a.bg=$("#msg-bg");			
			a.tar=$("#msg-box .atten-p");	
			a.btn_box=$("#msg-box .btn-div");		
			a.btn1=$("#msg-box .js-sure");		
			a.btn2=$("#msg-box .js-cancel");		
			a.resizeFunc();
			a.bindFunc();
		},
		resizeFunc:function(){			//重新计算
			var a=this,b=a.v_list;
			b["ww"]=document.documentElement.clientWidth || document.body.clientWidth;
			b["wh"]=document.documentElement.clientHeight || document.body.clientHeight;
			a.setPos();
		},
		msg:function(options,func,times){					//配置
			var a=this,b=a.tar,c=a.btn1,d=a.btn2,e=a.btn_box,f=a.v_list;
			f.suFunc=null;
			f.erFunc=null;
			if(times && typeof times ==="number"){
				e.hide();
				f.is_delay=true;
				f.times=times;
			}else{
				e.show();
				f.is_delay=false;
			}
			if(func && func instanceof Function){
				f.suFunc=func;
			}else{
				if(typeof func ==="number"){
					e.hide();
					f.is_delay=true;
					f.times=func;
				}
			}
			if(options && options instanceof Object){			//配置属性
				for(var key in options){
					switch(key){
						case "txt":
							b.text(options[key]);
							d.show();
							break;
						case "rname":
							c.text(options[key]);
							break;
						case "cname":
							d.text(options[key]);
							break;
						case "btn":
							d.hide();
							break;
						case "success":
							f.suFunc=options[key];
							break;
						case "error":
							f.erFunc=options[key];
							break;
						default:
							// console.log(options[key]);
					}
				}
			}
			a.setPos();
			a.showFunc();
			if(f.is_delay){
				var timer=setTimeout(function(){
					clearTimeout(timer);
					a.hideFunc(f.suFunc);
				},f.times);
			}
		},
		bindFunc:function(){			//事件绑定
			var a=this,b=a.v_list;
			a.btn1.on("click",function(){
				a.hideFunc(b.suFunc);
			});
			a.btn2.on("click",function(){
				a.hideFunc(b.erFunc);
			});
		},
		setCss:function(type,options){				//设置样式
			var a=this,b=a.btn1,c=a.btn2,d=a.tar,e=a.box;
			if(options && options instanceof Object){
				for(var key in options){
					switch(key){
						case "btns":      				//按钮样式
							b.css(options[key]);
							c.css(options[key]);
							break;
						case "sbtn":  					//确定按钮
							b.css(options[key]);
							break;
						case "cbtn":  					//取消按钮
							c.css(options[key]);
							break;
						case "box":  					//包含框
							e.css(options[key]);
							break;
						case "p":  					//文本对象
							d.css(options[key]);
							break;
						default:
							// console.log(null);
					}
				}
			}
		},
		setPos:function(){				//设置位置
			var a=this,w=a.v_list["ww"],h=a.v_list["wh"],box=a.box;
			var ow=box.width();
			var oh=box.height();
			a.box.css({"left":(w-ow)/2+"px","top":(h-oh)*2/5+"px"});
		},
		showFunc:function(){			//显示
			var a=this,box=a.box,bg=a.bg;
			box.fadeIn(200);
			bg.fadeIn(400);
		},
		hideFunc:function(fn){			//隐藏
			var a=this,box=a.box,bg=a.bg;
			box.fadeOut(200,function(){
				if(fn && fn instanceof Function){
					fn();
				}
			});
			bg.fadeOut(400);
		}
	};
	var msg=new atten();
	// 模块化
	if(typeof module !=="undefined" && module.exports){
		module.exports=msg;
	}else if(typeof define=="function" && define.amd){
		define(function(){
			return msg;
		});
	}else{
		g.msg=msg;
	};
	$(function(){
		$("body").append(msg.v_list._html);
		msg.init();
		$(window).on("resize",function(){msg.resizeFunc()});
	})
	
}(window);