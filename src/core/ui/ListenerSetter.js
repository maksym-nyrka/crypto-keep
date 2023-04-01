class ListenerSetter {

    constructor(app) {
        this.app = app;
    }

    setEventListeners() {
        this.setSendListener();
        this.setChangeCurrencyListener();
    }

    setSendListener() {
        const sendButton = document.getElementById("send_button");
        sendButton.addEventListener("click", () => {
            const to = document.getElementById("receiver_input").value;
            const amount = document.getElementById("amount_input").value;

            this.app.sendCurrency(to, amount).then(result => {
                alert(result);
            });
        })
    }

    setChangeCurrencyListener() {
        const currencyLinks = document.getElementsByClassName("currency-select");

        for (const currencyLink of currencyLinks) {
            currencyLink.addEventListener("click", evt => {
                const targetElement = evt.target;
                const currency = targetElement.getAttribute("data-value");
                this.app.changeCurrency(currency);
            })
        }
    }
}

module.exports = ListenerSetter;
