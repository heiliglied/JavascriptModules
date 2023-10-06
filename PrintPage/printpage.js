"use strict";

var PrintPage = /** @class */ (function () {
    function PrintPage() {
    }
    PrintPage.prototype.printscreen = function (view, data) {
        var element = view;
        for (var parameter in data) {
            element = element.replace(parameter, data[parameter]);
        }
        var modal = document.createElement('div');
        var modalId = Math.random().toString(36).substring(2, 12);
        modal.setAttribute('id', modalId);
        modal.setAttribute('style', 'position:fixed; top:0; left:0; bottom: 0; width:100%; height:100%; background:#000; opacity:0.3; z-index: -10; display: none;');
        var iframeName = modalId + '_iframe';
        var iframe = document.createElement('iframe');
        iframe.setAttribute('name', iframeName);
        iframe.setAttribute('style', 'border: 0; width: 100%; height: 80vh');
        modal.insertAdjacentElement('beforeend', iframe);
        document.body.insertAdjacentElement('beforeend', modal);
        var iframedoc;
        if (iframe.contentDocument) {
            iframedoc = iframe.contentDocument;
        }
        else if (iframe.contentWindow) {
            iframedoc = iframe.contentWindow.document;
        }
        iframedoc.open();
        if (iframedoc.write) {
            iframedoc.write(element);
        }
        else {
            iframedoc.document.write(element);
        }
        iframedoc.close();
        window.frames[iframeName].focus();
        window.frames[iframeName].print();
    };
    return PrintPage;
}());
