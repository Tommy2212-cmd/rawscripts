$(document).ready(function(){document.getElementById("script").style.height=$("#container").height()-65+"px";document.getElementById("script").style.width=$("#container").width()-350+"px";document.getElementById("sidebar").style.height=($("#container").height()-65)+"px";$(":radio").click(function(){radioClick(this)});$(".autosave,.manualsave").mouseover(function(){this.getElementsByTagName("td")[8].style.display="block";this.getElementsByTagName("td")[8].style.backgroundColor="#ccc";this.getElementsByTagName("td")[8].style.border="none";this.getElementsByTagName("td")[9].style.display="block";this.getElementsByTagName("td")[9].style.backgroundColor="#ccc";this.getElementsByTagName("td")[9].style.border="none"});$(".autosave,.manualsave").mouseout(function(){this.getElementsByTagName("td")[8].style.display="none";this.getElementsByTagName("td")[9].style.display="none"});$(".emailedExported").unbind("mouseover");$(".emailedExported").unbind("mouseout");$(".emailedExported").mouseover(function(a){buildTooltip(a,this)});$(".emailedExported").mouseout(function(){var a=document.getElementById("exportTooltip");if(a!=null){a.parentNode.removeChild(a)}});$(".tagCell").unbind("mouseover");$(".tagCell").unbind("mouseout");$(".tagCell").mouseover(function(a){buildTagTooltip(a,this)});$(".tagCell").mouseout(function(){var a=document.getElementById("tagTooltip");if(a!=null){a.parentNode.removeChild(a)}});$("*").mousemove(function(a){var b=document.getElementById("exportTooltip");if(b!=null){b.style.left=10+a.pageX+"px";b.style.top=a.pageY+"px"}var b=document.getElementById("tagTooltip");if(b!=null){b.style.left=10+a.pageX+"px";b.style.top=a.pageY+"px"}})});$(window).resize(function(){document.getElementById("script").style.height=$("#container").height()-65+"px";document.getElementById("script").style.width=$("#container").width()-350+"px";document.getElementById("sidebar").style.height=($("#container").height()-65)+"px"});function setup(){resource_id=window.location.href.split("=")[1];var h=document.getElementsByTagName("input");var l=h[h.length-1].value.substr(1);if(l!="1"){$.post("/revisionlist",{resource_id:resource_id,version:l},function(c){buildTable(c)})}var h=document.getElementsByTagName("input");var b=0;var a=false;for(i in h){if(h[i].type=="radio"&&h[i].value.substr(0,1)==2){if(!a){h[i].checked=true;a=true;var k=h[i].value;var f=h[i];while(f.nodeName!="TR"){f=f.parentNode}var m=f.id}else{h[i].disabled=true;h[i].style.visibility="hidden"}}else{if(h[i].type=="radio"&&h[i].value.substr(0,1)==1){if(b==0){h[i].disabled=true;h[i].style.visibility="hidden";b++}else{if(b==1){h[i].checked=true;b++;var e=h[i].value;var f=h[i];while(f.nodeName!="TR"){f=f.parentNode}var g=f.id}}}}}compareVersions(k,m,e,g)}function radioSetup(){var e=document.getElementsByTagName("input");var d=false;var b=false;var a=false;for(i in e){if(e[i].type=="radio"){if(e[i].checked&&e[i].value.substr(0,1)==1){d=true}if(e[i].checked&&e[i].value.substr(0,1)==2){b=true}if(!a){e[i].disabled=true;e[i].style.visibility="hidden";a=true}else{if((!d&&e[i].value.substr(0,1)==2)){e[i].disabled=false;e[i].style.visibility="visible"}else{if(b&&e[i].value.substr(0,1)==1){e[i].disabled=false;e[i].style.visibility="visible"}else{e[i].disabled=true;e[i].style.visibility="hidden"}}}}}}function radioClick(e){if(document.getElementById("sel").selectedIndex==1){var f=document.getElementsByTagName("input");for(i in f){if(f[i].type=="radio"){if(f[i].parentNode.className=="viewScript"){f[i].checked=false}}}e.checked=true;f=e;while(f.nodeName!="TR"){f=f.parentNode}changeVersion(e.value,f.id)}else{var a=e.value.substr(0,1);var f=document.getElementsByTagName("input");for(i in f){if(f[i].type=="radio"&&f[i].value.substr(0,1)==a){f[i].checked=false}if(f[i].type=="radio"&&f[i].value.substr(0,1)!=a&&f[i].checked){var d=f[i].value;var b=f[i];while(b.nodeName!="TR"){b=b.parentNode}version_two_id=b.id}}e.checked=true;b=e;while(b.nodeName!="TR"){b=b.parentNode}version_one_id=b.id;compareVersions(e.value,version_one_id,d,version_two_id);radioSetup()}}function buildTooltip(k,h){var l=h.nextSibling;while(l.nodeName!="TD"){l=l.nextSibling}var f=l.firstChild;while(f.nodeName!="#text"){f=f.nextSibling}var g=f.nodeValue;if(g!="[[],[]]"){var b=JSON.parse(g);var d=document.body.appendChild(document.createElement("div"));d.id="exportTooltip";d.style.padding="5px";d.style.border="2px saddleBrown solid";d.style.position="fixed";d.style.top=k.pageY+"px";d.style.left=k.pageX+"px";d.style.backgroundColor="yellow";if(b[0].length>0){d.appendChild(document.createTextNode("Emailed to:"));var a=d.appendChild(document.createElement("ul"));a.style.paddingTop="0";a.style.marginTop="0";a.style.paddingBottom="0";a.style.marginBottom="0";var l=b[0];for(i in l){a.appendChild(document.createElement("li")).appendChild(document.createTextNode(l[i][0]))}}}}function buildTagTooltip(g,f){var h=f.parentNode;var b=h.getElementsByTagName("td")[7];var d=b.innerHTML;if(d==""){return}var a=document.body.appendChild(document.createElement("div"));a.id="tagTooltip";a.style.padding="5px";a.style.border="2px saddleBrown solid";a.style.position="fixed";a.style.top=g.pageY+"px";a.style.left=g.pageX+"px";a.style.backgroundColor="yellow";a.style.maxWidth="200px";a.appendChild(document.createTextNode(d))}function buildTable(k){var e=document.getElementById("tb");var g=JSON.parse(k);for(i in g){var b=e.appendChild(document.createElement("tr"));b.id=g[i][0];b.className=(g[i][3]==0?"manualsave":"autosave");var n=b.appendChild(document.createElement("td"));n.align="center";n.className="viewScript";var l=n.appendChild(document.createElement("input"));l.type="radio";l.value="1"+g[i][2];n=b.appendChild(document.createElement("td"));n.align="center";n.className="compare";l=n.appendChild(document.createElement("input"));l.type="radio";l.value="2"+g[i][2];l.disabled=true;l.style.visibility="hidden";n=b.appendChild(document.createElement("td"));n.align="center";n.appendChild(document.createTextNode(g[i][2]));n=b.appendChild(document.createElement("td"));n.align="center";n.appendChild(document.createTextNode(g[i][1]));var c=JSON.parse(g[i][4]);n=b.appendChild(document.createElement("td"));var h=c[0];var c=c[1];if(h.length>0){var f="Emailed"}else{var f=""}n.appendChild(document.createTextNode(f));n.className="emailedExported";n=b.appendChild(document.createElement("td"));n.className="data";n.appendChild(document.createTextNode(g[i][4]));n=b.appendChild(document.createElement("td"));n.align="center";f=(g[i][5]==""?"":"Tag");n.appendChild(document.createTextNode(f));n.className="tagCell";n=b.appendChild(document.createElement("td"));n.className="data";n.appendChild(document.createTextNode(g[i][5]));n=b.appendChild(document.createElement("td"));n.align="center";n.className="copy";var m=n.appendChild(document.createElement("a"));m.appendChild(document.createTextNode("Edit Tag"));m.href="javascript:editTag("+g[i][2]+")";m.id=g[i][2];n=b.appendChild(document.createElement("td"));n.align="center";n.className="copy";var m=n.appendChild(document.createElement("a"));m.appendChild(document.createTextNode("Copy to new script"));m.href="javascript:copyThisVersion("+g[i][2]+")";m.id=g[i][2]}$(":radio").unbind("click");$(":radio").click(function(){radioClick(this)});$(".autosave,.manualsave").mouseover(function(){this.getElementsByTagName("td")[8].style.display="block";this.getElementsByTagName("td")[8].style.backgroundColor="#ccc";this.getElementsByTagName("td")[8].style.border="none";this.getElementsByTagName("td")[9].style.display="block";this.getElementsByTagName("td")[9].style.backgroundColor="#ccc";this.getElementsByTagName("td")[9].style.border="none"});$(".autosave,.manualsave").mouseout(function(){this.getElementsByTagName("td")[8].style.display="none";this.getElementsByTagName("td")[9].style.display="none"});$(".emailedExported").unbind("mouseover");$(".emailedExported").unbind("mouseout");$(".emailedExported").mouseover(function(a){buildTooltip(a,this)});$(".emailedExported").mouseout(function(){var a=document.getElementById("exportTooltip");if(a!=null){a.parentNode.removeChild(a)}});$(".tagCell").unbind("mouseover");$(".tagCell").unbind("mouseout");$(".tagCell").mouseover(function(a){buildTagTooltip(a,this)});$(".tagCell").mouseout(function(){var a=document.getElementById("tagTooltip");if(a!=null){a.parentNode.removeChild(a)}})}function changeVersion(a,b){$.post("/revisionget",{resource_id:b,version:String(a).substr(1)},function(c){if(c=="not found"){}document.getElementById("scriptcontent").innerHTML=c})}function compareVersions(h,d,g,b){var c=(h>g?g:h);var f=(h<g?g:h);var e=(h>g?b:d);var a=(h<g?b:d);$.post("/revisioncompare",{v_o:c.substr(1),v_o_id:e,v_t:f.substr(1),v_t_id:a},function(k){if(k=="not found"){}document.getElementById("scriptcontent").innerHTML=k;context()})}function context(){var g=document.getElementById("scriptcontent").childNodes;if(document.getElementById("con").selectedIndex==1){var f=false;for(i in g){if(g[i].nodeName=="DEL"||g[i].nodeName=="INS"){if(g[i].innerHTML==""){g[i].parentNode.removeChild(g[i])}else{f=12}}else{if(g[i].nodeName=="P"){var e=g[i].childNodes;for(j in e){if(e[j].nodeName=="DEL"||e[j].nodeName=="INS"){if(e[j].innerHTML==""){e[j].parentNode.removeChild(e[j])}else{f=12}}}}}if(!f&&g[i].nodeName!="#text"&&g[i].style!=undefined){g[i].style.display="none"}if(f==12&&g[i].nodeName!="#text"){var a=i-1;var b=0;while(b<12){while(g[a]!=undefined&&g[a].nodeName=="#text"){a--}if(g[a]==undefined){b=13}else{g[a].style.display="block";a--;b++}}}if(f!=false&&f<13){if(g[i].style!=undefined){g[i].style.display="block";f--}if(f<0){f=false}}}f="none";for(i in g){if(g[i].style!=undefined){if(f=="block"&&g[i].style.display=="none"){f="none";document.getElementById("scriptcontent").insertBefore(document.createElement("hr"),g[i])}if(g[i].style.display=="block"){f="block"}}}}else{for(i in g){if(g[i].nodeName=="HR"){g[i].parentNode.removeChild(g[i])}else{if(g[i].style!=undefined){g[i].style.display="block"}}}}}function compareToggle(e){if(e==0){$(".compare").css("display","block");radioSetup();var l=document.getElementsByTagName("input");for(i in l){if(l[i].type=="radio"){if(l[i].type=="radio"&&l[i].checked){if(l[i].value.substr(0,1)==1){var b=l[i].value;var k=l[i];while(k.nodeName!="TR"){k=k.parentNode}var g=k.id}if(l[i].value.substr(0,1)==2){var h=l[i].value;var k=l[i];while(k.nodeName!="TR"){k=k.parentNode}var a=k.id}}}}compareVersions(b,g,h,a);document.getElementById("key").style.display="block"}if(e==1){$(".compare").css("display","none");var l=document.getElementsByTagName("input");for(i in l){if(l[i].type=="radio"){l[i].disabled=false;l[i].style.visibility="visible";if(l[i].type=="radio"&&l[i].checked&&l[i].value.substr(0,1)==1){var e=l[i].value;var k=l[i];while(k.nodeName!="TR"){k=k.parentNode}var f=k.id}}}changeVersion(e,f);document.getElementById("key").style.display="none"}}function editTag(b){var f=document.getElementById(b);while(f.nodeName!="TR"){f=f.parentNode}var e=f.getElementsByTagName("td")[7].innerHTML;var a=prompt("Give this version a tag name:",e);if(a!=null){var f=document.getElementById(b);while(f.nodeName!="TR"){f=f.parentNode}$.post("/revisiontag",{resource_id:f.id,version:b,tag:a},function(c){if(c!="tagged"){alert("There was a problem updating the tag. Please try again later.")}});var g=f.getElementsByTagName("td")[7];g.innerHTML="";g.appendChild(document.createTextNode(a));f.getElementsByTagName("td")[6].innerHTML="Tag"}}function copyThisVersion(a){var b=document.getElementById(a);while(b.nodeName!="TR"){b=b.parentNode}$.post("/revisionduplicate",{resource_id:b.id,version:a},function(c){window.open(c)})}function toggleAutosave(a){var b=document.getElementsByTagName("tr");if(a){for(i in b){if(b[i].className=="autosave"){b[i].style.display="none"}}}else{for(i in b){if(b[i].className=="autosave"){b[i].style.display="table-row"}}}}function duplicate(){$.post("/duplicate",{resource_id:resource_id,fromPage:"editor"},function(a){if(a=="fail"){return}else{window.open(a)}})}function exportPrompt(){document.getElementById("exportpopup").style.visibility="visible"}function hideExportPrompt(){typeToScript=true;document.getElementById("exportpopup").style.visibility="hidden"}function exportScripts(){var e=window.location.href;var g=e.split("=")[1];if(g=="demo"){nope();return}else{var k;var h="&title_page="+document.getElementById("et").selectedIndex;var f=document.getElementsByTagName("input");for(var l=0;l<f.length;l++){if(f[l].checked==true){if(f[l].className=="exportList"){k=f[l].name;e="/export?resource_id="+g+"&export_format="+k+"&fromPage=editor"+h;window.open(e)}}}}};