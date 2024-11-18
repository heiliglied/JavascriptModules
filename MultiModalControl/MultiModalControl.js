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
    MultiModalControl.prototype.viewModal = function (depth, element, vail, autoClose, draggable, dragArea) {
        var _this = this;
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
            vailElement.setAttribute('class', 'vail-element');
            vailElement.setAttribute('style', 'position: absolute; top:0; left:0; bottom: 0; width:100%; height:100%; background:#000; z-index:' + (this.zIndex + depth) + '; opacity:0.3;');
            if (autoClose == true) {
                vailElement.addEventListener('click', function () { _this.closeModal(depth); });
            }
            document.body.insertAdjacentElement('beforeend', vailElement);
        }
        var modalWidth = element.style.width;
        var modalHeight = element.style.height;
        //let modalId = 'multi-modal-' + depth;
        //let modalId = element.getAttribute('id') ?? 'multi-modal-' + depth;
        //element.setAttribute('id', modalId);
        element.setAttribute('style', 'position: fixed; width: ' + modalWidth + '; height:' + modalHeight + '; top: 50%; left: 50%; transform: translateX(-50%) translateY(-50%); background:#FFF; z-index:' + (this.zIndex + depth + 1) + ';');
        if (this.draggable == true) {
            if (this.dragArea == true) {
                var dragElement = element;
                dragElement.style.width = modalWidth;
                dragElement.style.height = '20px';
                dragElement.style.backgroundColor = "#abcdef";
                modalHeight = String(Number(modalHeight.replace('px', '')) + 20) + 'px';
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
                element.addEventListener('mousedown', function (event) {
                    mouseClick = true;
                    posX = event.clientX;
                    posY = event.clientY;
                });
                element.addEventListener('mousemove', function (event) {
                    if (mouseClick == true) {
                        var now_posX = posX - event.clientX;
                        var now_posY = posY - event.clientY;
                        posX = event.clientX;
                        posY = event.clientY;
                        this.style.left = (this.offsetLeft - now_posX) + "px";
                        this.style.top = (this.offsetTop - now_posY) + "px";
                    }
                });
                element.addEventListener('mouseup', function (event) {
                    mouseClick = false;
                });
                document.addEventListener('mouseup', function (event) {
                    mouseClick = false;
                });
            }
        }
        if (this.bodyFix == true) {
            document.body.style.overflow = 'hidden';
        }
        element.style.display = '';
        this.zIndex++;
    };
    MultiModalControl.prototype.disableVail = function () {
        var vails = document.getElementsByClassName('vail-element');
        for (var i = 0; i < vails.length; i++) {
            vails[i].remove();
        }
    };
    MultiModalControl.prototype.hideModal = function (element, depth) {
        var modalElement = element;
        for (var i = 0; i < depth; i++) {
            modalElement = modalElement.parentNode;
        }
        modalElement.style.display = 'none';
    };
    MultiModalControl.prototype.setModal = function (depth, element, vail, autoClose, draggable, dragArea) {
        var _this = this;
        var newElement = element.cloneNode(true);
        //id 항목들이 있을 시 겹치지 않도록 모든 ID에 -clone-depth를 추가한다.
        this.setElement = newElement;
        var elementIds = this.setElement.querySelectorAll("[id]");
        elementIds.forEach(function (e) {
            e.id += '-clone-' + depth;
        });
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
            vailElement.setAttribute('class', 'vail-element');
            vailElement.setAttribute('style', 'position: absolute; top:0; left:0; bottom: 0; width:100%; height:100%; background:#000; z-index:' + (this.zIndex + depth) + '; opacity:0.3;');
            if (autoClose == true) {
                vailElement.addEventListener('click', function () { _this.closeModal(depth); });
            }
            document.body.insertAdjacentElement('beforeend', vailElement);
        }
        var modalElement = document.createElement('div');
        var modalId = 'multi-modal-' + depth;
        var modalWidth = this.setElement.style.width;
        var modalHeight = this.setElement.style.height;
        this.setElement.style.display = '';
        this.setElement.setAttribute('id', '');
        modalElement.setAttribute('id', modalId);
        modalElement.setAttribute('style', 'position: fixed; width: ' + modalWidth + '; height:' + modalHeight + '; top: 50%; left: 50%; transform: translateX(-50%) translateY(-50%); background:#FFF; z-index:' + (this.zIndex + depth + 1) + ';');
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
            document.body.style.overflow = 'hidden';
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
            document.body.style.overflow = '';
        }
        (_a = document.getElementById(modalId)) === null || _a === void 0 ? void 0 : _a.remove();
        (_b = document.getElementById(vailId)) === null || _b === void 0 ? void 0 : _b.remove();
    };
    MultiModalControl.prototype.selfCloseModal = function (element) {
        var _a, _b;
        var modalIdValue = 'multi-modal-';
        var vailIdValue = 'multi-vail-';
        var htmlNode = element;
        while (true) {
            htmlNode = htmlNode.parentNode;
            if (htmlNode.tagName == 'body') {
                break;
            }
            else {
                if (htmlNode.id.indexOf(modalIdValue) != -1) {
                    var nodeId = htmlNode.id.split('-');
                    modalIdValue = modalIdValue + nodeId[2];
                    vailIdValue = vailIdValue + nodeId[2];
                    break;
                }
            }
        }
        (_a = document.getElementById(modalIdValue)) === null || _a === void 0 ? void 0 : _a.remove();
        (_b = document.getElementById(vailIdValue)) === null || _b === void 0 ? void 0 : _b.remove();
    };
    MultiModalControl.prototype.setModalReference = function (depth, vail, autoClose, draggable, contents) {
        var _this = this;
        this.draggable = draggable;
        var vailId = 'multi-vail-' + depth;
        if (vail == true) {
            var vailElement = document.createElement('div');
            vailElement.setAttribute('id', vailId);
            vailElement.setAttribute('class', 'vail-element');
            vailElement.setAttribute('style', 'position: absolute; top:0; left:0; bottom: 0; width:100%; height:100%; background:#000; z-index:' + (this.zIndex + depth) + '; opacity:0.3;');
            if (autoClose == true) {
                vailElement.addEventListener('click', function () { _this.closeModal(depth); });
            }
            document.body.insertAdjacentElement('beforeend', vailElement);
        }
        var modalElement = document.createElement('div');
        var modalId = 'multi-modal-' + depth;
        var modalWidth = '480px';
        var modalHeight = 'auto';
        modalElement.setAttribute('id', modalId);
        modalElement.setAttribute('style', 'position: fixed; width: ' + modalWidth + '; height:' + modalHeight + '; top: 50%; left: 50%; transform: translateX(-50%) translateY(-50%); background:#FFF; z-index:' + (this.zIndex + depth + 1) + ';');
        var mouseClick = this.mouseClick;
        var posX = this.posX;
        var posY = this.posY;
        if (this.draggable == true) {
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
        if (this.bodyFix == true) {
            document.body.style.overflow = 'hidden';
        }
        var contentElemnt = document.createElement('div');
        contentElemnt.setAttribute('style', 'width: calc(100% - 10px); padding: 5px; background-color: white;');
        contentElemnt.innerText = contents;
        var elementIds = this.setElement.querySelectorAll("[id]");
        elementIds.forEach(function (e) {
            e.id += '-clone-' + depth;
        });
        var footerElement = document.createElement('div');
        footerElement.setAttribute('style', 'width: calc(100% - 10px); border-top: 2px #000000 solid; padding: 5px; background-color: white; text-align: right');
        var closeButton = document.createElement('button');
        closeButton.setAttribute('id', 'multi-button-' + depth);
        closeButton.setAttribute('type', 'button');
        closeButton.innerText = '닫기';
        footerElement.insertAdjacentElement('beforeend', closeButton);
        closeButton.addEventListener('click', function (event) {
            var _a, _b;
            (_a = document.getElementById(modalId)) === null || _a === void 0 ? void 0 : _a.remove();
            (_b = document.getElementById(vailId)) === null || _b === void 0 ? void 0 : _b.remove();
        });
        modalElement.insertAdjacentElement('beforeend', contentElemnt);
        modalElement.insertAdjacentElement('beforeend', footerElement);
        document.body.insertAdjacentElement('beforeend', modalElement);
        this.zIndex++;
    };
    return MultiModalControl;
}());
