// Babel me with targets defaults https://babeljs.io/repl (this fixes eg IE11 not allowing type literal multi-line strings with ``)
// ... then ...
// Minify me with https://github.com/mishoo/UglifyJS

var riframeheights = {};
var riframestyles = {};
var rdivstyles = {};
var aceeditors = {};

function surfeR(url, persistent, sessionname) {
  var styles = document.createElement('style');
  styles.innerHTML = `
.surfeRshowhide .surfeRzoomunzoom {
  padding: 8px 16px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  transition-duration: 0.4s;
  cursor: pointer;
  border-radius: 25%;
}
.surfeRshowhide {
  background-color: white;
  border: 2px solid #e7e7e7;
  color: black;
}
.surfeRshowhide:hover {
  background-color: #e7e7e7;
}
.surfeRzoomunzoom {
  background-color: white;
  border: 2px solid #006600;
  color: black;
}
.surfeRzoomunzoom:hover {
  background-color: #006600;
  color: white;
}
.surfeRshowhide:disabled,.surfeRshowhide[disabled] {
  background:
  repeating-linear-gradient(
    45deg,
    transparent,
    transparent 10px,
    #ccc 10px,
    #ccc 20px
  ),
  linear-gradient(
    to bottom,
    #eee,
    #999
  );
}
.surfeRout {
  border-style: dashed;
  border-color: #999999;
  padding: 5px;
}
.surfeRif {
  margin-top: 5px;
}
.aceeditor {
  height: 80px;
  width: 100%;
}
.surfeRswitch {
  position: relative;
  display: inline-block;
  width: 40px;
  height: 24px;
  margin-left: 2em;
  margin-right: 0.5em;
}
.surfeRswitch input {
  opacity: 0;
  width: 0;
  height: 0;
}
.surfeRslider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  -webkit-transition: .4s;
  transition: .4s;
}
.surfeRslider:before {
  position: absolute;
  content: "";
  height: 16px;
  width: 16px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  -webkit-transition: .4s;
  transition: .4s;
}
input:checked + .surfeRslider {
  background-color: #006600;
}
input:focus + .surfeRslider {
  box-shadow: 0 0 1px #006600;
}
input:checked + .surfeRslider:before {
  -webkit-transform: translateX(16px);
  -ms-transform: translateX(16px);
  transform: translateX(16px);
}
.surfeRslider.round {
  border-radius: 34px;
}
.surfeRslider.round:before {
  border-radius: 50%;
}
`;
  document.head.appendChild(styles);

  var uuid = surfeRuuidv4();

  var rs = document.querySelectorAll('[surfeR]');

  var rs_new;
  var form, form_tog;
  var out, tmp;
  for(var i=0; i<rs.length; i++) {
    // Replace pre with div for Ace editor and give id
    rs_new = document.createElement('div');
    rs_new.id = 'surfeR_'+i+'_code';
    rs_new.className = 'aceeditor';
    rs_new.innerHTML = rs[i].innerHTML;
    rs[i].parentNode.replaceChild(rs_new, rs[i]);

    aceeditors[i] = ace.edit('surfeR_'+i+'_code', {
      theme: "ace/theme/monokai",
      mode: "ace/mode/r",
      maxLines: 30,
      wrap: true,
      autoScrollEditorIntoView: true
    });

    // Create form
    form = document.createElement('form');
    form.action = url;
    form.method = 'POST';
    form.target = 'surfeR_'+i+'_if';
    form.onsubmit = new Function('event', "surfeRsubmit("+i+");");

    tmp = document.createElement('textarea');
    tmp.id = 'surfeR_'+i+'_ta';
    tmp.name = 'code';
    tmp.style.display = 'none';
    form.append(tmp);

    tmp = document.createElement('input');
    tmp.type = 'hidden';
    tmp.name = 'block';
    tmp.value = surfeRpad(i, 3);
    form.append(tmp);

    tmp = document.createElement('input');
    tmp.type = 'hidden';
    tmp.name = 'sess';
    tmp.value = sessionname;
    form.append(tmp);

    tmp = document.createElement('input');
    tmp.type = 'hidden';
    tmp.name = 'uuid';
    tmp.value = uuid;
    form.append(tmp);

    tmp = document.createElement('input');
    tmp.id = 'surfeR_'+i+'_submit';
    tmp.setAttribute('surfeR_submit', '');
    tmp.type = 'submit';
    tmp.className = 'surfeRshowhide';
    tmp.value = '▶️ Run code!';
    form.append(tmp);

    form_tog = document.createElement('label');
    form_tog.className = 'surfeRswitch';
    tmp = document.createElement('input');
    tmp.id = 'surfeR_'+i+'_togper';
    tmp.name = 'persistent'
    tmp.setAttribute('surfeR_togper', '')
    tmp.type = 'checkbox';
    tmp.checked = persistent;
    tmp.onchange = new Function('event', "surfeRtoggle('surfeR_"+i+"_togper');");
    form_tog.append(tmp);
    tmp = document.createElement('span');
    tmp.className = 'surfeRslider round';
    form_tog.append(tmp);
    form.append(form_tog);
    tmp = document.createElement('span');
    tmp.innerHTML = 'Persistent';
    form.append(tmp);
    tmp = document.createElement('input');
    tmp.id = 'surfeR_'+i+'_runprev';
    tmp.setAttribute('surfeR_runprev', '')
    tmp.type = 'button';
    tmp.className = 'surfeRshowhide';
    tmp.value = '⏬️ Run previous';
    tmp.style.marginLeft = '1em';
    tmp.style.display = (persistent & i>0 ? '' : 'none');
    tmp.onclick = new Function('event', "surfeRrunupto(0,"+i+");");
    form.append(tmp);


    rs_new.parentNode.insertBefore(form, rs_new.nextSibling);

    // Create output area
    out = document.createElement('div');
    out.className = 'surfeRout';
    out.id = 'surfeR_'+i+'_div';
    out.style.display = 'none';

    tmp = document.createElement('button');
    tmp.className = 'surfeRzoomunzoom';
    tmp.onclick = new Function('event', "surfeRzoom('surfeR_"+i+"_div', 'surfeR_"+i+"_if');");
    tmp.innerHTML = '🔎 <tt>Zoom</tt>';
    out.append(tmp);

    tmp = document.createElement('button');
    tmp.className = 'surfeRzoomunzoom';
    tmp.onclick = new Function('event', "surfeRunzoom('surfeR_"+i+"_div', 'surfeR_"+i+"_if');");
    tmp.innerHTML = '🔎 <tt>UnZoom</tt>';
    tmp.style.display = 'none';
    out.append(tmp);

    tmp = document.createElement('button');
    tmp.className = 'surfeRshowhide';
    tmp.onclick = new Function('event', "surfeRhide('surfeR_"+i+"_div', 'surfeR_"+i+"_if');");
    tmp.innerHTML = '🙈 <tt>Hide</tt>';
    out.append(tmp);

    tmp = document.createElement('button');
    tmp.className = 'surfeRshowhide';
    tmp.onclick = new Function('event', "surfeRshow('surfeR_"+i+"_div', 'surfeR_"+i+"_if');");
    tmp.innerHTML = '👀 <tt>Show</tt>';
    tmp.style.display = 'none';
    out.append(tmp);

    tmp = document.createElement('iframe');
    tmp.className = 'surfeRif';
    tmp.id = 'surfeR_'+i+'_if';
    tmp.name = 'surfeR_'+i+'_if';
    tmp.width = '100%';
    out.append(tmp);

    form.parentNode.insertBefore(out, form.nextSibling);

    // Break
    out.parentNode.insertBefore(document.createElement('br'), out.nextSibling);
  }
}

function surfeRsubmit(i) {
  document.getElementById('surfeR_'+i+'_submit').setAttribute('disabled', 'disabled');
  setTimeout("document.getElementById('surfeR_"+i+"_submit').removeAttribute('disabled');", 2000);
  document.getElementById('surfeR_'+i+'_ta').value = aceeditors[i].getValue();
  document.getElementById('surfeR_'+i+'_div').setAttribute('style','display:block;');
  surfeRshow('surfeR_'+i+'_div', 'surfeR_'+i+'_if');
}

function surfeRrunupto(i,n) {
  document.getElementById('surfeR_'+n+'_runprev').setAttribute('disabled', 'disabled');
  document.getElementById('surfeR_'+i+'_runprev').setAttribute('disabled', 'disabled');
  setTimeout("document.getElementById('surfeR_"+i+"_runprev').removeAttribute('disabled');", 2000);
  var fm = document.querySelectorAll('[surfeR_submit]');
  if(i<n && i<fm.length) {
    fm[i].click();
    if(i+1<n) {
      setTimeout("surfeRrunupto("+(i+1)+","+n+")", 500);
    } else {
      setTimeout("document.getElementById('surfeR_"+n+"_runprev').removeAttribute('disabled');", 2000);
    }
  }
}

function surfeRtoggle(cb) {
  var ck = document.getElementById(cb).checked;
  var tog = document.querySelectorAll('[surfeR_togper]');
  var run = document.querySelectorAll('[surfeR_runprev]');
  for(var i=0; i<tog.length; i++) {
    tog[i].checked = ck;
    run[i].style.display = (ck & i>0 ? '' : 'none');
  }
}

function surfeRzoom(rdiv, riframe) {
  document.getElementById(rdiv).setAttribute('style', 'position: fixed; z-index: 1000; top: 50px; right: 50px; bottom: 50px; left: 50px; background-color: rgba(255,255,255,1); box-shadow: 5px 10px 8px #888888;');
  var divstyle = window.getComputedStyle(document.getElementById(rdiv), null);
  var ifstyle = window.getComputedStyle(document.getElementById(riframe), null);
  var linkstyle = window.getComputedStyle(document.getElementById(rdiv).getElementsByTagName("BUTTON")[0], null);
  riframeheights[riframe] = ifstyle.getPropertyValue('height');
  document.getElementById(riframe).height=parseFloat(divstyle.getPropertyValue('height'))-parseFloat(linkstyle.getPropertyValue('height'))-20.0;
  document.getElementById(rdiv).getElementsByTagName("BUTTON")[0].style.display='none';
  document.getElementById(rdiv).getElementsByTagName("BUTTON")[1].style.display='';
}

function surfeRunzoom(rdiv, riframe) {
  document.getElementById(rdiv).setAttribute('style', rdivstyles[rdiv]);
  document.getElementById(rdiv).style.display='block';
  var tmp = window.getComputedStyle(document.getElementById(riframe), null).getPropertyValue('display');
  document.getElementById(riframe).setAttribute('style', riframestyles[riframe]);
  document.getElementById(riframe).height=riframeheights[riframe];
  document.getElementById(riframe).style.display = tmp;
  document.getElementById(rdiv).getElementsByTagName("BUTTON")[1].style.display='none';
  document.getElementById(rdiv).getElementsByTagName("BUTTON")[0].style.display='';
}

function surfeRhide(rdiv, riframe) {
  document.getElementById(riframe).style.display='none';
  document.getElementById(rdiv).getElementsByTagName("BUTTON")[2].style.display='none';
  document.getElementById(rdiv).getElementsByTagName("BUTTON")[3].style.display='';
}

function surfeRshow(rdiv, riframe) {
  document.getElementById(riframe).style.display='';
  document.getElementById(rdiv).getElementsByTagName("BUTTON")[3].style.display='none';
  document.getElementById(rdiv).getElementsByTagName("BUTTON")[2].style.display='';
}

function surfeRuuidv4() { // From https://stackoverflow.com/a/2117523/1055918
  return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
    (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
  );
}

function surfeRpad(num, size) { // From https://stackoverflow.com/a/2998822
  var s = "000000000" + num;
  return s.substr(s.length-size);
}
