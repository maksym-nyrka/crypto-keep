class ListenerSetter {

    constructor(app) {
        this.app = app;
    }

    setEventListeners() {
        this.setSendListener();
        this.setChangeCurrencyListener();
        this.setActiveCurrencyListener();
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

    setActiveCurrencyListener() {
        const currencyLinks = document.querySelectorAll('.currency-select');

        currencyLinks.forEach(link => {
                link.addEventListener('click', this.toggleCurrencyActive)
        });
    }

    toggleCurrencyActive() {
        let active = document.getElementsByClassName('active')[0];
        if (active !== undefined) {
            active.classList.toggle('active');
        }

        this.classList.toggle('active');
    }
}

module.exports = ListenerSetter;
