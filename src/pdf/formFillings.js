this.default = function () {
    // Expose functions for external button bindings
    this.viewPdf = viewPdf;
    this.fillPdf = fillPdf;
    var viewBtn = new ej.buttons.Button({}, '#btnViewTemplate');
    viewBtn.element.onclick = function () {
        viewPdf();
    };
    var fillBtn = new ej.buttons.Button({}, '#btnFillForm');
    fillBtn.element.onclick = function () {
        fillPdf('fill');
    };
    var flattenbtn = new ej.buttons.Button({}, '#btnFillFlatten');
    flattenbtn.element.onclick = function () {
        fillPdf('flatten');
    };
    // Flags to prevent multiple clicks while processing
    var viewBusy = false;
    var fillBusy = false;
    // Fill PDF form fields and download
    // mode: 'flatten' to flatten the form or undefined
    function fillPdf(mode) {
        if (fillBusy) return;
        fillBusy = true;
        // Fetch PDF template
        fetchAsUint8Array(
            'https://cdn.syncfusion.com/content/pdf-resources/form-filling-document.pdf'
        )
            .then(function (pdfBytes) {
                // Read values from HTML form inputs
                var values = getFormValues();
                // Create PDF document instance
                var pdf = new ej.pdf.PdfDocument(pdfBytes);
                var form = pdf.form;
                // Fill Name field
                var nameField = findByName(form, 'name');
                if (nameField) {
                    nameField.text = values.name;
                    nameField.setAppearance(true);
                }
                // Fill Gender (Radio button list)
                var gender = findByName(form, 'gender');
                if (gender) {
                    if (values.gender === 'Male') gender.selectedIndex = 0;
                    else if (values.gender === 'Other') gender.selectedIndex = 1;
                    else if (values.gender === 'Female') gender.selectedIndex = 2;
                    gender.setAppearance(true);
                }
                // Fill Date of Birth
                var dobField = findByName(form, 'dob');
                if (dobField) {
                    dobField.text = values.dob;
                    dobField.setAppearance(true);
                }
                // Fill Email
                var emailField = findByName(form, 'email');
                if (emailField) {
                    emailField.text = values.email;
                    emailField.setAppearance(true);
                }
                // Fill State (ComboBox)
                var stateField = findByName(form, 'state');
                if (stateField) {
                    for (var i = 0; i < stateField.itemsCount; i++) {
                        var item = stateField._options[i];
                        if (item === values.state) {
                            stateField.selectedIndex = i;
                            break;
                        }
                    }
                    stateField.setAppearance(true);
                }
                // Fill Newsletter checkbox
                var newsField = findByName(form, 'newsletter');
                if (newsField) {
                    newsField.checked = values.newsletter;
                    newsField.setAppearance(true);
                }
                // Flatten form if requested
                if (mode === 'flatten') {
                    pdf.flatten = true;
                }
                // Save filled PDF
                pdf.save(mode === 'flatten' ? 'FormFillFlatten.pdf' : 'FormFillings.pdf');
                // Cleanup PDF object
                pdf.destroy();
            })
            .catch(function (err) {
                console.error(err);
                alert('Failed to fill the PDF.');
            })
            .finally(function () {
                fillBusy = false;
            });
    }
    // View / download the original PDF template
    function viewPdf() {
        if (viewBusy) return;
        viewBusy = true;
        fetchAsUint8Array(
            'https://cdn.syncfusion.com/content/pdf-resources/form-filling-document.pdf'
        )
            .then(function (pdfBytes) {
                downloadBlob(new Blob([pdfBytes], { type: 'application/pdf' }), 'FormFillings.pdf');
            })
            .catch(function (err) {
                console.error(err);
                alert('Failed to load the PDF.');
            })
            .finally(function () {
                viewBusy = false;
            });
    }
    // Read values from HTML form controls
    function getFormValues() {
        var name = document.querySelector('#name');
        var gender = document.querySelector('#gender');
        var dobRaw = document.querySelector('#dob');
        var email = document.querySelector('#email');
        var state = document.querySelector('#state');
        var newsletter = document.querySelector('#newsletter');
        // Convert yyyy-mm-dd to mm/dd/yyyy
        var dob = '';
        if (dobRaw && dobRaw.value) {
            var parts = dobRaw.value.split('-');
            if (parts.length === 3) {
                dob = parts[1] + '/' + parts[2] + '/' + parts[0];
            }
        }
        return {
            name: name ? name.value : '',
            gender: gender ? gender.value : 'Male',
            dob: dob,
            email: email ? email.value : '',
            state: state ? state.value : '',
            newsletter: !!(newsletter && newsletter.checked)
        };
    }
    // Find PDF form field by name
    function findByName(form, name) {
        for (var i = 0; i < form.count; i++) {
            var field = form.fieldAt(i);
            if (field && field.name === name) return field;
        }
        return undefined;
    }
};
//   Fetch URL and return Uint8Array
function fetchAsUint8Array(url) {
    return fetch(url, { cache: 'no-cache' })
        .then(function (res) {
            if (!res.ok) {
                throw new Error('Failed to fetch ' + url + ': ' + res.status + ' ' + res.statusText);
            }
            return res.arrayBuffer();
        })
        .then(function (buf) {
            return new Uint8Array(buf);
        });
}
// Download blob as a file
function downloadBlob(blob, fileName) {
    var url = URL.createObjectURL(blob);
    var a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}