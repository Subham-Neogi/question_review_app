let date = document.getElementById('date');
let values = new Date(Date.now()).toLocaleString().split(',')[0].split('/');
values[0] = values[0].padStart(2, 0);
values[1] = values[1].padStart(2, 0);
date.setAttribute("value", values[1]+'/'+values[0]+'/'+values[2]);