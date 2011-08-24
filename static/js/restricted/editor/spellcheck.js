/**
 * Rawscripts - Screenwriting Software
 * Copyright (C) Ritchie Wilson
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

/**
 * Launches the spell check window, and handles little necessary
 * things first.
 */
function launchSpellCheck(){
	if(EOV=='viewer')return;
    typeToScript=false;
    ajaxSpell(pos.row)
    var firstLine = (pos.row==0 ? true : false);
    goog.dom.getElement('spellcheckpopup').style.visibility = 'visible';
    spellCheckCycle(firstLine, 0, 0)
    
}

/**
 * The spell check works by calling this function row by row, word by
 * word. On correct words, it does nothing. on Inccorect words, it
 * presents options. At then end of the function it calls itself to
 * start where it left off.
 * 
 * @param {boolean} firstLine I HAVE NO IDEA WHAT THIS DOES ANYMORE
 * 
 * @param {integer} r Row that the spell checker is on.
 *
 * @param {integer} w Word within row that was last checked.
 */
function spellCheckCycle(firstLine, r, w){
	if(EOV=='viewer')return;
    if(r=='finished'){
        alert('Spell Check Complete');
        hideSpellCheck();
        return;
    }
    var line=lines[r].text.split(' ');
    var found = false;
    while (found==false){
        var word = line[w].replace("?", "").replace(".","").replace(",","").replace("(","").replace(")","");
        for (i in spellWrong){
            if (spellWrong[i][0].toUpperCase()==word.toUpperCase()){
                found=[r,w,i];
                for(v in spellIgnore){
                    if (spellIgnore[v].toUpperCase()==word.toUpperCase())found=false;
                }
            }
        }
        if (!found){
            w++;
            if (w==line.length){
                w=0;
                r++;
                if (r==lines.length){
                    found='finished';
                }
                else{
                    line = lines[r].text.split(' ');
                }
            }
        }
    }
    if (found=='finished'){
        goog.dom.getElement('sSuggest').innerHTML="";
        goog.dom.getElement('sSentance').innerHTML = "";
        alert("Spell Check Complete");
        hideSpellCheck()
    }
    else{
        var sen =lines[r].text;
        var reg = new RegExp(word,'i');
        var rep = "<span id='sFocus' title='"+word+"' style='color:red'>"+word+"</span>"
        sen = sen.replace(reg, rep);
        if(lines[r].format==0 || lines[r].format==2 || lines[r].format==5){
            goog.dom.getElement('sSentance').innerHTML = sen.toUpperCase();
            goog.dom.getElement('sSentance').innerHTML =goog.dom.getElement('sSentance').innerHTML.replace("SFOCUS","sFocus")
        }
        else{
            goog.dom.getElement('sSentance').innerHTML = sen;
        }
        goog.dom.getElement('sSentance').title = r;
        var sug = spellWrong[found[2]][1];
        var d=goog.dom.getElement('sSuggest')
        d.innerHTML="";
        for (i in sug){
            var item =d.appendChild(document.createElement('div'))
            item.className='spellcheckitem';
			goog.events.listen(item, goog.events.EventType.CLICK, function(e){
				var f = goog.dom.getElement('spellcheckfocus');
	            if (f!=undefined){
	                f.removeAttribute('id');
	            }
	            e.target.id='spellcheckfocus'
	            goog.dom.getElement('sFocus').innerHTML=e.target.title;
			})
            if(lines[r].format==0 || lines[r].format==2 || lines[r].format==5){
                item.appendChild(document.createTextNode(sug[i].toUpperCase()));
            }
            else{
                item.appendChild(document.createTextNode(sug[i]));
            }
            item.title=sug[i];
        }
        w++;
        if (w==line.length){
            w=0;
            r++;
            if (r==lines.length){
                found='finished';
            }
            else{
                line = lines[r].text.split(' ');
            }
        }
        var h = (found=='finished' ? found : [r,w].join(','))
        goog.dom.getElement('sHidden').value=h;
    }
}

/**
 * hides the spellcheck dialog box. Called by user click, or by
 * reaching the end of the spell check.
 */
function hideSpellCheck(){
    goog.dom.getElement('spellcheckpopup').style.visibility='hidden';
    typeToScript=true;
    //spellIgnore=[];
	saveTimer()
}

/**
 * Ignores word once and moves on to the next word.
 */
function s_ignore(){
    var tmp = goog.dom.getElement('sHidden').value;
    spellCheckCycle(false, tmp.split(',')[0], tmp.split(',')[1]);
}

/**
 *  Adds word to ignore list so that it is always skipped. Then starts
 *  spell check loop again at the next word.
 */
function s_ignore_all(){
    spellIgnore.push(goog.dom.getElement('sFocus').title);
    var tmp = goog.dom.getElement('sHidden').value;
    spellCheckCycle(false, tmp.split(',')[0], tmp.split(',')[1]);
}

/**
 * Changes the one word to one of the suggestions.
 *
 * More specifically, a user has the option to manually change the
 * text in the spellcheck window. Whatever is in that box will be
 * entered as the new text for that row.
 */
function s_change(){
    var s=goog.dom.getElement('sSentance');
    var r = s.title;
    lines[r].text="";
    for (i in s.childNodes){
        if(s.childNodes[i].nodeName=="#text")lines[r].text=lines[r].text+s.childNodes[i].nodeValue;
        else{
            var c = s.childNodes[i].childNodes;
            for (j in c){
                if (c[j].nodeName=="#text")lines[r].text=lines[r].text+c[j].nodeValue;
            }
        }
    }
    var tmp = goog.dom.getElement('sHidden').value;
    spellCheckCycle(false, tmp.split(',')[0], tmp.split(',')[1]);
}