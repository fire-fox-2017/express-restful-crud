var tanggal = require ('moment');

module.exports = {
  formatdate : function (date) {
    return tanggal(date).format("dddd, D MMM YYYY, h:mm ");
  }
}
