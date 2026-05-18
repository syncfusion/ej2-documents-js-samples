this.default = function () {
    // Initialize buttons
    var viewBtn = new ej.buttons.Button({}, '#viewtemplatebtn');
    var rearrangeBtn = new ej.buttons.Button({}, '#rearrangebtn');
    // Rearrange pages button click
    rearrangeBtn.element.onclick = function () {
        // Fetch PDF
        readFromPdfResources(templateUrl)
            .then(function (pdfBytes) {
                var pdf = new ej.pdf.PdfDocument(pdfBytes);
                // Reorder pages: new order [page3, page1, page2] (0-based)
                pdf.reorderPages([2, 0, 1]);
                pdf.save(outputPdfName);
                pdf.destroy();
            })
            .catch(function (err) {
                console.error('Rearrange Pages failed:', err);
            });
    };
    // View original template PDF
    viewBtn.element.onclick = function () {
        readFromPdfResources(templateUrl)
            .then(function (pdfBytes) {
                downloadBlob(
                    new Blob([pdfBytes], { type: 'application/pdf' }),
                    'SyncfusionBrochure.pdf'
                );
            })
            .catch(function (err) {
                console.error('View Template failed:', err);
            });
    };
};
// Source PDF URL
var templateUrl =
    'https://cdn.syncfusion.com/content/pdf-resources/syncfusion-brochure.pdf';
// Output file name
var outputPdfName = 'RearrangedPages.pdf';
// Helper: fetch PDF and return Uint8Array
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
// Helper: download Blob as file
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