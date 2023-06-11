export class MultiModalControl {
    zIndex: number = 10000;
    draggable: boolean = false;
    isPress: boolean = false;
    setElement: HTMLElement;
    prevPosX = 0;
    prevPosY = 0;

    constructor(index?: number) {
        if(typeof(index) === 'number') {
            this.zIndex = index;
        }
    }

    setModal(depth: number, element: HTMLElement, vail: boolean) {
        let newElement = element;
        this.setElement = newElement;

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
        modalElement.insertAdjacentElement('beforeend', this.setElement);
        document.body.insertAdjacentElement('beforeend', modalElement);
        this.zIndex++;
    }

    closeModal(depth: number) {
        let modalId = 'multi-modal-' + depth;
        let vailId =  'multi-vail-' + depth;
        document.getElementById(modalId)?.remove();
        document.getElementById(vailId)?.remove();
    }

    dragElement(element: HTMLElement) {
        
    }
}
