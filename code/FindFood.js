var http = require('http')
var console = require('console')
var config = require('config')
module.exports.function = function findFood (item1,item2,item3,item4,item5) {
  // Read the remote.url value from capsule.properties
  var items = []
  var result = {}
  var temp = new Array(0,0,0,0,0,0,0,0,0)

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
  
  for (var i in items){
    var query = String(items[i])
    var response = http.getUrl(config.get('remote.url')+'/DESC_KOR='+query, { format: 'json' });
    response = response.I0750.row;
        
    for (var j = 0; j<9; j++){
      var tp = String('NUTR_CONT'+Number(j+1))
      if (Number(response[0][tp])>=0){
        temp[j] = temp[j]+Number(response[0][tp])
      }
      else{
        temp[j] = temp[j]+ (Number(response[0][tp]) || 0)
      }
    }
  }
  for (var k = 0; k<9; k++){
    var tp = String('NUTR_CONT'+Number(k+1))
    result[tp] = temp[k]
  }
  return result;
}