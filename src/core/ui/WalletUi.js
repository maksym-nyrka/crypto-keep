const Renderer = require("./Renderer");
const ListenerSetter = require("./ListenerSetter");

class WalletUi {

    constructor(app) {
        this.app = app;
        this.renderer = new Renderer(this.app);
        this.listenerSetter = new ListenerSetter(this.app);
    }

    renderUi() {
        this.renderer.renderUi();
    }

    setEventListeners() {
        this.listenerSetter.setEventListeners();

    }

    prepareInterface() {
        this.renderUi();
        this.setEventListeners();
    }
}

module.exports = WalletUi;
