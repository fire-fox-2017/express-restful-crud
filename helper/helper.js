ejslet help = (date) => {
// '1997-02-17'
  let newDate = new Date(date);
  let month = ['January','February','March','April','June','July','August','September','October','November','December']
  let day = ['Monday','Tuesday','Wenesday','Thursday','Friday','Saturday','Sunday']

  let hari = day[newDate.getDay()];
  let tanggal = newDate.getDate();
  let bulan = month[newDate.getMonth()];
  let tahun = newDate.getFullYear();
  let menit = newDate.getMinutes();
  let jam = newDate.getHours();
  if(menit < 10) {
    menit = '0'+menit;
  }

  if(jam < 10) {
    jam = '0'+jam;
  }


  return hari+", "+tanggal+" "+bulan+" "+tahun+", "+jam+":"+menit;

}


module.exports = help;