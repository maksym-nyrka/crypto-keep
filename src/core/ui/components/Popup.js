const Swal = require('sweetalert2');

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

    Swal.fire({
        width: "23em",
        color: "#ffffff",
        background: "#1f3c5d",
        title: title,
        icon: icon,
        confirmButtonText: '<span class="btn-secondary fw-bold black-text">OK</span> ',
        confirmButtonColor: '#ffffff',
        html: html,
    })
}

module.exports.showPopup = showPopup;
