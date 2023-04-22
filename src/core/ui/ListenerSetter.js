const {showPopup} = require("./components/Popup");

class ListenerSetter {

    constructor(app) {
        this.app = app;
    }

    setEventListeners() {
        this.setSendListener();
        this.setChangeCurrencyListener();
        this.setActiveCurrencyListener();
        this.setMnemonicListeners();
        this.setSignInButtonListener();
        this.setOpenModalListener();
        this.setCloseModalListener();
        this.setBackgroundChangeListener();
    }

    setSendListener() {
        const sendButton = document.getElementById("send_button");
        sendButton.addEventListener("click", () => {
            const to = document.getElementById("receiver_input").value;
            const amount = document.getElementById("amount_input").value;

            sendButton.innerText = "Sending, please wait";
            sendButton.style.pointerEvents = 'none';

            //console.log("start app.sendCurrency:")
            this.app.sendCurrency(to, amount).then(async (result) => {
                //console.log("setSendListener sendCurrency result:" + result)
                await this.displayPopup(result, true);
            }).catch(async (error) => {
                    //console.log("setSendListener sendCurrency error:" + error)
                    await this.displayPopup(error, false);
                }
            ).finally(async () => {
                    sendButton.innerText = "Send";
                    sendButton.style.pointerEvents = 'auto';
                }
            );
        })
    }

    displayPopup(result, success) {
        return new Promise(async (resolve, reject) => {
            try {
                await showPopup(result, success, this.app);
                resolve();
            } catch (e) {
                reject(e);
            }
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

    setMnemonicListeners() {
        this.setGenerateMnemonicListener();
        this.setImportMnemonicOnInputListener();
    }

    setGenerateMnemonicListener() {
        document.getElementById("generate_mnemonic").addEventListener("click", async () => {
            let mnemonic = await this.app.generateMnemonic();
            const mnemonicInput = document.getElementById("import_mnemonic");
            mnemonicInput.value = mnemonic;
            //console.log(mnemonic);
            this.app.importMnemonic(mnemonic);
        })
    }

    setImportMnemonicOnInputListener() {
        document.getElementById("import_mnemonic").addEventListener("input", async () => {
            let element = event.target || event.srcElement;
            let mnemonic = element.value;
            //console.log(mnemonic);
            this.app.importMnemonic(mnemonic);
        })
    }

    setSignInButtonListener() {
        document.getElementById("sign_in_button").addEventListener("click", async () => {
            document.getElementById("welcome").style.display = "none";
            document.getElementById("main").style.display = "flex";
            document.getElementById("header_nav").style.display = "flex";
            this.app.prepareInterface();
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
