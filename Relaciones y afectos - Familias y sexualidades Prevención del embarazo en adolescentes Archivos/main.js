/*

    Familias y sexualidades: Prevención del embarazo en adolescentes
    INSTITUTO NACIONAL DE LAS MUJERES, INMUJERES.
	www.inmujeres.gob.mx

   
    Copyright © 2016 INMUJERES. All rights reserved.

*/

/* MAIN */

(function(){
	"use strict";

	// UI FUNCTIONS

	var content = document.getElementById('content');
	var header = document.getElementById('header_logo');
	var logo = header.getElementsByTagName('img')[0];
	var page = document.getElementById('page');
	var container = document.getElementById('container');
	var backgroundBuildings = document.getElementById('background_buildings');
	var backgroundGrass = document.getElementById('background_grass');
	var nav = document.getElementById('nav');
	if(logo.complete || logo.readyState === 4){
		logoReady();
	}else{
		logo.addEventListener('load', logoReady);
	}
	window.addEventListener('resize', resize);
	window.addEventListener('load', setBackground);
	function logoReady(){
		resize();
		content.style.opacity = 1;
		logo.removeEventListener('load', logoReady);
	}
	function resize(){
		page.style.top = header.clientHeight * 0.6 + 'px';
		setBackground();
	}
	function setBackground(){
		var y = container.offsetHeight - nav.offsetTop - 25;
		backgroundBuildings.style.bottom = y + 'px';
		backgroundGrass.style.height = y + 'px';
	}
	resize();

	// MENU FUNCTIONS

	var on = false;
	var menuButton = document.getElementById('menu_button');
	var menuWindow = document.getElementsByClassName('menu_window')[0];
	menuButton.onclick = menu;
	var loginButton = menuWindow.getElementsByClassName('button_login')[0];
	var logoutButton = menuWindow.getElementsByClassName('button_logout')[0];
	var userButton = menuWindow.getElementsByClassName('button_user')[0];
	var downloadButton = menuWindow.getElementsByClassName('button_download')[0];
	var pdfButton = menuWindow.getElementsByClassName('button_pdf')[0];
	if(logoutButton) logoutButton.style.display = 'none';
	if(userButton)   userButton.style.display = 'none';
	var protocol = window.location.protocol;
	if(protocol === 'file:'){
		localMode();
	}else if (protocol === 'http:' || protocol === 'https'){
      //console.log(window.location.pathname);
		ajax('logged.php?p='+window.location.pathname, logged);
	}
	function menu(){
		if(on){
			hide();
		}else{
			show();
		}
	}
	function show(){
		on = true;
		menuButton.classList.add('button_close');
		menuWindow.classList.add('menu_window_show');
	}
	function hide(){
		on = false;
		menuButton.classList.remove('button_close');
		menuWindow.classList.remove('menu_window_show');
	}
	// HIDE SERVER FUNCTIONS (BUTTONS) AND NAV IN LOCAL ENVIROMENT (DESKTOP)
	function localMode(){
		remove(document.querySelector('#header_logo > a[href="index.html"]'));
		remove(menuWindow.getElementsByClassName('button_home')[0]);
		remove(menuWindow.getElementsByClassName('button_pdf')[0]);
		remove(menuWindow.getElementsByClassName('button_download')[0]);
		remove(loginButton);
		remove(logoutButton);
		remove(userButton);
		remove(document.querySelectorAll('.nav_item'));
		if(menuWindow.children.length < 1){
			remove(menuWindow);
			remove(document.getElementById('menu_button'));
		}
	}
	function logged(param){
      //console.log("procesando respuesta:", param);
      var Param = [0];
      if(!(param === null)) {
         if (param.indexOf("|") > -1 ) {
            Param = param.split("|");
            //console.log("varios parametros:", param);
         } else {
            //console.log("un parametro:", param);
            Param = [0];
         }
      }
		if(param === null || parseInt(Param[0]) === 0){
         //console.log("NO SESION");
			if(loginButton) loginButton.style.display = 'inline-block';
			if(logoutButton) logoutButton.style.display = 'none';
			if(userButton)   userButton.style.display = 'none';
         if(downloadButton) {
            downloadButton.href = 'login.php?down';
            downloadButton.target = '_self';
         }
         if(pdfButton) {
            pdfButton.href = 'login.php?down';
            pdfButton.target = '_self';
         }
		}else{
         //console.log("SESION:", Param[1]);
			if(loginButton) loginButton.style.display = 'none';
			if(logoutButton) logoutButton.style.display = 'inline-block';
			if(userButton) {
             //console.log("param logged", Param[1], Param[2]);
             userButton.style.display = 'inline-block';
             if (Param[2] == 1) userButton.href = 'admin.php';
             document.getElementById('NombreUsuario').innerHTML = "Usuario: "+Param[1];
         }  
		}
	}
	function ajax(url, callback){
		var xhr = new XMLHttpRequest();
		xhr.onreadystatechange = function(){
			if (xhr.readyState === 4){
				if(xhr.status === 200){
					callback(xhr.response);
               //console.log("respuesta:", xhr.response);
				}else{
					callback(null);
				}
			}
		};
		xhr.open("GET", url, true);
		xhr.send();
      //console.log("preguntando logged");
	}
	function remove(el){
		if(!el) return;
		if(el.constructor === NodeList){
			var cnt = el.length;
			for(var i = 0; i < cnt; i++) el[i].parentNode.removeChild(el[i]);
		}else{
			el.parentNode.removeChild(el);
		}
	}

   var HREF = window.location.href;
   if (HREF.indexOf("logout") > -1) alert("Sesión terminada");
   
})();
