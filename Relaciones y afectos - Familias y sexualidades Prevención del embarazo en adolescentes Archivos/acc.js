/*

    Familias y sexualidades: Prevención del embarazo en adolescentes
    INSTITUTO NACIONAL DE LAS MUJERES, INMUJERES.
	www.inmujeres.gob.mx

    
    Copyright © 2016 INMUJERES. All rights reserved.

*/

/* ACCORDION */

(function(){
	"use strict";
	var acc = function(container){
		var autoScroll = parseInt(container.getAttribute('data-auto-scroll'));
		this.autoScroll = isNaN(autoScroll) ? true : autoScroll === 0 ? false : true;
		var items = container.getElementsByClassName(container.className + '_item');
		for(var i = 0; i < items.length; i++){
			var anchor = items[i];
			anchor.onclick = this.show.bind(this);
		}
		this.items = items;
		this.itemSelectedClass = container.className + '_item_selected';
	};
	acc.prototype = {
		constructor: acc,
		hide: function(a){
			for(var i = 0; i < this.items.length; i++){	
				var anchor = this.items[i];
				if(anchor == a) continue;
				anchor.classList.remove(this.itemSelectedClass);
				var content = anchor.nextElementSibling;
				content.style.display = 'none';
			}
		},
		show: function(e){
			var anchor = e.target;
			this.hide(anchor);
			anchor.classList.toggle(this.itemSelectedClass);
			var content = anchor.nextElementSibling;
			if(content.style.display !== 'block'){
				content.style.display = 'block';
				if(this.autoScroll) anchor.scrollIntoView();
			}else{
				content.style.display = 'none';
			}
		},
		
	};
	var containers = document.querySelectorAll('.accordion,.info,.ca');
	var accs = [];
	for(var i = 0; i < containers.length; i++){
		accs[i] = new acc(containers[i], i);
	}
})();