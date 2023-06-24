export class MultiModalControl {
    zIndex: number = 10000;
    draggable: boolean = false;
    setElement: HTMLElement;
    bodyFix: boolean = true;
    dragArea:boolean = false;
    mouseClick: boolean = false;
    posX = 0;
    posY = 0;

    constructor(options?: any) {
        if(options != undefined) {
            if(options.bodyFix != undefined && typeof(options.bodyFix) === 'boolean') {
                this.bodyFix = options.bodyFix;
            }
    
            if(options.index != undefined && typeof(options.index) === 'number') {
                this.zIndex = options.index;
            }
        }
    }

    setModal(depth: number, element: HTMLElement, vail: boolean, draggable: boolean, dragArea?: boolean) {
        let newElement = element.cloneNode(true);
        this.setElement = <HTMLElement>newElement;
        
        this.draggable = draggable;
        if(dragArea != undefined && typeof(dragArea) === 'boolean') {
            this.dragArea = dragArea;
        }
        
        let mouseClick = this.mouseClick;
        let posX = this.posX;
        let posY = this.posY;

        if(vail == true) {
            let vailId = 'multi-vail-' + depth;
            let vailElement = document.createElement('div');
            vailElement.setAttribute('id', vailId);
            vailElement.setAttribute('style', 'position:fixed; top:0; left:0; bottom: 0; width:100%; height:100%; background:#000; z-index:' + (this.zIndex + depth) + '; opacity:0.3;');
            document.body.insertAdjacentElement('beforeend', vailElement);
        }

        let modalElement = document.createElement('div');
        let modalId = 'multi-modal-' + depth;
        let modalWidth = this.setElement.style.width;
        let modalHeight = this.setElement.style.height;
        this.setElement.style.display = '';
        this.setElement.setAttribute('id', '');

        modalElement.setAttribute('id', modalId);
        modalElement.setAttribute('style', 'position: fixed; width: ' + modalWidth + '; height:' + modalHeight + '; top: 20; left: 50%; transform: translateX(-50%); background:#FFF; z-index:' + (this.zIndex + depth + 1) + ';');

        if(this.draggable == true) {
            if(this.dragArea == true) {
                let dragElement = document.createElement('div');
                dragElement.style.width = modalWidth;
                dragElement.style.height = '20px';
                dragElement.style.backgroundColor = "#abcdef";
                modalHeight = String(Number(modalHeight.replace('px', '')) + 20) + 'px';

                modalElement.insertAdjacentElement('beforeend', dragElement);
                
                dragElement.addEventListener('mousedown', function(event){
                    mouseClick = true;
                    posX = event.clientX;
                    posY = event.clientY;
                });

                dragElement.addEventListener('mousemove', function(event){
                    if(mouseClick == true) {
                        let parentElement = this.parentElement; 

                        var now_posX = posX - event.clientX;
                        var now_posY = posY - event.clientY;

                        posX = event.clientX;
                        posY = event.clientY;

                        parentElement.style.left = (parentElement.offsetLeft - now_posX) + "px";
                        parentElement.style.top = (parentElement.offsetTop - now_posY) + "px";
                    }
                });

                dragElement.addEventListener('mouseup', function(event){
                    mouseClick = false;
                });

                document.addEventListener('mouseup', function(event){
                    mouseClick = false;
                });
            } else {
                modalElement.addEventListener('mousedown', function(event){
                    mouseClick = true;
                    posX = event.clientX;
                    posY = event.clientY;
                });

                modalElement.addEventListener('mousemove', function(event){
                    if(mouseClick == true) {
                        var now_posX = posX - event.clientX;
                        var now_posY = posY - event.clientY;

                        posX = event.clientX;
                        posY = event.clientY;

                        this.style.left = (this.offsetLeft - now_posX) + "px";
                        this.style.top = (this.offsetTop - now_posY) + "px";
                    }
                });

                modalElement.addEventListener('mouseup', function(event){
                    mouseClick = false;
                });

                document.addEventListener('mouseup', function(event){
                    mouseClick = false;
                });
            }
        }

        if(this.bodyFix == true) {
            document.querySelector('body').style.overflow = 'hidden';
        }
        
        modalElement.insertAdjacentElement('beforeend', this.setElement);
        document.body.insertAdjacentElement('beforeend', modalElement);
        this.zIndex++;
    }

    closeModal(depth: number) {
        let modalId = 'multi-modal-' + depth;
        let vailId =  'multi-vail-' + depth;

        if(this.bodyFix == true) {
            document.querySelector('body').style.overflow = '';
        }

        document.getElementById(modalId)?.remove();
        document.getElementById(vailId)?.remove();
    }
}