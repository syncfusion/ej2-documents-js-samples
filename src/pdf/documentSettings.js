this.default = function () {
  // Initialize the button
  var btn = new ej.buttons.Button({}, '#documentbtn');

  // Button click handler
  btn.element.onclick = function () {

    // Create a new PDF document
    var pdf = new ej.pdf.PdfDocument();

    // Set PDF document properties (metadata)
    var now = new Date();
    pdf.setDocumentInformation({
      author: 'Syncfusion',
      creationDate: now,
      modificationDate: now,
      creator: 'Essential PDF',
      keywords: 'PDF',
      subject: 'Document information DEMO',
      title: 'Syncfusion JavaScript PDF Library Example',
      producer: 'Syncfusion PDF'
    });

    // Add a page and get graphics object
    var page = pdf.addPage();
    var g = page.graphics;

    // Embed required fonts
    var boldFont = pdf.embedFont(
      ej.pdf.PdfFontFamily.helvetica,
      12,
      ej.pdf.PdfFontStyle.bold
    );
    var regularFont = pdf.embedFont(
      ej.pdf.PdfFontFamily.helvetica,
      10,
      ej.pdf.PdfFontStyle.regular
    );

    // Text color
    var black = new ej.pdf.PdfBrush({ r: 0, g: 0, b: 0 });

    // Draw heading text
    g.drawString(
      'Document Properties',
      boldFont,
      { x: 10, y: 10, width: 520, height: 20 },
      black
    );

    // Format date for display
    var formattedDate = now.toLocaleString('en-US', {
      month: 'numeric',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      hour12: true
    });

    // Helper function to draw text line-by-line
    var y = 50;
    function drawLine(text) {
      g.drawString(
        text,
        regularFont,
        { x: 10, y: y, width: 520, height: 16 },
        black
      );
      y += 20;
    }

    // Show document details in PDF
    drawLine('Title: Syncfusion JavaScript PDF Library Example');
    drawLine('Author: Syncfusion');
    drawLine('Subject: Document information DEMO');
    drawLine('Keywords: PDF');
    drawLine('Created: ' + formattedDate);
    drawLine('Modified: ' + formattedDate);
    drawLine('Application: Essential PDF');

    // Save and download the PDF
    pdf.save('DocPropertiesAndXml.pdf');

    // Dispose document instance
    pdf.destroy();
  };
};