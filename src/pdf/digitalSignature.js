this.default = function () {
    /* --------------------------------------------------
       Button Initialization
    -------------------------------------------------- */
    // Button to create a new PDF and digitally sign it
    var createBtn = new ej.buttons.Button();
    createBtn.appendTo('#createSignBtn');
    // Button to sign an already existing PDF
    var signBtn = new ej.buttons.Button({}, '#signExistingBtn');
    // Click handler for creating and signing a new PDF
    createBtn.element.onclick = function () {
        createAndSignPdf();
    };
    // Click handler for signing an uploaded PDF
    signBtn.element.onclick = function () {
        signExistingPdf();
    };
    // Initialize EJ2 TextBox components for inputs using demo-like features
    new ej.inputs.TextBox({ cssClass: 'e-filled', placeholder: 'Password', type: 'password', width: '300px', showClearButton: false }, '#certPassword');
    new ej.inputs.TextBox({ cssClass: 'e-filled', placeholder: 'Reason', width: '300px', showClearButton: true }, '#reason');
    new ej.inputs.TextBox({ cssClass: 'e-filled', placeholder: 'Contact', width: '300px', showClearButton: true }, '#contact');
    new ej.inputs.TextBox({ cssClass: 'e-filled', placeholder: 'Location', width: '300px', showClearButton: true }, '#location');
    // File input change handlers to update chosen file name display
    var srcInputEl = document.getElementById('sourceFile');
    var certInputEl = document.getElementById('certFile');
    var srcNameEl = document.getElementById('sourceFileName');
    var certNameEl = document.getElementById('certFileName');
    if (srcInputEl && srcNameEl) {
        srcInputEl.addEventListener('change', function () {
            var f = srcInputEl.files && srcInputEl.files[0];
            srcNameEl.textContent = f ? f.name : 'No file chosen';
        });
    }
    if (certInputEl && certNameEl) {
        certInputEl.addEventListener('change', function () {
            var f = certInputEl.files && certInputEl.files[0];
            certNameEl.textContent = f ? f.name : 'No file chosen';
        });
    }
    // Expose functions if external access is required
    this.createAndSignPdf = createAndSignPdf;
    this.signExistingPdf = signExistingPdf;
    /* --------------------------------------------------
       Core PDF Signing Logic
    -------------------------------------------------- */
    // Signs a PDF using the provided certificate and options
    function signPdf(pdfBytes, options) {
        // Load PDF from byte array
        var pdf = new ej.pdf.PdfDocument(pdfBytes);
        // Use the first page for signature placement
        var page = pdf.getPage(0);
        // Resolve signature bounds with default values
        var bounds = options.bounds || {};
        var sigX = typeof bounds.x === 'number' ? bounds.x : 20;
        var sigY = typeof bounds.y === 'number' ? bounds.y : 20;
        var sigW = typeof bounds.width === 'number' ? bounds.width : 200;
        var sigH = typeof bounds.height === 'number' ? bounds.height : 100;
        // Create signature field
        var signatureField = new ej.pdf.PdfSignatureField(
            page,
            options.fieldName || 'Signature',
            { x: sigX, y: sigY, width: sigW, height: sigH }
        );
        // Configure digital signature options
        var signatureOptions = {
            cryptographicStandard: mapCryptoStandard(options.crypto || 'CMS'),
            digestAlgorithm: mapDigestAlgorithm(options.digest || 'SHA256'),
            contactInfo: options.contact || '',
            locationInfo: options.location || '',
            reason: options.reason || ''
        };
        if (options.author === true) {
            signatureOptions.certify = true;
        }
        // Create digital signature using PFX certificate
        var signature = ej.pdf.PdfSignature.create(
            options.pfxData,
            options.password,
            signatureOptions
        );
        // Assign signature to the signature field
        signatureField.setSignature(signature);
        // Add the signature field to the PDF form
        pdf.form.add(signatureField);
        // Draw logo inside the signature appearance (if provided)
        if (options.logoBytes) {
            var appearance = signatureField.getAppearance();
            var logoRect = options.logoRect || {};
            var lx = typeof logoRect.x === 'number' ? logoRect.x : 20;
            var ly = typeof logoRect.y === 'number' ? logoRect.y : 20;
            var lw = typeof logoRect.width === 'number' ? logoRect.width : 120;
            var lh = typeof logoRect.height === 'number' ? logoRect.height : 50;
            var logoImage = new ej.pdf.PdfBitmap(options.logoBytes);
            appearance.normal.graphics.drawImage(logoImage, {
                x: lx,
                y: ly,
                width: lw,
                height: lh
            });
        }
        // Save and release PDF resources
        pdf.save(options.outputName);
        pdf.destroy();
    }
    /* --------------------------------------------------
       Utility Helper Functions
    -------------------------------------------------- */
    // Returns selected radio button value by name
    function getSelectedRadio(name) {
        var el = document.querySelector('input[name="' + name + '"]:checked');
        return el ? el.value : null;
    }
    // Maps UI value to Syncfusion cryptographic standard
    function mapCryptoStandard(val) {
        return val === 'CAdES' ? ej.pdf.CryptographicStandard.cades : ej.pdf.CryptographicStandard.cms;
    }
    // Maps UI value to Syncfusion digest algorithm
    function mapDigestAlgorithm(val) {
        switch (val) {
            case 'SHA1': return ej.pdf.DigestAlgorithm.sha1;
            case 'SHA384': return ej.pdf.DigestAlgorithm.sha384;
            case 'SHA512': return ej.pdf.DigestAlgorithm.sha512;
            case 'RIPEMD160': return ej.pdf.DigestAlgorithm.ripemd160;
            default: return ej.pdf.DigestAlgorithm.sha256;
        }
    }
    // Fetches a remote resource and returns it as Uint8Array
    function readFromPdfResources(fileName) {
        return fetch(fileName)
            .then(function (response) {
                if (!response.ok) {
                    throw new Error(
                        'Failed to fetch ' + fileName + ': ' +
                        response.status + ' ' + response.statusText
                    );
                }
                return response.arrayBuffer();
            })
            .then(function (buffer) {
                return new Uint8Array(buffer);
            });
    }
    /* --------------------------------------------------
       Create and Sign a New PDF
    -------------------------------------------------- */
    function createAndSignPdf() {
        // Read selected crypto and digest options
        var crypto = getSelectedRadio('cryptoStandard');
        var digest = getSelectedRadio('digestAlgo');
        var sigType = getSelectedRadio('signatureType');
        // Load sample PDF, certificate and logo
        Promise.all([
            readFromPdfResources('https://cdn.syncfusion.com/content/pdf-resources/pdf-succinctly.pdf'),
            readFromPdfResources('https://cdn.syncfusion.com/content/pdf-resources/PDF.pfx'),
            readFromPdfResources('https://cdn.syncfusion.com/content/pdf-resources/logo.png')
        ])
            .then(function (results) {
                // Sign the downloaded PDF
                signPdf(results[0], {
                    crypto: crypto,
                    digest: digest,
                    pfxData: results[1],
                    password: 'password123',
                    contact: 'johndoe@owned.us',
                    location: 'Honolulu, Hawaii',
                    reason: sigType === 'Author' ? 'I am author of this document.' : 'Approved.',
                    logoBytes: results[2],
                    outputName: 'SignedPDF.pdf',
                    author: sigType === 'Author'
                });
            })
            .catch(function (err) {
                showNote(err.message);
            });
    }
    /* --------------------------------------------------
       Validation Message Helpers
    -------------------------------------------------- */
    // Ensures validation message container exists
    function ensureNoteHost() {
        var host = document.getElementById('noteMessage');
        if (!host) {
            host = document.createElement('div');
            host.id = 'noteMessage';
            host.style.display = 'none';
            host.style.color = '#b00020';
            host.style.fontWeight = '600';
            host.style.margin = '8px 0';
            var controlSection = document.querySelector('.control-section') || document.body;
            controlSection.insertBefore(host, controlSection.firstChild);
        }
        return host;
    }
    // Displays validation or error message
    function showNote(msg) {
        var note = ensureNoteHost();
        note.textContent = msg;
        note.style.display = 'block';
    }
    // Hides validation message
    function hideNote() {
        var note = document.getElementById('noteMessage');
        if (note) {
            note.style.display = 'none';
        }
    }
    /* --------------------------------------------------
       Sign an Existing PDF
    -------------------------------------------------- */
    function signExistingPdf() {
        var crypto = getSelectedRadio('cryptoStandard');
        var digest = getSelectedRadio('digestAlgo');
        var sourceInput = document.getElementById('sourceFile');
        var certInput = document.getElementById('certFile');
        var password = document.getElementById('certPassword').value.trim();
        var reason = document.getElementById('reason').value.trim();
        var contact = document.getElementById('contact').value.trim();
        var location = document.getElementById('location').value.trim();
        // Validate required inputs
        if (!(sourceInput.files.length &&
            certInput.files.length &&
            password && reason && contact && location)) {
            showNote('NOTE: Fill all fields and then create PDF');
            return;
        }
        hideNote();
        Promise.all([
            sourceInput.files[0].arrayBuffer(),
            certInput.files[0].arrayBuffer(),
            readFromPdfResources('https://cdn.syncfusion.com/content/pdf-resources/logo.png')
        ])
            .then(function (results) {
                // Sign the uploaded PDF
                signPdf(new Uint8Array(results[0]), {
                    crypto: crypto,
                    digest: digest,
                    pfxData: new Uint8Array(results[1]),
                    password: password,
                    contact: contact,
                    location: location,
                    reason: reason,
                    logoBytes: results[2],
                    outputName: 'SignedPDF.pdf'
                });
            })
            .catch(function (err) {
                showNote(err.message || 'Error while signing existing PDF.');
            });
    }
};