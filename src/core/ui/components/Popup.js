const Swal = require('sweetalert2');
require('animate.css');

async function showPopup(result, success, app) {
    let icon;
    let html;
    let title;

    if (success) {
        const url = await app.getCurrentTransactionUrl(result);

        icon = 'success';
        title = 'Woo-hoo! Successfully sent!';
        html = `View on block explorer: <br>` +
            `<a href=\'${url}\'  target="_blank" rel="noopener noreferrer">${url}</a> `;
    } else {
        icon = 'error';
        title = 'One tiny detail...';
        html = result;
    }

    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: 'btn btn-lg btn-outline-dark fw-bold'
        },
        buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
        width: "23em",
        color: "#1f3c5d",
        background: "#ffffff",
        title: title,
        icon: icon,
        confirmButtonText: 'OK',
        confirmButtonColor: '#ffffff',
        html: html,
    })
}

module.exports.showPopup = showPopup;
