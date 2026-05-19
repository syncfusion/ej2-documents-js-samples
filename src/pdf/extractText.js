this.default = function () {

    //    Button Initialization
    // Button to view/download the original PDF
    var viewBtn = new ej.buttons.Button();
    viewBtn.appendTo('#viewtemplatebtn');
    // Button to extract text from PDF and download as TXT
    var extractBtn = new ej.buttons.Button();
    extractBtn.appendTo('#normalbtn');
    //  Extract Text Button Click
    extractBtn.element.onclick = function () {
        // Fetch PDF bytes using Promise
        readFromPdfResources(templateURL)
            .then(function (pdfBytes) {
                // Load PDF document
                var pdf = new ej.pdf.PdfDocument(pdfBytes);
                // Initialize text extractor
                var extractor = new ej.pdfdataextract.PdfDataExtractor(pdf);
                // Extract text from all pages
                var text = extractor.extractText({
                    startPageIndex: 0,
                    endPageIndex: pdf.pageCount - 1
                });
                // Clean up PDF instance
                pdf.destroy();
                // Download extracted text as .txt file
                downloadBlob(new Blob([text], { type: 'text/plain' }), 'Sample.txt');
            })
            .catch(function (err) {
                console.error('Extract Text failed:', err);
            });
    };
    // View/Download Original PDF Button Click
    viewBtn.element.onclick = function () {
        // Fetch PDF bytes and download using Promise
        readFromPdfResources(templateURL)
            .then(function (pdfBytes) {
                // Download PDF file
                downloadBlob(new Blob([pdfBytes], { type: 'application/pdf' }), 'PDF_Succinctly.pdf');
            })
            .catch(function (err) {
                console.error('View Template failed:', err);
            });
    };
};
// Template PDF URL
var templateURL = 'https://cdn.syncfusion.com/content/pdf-resources/pdf-succinctly.pdf';

//   Fetch PDF from URL and return Uint8Array
function readFromPdfResources(url) {
    return fetch(url)
        .then(function (res) {
            if (!res.ok) {
                throw new Error('Failed to fetch PDF: ' + res.status + ' ' + res.statusText);
            }
            return res.arrayBuffer();
        })
        .then(function (buf) {
            return new Uint8Array(buf);
        });
}
//  Helper function to download a Blob as a file
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