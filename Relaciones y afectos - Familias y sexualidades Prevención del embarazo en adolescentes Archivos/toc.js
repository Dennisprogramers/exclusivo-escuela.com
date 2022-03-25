/*

    Familias y sexualidades: Prevención del embarazo en adolescentes
    INSTITUTO NACIONAL DE LAS MUJERES, INMUJERES.
	www.inmujeres.gob.mx

    
    Copyright © 2016 INMUJERES. All rights reserved.

*/

/* TOGGLE ON CLICK */

(function(){
	"use strict";
	var toc = function(container){
		var hasAudio = parseInt(container.getAttribute('data-audio'));
		var size = container.getAttribute('data-item-size').split(' ');		
		var classes = container.getAttribute('data-texts-classes').split(' ');
		var textHidden = parseInt(container.getAttribute('data-text-start-hidden'));
		var elements = container.getElementsByClassName('toc_item');
		if(hasAudio){
			this.audio = new Audio();
			this.audio.addEventListener('ended', this.hideAll.bind(this));
			this.audio.addEventListener('timeupdate', this.check.bind(this));
		}
		this.container = container;
		this.hasAudio = hasAudio;
		this.items = [];
		for(var i = 0; i < elements.length; i++){
			var el = elements[i];
			el.style.cssText = 'width:' + size[0] + 'px; height:' + size[1] + 'px;';
			var texts = el.getElementsByTagName('P');
			var item = {
				element: el,
				toggled: false,
				images: el.getElementsByTagName('IMG'),
				textA: texts[0],
				textB: texts[1],
				audio: (hasAudio) ? el.getAttribute('data-aud') : ''
			};
			el.setAttribute('data-id', i);
			el.onclick = this.show.bind(this);
			el.style.userSelect = 'none'; // CANCEL USER SELECT ELEMENT AND CONTAINS
			this.showImage(0, item.images);
			if(textHidden) item.textA.style.display = 'none';
			item.textB.style.display = 'none';
			if(classes[0] !== 'none') item.textA.classList.add(classes[0]);
			if(classes[1] !== 'none') item.textB.classList.add(classes[1]);
			this.items.push(item);
		}
	};
	toc.prototype = {
		constructor: toc,
		check: function(){
			if(this.container.offsetParent === null) this.hideAll();
		},
		showImage: function(id, images){
			for(var i = 0; i < images.length; i++){
				if(i === id){
					images[i].style.display = 'block';
				}else{					
					images[i].style.display = 'none';
				}
			}
		},
		getItem: function(e){
			var anchor = e.target;
			if(anchor.tagName !== 'A') anchor = anchor.parentNode;
			var id = parseInt(anchor.getAttribute('data-id'));
			return this.items[id];			
		},
		hideAll: function(){
			if(this.hasAudio) this.audio.pause();
			for(var i = 0; i < this.items.length; i++){
				var item = this.items[i];
				if(item.toggled){
					this.showImage(item.images.length > 2 ? 2 : 0, item.images);
					item.textB.style.display = 'none';
					item.element.classList.remove('toc_item_show');
					item.textA.style.display = 'block';
					item.toggled = false;
				}
			}
		},
		show: function(e){
			var item = this.getItem(e);
			if(item.toggled){
				this.hideAll();
				return;
			}
			this.hideAll();
			item.toggled = true;
			item.element.classList.add('toc_item_show');
			this.showImage(1, item.images);
			item.textA.style.display = 'none';
			item.textB.style.display = 'block';
			if(this.hasAudio){
				this.audio.src = item.audio;
				this.audio.play();
			}
		}
	};
	var containers = document.getElementsByClassName('toc');
	var tocs = [];
	for(var i = 0; i < containers.length; i++){
		tocs[i] = new toc(containers[i]);
	}
})();