this.default = function () {
    // PDF source and output image name
    var templateUrl =
        'https://cdn.syncfusion.com/content/pdf-resources/image-template.pdf';
    var outputImageName = 'Sample.jpg';

    // Initialize buttons
    var viewBtn = new ej.buttons.Button();
    viewBtn.appendTo('#viewtemplatebtn');

    var extractBtn = new ej.buttons.Button();
    extractBtn.appendTo('#extractbtn');

    // View original PDF template
    viewBtn.element.onclick = function () {
        readFromPdfResources(templateUrl)
            .then(function (pdfBytes) {
                // Download the fetched PDF as-is
                downloadBlob(
                    new Blob([pdfBytes], { type: 'application/pdf' }),
                    'Sample.pdf'
                );
            })
            .catch(function (err) {
                console.error('View Template failed:', err);
            });
    };

    // Extract images from PDF
    extractBtn.element.onclick = function () {
        readFromPdfResources(templateUrl)
            .then(function (pdfBytes) {
                // Load PDF document
                var pdf = new ej.pdf.PdfDocument(pdfBytes);

                // Create data extractor with canvas callback
                var extractor = new ej.pdfdataextract.PdfDataExtractor(
                    pdf,
                    canvasRenderCallback
                );

                // Extract images from all pages
                return extractor
                    .extractImages({
                        startPageIndex: 0,
                        endPageIndex: pdf.pageCount - 1
                    })
                    .then(function (images) {
                        if (images && images.length > 0) {
                            // Take first extracted image
                            var first = images[0];
                            var blob = new Blob([first.data], { type: 'image/jpeg' });
                            downloadBlob(blob, outputImageName);
                        } else {
                            console.warn('No images found in the document.');
                        }

                        // Cleanup PDF instance
                        pdf.destroy();
                    });
            })
            .catch(function (err) {
                console.error('Extract Image failed:', err);
            });
    };

    // Canvas callback required for image rendering
    function canvasRenderCallback() {
        var canvas = document.createElement('canvas');
        return { canvas: canvas, applicationPlatform: undefined };
    }

    // Fetch PDF as byte array
    function readFromPdfResources(url) {
        return fetch(url, { cache: 'no-cache' })
            .then(function (res) {
                if (!res.ok) {
                    throw new Error('Failed to fetch PDF');
                }
                return res.arrayBuffer();
            })
            .then(function (buf) {
                return new Uint8Array(buf);
            });
    }

    // Helper to download Blob as file
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
};