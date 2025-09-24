"use strict";

//네임스페이스 형식으로 사용.
window.heiliglied = window.heiliglied || {};
//클래스 별칭으로 사용. 실제 로딩시 사용할 이름. 이름이 겹칠경우에 사용하는 꽁수.
heiliglied.customLoading = heiliglied.customLoading || {};

;(function(){
	var customLoading = (function(){
		//constructor 비스무리하게 초기 변수를 세팅한다.
		//백그라운드 음영 생성
		customLoading.prototype.dimm = document.createElement('div');
		customLoading.prototype.dimm.setAttribute('id', 'custom-layer-dimm');
		customLoading.prototype.dimm.setAttribute('style', 'position:fixed; top:0; left:0; bottom: 0; width:100%; height:100%; background:#000; z-index:99998; opacity:0.3; display: none;');
		
		//사용할 이미지의 Element 생성
		customLoading.prototype.element = document.createElement('img');
		customLoading.prototype.element.setAttribute('id', 'custom-loading-image');
		customLoading.prototype.element.setAttribute('style', 'position:fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); display: none;');
		
		//초기 기본 옵션값.
		customLoading.prototype.options = {
			'bodyFix': 'on',
			'image': {
                'src': 'loading-spinner.gif',
                'width': '40px',
                'height': '40px'
             }
		};
		
		//파라미터로 표기할 이미지와 option값을 받는다.
		function customLoading(opt) {
			var dimm_layer = document.querySelector('#custom-layer-dimm');
			var image_element = document.querySelector('#custom-loading-image');
			
			if(dimm_layer != null) {
				document.body.removeChild(dimm_layer);
			}
			
			if(image_element != null) {
				document.body.removeChild(image_element);
			}
			
			//옵션값을 기본 옵션값에 덮어씌움.
			//객체를 복사하기 위해 얕은복사인지, 깊은 복사인지 체크.
			if(typeof opt !== 'undefined') {
				if (typeof Object.assign !== 'function') {
					var native_option = this.options;
					//반드시 쓰기가능, 복제불가, 설정 가능옵션으로 지정되어야한다. writable: true, enumerable: false, configurable: true
					//오브젝트 수정 메소드로 값을 수정함.
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
				} else {
					//얕은 복사. 참조를 복사하지 않기 때문에 새로운 값을 그대로 할당함.
					this.options = Object.assign(this.options, opt);
				}
			}
			
			document.body.appendChild(this.dimm);
			document.body.appendChild(this.element);
		}
		
		customLoading.prototype.on = function() {
			document.querySelector('#custom-layer-dimm').style.display = 'block';
			document.querySelector('#custom-loading-image').style.display = 'block';
			
			this.element.style.position = 'fixed';
			this.element.style.zIndex = '99999';
			this.element.style.display = 'block';
			this.element.setAttribute('src', this.options.image.src);
			this.element.setAttribute('width', this.options.image.width);
            this.element.setAttribute('width', this.options.image.height);
			
			if(customLoading.prototype.options.bodyFix == 'on') {
				document.querySelector('body').style.overflow = 'hidden';
			}
		}
		
		customLoading.prototype.off = function() {
			document.querySelector('#custom-layer-dimm').style.display = 'none';
			document.querySelector('#custom-loading-image').style.display = 'none';
			this.element.style.zIndex = '1';
			this.element.style.display = 'none';
			if(customLoading.prototype.options.bodyFix == 'on') {
				document.body.style.overflow = '';
			}
		}
		
		customLoading.prototype.change = function(image) {
			document.querySelector('#custom-loading-image').setAttribute('src', image);
		}
		
		return customLoading;
	})();
	
	//선언한 변수를 해당 이름으로 로딩.
	heiliglied.customLoading = customLoading;
})();
