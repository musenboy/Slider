(function(){
   
    //扩展jquery类方法
    jQuery.fn.MMSlider = function(config) {
		//当前div
        var mmSlider=$(this); 
        //宽度
        var mmWidth = config.width; 
        //高度
        var mmHeight = config.height; 

        //div宽
        mmSlider.css('width', mmWidth); 
        //div高
        mmSlider.css('height', mmHeight);
        //规定当前div内容溢出元素框时内容会被修剪，其余不可见
        mmSlider.css('overflow','hidden'); 
        //相对定位
        mmSlider.css('position','relative');

        //每张图片
        mmSlider.each(function(index){

            var ul = $(this).find('ul');
            ul.css('margin', "0");
            ul.css('padding', "0");
            ul.css('width', mmWidth);
            ul.css('height', mmHeight);
            ul.css('list-style',"none");
            ul.css('position','absolute');

            //设置li样式
            var li = $(this).find('li');
            li.css('float','left');
            li.css('overflow','hidden');
            li.css('position','relative');

            //设置图片宽带和外层容器宽高相同
            var imgs = $(this).find('li').find('img');
            imgs.css('width', mmWidth);
            imgs.css('height', mmHeight);
           
        })

        //图片个数
        var len = mmSlider.find("ul li").length; 
        //记录当前显示图片的索引
        var index = 0;
        var picTimer;

        //添加透明方块按钮
        var btn = "<div class='mmbtn'>";
        //多少张图片，就多少个按钮
        for(var i=0; i < len; i++) {
            btn += "<span></span>";
        }
        mmSlider.append(btn);
		
        //透明按钮的样式
        var btn_css = mmSlider.find(".mmbtn");
        btn_css.css('position','absolute');
        //当然可能会有n个，所以宽度定为100%
        btn_css.css('width','100%');
        btn_css.css('height','10px');
        btn_css.css('padding','15px');
        btn_css.css('right','0');
        btn_css.css('bottom','0');
        btn_css.css('text-align','right');
		
        var spn_css = btn_css.find("span");
        spn_css.css('display','inline-block');
        spn_css.css('_display','inline');
        spn_css.css('_zoom','1');
        spn_css.css('width','12px');
        spn_css.css('height','12px');
        spn_css.css('_font-size','0');
        spn_css.css('margin-left','10px');
        spn_css.css('cursor','pointer');
        //按钮被选中时的颜色
        spn_css.addClass("on").css('background','#fff');

        //为小按钮添加鼠标滑入事件，透明度设置为0.4，并显示当前索引对应的图片
        mmSlider.find(".mmbtn span").css("opacity", 0.4).mouseover(function() {
            index = mmSlider.find(".mmbtn span").index(this);
            showPics(index);
        }).eq(0).trigger("mouseover");

        //本例为左右滚动，即所有li元素都是在同一排向左浮动，所以这里需要计算出外围ul元素的宽度
        mmSlider.find("ul").css("width", mmWidth * (len));

        //鼠标滑上焦点图时停止自动播放，滑出时开始自动播放
        mmSlider.hover(function() {
            clearInterval(picTimer);
        },function() {
            picTimer = setInterval(function() {
                showPics(index);
                index++;
                if(index == len) {index = 0;}
            }, config.slideTime == undefined ? 5000 : config.slideTime); //此代表自动播放的间隔，单位：毫秒，可自定义，否则默认为5000毫秒
        }).trigger("mouseleave");

        //显示图片函数，根据接收的index值显示相应的内容
        function showPics(index) { //普通切换
            //根据index值计算ul元素的left值
            var nowLeft = -index*mmWidth;
            //通过animate()调整ul元素滚动到计算出的position，500为划入鼠标图片滚动速度，单位毫秒
            mmSlider.find("ul").stop(true,false).animate({"left":nowLeft},500);
            //为当前的按钮切换到选中的效果，并清除其它按钮选中的效果
            mmSlider.find(".mmbtn span").removeClass("on").eq(index).addClass("on");
            //按钮切换使用动画效果，设置其它按钮透明度为0.4，选中的按钮透明度为1
            mmSlider.find(".mmbtn span").stop(true,false).animate({"opacity":"0.5"},500).eq(index).stop(true,false).animate({"opacity":"1"},500);
        }
}})();