function timeConvert(time) {
  let newTime = new Date(time);
  let day = newTime.getDay();
  let date = newTime.getDate();
  let month = newTime.getMonth();
  let year = newTime.getFullYear();
  let hours = newTime.getHours() +1;
  let minutes = newTime.getMinutes();
  if (String(minutes).length < 2) {
    minutes = "0"+String(minutes);
  }
  let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  return `${days[day]}, ${date}-${months[month]}-${year}, ${hours}:${minutes}`;
}

function deleteConfirm() {
  if(Window.confirm("Are you sure you want to delete the task?")) {
    return true;
  } else {
    return false;
  }
}


/*
<%function timeConvert(time) { %>
  <%let newTime = new Date(time);%>
  <%let day = newTime.getDay();%>
  <%let date = newTime.getDate();%>
  <%let month = newTime.getMonth();%>
  <%let year = newTime.getFullYear();%>
  <%let hours = newTime.getHours() +1;%>
  <%let minutes = newTime.getMinutes();%>
  <%if (String(minutes).length < 2) {%>
    <%minutes = "0"+String(minutes);%>
  <%}%>
  <%let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];%>
  <%let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];%>
  <%return `${days[day]}, ${date}-${months[month]}-${year}, ${hours}:${minutes}`;%>
<%}%>

<%function deleteConfirm() {%>
  <%if(Window.confirm("Are you sure you want to delete the task?")) {%>
    <%return true;%>
  <%} else {%>
    <%return false;%>
  <%}%>
<%}%>
*/
