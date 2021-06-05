// Babel me with targets defaults https://babeljs.io/repl (this fixes eg IE11 not allowing type literal multi-line strings with ``)
// ... then ...
// Minify me with https://github.com/mishoo/UglifyJS

var riframeheights = {};
var riframestyles = {};
var rdivstyles = {};
var aceeditors = {};

function Rserve(url) {
  var styles = document.createElement('style');
  styles.innerHTML = `
.rserveshowhide .rservezoomunzoom {
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
.rserveshowhide {
  background-color: white;
  border: 2px solid #e7e7e7;
  color: black;
}
.rserveshowhide:hover {background-color: #e7e7e7;}
.rservezoomunzoom {
  background-color: white;
  border: 2px solid #006600;
  color: black;
}
.rservezoomunzoom:hover {background-color: #006600;color: white;}
.rserveout {
  border-style: dashed;
  border-color: #999999;
  padding: 5px;
}
.rserveif {
  margin-top: 5px;
}
.aceeditor {
  height: 80px;
  width: 100%;
}
`;
  document.head.appendChild(styles);

  var rs = document.querySelectorAll('[rserve]');

  var rs_new;
  var form, form_ta, form_sub;
  var out, tmp;
  for(var i=0; i<rs.length; i++) {
    // Replace pre with div for Ace editor and give id
    rs_new = document.createElement('div');
    rs_new.id = 'rserve_'+i+'_code';
    rs_new.className = 'aceeditor';
    rs_new.innerHTML = rs[i].innerHTML;
    rs[i].parentNode.replaceChild(rs_new, rs[i]);

    aceeditors[i] = ace.edit('rserve_'+i+'_code', {
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
    form.target = 'rserve_'+i+'_if';
    form.onsubmit = new Function('event', "document.getElementById('rserve_"+i+"_ta').value=aceeditors["+i+"].getValue(); document.getElementById('rserve_"+i+"_div').setAttribute('style','display:block;'); ShowR('rserve_"+i+"_div', 'rserve_"+i+"_if');");

    form_ta = document.createElement('textarea');
    form_ta.id = 'rserve_'+i+'_ta';
    form_ta.name = 'code';
    form_ta.style.display = 'none';

    form_sub = document.createElement('input');
    form_sub.type = 'submit';
    form_sub.className = 'rserveshowhide';
    form_sub.value = '▶️ Run code!';

    form.append(form_ta);
    form.append(form_sub);

    rs_new.parentNode.insertBefore(form, rs_new.nextSibling);

    // Create output area
    out = document.createElement('div');
    out.className = 'rserveout';
    out.id = 'rserve_'+i+'_div';
    out.style.display = 'none';

    tmp = document.createElement('button');
    tmp.className = 'rservezoomunzoom';
    tmp.onclick = new Function('event', "ZoomR('rserve_"+i+"_div', 'rserve_"+i+"_if');");
    tmp.innerHTML = '🔎 <tt>Zoom</tt>';
    out.append(tmp);

    tmp = document.createElement('button');
    tmp.className = 'rservezoomunzoom';
    tmp.onclick = new Function('event', "UnZoomR('rserve_"+i+"_div', 'rserve_"+i+"_if');");
    tmp.innerHTML = '🔎 <tt>UnZoom</tt>';
    tmp.style.display = 'none';
    out.append(tmp);

    tmp = document.createElement('button');
    tmp.className = 'rserveshowhide';
    tmp.onclick = new Function('event', "HideR('rserve_"+i+"_div', 'rserve_"+i+"_if');");
    tmp.innerHTML = '🙈 <tt>Hide</tt>';
    out.append(tmp);

    tmp = document.createElement('button');
    tmp.className = 'rserveshowhide';
    tmp.onclick = new Function('event', "ShowR('rserve_"+i+"_div', 'rserve_"+i+"_if');");
    tmp.innerHTML = '👀 <tt>Show</tt>';
    tmp.style.display = 'none';
    out.append(tmp);

    tmp = document.createElement('iframe');
    tmp.className = 'rserveif';
    tmp.id = 'rserve_'+i+'_if';
    tmp.name = 'rserve_'+i+'_if';
    tmp.width = '100%';
    out.append(tmp);

    form.parentNode.insertBefore(out, form.nextSibling);

    // Break
    out.parentNode.insertBefore(document.createElement('br'), out.nextSibling);
  }
}

function ZoomR(rdiv, riframe) {
  document.getElementById(rdiv).setAttribute('style', 'position: fixed; z-index: 1000; top: 50px; right: 50px; bottom: 50px; left: 50px; background-color: rgba(255,255,255,1); box-shadow: 5px 10px 8px #888888;');
  var divstyle = window.getComputedStyle(document.getElementById(rdiv), null);
  var ifstyle = window.getComputedStyle(document.getElementById(riframe), null);
  var linkstyle = window.getComputedStyle(document.getElementById(rdiv).getElementsByTagName("BUTTON")[0], null);
  riframeheights[riframe] = ifstyle.getPropertyValue('height');
  document.getElementById(riframe).height=parseFloat(divstyle.getPropertyValue('height'))-parseFloat(linkstyle.getPropertyValue('height'))-20.0;
  document.getElementById(rdiv).getElementsByTagName("BUTTON")[0].style.display='none';
  document.getElementById(rdiv).getElementsByTagName("BUTTON")[1].style.display='';
}

function UnZoomR(rdiv, riframe) {
  document.getElementById(rdiv).setAttribute('style', rdivstyles[rdiv]);
  document.getElementById(rdiv).style.display='block';
  var tmp = window.getComputedStyle(document.getElementById(riframe), null).getPropertyValue('display');
  document.getElementById(riframe).setAttribute('style', riframestyles[riframe]);
  document.getElementById(riframe).height=riframeheights[riframe];
  document.getElementById(riframe).style.display = tmp;
  document.getElementById(rdiv).getElementsByTagName("BUTTON")[1].style.display='none';
  document.getElementById(rdiv).getElementsByTagName("BUTTON")[0].style.display='';
}

function HideR(rdiv, riframe) {
  document.getElementById(riframe).style.display='none';
  document.getElementById(rdiv).getElementsByTagName("BUTTON")[2].style.display='none';
  document.getElementById(rdiv).getElementsByTagName("BUTTON")[3].style.display='';
}

function ShowR(rdiv, riframe) {
  document.getElementById(riframe).style.display='';
  document.getElementById(rdiv).getElementsByTagName("BUTTON")[3].style.display='none';
  document.getElementById(rdiv).getElementsByTagName("BUTTON")[2].style.display='';
}
