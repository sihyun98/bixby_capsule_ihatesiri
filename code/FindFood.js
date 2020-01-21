//var http = require('http')
var console = require('console')
var config = require('config')
var db = require('./data/db.js')
module.exports.function = function findFood (item1,item2,item3,item4,item5) {
  // Read the remote.url value from capsule.properties
  var items = []
  var result = {}
  var temp = new Array(0,0,0,0)

  if (item1) {
      items.push(item1)
    }
  if (item2) {
    items.push(item2)
  }
  if (item3) {
    items.push(item3)
  }
  if (item4) {
    items.push(item4)
  }
  if (item5) {
    items.push(item5)
  }
  // var response = http.getUrl(config.get('remote.url'), { format: 'json' });
  for (var i in items){
    var flag = false
    for (var cnt in db){
      var target = db[cnt]['DESC_KOR']
      if(target.indexOf(String(items[i]))!=-1 || String(items[i]).indexOf(target)!=-1){
        for (var j = 0; j<4; j++){
          var tp = String('NUTR_CONT'+Number(j+1))
          if (Number(db[cnt][tp])>=0){
            temp[j] = temp[j] + Number(db[cnt][tp])
          }
          else{
            temp[j] = temp[j] + (Number(db[cnt][tp]) || 0)
          }
        }
        flag = true
        break
      }
    }
    if(flag == false){
      result[String('item'+(Number(i)+1))] = String(items[i])
    }
  }
  var list = new Array(2350, 370, 52.5, 52.075)
  for (var k = 0; k<4; k++){
    var tp = String('NUTR_CONT'+Number(k+1))
    result[String(tp+'_PER')] = Math.round((temp[k]/list[k])*100)
    result[tp] = Math.round(temp[k])
  }
  return result;
}