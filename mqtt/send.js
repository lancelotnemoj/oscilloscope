var mqtt = require('mqtt')
var client  = mqtt.connect('mqtt://127.0.0.1:3000')

console.log("okok")
 
client.on("error",(err)=>{
    console.log(err)
})

client.on('connect', function () {
  console.log("ok")
  client.subscribe('text', function (err) {
    if (!err) {
      client.publish('text', 'Hello mqtt')
    }
  })
})
 
client.on('message', function (topic, message) {
  // message is Buffer
  console.log(message.toString())
  client.end()
})