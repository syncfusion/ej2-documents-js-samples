this.default = function () {
    var generateBtn = new ej.buttons.Button();
    generateBtn.appendTo('#generatebtn');
    generateBtn.element.onclick = function () {
        // Fetch JPEG and PNG images as byte arrays
        Promise.all([fetchAsUint8Array(jpeg), fetchAsUint8Array(png)])
            .then(function (results) {
                var jpgBytes = results[0];
                var pngBytes = results[1];
                // Create a new PDF document and add a page
                var document = new ej.pdf.PdfDocument();
                var page = document.addPage();
                var g = page.graphics;
                // Embed bold Helvetica font for headings
                var font = document.embedFont(ej.pdf.PdfFontFamily.helvetica, 12, ej.pdf.PdfFontStyle.bold);
                var blueBrush = new ej.pdf.PdfBrush({ r: 0, g: 0, b: 255 });
                // Draw JPEG heading and image
                g.drawString('JPEG Image', font, { x: 0, y: 40, width: 100, height: 100 }, blueBrush);
                var jpgImage = new ej.pdf.PdfBitmap(jpgBytes);
                g.drawImage(jpgImage, { x: 0, y: 70, width: 515, height: 215 });
                // Draw PNG heading and image
                g.drawString('PNG Image', font, { x: 0, y: 355, width: 100, height: 100 }, blueBrush);
                var pngImage = new ej.pdf.PdfBitmap(pngBytes);
                g.drawImage(pngImage, { x: 0, y: 365, width: 199, height: 300 });
                // Save and download PDF
                document.save(outpt);
                document.destroy();
            })
            .catch(function (err) {
                console.error('Generate PDF failed:', err);
            });
    };
};
var jpeg = 'https://cdn.syncfusion.com/content/pdf-resources/xamarin-jpeg.jpg';
var png = 'https://cdn.syncfusion.com/content/pdf-resources/xamarin-png.png';
var outpt = 'Images.pdf';
// Fetch URL and return as Uint8Array
function fetchAsUint8Array(url) {
    return fetch(url, { cache: 'no-cache' })
        .then(function (res) {
            if (!res.ok) throw new Error('Failed to fetch ' + url + ': ' + res.status + ' ' + res.statusText);
            return res.arrayBuffer();
        })
        .then(function (buf) {
            return new Uint8Array(buf);
        });
}