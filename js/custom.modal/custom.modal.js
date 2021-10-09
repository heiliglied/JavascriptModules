"use strict";

window.custom = window.custom || {};
custom.modal = custom.modal || {};

;(function(){
	var customModal = (function() {		
		customModal.prototype.element;
		
		customModal.prototype.dimm = document.createElement('div');
		customModal.prototype.dimm.setAttribute('id', 'custom-modal-dimm');
		customModal.prototype.dimm.setAttribute('style', 'position:fixed; top:0; left:0; bottom: 0; width:100%; height:100%; background:#000; z-index:10000; opacity:0.3; display: none;');
		
		customModal.prototype.options = {
			'bodyFix': 'on'
		};
		
		function customModal(el, opt) {
			if (typeof el === "string") {
				this.element = document.querySelector(el);
			}
			
			var dimm_layer = document.querySelector('#custom-modal-dimm');
			
			if(dimm_layer != null) {				
				//dimm_layer.parentNode.removeChild(dimm_layer);
				document.body.removeChild(dimm_layer);
			}
			
			if (typeof Object.assign !== 'function') {
				var native_option = this.options;
				
				// Must be writable: true, enumerable: false, configurable: true
				Object.defineProperty(Object, "assign", {
					value: function assign(native_option, opt) { // .length of function is 2
						'use strict';
						if (target === null || target === undefined) {
							throw new TypeError('Cannot convert undefined or null to object');
						}

						var to = Object(target);

						for (var index = 1; index < arguments.length; index++) {
							var nextSource = arguments[index];

							if (nextSource !== null && nextSource !== undefined) {
								for (var nextKey in nextSource) {
								// Avoid bugs when hasOwnProperty is shadowed
									if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
										to[nextKey] = nextSource[nextKey];
									}
								}
							}
						}
						return to;
					},
					writable: true,
					configurable: true
				});
				
				this.options = native_option;
				
			} else {
				this.options = Object.assign(this.options, opt);
			}
			
			document.body.appendChild(this.dimm);
		}
		
		customModal.prototype.on = function() {
			document.querySelector('#custom-modal-dimm').style.display = 'block';
			
			this.element.style.position = 'fixed';
			this.element.style.zIndex = '65535';
			this.element.style.display = 'block';
			
			if(customModal.prototype.options.bodyFix == 'on') {
				document.querySelector('body').style.overflow = 'hidden';
			}
		}
		
		customModal.prototype.off = function() {
			document.querySelector('#custom-modal-dimm').style.display = 'none';
			this.element.style.zIndex = '1';
			this.element.style.display = 'none';
			if(customModal.prototype.options.bodyFix == 'on') {
				document.body.style.overflow = '';
			}
		}
		
		return customModal;
	})();
	
	custom.modal = customModal;
})();
