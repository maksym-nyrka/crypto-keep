const Swal = require('sweetalert2');
require('animate.css');

async function alert(sendCurrencyResponse) {
    const data = getPopupData(sendCurrencyResponse);
    await showPopup(data);
}

function getPopupData(sendCurrencyResponse) {
    let data = {};

    if (sendCurrencyResponse.status === 'success') {
        const url = sendCurrencyResponse.result;

        data.icon = 'success';
        data.title = 'Woo-hoo! Successfully sent!';
        data.html = `View on block explorer: <br>` +
            `<a href=\'${url}\'  target="_blank" rel="noopener noreferrer">${url}</a> `;
    } else {
        data.icon = 'error';
        data.title = 'One tiny detail...';
        data.html = sendCurrencyResponse.result;
    }

    return data;
}

async function showPopup(data) {
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: 'btn btn-lg btn-outline-dark fw-bold'
        },
        buttonsStyling: false
    })

    await swalWithBootstrapButtons.fire({
        width: "23em",
        color: "#1f3c5d",
        background: "#ffffff",
        title: data.title,
        icon: data.icon,
        confirmButtonText: 'OK',
        confirmButtonColor: '#ffffff',
        html: data.html,
        heightAuto: false
    })
}

module.exports.alert = alert;
