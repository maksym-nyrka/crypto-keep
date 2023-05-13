class Renderer {

    constructor(app) {
        this.app = app;
    }

    async renderUi() {
        await this.renderCurrency();
        await this.renderBalance();
        await this.renderAddress();
        await this.renderFullName();
        await this.renderImage();
    }

    async renderCurrency() {
        const currencyElements = document.getElementsByClassName("currency_name");

        for (let currencyElement of currencyElements) {
            currencyElement.innerHTML = this.app.getCurrency();
        }
    }

    async renderBalance() {
        const balanceElement = document.getElementById("currency_balance");

        const balance = await this.app.getCurrentBalance();
        balanceElement.innerText = String(balance);
    }

    async renderAddress() {
        const addressElement = document.getElementById("currency_address");

        const address = await this.app.getCurrentAddress();
        addressElement.innerText = String('address5');
    }

    async renderFullName() {
        const fullNameElement = document.getElementById("currency_full_name");

        const fullName = await this.app.getCurrencyFullName();
        fullNameElement.innerText = String(fullName);
    }

    async renderImage() {
        const imageElement = document.getElementById("currency_image");

        const image = await this.app.getCurrencyImage();
        imageElement.src = String(image);
    }
}

module.exports = Renderer;
