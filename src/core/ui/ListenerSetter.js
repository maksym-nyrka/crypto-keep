const {alert} = require("./components/Alert");

class ListenerSetter {

    DEFAULT_CURRENCY = "ETH";

    constructor(app) {
        this.app = app;
    }

    async setEventListeners() {
        this.setSendListener();
        this.setChangeCurrencyListener();
        this.setActiveCurrencyListener();
        this.setGenerateMnemonicListener();
        await this.setSignInButtonListener();
        this.setOpenModalListener();
        this.setCloseModalListener();
        this.setBackgroundChangeListener();
    }

    setSendListener() {
        const sendButton = document.getElementById("send_button");
        sendButton.addEventListener("click", async () => {
            const to = document.getElementById("receiver_input").value;
            const amount = document.getElementById("amount_input").value;

            sendButton.innerText = "Sending, please wait";
            sendButton.style.pointerEvents = 'none';

            this.app.sendCurrency(to, amount).then(async (response) => {
                await alert(response);
            }).finally(async () => {
                    sendButton.innerText = "Send";
                    sendButton.style.pointerEvents = 'auto';
                    await this.app.updateCurrentCurrency();
                }
            );
        })
    }

    setChangeCurrencyListener() {
        const currencyLinks = document.getElementsByClassName("currency-select");

        for (const currencyLink of currencyLinks) {
            currencyLink.addEventListener("click", async (evt) => {
                const targetElement = evt.target;
                const currency = targetElement.getAttribute("data-value");
                await this.app.changeCurrency(currency);
            })
        }
    }

    setActiveCurrencyListener() {
        const currencyLinks = document.querySelectorAll('.currency-select');

        currencyLinks.forEach(link => {
            link.addEventListener('click', this.toggleCurrencyActive);
        });
    }

    toggleCurrencyActive() {
        let active = document.getElementsByClassName('active')[0];
        if (active !== undefined) {
            active.classList.toggle('active');
        }

        this.classList.toggle('active');
    }

    setGenerateMnemonicListener() {
        document.getElementById("generate_mnemonic").addEventListener("click", async () => {
            let mnemonic = await this.app.generateMnemonic();
            const mnemonicInput = document.getElementById("import_mnemonic");
            mnemonicInput.value = mnemonic;
        })
    }

    async setSignInButtonListener() {
        document.getElementById("sign_in_button").addEventListener("click", async () => {
            document.getElementById("welcome").style.display = "none";
            document.getElementById("main").style.display = "flex";
            document.getElementById("header_nav").style.display = "flex";

            const mnemonicInput = document.getElementById("import_mnemonic");
            const mnemonic = mnemonicInput.value;

            await this.app.loginWithMnemonic(mnemonic);
            await this.app.changeCurrency(this.DEFAULT_CURRENCY);
        })
    }

    setOpenModalListener() {
        document.getElementById("login_button").addEventListener("click", async () => {
            document.getElementById("welcome").style.display = "none";
        })
    }

    setCloseModalListener() {
        document.getElementById("myModal").addEventListener("hidden.bs.modal", async () => {
            if (document.getElementById("main").style.display === "flex") {
                document.getElementById("welcome").style.display = "none";
                this.changeBackgroundImage("moon.jpg");
            } else {
                document.getElementById("welcome").style.display = "block";
                this.changeBackgroundImage("astronaut.jpg");
            }
        })
    }

    setBackgroundChangeListener() {
        const matchMedia = window.matchMedia("(max-width: 767px)");
        let image;

        matchMedia.addEventListener("change", async () => {
            if (matchMedia.matches &&
                document.getElementById("welcome").style.display === "none") {
                image = "moon.jpg";
            } else {
                image = "astronaut.jpg";
            }
            this.changeBackgroundImage(image, true);
        });
    }

    changeBackgroundImage(image, override) {
        override = override ?? false;

        const matchMedia = window.matchMedia("(max-width: 767px)");

        if (override || matchMedia.matches) {
            document.querySelector("body").style.backgroundImage = `url('/dist/images/${image}')`;
        }
    }
}

module.exports = ListenerSetter;
