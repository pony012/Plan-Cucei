var creditos;
(function(){
	var i,j;
	creditos=0;
	for(i=0, j=document.getElementsByClassName("materia").length;i<j;i++){
		var materia=document.getElementsByClassName("materia")[i];
		var clave=materia.getElementsByClassName("clave")[0].innerHTML;
		var textarea=materia.getElementsByTagName("textarea")[0];
		if(textarea.addEventListener)
			textarea.addEventListener("change",actualizar,false);
		else if(textarea.attachEvent)
			textarea.attachEvent("onchange",actualizar);
			
		var pre=materia.getElementsByClassName("pre")[0].innerHTML;
		var storage=localStorage.getItem(clave);
		if(storage!=null){
			materia.getElementsByTagName("textarea")[0].placeholder="0";
			if(storage!=0||storage!="0"){
				textarea.value=storage;
				if(materia.classList)
					materia.classList.add("pasada");
				else if(materia.setAttribute("class",materia.getAttribute("class")+" pasada"))
					materia.setAttribute("class",materia.getAttribute("class"+" pasada"));
				else
					materia.className+=" pasada";
				creditos+=parseInt(materia.getElementsByClassName("creditos")[0].innerHTML);
			}
		}
		else{
			if(isNaN(parseInt(textarea.value))||parseInt(textarea.value)==0||textarea.value=="")
				localStorage.setItem(clave,0)
			else
				localStorage.setItem(clave,parseInt(textarea.value))
			textarea.value=localStorage.getItem(clave);
		}
	}
	//máximo 442 créditos
	document.getElementById("creditos").innerHTML=creditos+" ("+((creditos*100/4.22)<<0)/100+"%)";

	for(i=0, j=document.getElementsByClassName("materia").length;i<j;i++){
		var materia=document.getElementsByClassName("materia")[i];
		var clave=materia.getElementsByClassName("clave")[0].innerHTML;
		var textarea=materia.getElementsByTagName("textarea")[0];
		var pre=materia.getElementsByClassName("pre")[0].innerHTML;
		if(pre!=""){
			var k,l,posible;
			posible=1;
			if(pre.match(new RegExp('[|][|]')))
				pre=pre.split("||");
			else
				pre=pre.split(",");
			for(k=0,l=pre.length;k<l;k++){
				if(pre[k].match(new RegExp('^[A-Z]'))){
					//!document.getElementById(pre[k]).classList.contains("pasada")
					if(!document.getElementById(pre[k]).className.match(new RegExp("pasada"))||!document.getElementById(pre[k]).getAttribute("class").match(new RegExp("pasada")))
						posible=0;
					//console.log(clave+" -> pre:"+document.getElementById(pre[k]).getElementsByClassName("clave")[0].innerHTML);
				}else{
					if(creditos<parseInt(pre[k]))
						posible=0;
					else
						posible=1;
				}
			}
			if(!posible){
				if(materia.classList)
					materia.classList.add("noPosible");
				else if(materia.setAttribute("class",materia.getAttribute("class")+" noPosible"))
					materia.setAttribute("class",materia.getAttribute("class")+" noPosible");
				else
					materia.className+=" noPosible";
			}
		}
	}
})();
if(document.getElementsByClassName("boton")[0].addEventListener)
	document.getElementsByClassName("boton")[0].addEventListener("click",actualizar,false);
else if(document.getElementsByClassName("boton")[0].attachEvent)
	document.getElementsByClassName("boton")[0].attachEvent("onclick",actualizar);
function actualizar(){
	creditos=0;
	for(i=0, j=document.getElementsByClassName("materia").length;i<j;i++){
		var materia=document.getElementsByClassName("materia")[i];
		var clave=materia.getElementsByClassName("clave")[0].innerHTML;
		var textarea=materia.getElementsByTagName("textarea")[0];
		if(isNaN(parseInt(textarea.value)))
			localStorage.setItem(clave,0);
		else
			localStorage.setItem(clave,parseInt(textarea.value));
		var storage=localStorage.getItem(clave);
		if(storage!=0||storage!="0"){
			textarea.value=storage;
			if(materia.classList)
				materia.classList.add("pasada");
			else if(materia.setAttribute("class",materia.getAttribute("class")+" pasada")){
				if(!materia.getAttribute("class").match(new RegExp('pasada')))
					materia.setAttribute("class",materia.getAttribute("class"+" pasada"));
			}
			else{
				if(!materia.getAttribute("class").match(new RegExp('pasada')))
					materia.className+=" pasada";
			}
			creditos+=parseInt(materia.getElementsByClassName("creditos")[0].innerHTML);
		}
		else{
			if(materia.classList)
				materia.classList.remove("pasada");
			else if(materia.setAttribute("class",materia.getAttribute("class").replace("pasada","")))
				materia.setAttribute("class",materia.getAttribute("class").replace("pasada",""));
			else
				materia.className.replace("pasada","");
		}
	}
	document.getElementById("creditos").innerHTML=creditos+" ("+((creditos*100/4.22)<<0)/100+"%)";
	for(i=0, j=document.getElementsByClassName("materia").length;i<j;i++){
		var materia=document.getElementsByClassName("materia")[i];
		var clave=materia.getElementsByClassName("clave")[0].innerHTML;
		var textarea=materia.getElementsByTagName("textarea")[0];
		var pre=materia.getElementsByClassName("pre")[0].innerHTML;
		if(pre!=""){
			var k,l,posible;
			posible=1;
			if(pre.match(new RegExp('[|][|]')))
				pre=pre.split("||");
			else
				pre=pre.split(",");
			for(k=0,l=pre.length;k<l;k++){
				if(pre[k].match(new RegExp('^[A-Z]'))){
					//||!document.getElementById(pre[k]).classList.contains("pasada")
					if(!document.getElementById(pre[k]).className.match(new RegExp("pasada"))||!document.getElementById(pre[k]).getAttribute("class").match(new RegExp("pasada")))
						posible=0;
					//console.log(clave+" -> pre:"+document.getElementById(pre[k]).getElementsByClassName("clave")[0].innerHTML);
				}else{
					if(creditos<parseInt(pre[k]))
						posible=0;
					else
						posible=1;
				}
			}
			if(!posible){
				if(materia.classList)
					materia.classList.add("noPosible");
				else if(materia.setAttribute("class",materia.getAttribute("class")+" noPosible")){
					if(!materia.getAttribute("class").match(new RegExp('noPosible')))
						materia.setAttribute("class",materia.getAttribute("class")+" noPosible");
				}
				else{
					if(!materia.getAttribute("class").match(new RegExp('noPosible')))
						materia.className+=" noPosible";
				}
			}
			else{
				if(materia.classList)
					materia.classList.remove("noPosible");
				else if(materia.setAttribute("class",materia.getAttribute("class").replace("noPosible","")))
					materia.setAttribute("class",materia.getAttribute("class").replace("noPosible",""));
				else
					materia.className.replace("noPosible","");
			}
		}
	}
}

var materias=document.getElementsByClassName("materia");
var texto="";
for (var i=0, m=materias.length; i < m; i++) {
	texto+=materias[i].id+'[label="'+materias[i].id+"\\n"+materias[i].getElementsByClassName("nombre")[0].innerHTML+'"];\n'
	if(materias[i].getElementsByClassName("pre")[0].innerHTML!=""){
		var pre=materias[i].getElementsByClassName("pre")[0].innerHTML;
		if(pre.match(new RegExp('[|][|]')))
			pre=pre.split("||");
		else
			pre=pre.split(",");
		for(req=0;req<pre.length;req++){
			texto+=pre[req]+"->"+materias[i].id+";\n";
		}
	}
}
console.log(texto);