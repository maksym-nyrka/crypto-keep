const Renderer = require("./Renderer");
const ListenerSetter = require("./ListenerSetter");

class WalletUi {

    constructor(app) {
        this.app = app;
        this.renderer = new Renderer(this.app);
        this.listenerSetter = new ListenerSetter(this.app);
        this.setEventListeners().then(() => {});
    }

    renderUi() {
        this.renderer.renderUi();
    }

    async setEventListeners() {
       await this.listenerSetter.setEventListeners();
    }
}

module.exports = WalletUi;
