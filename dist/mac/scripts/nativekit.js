// Dropdown Toggle

document.querySelector('.button-dropdown').addEventListener('click', function () {
    var element = this
    var id = element.getAttribute('name')
    document.getElementById(id).classList.toggle("showDropdown");
}, false);

// Spinner

var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function (t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var defaults = {
    lines: 12,
    length: 10,
    width: 5,
    radius: 10,
    scale: 0.35,
    corners: 1,
    color: '#000',
    fadeColor: 'transparent',
    animation: 'spinner-line-fade-default',
    rotate: 0,
    direction: 1,
    speed: 1,
    zIndex: 2e9,
    className: 'spinner',
    display: 'inline-block'
    // top: '50%',
    // left: '50%',
    // shadow: '0 0 1px transparent',
    // position: 'absolute',
};
var Spinner = /** @class */ (function () {
    function Spinner(opts) {
        if (opts === void 0) { opts = {}; }
        this.opts = __assign(__assign({}, defaults), opts);
    }
    Spinner.prototype.spin = function (target) {
        this.stop();
        this.el = document.createElement('div');
        this.el.className = this.opts.className;
        this.el.setAttribute('role', 'progressbar');
        css(this.el, {
            position: this.opts.position,
            width: 0,
            zIndex: this.opts.zIndex,
            left: this.opts.left,
            top: this.opts.top,
            transform: "scale(" + this.opts.scale + ")",
        });
        if (target) {
            target.insertBefore(this.el, target.firstChild || null);
        }
        drawLines(this.el, this.opts);
        return this;
    };
    Spinner.prototype.stop = function () {
        if (this.el) {
            if (typeof requestAnimationFrame !== 'undefined') {
                cancelAnimationFrame(this.animateId);
            }
            else {
                clearTimeout(this.animateId);
            }
            if (this.el.parentNode) {
                this.el.parentNode.removeChild(this.el);
            }
            this.el = undefined;
        }
        return this;
    };
    return Spinner;
}());
// export { Spinner };
function css(el, props) {
    for (var prop in props) {
        el.style[prop] = props[prop];
    }
    return el;
}
function getColor(color, idx) {
    return typeof color == 'string' ? color : color[idx % color.length];
}
function drawLines(el, opts) {
    var borderRadius = (Math.round(opts.corners * opts.width * 500) / 1000) + 'px';
    var shadow = 'none';
    if (opts.shadow === true) {
        shadow = '0 2px 4px #000'; // default shadow
    }
    else if (typeof opts.shadow === 'string') {
        shadow = opts.shadow;
    }
    var shadows = parseBoxShadow(shadow);
    for (var i = 0; i < opts.lines; i++) {
        var degrees = ~~(360 / opts.lines * i + opts.rotate);
        var backgroundLine = css(document.createElement('div'), {
            position: 'absolute',
            top: -opts.width / 2 + "px",
            width: (opts.length + opts.width) + 'px',
            height: opts.width + 'px',
            background: getColor(opts.fadeColor, i),
            borderRadius: borderRadius,
            transformOrigin: 'left',
            transform: "rotate(" + degrees + "deg) translateX(" + opts.radius + "px)",
        });
        var delay = i * opts.direction / opts.lines / opts.speed;
        delay -= 1 / opts.speed; // so initial animation state will include trail
        var line = css(document.createElement('div'), {
            width: '100%',
            height: '100%',
            background: getColor(opts.color, i),
            borderRadius: borderRadius,
            boxShadow: normalizeShadow(shadows, degrees),
            animation: 1 / opts.speed + "s linear " + delay + "s infinite " + opts.animation,
        });
        backgroundLine.appendChild(line);
        el.appendChild(backgroundLine);
    }
}
function parseBoxShadow(boxShadow) {
    var regex = /^\s*([a-zA-Z]+\s+)?(-?\d+(\.\d+)?)([a-zA-Z]*)\s+(-?\d+(\.\d+)?)([a-zA-Z]*)(.*)$/;
    var shadows = [];
    for (var _i = 0, _a = boxShadow.split(','); _i < _a.length; _i++) {
        var shadow = _a[_i];
        var matches = shadow.match(regex);
        if (matches === null) {
            continue; // invalid syntax
        }
        var x = +matches[2];
        var y = +matches[5];
        var xUnits = matches[4];
        var yUnits = matches[7];
        if (x === 0 && !xUnits) {
            xUnits = yUnits;
        }
        if (y === 0 && !yUnits) {
            yUnits = xUnits;
        }
        if (xUnits !== yUnits) {
            continue; 
        }
        shadows.push({
            prefix: matches[1] || '',
            x: x,
            y: y,
            xUnits: xUnits,
            yUnits: yUnits,
            end: matches[8],
        });
    }
    return shadows;
}
function normalizeShadow(shadows, degrees) {
    var normalized = [];
    for (var _i = 0, shadows_1 = shadows; _i < shadows_1.length; _i++) {
        var shadow = shadows_1[_i];
        var xy = convertOffset(shadow.x, shadow.y, degrees);
        normalized.push(shadow.prefix + xy[0] + shadow.xUnits + ' ' + xy[1] + shadow.yUnits + shadow.end);
    }
    return normalized.join(', ');
}
function convertOffset(x, y, degrees) {
    var radians = degrees * Math.PI / 180;
    var sin = Math.sin(radians);
    var cos = Math.cos(radians);
    return [
        Math.round((x * cos + y * sin) * 1000) / 1000,
        Math.round((-x * sin + y * cos) * 1000) / 1000,
    ];
}

// Popover


(function($){

    var pluginName = 'popover';
    var popoverId = 7;
  
   // These are the plugin defaults values
    var defaults = {
      arrowShow:true,
      autoHide:false,
      autoHideDelay:2500,
      content:'',
      delay:{"show": 0, "hide": 0},
      dismissable:false,
      placement:'bottom',
      themeName:'default',
      title:'',
      trigger:'click',
      width:'150px'
    };
  
    var popover = function(element,options){
  
      this.element = $(element);
      this.popoverId = pluginName+"_"+(popoverId++);
      this.options = $.extend({}, defaults, options);
      this.options.autoHideDelay = this.options.autoHideDelay === undefined ? 0 : this.options.autoHideDelay;
      this.options.delay.show = this.options.delay.show === undefined ? 0 : this.options.delay.show;
      this.options.delay.hide = this.options.delay.hide === undefined ? 0 : this.options.delay.hide;
      this.setStyles();
      this.init();
      this.initTriggers();
  
      return this;
    };
  
    popover.prototype.setStyles = function(){
  
      if(this.options.themeName === "default"){
        if($("#popover_styles_default").length){
  
        }
        else{
          var str='.popover_'+this.options.themeName+' {position: absolute;background: #fff;border: 1px solid rgba(0, 0, 0, 0.2);border-radius: 6px;z-index: 1060;-webkit-background-clip: padding-box;background-clip: padding-box;border: 1px solid #cccccc;border: 1px solid rgba(0, 0, 0, 0.2);border-radius: 6px;-webkit-box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);}';
  
          str+='.popover_header_'+this.options.themeName+'{margin: 0;padding: 8px 14px;font-size: 14px;text-align: center;background-color: #f7f7f7;border-bottom: 1px solid #ebebeb;border-radius: 5px 5px 0 0;}.popover_content_'+this.options.themeName+'{padding: 9px 14px;}';
          str+='.popover_'+this.options.themeName+':after, .popover_'+this.options.themeName+':before {border: solid transparent;content: " ";height: 0;width: 0;position: absolute;pointer-events: none;}.popover_'+this.options.themeName+':after {border-color: rgba(255, 255, 255, 0);border-width: 10px;}.popover_'+this.options.themeName+':before {border-color: rgba(0, 0, 0, 0);border-width: 11px;}';
  
              str+='.arrow_top_'+this.options.themeName+':after{left: 50%;bottom: 100%;border-bottom-color: #fff;margin-left: -10px;}.arrow_top_'+this.options.themeName+':before{left: 50%;bottom: 100%;border-bottom-color: rgba(0, 0, 0, 0.2);margin-left: -11px;}';
              str+='.arrow_bottom_'+this.options.themeName+':after{left: 50%;top: 100%;border-top-color: #fff;margin-left: -10px;}.arrow_bottom_'+this.options.themeName+':before{left: 50%;top: 100%;border-top-color: rgba(0, 0, 0, 0.2);margin-left: -11px;}';
              str+='.arrow_left_'+this.options.themeName+':after{right: 100%;top: 50%;border-right-color: #fff;margin-top: -10px;}.arrow_left_'+this.options.themeName+':before{right: 100%;top: 50%;border-right-color: rgba(0, 0, 0, 0.2);margin-top: -11px;}';
              str+='.arrow_right_'+this.options.themeName+':after{left: 100%;top: 50%;border-left-color: #fff;margin-top: -10px;}.arrow_right_'+this.options.themeName+':before{left: 100%;top: 50%;border-left-color: rgba(0, 0, 0, 0.2);margin-top: -11px;}';
  
          // set styles for popover
          $( "<style type='text/css' id='popover_styles_default'>"+str+"</style>" ).appendTo( "head" );
  
          // set styles for progressbar
          str = '.fu_progress{overflow: hidden;height: 20px;margin-bottom: 10px;background-color: #f5f5f5;border-radius: 4px;-webkit-box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.1);box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.1);}';
          str+='.fu_progress_bar{float: left;width: 0%;height: 100%;font-size: 12px;line-height: 20px;color: #ffffff;text-align: center;background-color: #337ab7;-webkit-box-shadow: inset 0 -1px 0 rgba(0, 0, 0, 0.15);box-shadow: inset 0 -1px 0 rgba(0, 0, 0, 0.15);-webkit-transition: width 0.6s ease;-o-transition: width 0.6s ease;transition: width 0.6s ease;}';
  
          $( "<style type='text/css'>"+str+"</style>" ).appendTo( "head" );
        }
      }
  
    };
  
    popover.prototype.init = function()
    {
      var title='';
      var content='';
  
      if(this.options.title.length > 0)
      title='<div class="popover_header_'+this.options.themeName+'">'+this.options.title+'</div>';
  
      var htmlStr = '<div class="popover_'+this.options.themeName+' '+this.getArrowClass()+'" id="'+this.popoverId+'" style="display:none;">'+title+'<div class="popover_content_'+this.options.themeName+'">'+this.options.content+'</div></div>';
  
      this.options.dismissable === true ? this.initDismissableEvent():'';
  
      this.htmlStr = htmlStr;
  
    };
  
    popover.prototype.getArrowClass = function(){
  
      return this.options.placement === 'top' ? 'arrow_bottom_'+this.options.themeName :
             this.options.placement === 'bottom' ? 'arrow_top_'+this.options.themeName :
             this.options.placement === 'left' ? 'arrow_right_'+this.options.themeName :
             this.options.placement === 'right' ? 'arrow_left_'+this.options.themeName : '';
    }
  //**************  Events
    popover.prototype.initDismissableEvent = function(){
  
      var id = this.popoverId;
      var delay = this.options.delay.hide;
      var elem = this.element;
  
      $(document).mouseup(function (e)
      {
          var container = $(elem);
          var container1 = $('#'+id);
  
          if (!container.is(e.target) // if the target of the click isn't the container...
              && container.has(e.target).length === 0 // ... nor a descendant of the container
             && !container1.is(e.target)
             && container1.has(e.target).length === 0) // ... nor a descendant of the container
          {
              $('#'+id).hide(delay);
          }
      });
  
    };
  
    popover.prototype.initTriggers = function(){
      var triggers = (this.options.trigger).split(" ");
      triggers = jQuery.unique(triggers);
  
      for(var i=0;i<triggers.length;i++)
      {
        triggers[i] === 'click' ? this.initClickTrigger() :
        triggers[i] === 'hover' ? this.initHoverTrigger() :
        triggers[i] === 'focus' ? this.initFocusTrigger() : '';
      }
    };
  
    popover.prototype.initClickTrigger = function(){
      var elem = this.element;
      $('body').on("click", '#'+this.element[0].id+'', function() {
        $(elem).popover("show");
      });
    };
    popover.prototype.initHoverTrigger = function(){
      var elem = this.element;
      $('body').on("mouseenter", '#'+this.element[0].id+'', function() {
        $(elem).popover("show");
      });
    };
    popover.prototype.initFocusTrigger = function(){
      var elem = this.element;
      $('body').on("focus", '#'+this.element[0].id+'', function() {
        $(elem).popover("show");
      });
    };
  
    //**************  Events
  
    // Show /hide /destroy
      popover.prototype.display = function(option){
  
        var id = this.popoverId;
  
        if(option === 'show'){
          var showDelay = this.options.delay.show;
          var arrowShow = this.options.arrowShow;
  
          if(!$("#"+id).length)
          $("body").append(this.htmlStr);
  
          setTimeout(function(){
  
            if(!arrowShow){
              $("#"+id).attr('class','');
              $("#"+id).addClass("popover_"+this.options.themeName);
            }
  
            $("#"+id).show();
          },showDelay);
  
          this.setPopupPosition();
  
          if(this.options.autoHide === true){
            var hideDelay = this.options.autoHideDelay;
            hideDelay = hideDelay == 0 ? 2500 : hideDelay;
  
            setTimeout(function(){
                $("#"+id).hide();
            },hideDelay);
  
          }
  
        }
        else if(option === 'hide'){
          $("#"+id).hide(this.options.delay.hide);
        }
        else if(option === 'destroy'){
          $("#"+id).remove();
          $(this.element).removeData("popover");
          this.destroyTriggers();
        }
  
      }
  
  // Calculate offsets - for old browsers
      popover.prototype.getOffsetSum = function(elem) {
        var top=0, left=0
        while(elem) {
          top = top + parseInt(elem.offsetTop)
          left = left + parseInt(elem.offsetLeft)
          elem = elem.offsetParent
        }
  
        return {top: top, left: left}
      }
  
  // Calculate offsets
      popover.prototype.getOffsetRect = function(elem) {
          var box = elem.getBoundingClientRect()
  
          var body = document.body
          var docElem = document.documentElement
  
          var scrollTop = window.pageYOffset || docElem.scrollTop || body.scrollTop
          var scrollLeft = window.pageXOffset || docElem.scrollLeft || body.scrollLeft
  
          var clientTop = docElem.clientTop || body.clientTop || 0
          var clientLeft = docElem.clientLeft || body.clientLeft || 0
  
          var top  = box.top +  scrollTop - clientTop
          var left = box.left + scrollLeft - clientLeft
  
          return { top: Math.round(top), left: Math.round(left) }
      }
  
      popover.prototype.getOffset = function( elem ){
          if (elem.getBoundingClientRect) {
              return this.getOffsetRect(elem)
          } else {
              return this.getOffsetSum(elem)
          }
      }
  
    popover.prototype.setPopupPosition = function(){
  
      $("#"+this.popoverId).css({width:this.options.width});
  
      var position = this.getOffset(this.element[0]);
  
      var popoverPosition = $("#"+this.popoverId).position();
  
      var parentWidth = $(this.element).outerWidth();
      var parentHeight = $(this.element).outerHeight();
      var parentLeft = position.left;
      var parentTop = position.top;
  
      var popoverWidth = $("#"+this.popoverId).outerWidth();
      var popoverHeight = $("#"+this.popoverId).outerHeight();
  
      var left,top;
  
      if(this.options.placement === 'bottom' || this.options.placement === 'top'){
  
        var parentCenter = (parentWidth/2);
        var popoverCenter = (popoverWidth/2);
  
        if(this.options.placement === 'bottom'){
            top = parentTop + parentHeight + 14;// 12.5 - arrow height
        }
        else{
            top = parentTop - popoverHeight - 10;//why 10 ?? box consists shadow
        }
  
        var  pCenterLeft = parentLeft + parentCenter;
  
        left = pCenterLeft - popoverCenter;
  
      }
      else if(this.options.placement === 'left' || this.options.placement === 'right'){
  
        var parentCenter = (parentHeight/2);
        var popoverCenter = (popoverHeight/2);
  
        if(this.options.placement === 'left'){
            left = parentLeft - popoverWidth - 10;
        }
        else{
            left = parentLeft + parentWidth + 14;//box shadow
        }
  
        var  pCenterTop = parentTop + parentCenter;
  
        top = pCenterTop - popoverCenter;
  
      }
  
      $("#"+this.popoverId).css({"left":left+"px","top":top+"px"});
  
    }
  
    popover.prototype.destroyTriggers = function(){
      var triggers = (this.options.trigger).split(" ");
      triggers = jQuery.unique(triggers);
  
      for(var i=0;i<triggers.length;i++)
      {
        $('body').off("click", '#'+this.element[0].id+'', function(){});
        $('body').off("mouseenter", '#'+this.element[0].id+'', function(){});
        $('body').off("focus", '#'+this.element[0].id+'', function(){});
      }
    };
  
    $.fn.popover = function(options){
  
      if (typeof options == 'string'){
          var obj = $(this).data(pluginName);
          if(jQuery.isEmptyObject(obj))
          return this;
          obj.display(options);
      }
      else{
        if(!$.data(this, pluginName)){
  
          var pop = new popover(this,options);
          $("#"+pop.element[0].id).data(pluginName,pop);
          $.data(this, pluginName, pop);
  
          return this;
        }
      }
    }
  
  }(jQuery));