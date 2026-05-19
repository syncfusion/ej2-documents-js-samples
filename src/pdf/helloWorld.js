this.default = function () {
    var button = new ej.buttons.Button();
    button.appendTo('#hellowbtn');
    button.element.onclick = function () {
        // Create a new PDF document
        var pdf = new ej.pdf.PdfDocument();
        // Add a new page
        var page = pdf.addPage();
        // Access graphics of the page
        var graphics = page.graphics;
        // Create a PDF standard font
        var font = pdf.embedFont(
            ej.pdf.PdfFontFamily.helvetica,
            36,
            ej.pdf.PdfFontStyle.regular
        );
        // Create a black brush
        var brush = new ej.pdf.PdfBrush({ r: 0, g: 0, b: 0 });
        // Draw the text
        graphics.drawString(
            'Hello World!!!',
            font,
            {
                x: 20,
                y: 20,
                width: graphics.clientSize.width - 20,
                height: 60
            },
            brush
        );
        // Save and download PDF
        pdf.save('Sample.pdf');
        // Destroy the document
        pdf.destroy();
    };
};