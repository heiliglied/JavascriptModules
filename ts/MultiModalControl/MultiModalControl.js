"use strict";

var MultiModalControl = /** @class */ (function () {
    function MultiModalControl(options) {
        this.zIndex = 10000;
        this.draggable = false;
        this.bodyFix = true;
        this.dragArea = false;
        this.mouseClick = false;
        this.posX = 0;
        this.posY = 0;
        if (options != undefined) {
            if (options.bodyFix != undefined && typeof (options.bodyFix) === 'boolean') {
                this.bodyFix = options.bodyFix;
            }
            if (options.index != undefined && typeof (options.index) === 'number') {
                this.zIndex = options.index;
            }
        }
    }
    MultiModalControl.prototype.setModal = function (depth, element, vail, draggable, dragArea) {
        var newElement = element.cloneNode(true);
        this.setElement = newElement;
        this.draggable = draggable;
        if (dragArea != undefined && typeof (dragArea) === 'boolean') {
            this.dragArea = dragArea;
        }
        var mouseClick = this.mouseClick;
        var posX = this.posX;
        var posY = this.posY;
        if (vail == true) {
            var vailId = 'multi-vail-' + depth;
            var vailElement = document.createElement('div');
            vailElement.setAttribute('id', vailId);
            vailElement.setAttribute('style', 'position:fixed; top:0; left:0; bottom: 0; width:100%; height:100%; background:#000; z-index:' + (this.zIndex + depth) + '; opacity:0.3;');
            document.body.insertAdjacentElement('beforeend', vailElement);
        }
        var modalElement = document.createElement('div');
        var modalId = 'multi-modal-' + depth;
        var modalWidth = this.setElement.style.width;
        var modalHeight = this.setElement.style.height;
        this.setElement.style.display = '';
        this.setElement.setAttribute('id', '');
        modalElement.setAttribute('id', modalId);
        modalElement.setAttribute('style', 'position: fixed; width: ' + modalWidth + '; height:' + modalHeight + '; top: 20; left: 50%; transform: translateX(-50%); background:#FFF; z-index:' + (this.zIndex + depth + 1) + ';');
        if (this.draggable == true) {
            if (this.dragArea == true) {
                var dragElement = document.createElement('div');
                dragElement.style.width = modalWidth;
                dragElement.style.height = '20px';
                dragElement.style.backgroundColor = "#abcdef";
                modalHeight = String(Number(modalHeight.replace('px', '')) + 20) + 'px';
                modalElement.insertAdjacentElement('beforeend', dragElement);
                dragElement.addEventListener('mousedown', function (event) {
                    mouseClick = true;
                    posX = event.clientX;
                    posY = event.clientY;
                });
                dragElement.addEventListener('mousemove', function (event) {
                    if (mouseClick == true) {
                        var parentElement = this.parentElement;
                        var now_posX = posX - event.clientX;
                        var now_posY = posY - event.clientY;
                        posX = event.clientX;
                        posY = event.clientY;
                        parentElement.style.left = (parentElement.offsetLeft - now_posX) + "px";
                        parentElement.style.top = (parentElement.offsetTop - now_posY) + "px";
                    }
                });
                dragElement.addEventListener('mouseup', function (event) {
                    mouseClick = false;
                });
                document.addEventListener('mouseup', function (event) {
                    mouseClick = false;
                });
            }
            else {
                modalElement.addEventListener('mousedown', function (event) {
                    mouseClick = true;
                    posX = event.clientX;
                    posY = event.clientY;
                });
                modalElement.addEventListener('mousemove', function (event) {
                    if (mouseClick == true) {
                        var now_posX = posX - event.clientX;
                        var now_posY = posY - event.clientY;
                        posX = event.clientX;
                        posY = event.clientY;
                        this.style.left = (this.offsetLeft - now_posX) + "px";
                        this.style.top = (this.offsetTop - now_posY) + "px";
                    }
                });
                modalElement.addEventListener('mouseup', function (event) {
                    mouseClick = false;
                });
                document.addEventListener('mouseup', function (event) {
                    mouseClick = false;
                });
            }
        }
        if (this.bodyFix == true) {
            document.querySelector('body').style.overflow = 'hidden';
        }
        modalElement.insertAdjacentElement('beforeend', this.setElement);
        document.body.insertAdjacentElement('beforeend', modalElement);
        this.zIndex++;
    };
    MultiModalControl.prototype.closeModal = function (depth) {
        var _a, _b;
        var modalId = 'multi-modal-' + depth;
        var vailId = 'multi-vail-' + depth;
        if (this.bodyFix == true) {
            document.querySelector('body').style.overflow = '';
        }
        (_a = document.getElementById(modalId)) === null || _a === void 0 ? void 0 : _a.remove();
        (_b = document.getElementById(vailId)) === null || _b === void 0 ? void 0 : _b.remove();
    };
    return MultiModalControl;
}());
MultiModalControl = MultiModalControl;
