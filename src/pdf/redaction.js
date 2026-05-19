this.default = function () {
    // Initialize buttons
    var viewBtn = new ej.buttons.Button({}, '#viewtemplatebtn');
    var topRedactBtn = new ej.buttons.Button({}, '#topRedactBtn');
    var uploadRedactBtn = new ej.buttons.Button({}, '#uploadRedactBtn');
    // Update visible file name when a file is chosen
    var pdfFileInput = document.getElementById('pdfFile');
    var pdfFileName = document.getElementById('pdfFileName');
    if (pdfFileInput && pdfFileName) {
        pdfFileInput.addEventListener('change', function () {
            var f = pdfFileInput.files && pdfFileInput.files[0];
            pdfFileName.textContent = f ? f.name : ' No file chosen';
        });
    }
    // Core redaction logic
    function redactPdf(pdfBytes, rect) {
        var bytes = pdfBytes instanceof Uint8Array ? pdfBytes : new Uint8Array(pdfBytes);
        var pdf = new ej.pdf.PdfDocument(bytes);
        var rects = Array.isArray(rect) ? rect : [rect];
        var redactor = new ej.pdfdataextract.PdfRedactor(pdf);
        var regions = rects.map(function (r) {
            var region = new ej.pdfdataextract.PdfRedactionRegion(0, {
                x: r.x,
                y: r.y,
                width: r.width,
                height: r.height
            });
            region.fillColor = { r: 0, g: 0, b: 0 };
            return region;
        });
        redactor.add(regions);
        redactor.redactSync();
        pdf.save('Redaction.pdf');
        pdf.destroy();
    }
    // Redact uploaded PDF
    function redactPdfFromUpload() {
        var fileInput = document.getElementById('pdfFile');
        var msgSpan = document.getElementById('fileMessage');
        if (msgSpan) msgSpan.style.display = 'none';
        var chosenFile = fileInput && fileInput.files && fileInput.files[0];
        if (!chosenFile) {
            if (msgSpan) {
                msgSpan.textContent = 'Choose PDF document to redact';
                msgSpan.style.display = 'inline';
            }
            return;
        }
        var x = parseFloat(document.getElementById('x').value);
        var y = parseFloat(document.getElementById('y').value);
        var w = parseFloat(document.getElementById('width').value);
        var h = parseFloat(document.getElementById('height').value);
        if ([x, y, w, h].some(isNaN)) {
            alert('Enter valid numeric values for X, Y, Width, Height');
            return;
        }
        var reader = new FileReader();
        reader.onload = function (e) {
            try {
                var buffer = e.target.result;
                redactPdf(new Uint8Array(buffer), { x: x, y: y, width: w, height: h });
            } catch (err) {
                console.error(err);
                alert('Failed to redact the uploaded PDF.');
            }
        };
        reader.readAsArrayBuffer(chosenFile);
    }
    // View template PDF
    function viewTemplate() {
        readFromPdfResources(input1)
            .then(function (pdfData) {
                downloadPdf(pdfData, 'RedactionTemplate.pdf');
            })
            .catch(function (err) {
                console.error(err);
                alert('Failed to load the template PDF.');
            });
    }
    // Redact predefined regions from resource PDF
    function redactPdfFromResource() {
        var rects = [
            { x: 70, y: 120, width: 200, height: 80 },
            { x: 400, y: 150, width: 100, height: 30 }
        ];
        readFromPdfResources(input1)
            .then(function (pdfData) {
                redactPdf(pdfData, rects);
            })
            .catch(function (err) {
                console.error(err);
                alert('Failed to redact the resource PDF.');
            });
    }
    // Button bindings
    viewBtn.element.onclick = viewTemplate;
    topRedactBtn.element.onclick = redactPdfFromResource;
    uploadRedactBtn.element.onclick = redactPdfFromUpload;
    // Expose methods if needed
    this.viewTemplate = viewTemplate;
    this.redactPdfFromResource = redactPdfFromResource;
    this.redactPdfFromUpload = redactPdfFromUpload;
    // Download helper
    function downloadPdf(bytes, fileName) {
        var blob = new Blob([bytes], { type: 'application/pdf' });
        var url = URL.createObjectURL(blob);
        var a = document.createElement('a');
        a.href = url;
        a.download = fileName;
        a.click();
        URL.revokeObjectURL(url);
    }
};
// Template PDF URL
var input1 = 'https://cdn.syncfusion.com/content/pdf-resources/credit_card_statement.pdf';
// Fetch helper
function readFromPdfResources(url) {
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