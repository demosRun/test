var autoScaleInfo = {
  // 设计宽度
  deviseW: 800,
  // 设计高度
  deviseH: 1508,
  // 设计宽度PC
  devisePCW: 1200,
  // 设计高度PC
  devisePCH: 980,
}

function getScale () {
  document.body.style.opacity = 0
  // 如果比例大于1则进入电脑模式
  autoScaleInfo.innerWidth = window.innerWidth
  autoScaleInfo.innerHeight = window.innerHeight
  var scaleBoxList = document.getElementsByClassName('scale-box')
  for (var index = 0; index < scaleBoxList.length; index++) {
    var scaleBox = scaleBoxList[index];
    
    if ((autoScaleInfo.innerWidth / autoScaleInfo.innerHeight) < 1) {
      var scale = autoScaleInfo.innerWidth / autoScaleInfo.deviseW
      autoScaleInfo.scale = scale
      scaleBox.style.width = autoScaleInfo.deviseW + 'px'
      scaleBox.style.height = autoScaleInfo.deviseH + 'px'
      autoScaleInfo.hideHeight = (autoScaleInfo.innerHeight - autoScaleInfo.deviseH * scale) / 2 /scale
      scaleBox.style.transform = 'scale(' + scale + ', ' + scale + ') translate(0, ' + autoScaleInfo.hideHeight + 'px)';
      scaleBox.style.transformOrigin = '0px 0px 0px'
      autoScaleInfo.showHeight = autoScaleInfo.innerHeight / autoScaleInfo.scale
      autoScaleInfo.showWidth = autoScaleInfo.innerWidth / autoScaleInfo.scale
    } else {
      document.body.classList.add('pc')
      var scale = (autoScaleInfo.innerHeight / autoScaleInfo.deviseH).toFixed(2)
      scaleBox.style.width = autoScaleInfo.deviseW + 'px'
      document.body.style.height = scaleBox.offsetHeight * scale + 'px'
      // document.body.style.height = document.body.clientHeight * scale + 'px'
      scaleBox.style.overflow = 'hidden'
      scaleBox.style.transform = 'scale(' + scale + ', ' + scale + ') translate(' + (autoScaleInfo.innerWidth - autoScaleInfo.deviseW * scale) / 2 / scale + 'px, 0)'
      scaleBox.style.transformOrigin = '0 0 0'
    }
  }
  // 只对宽屏生效
  if ((autoScaleInfo.innerWidth / autoScaleInfo.innerHeight) > 1) {
    // 缩放PC
    var scaleListPC = document.getElementsByClassName('scale-box-pc')
    for (var index = 0; index < scaleListPC.length; index++) {
      var scaleBox = scaleListPC[index];
      var screenScale = window.innerWidth / window.innerHeight
      var deviseScale = autoScaleInfo.devisePCW / autoScaleInfo.devisePCH
      var scale = screenScale < deviseScale ? window.innerWidth / autoScaleInfo.devisePCW : window.innerHeight / autoScaleInfo.devisePCH
      scaleBox.style.width = autoScaleInfo.devisePCW + 'px'
      scaleBox.style.height = autoScaleInfo.devisePCH + 'px'
      scaleBox.style.transform = 'scale(' + scale.toFixed(2) + ', ' + scale.toFixed(2) + ') translate(' + ((autoScaleInfo.innerWidth - autoScaleInfo.devisePCW * scale) / 2 / scale).toFixed(2) + 'px, 0)'
      scaleBox.style.transformOrigin = '0 0 0'
      scaleBox.style.margin = 'inherit'
    }
  }

  setTimeout(function () {
    document.body.style.opacity = 1
  }, 0);
}

getScale()

var timer = null

function refreshGetScale () {
  console.log("重新计算")
  window.clearTimeout(timer)
  timer = setTimeout(function () {
    getScale()
  }, 300)
}

if (window.addEventListener) {
  // 延迟一会再注册事件监听以防止页面初始化的时候刷新两次
  setTimeout(function () {
    window.addEventListener('resize', refreshGetScale)

    // 微信返回自动重新排版布局
    window.addEventListener('pageshow', refreshGetScale)
  }, 100);
}