var moment = require('moment');

module.exports = {
  date_format: function(date) {
    return moment(date).format('dddd, DD MMM YYYY, h:mm');
  }
}
