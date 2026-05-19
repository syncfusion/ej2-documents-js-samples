this.default = function () {
    // Initialize Merge button
    var mergeBtn = new ej.buttons.Button();
    mergeBtn.appendTo('#mergebtn');
    // Click handler to merge PDFs
    mergeBtn.element.onclick = function () {
        // Fetch the source PDF as bytes
        fetchAsUint8Array(templateUrl).then(function (pdfBytes) {
            // Create two PDF document instances from the same source
            var doc1 = new ej.pdf.PdfDocument(pdfBytes);
            var doc2 = new ej.pdf.PdfDocument(pdfBytes);
            // Import all pages from doc2 into doc1
            doc1.importPageRange(doc2, 0, doc2.pageCount - 1);
            // Save merged PDF
            doc1.save(outputPdfName);
            // Cleanup
            doc1.destroy();
            doc2.destroy();
        }).catch(function (err) {
            // Error handling
            console.error('Merge PDFs failed:', err);
        });
    };
    // Source PDF URL
    var templateUrl = 'https://cdn.syncfusion.com/content/pdf-resources/pdf-succinctly.pdf';
    // Output PDF name
    var outputPdfName = 'MergedPDF.pdf';
    // Helper: fetch URL and return Uint8Array
    var fetchAsUint8Array = function (url) {
        return fetch(url, { cache: 'no-cache' }).then(function (res) {
            if (!res.ok) throw new Error('Failed to fetch ' + url + ': ' + res.status + ' ' + res.statusText);
            return res.arrayBuffer();
        }).then(function (buf) {
            return new Uint8Array(buf);
        });
    };
};