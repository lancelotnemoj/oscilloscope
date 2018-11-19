import _ from 'lodash'

// import mqtt from 'mqtt'
import G2 from '@antv/g2'

function component () {
  var element = document.createElement('div')
  element.style.width = '80vw'
  element.id = 'mountNode'
  return element
}

document.body.appendChild(component())

var data = []
var chart
initCanvas()
updateData()
function updateData () {
  setInterval(function () {
    var now = new Date()
    var time = now.getTime()
    var temperature1 = ~~(Math.random() * 200) + 50
    if (data.length >= 100) {
      data.shift()
      data.shift()
    }
    data.push({
      time: time,
      temperature: temperature1,
      type: '记录1'
    })
    chart.changeData(data)
  }, 100)
}
function initCanvas () {
  chart = new G2.Chart({
    container: 'mountNode',
    forceFit: true,
    height: window.innerHeight,
    render: 'canvas'
  })
  chart.source(data, {
    time: {
      alias: '时间',
      type: 'time',
      mask: 'MM:ss',
      tickCount: 100,
      nice: false
    },
    temperature: {
      alias: '平均温度(°C)',
      min: 10,
      max: 350,
      animate: true
    },
    type: {
      type: 'cat'
    }
  })
  chart
    .line()
    .position('time*temperature')
    .color('type', ['#ff7f0e'])
    .shape('line')
    .size(2)
    .tooltip(false)
    .animate({
      enter: {
        animation: 'fadeIn', // 动画名称
        easing: 'easeQuadIn', // 动画缓动效果
        delay: 0, // 动画延迟执行时间
        duration: 50 // 动画执行时间
      },
      leave: {
        animation: 'pathOut',
        easing: 'easeLinear', // 动画缓动效果
        delay: 0, // 动画延迟执行时间
        duration: 50 // 动画执行时间
      },
      appear: {
        animation: 'pathIn',
        easing: 'easeLinear', // 动画缓动效果
        delay: 0, // 动画延迟执行时间
        duration: 50 // 动画执行时间
      },
      update: {
        animation: 'fadeOut',
        easing: 'easeLinear', // 动画缓动效果
        delay: 0, // 动画延迟执行时间
        duration: 30 // 动画执行时间
      }
    })

  chart.render()
}

// let client = mqtt.connect('mqtt://localhost:3000')
// client.on('connect', function () {
//   client.subscribe('text', function (err) {
//     if (!err) {
//       client.publish('text', 'Hello mqtt')
//     }
//   })
// })

// client.subscribe('text2')

// client.on('message', function (topic, message) {
//   // message is Buffer
//   console.log(message.toString())
// })
