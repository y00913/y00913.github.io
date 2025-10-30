var button = document.getElementById('button');
var input = document.getElementById('input');
var list = document.getElementById('list');

button.addEventListener('click', clickButton);

var cnt = 1;

function clickButton () {
  var tmp = document.createElement('li');
  tmp.setAttribute('id', 'li'+cnt);
  tmp.innerHTML = input.value
  tmp.innerHTML += '<button type="button" onclick="remove('+cnt+')">삭제</button>';
  list.appendChild(tmp);
  cnt++;
}

function remove(cnt) {
  var li = document.getElementById('li'+cnt);
  list.removeChild(li);
}