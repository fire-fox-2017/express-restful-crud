var moment = require('moment')

module.exports = {
  format_date: function(date){
    return moment(date).format('dddd, D MMM YYYY, h:mm')
  }
}
