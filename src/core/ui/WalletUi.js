const Renderer = require("./Renderer");
const ListenerSetter = require("./ListenerSetter");

class WalletUi {

    constructor(app) {
        this.app = app;
        this.renderer = new Renderer(this.app);
        this.listenerSetter = new ListenerSetter(this.app);
        this.setEventListeners();
    }

    renderUi() {
        this.renderer.renderUi();
    }

    setEventListeners() {
        this.listenerSetter.setEventListeners();
    }
}

module.exports = WalletUi;
