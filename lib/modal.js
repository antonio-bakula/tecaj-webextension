// modal.js
// Taken from http://www.cssscript.com/minimal-modal-box-vanilla-javascript/
//

var Modal = function (child, strictClose, onUnmount) {
    this.child = child;
    this.portal = false;
    this.onUnmountEvent = onUnmount;

    var closeModal = document.createElement('div');
    closeModal.className = 'modal-close-button';
    this.child.appendChild(closeModal);

    this.strictClose = strictClose;
};


Modal.prototype.show = function () {
    if (!this.portal) {
        this.portal = document.createElement('div');
        this.portal.className = 'modal fade';
        var backdrop = document.createElement('div');
        backdrop.className = 'modal-backdrop';
        backdrop.addEventListener('click', this.hide.bind(this));
        this.portal.appendChild(backdrop);
        document.body.insertBefore(this.portal, document.body.children[0]);
        this.render();
    }
};


Modal.prototype.render = function () {
    if (this.portal) {
        setTimeout(function () {
            this.portal.classList.add('in');
        }.bind(this), 10);
        var inner = document.createElement('div');
        inner.className = 'modal-content-parent';
        inner.appendChild(this.child);
        this.portal.children[0].appendChild(inner);
    }
};

Modal.prototype.settleOnMount = function () {
    if (this.portal) {
        this.portal.classList.add('in');
    }
};

Modal.prototype.hide = function (e) {
    if (e.target.className === 'modal-backdrop' && !this.strictClose) {
        this.unmount();
    }
    if (e.target.className === 'modal-close-button') {
        this.unmount();
    }
};

Modal.prototype.unmount = function () {
    if (this.portal) {
        document.body.removeChild(this.portal);
        this.portal = false;
        if (this.onUnmountEvent) {
            this.onUnmountEvent();
        }
    }
};
