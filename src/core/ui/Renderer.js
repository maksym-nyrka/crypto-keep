class Renderer {

    constructor(app) {
        this.app = app;
    }

    renderUi() {
        this.renderCurrency();
        this.renderBalance();
        this.renderAddress();
        // this.renderQrCode();
    }

    renderCurrency() {
        const currencyElements = document.getElementsByClassName("currency_name");

        for (let currencyElement of currencyElements) {
            currencyElement.innerHTML = this.app.getCurrency();
        }
    }

    renderBalance() {
        const balanceElement = document.getElementById("currency_balance");
        this.app.getCurrentBalance().then( balance => {
            balanceElement.innerText = String(balance);
        });
    }

    renderAddress() {
        const addressElement = document.getElementById("currency_address");

        this.app.getAddress().then( address => {
            addressElement.innerText = String(address);
        });
    }

    // renderQrCode() {
    //     const qrElement = document.getElementById("currency_qrcode");
    //
    //     this.app.getAddress().then( address => {
    //         qrElement.value = String(address);
    //     });
    // }
}

module.exports = Renderer;
