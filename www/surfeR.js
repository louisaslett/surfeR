// Babel me with targets defaults https://babeljs.io/repl (this fixes eg IE11 not allowing type literal multi-line strings with ``)
// ... then ...
// Minify me with https://github.com/mishoo/UglifyJS

var riframeheights = {};
var riframestyles = {};
var rdivstyles = {};
var aceeditors = {};

function surfeR(url, persistent, sessionname, cache) {
  var styles = document.createElement('style');
  styles.innerHTML = `
.surfeRtagline {
  text-align: right;
  font-weight: bold;
  font-size: 60%;
  background-color: #666666;
  -webkit-background-clip: text;
  -moz-background-clip: text;
  background-clip: text;
  color: transparent;
  cursor: pointer;
  text-shadow: rgba(245,245,245,0.5) 1px 1px 1px;
}
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
  vertical-align: middle;
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

  var uuid = surfeRgetcookie('uuid');
  if(uuid == "") {
    uuid = surfeRuuidv4();
  }
  surfeRsetcookie('uuid', uuid, 30);

  var rs = document.querySelectorAll('[surfeR]');

  var cachesha;
  var rs_new, tagline;
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

    // Initial tagline
    tagline = document.createElement('div');
    tagline.className = 'surfeRtagline';
    cachesha = surfeRsha256(aceeditors[i].getValue());
    tagline.innerHTML = '🚀 <span onclick="location.href = \'https://www.louisaslett.com/surfeR/\';">louisaslett.com/surfeR</span>&nbsp;&nbsp;&bull;&nbsp;&nbsp;<span style="border-style: groove; border-width: 1px; border-color: #FFFFFF; padding-left: 2px; padding-right: 2px; font-size: 75%;" onclick="window.prompt(\'Cache hash for original source (Ctrl+C or Cmd+C to copy):\', \''+cachesha+'\');">SHA</span>'
    rs_new.parentNode.insertBefore(tagline, rs_new);

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

    // Check cache
    if(cache !== undefined) {
      surfeRcache(cache+cachesha+'.html', i);
    }
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
  if(document.getElementById(rdiv).getElementsByTagName("BUTTON")[2].style.display=='none')
    surfeRshow(rdiv, riframe);
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
  if(document.getElementById(rdiv).getElementsByTagName("BUTTON")[0].style.display=='none')
    surfeRunzoom(rdiv, riframe);
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

function surfeRsha256(ascii) { // From https://geraintluff.github.io/sha256/
	function rightRotate(value, amount) {
		return (value>>>amount) | (value<<(32 - amount));
	};

	var mathPow = Math.pow;
	var maxWord = mathPow(2, 32);
	var lengthProperty = 'length'
	var i, j; // Used as a counter across the whole file
	var result = ''

	var words = [];
	var asciiBitLength = ascii[lengthProperty]*8;

	//* caching results is optional - remove/add slash from front of this line to toggle
	// Initial hash value: first 32 bits of the fractional parts of the square roots of the first 8 primes
	// (we actually calculate the first 64, but extra values are just ignored)
	var hash = surfeRsha256.h = surfeRsha256.h || [];
	// Round constants: first 32 bits of the fractional parts of the cube roots of the first 64 primes
	var k = surfeRsha256.k = surfeRsha256.k || [];
	var primeCounter = k[lengthProperty];
	/*/
	var hash = [], k = [];
	var primeCounter = 0;
	//*/

	var isComposite = {};
	for (var candidate = 2; primeCounter < 64; candidate++) {
		if (!isComposite[candidate]) {
			for (i = 0; i < 313; i += candidate) {
				isComposite[i] = candidate;
			}
			hash[primeCounter] = (mathPow(candidate, .5)*maxWord)|0;
			k[primeCounter++] = (mathPow(candidate, 1/3)*maxWord)|0;
		}
	}

	ascii += '\x80' // Append Ƈ' bit (plus zero padding)
	while (ascii[lengthProperty]%64 - 56) ascii += '\x00' // More zero padding
	for (i = 0; i < ascii[lengthProperty]; i++) {
		j = ascii.charCodeAt(i);
		if (j>>8) return; // ASCII check: only accept characters in range 0-255
		words[i>>2] |= j << ((3 - i)%4)*8;
	}
	words[words[lengthProperty]] = ((asciiBitLength/maxWord)|0);
	words[words[lengthProperty]] = (asciiBitLength)

	// process each chunk
	for (j = 0; j < words[lengthProperty];) {
		var w = words.slice(j, j += 16); // The message is expanded into 64 words as part of the iteration
		var oldHash = hash;
		// This is now the undefinedworking hash", often labelled as variables a...g
		// (we have to truncate as well, otherwise extra entries at the end accumulate
		hash = hash.slice(0, 8);

		for (i = 0; i < 64; i++) {
			var i2 = i + j;
			// Expand the message into 64 words
			// Used below if
			var w15 = w[i - 15], w2 = w[i - 2];

			// Iterate
			var a = hash[0], e = hash[4];
			var temp1 = hash[7]
				+ (rightRotate(e, 6) ^ rightRotate(e, 11) ^ rightRotate(e, 25)) // S1
				+ ((e&hash[5])^((~e)&hash[6])) // ch
				+ k[i]
				// Expand the message schedule if needed
				+ (w[i] = (i < 16) ? w[i] : (
						w[i - 16]
						+ (rightRotate(w15, 7) ^ rightRotate(w15, 18) ^ (w15>>>3)) // s0
						+ w[i - 7]
						+ (rightRotate(w2, 17) ^ rightRotate(w2, 19) ^ (w2>>>10)) // s1
					)|0
				);
			// This is only used once, so *could* be moved below, but it only saves 4 bytes and makes things unreadble
			var temp2 = (rightRotate(a, 2) ^ rightRotate(a, 13) ^ rightRotate(a, 22)) // S0
				+ ((a&hash[1])^(a&hash[2])^(hash[1]&hash[2])); // maj

			hash = [(temp1 + temp2)|0].concat(hash); // We don't bother trimming off the extra ones, they're harmless as long as we're truncating when we do the slice()
			hash[4] = (hash[4] + temp1)|0;
		}

		for (i = 0; i < 8; i++) {
			hash[i] = (hash[i] + oldHash[i])|0;
		}
	}

	for (i = 0; i < 8; i++) {
		for (j = 3; j + 1; j--) {
			var b = (hash[i]>>(j*8))&255;
			result += ((b < 16) ? 0 : '') + b.toString(16);
		}
	}
	return result;
}

function surfeRsetcookie(cname, cvalue, exdays) {
  var d = new Date();
  d.setTime(d.getTime() + (exdays*24*60*60*1000));
  var expires = "expires="+ d.toUTCString();
  document.cookie = "surfeR" + cname + "=" + cvalue + ";" + expires + ";path=/";
}

function surfeRgetcookie(cname) {
  var name = "surfeR" + cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');
  for(var i = 0; i <ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

function surfeRcache(address, i) {
  var httpRequest = new XMLHttpRequest();
  httpRequest.onreadystatechange = function() {
    if(httpRequest.readyState === 4) {
      if(httpRequest.status === 200) {
        document.getElementById('surfeR_'+i+'_if').srcdoc = httpRequest.responseText;
        document.getElementById('surfeR_'+i+'_div').setAttribute('style','display:block;');
        surfeRshow('surfeR_'+i+'_div', 'surfeR_'+i+'_if');
      } else {
      }
    }
  }
  httpRequest.open('GET', address);
  httpRequest.send();
}
