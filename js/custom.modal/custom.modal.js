"use strict";

window.custom = window.custom || {};
custom.modal = custom.modal || {};

;(function(){
	var customModal = (function() {
		function customModal(el) {
			if (typeof el === "string") {
				this.element = document.querySelector(el);
			}
			
			var dimm_layer = document.querySelector('#custom-modal-dimm');
			var vail_layer = document.querySelector('#custom-modal-vail');
			dimm_layer.parentNode.removeChild(dimm_layer);
			vail_layer.parentNode.removeChild(vail_layer);
			
			document.body.appendChild(this.dimm);
			document.body.appendChild(this.vail);

		}
		
		customModal.prototype.element;
		
		customModal.prototype.dimm = document.createElement('div');
		customModal.prototype.dimm.setAttribute('id', 'custom-modal-dimm');
		customModal.prototype.dimm.setAttribute('style', 'position:absolute; top:0; left:0; width:100%; height:100%; background:#000; z-index:10000; opacity:0.3; display: none;');
		
		customModal.prototype.vail = document.createElement('div');
		customModal.prototype.vail.setAttribute('id', 'custom-modal-vail');
		customModal.prototype.vail.setAttribute('style', 'position:absolute; top:0; left:0; width:100%; height:100%; background:#000; z-index:10001; opacity:0; display: none;');

		customModal.prototype.on = function() {
			document.querySelector('#custom-modal-dimm').style.display = 'block';
			document.querySelector('#custom-modal-vail').style.display = 'block';
			this.element.style.zIndex = '65535';
			this.element.style.display = 'block';
		}
		
		customModal.prototype.off = function() {
			document.querySelector('#custom-modal-dimm').style.display = 'none';
			document.querySelector('#custom-modal-vail').style.display = 'none';
			this.element.style.zIndex = '1';
			this.element.style.display = 'none';
		}
		
		return customModal;
	})();
	
	custom.modal = customModal;
})();
