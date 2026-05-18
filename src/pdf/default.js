this.default = function () {
    // Create a Syncfusion Button instance
    var button = new ejs.buttons.Button();
    // Attach the button to the DOM element with id 'successbtn'
    button.appendTo('#successbtn');
    // Execute PDF generation when the button is clicked
    button.element.onclick = function () {
        // Create a new PDF document
        var pdf = new ej.pdf.PdfDocument();
        // Define page settings with zero margins
        var settings = new ej.pdf.PdfPageSettings({
            margins: new ej.pdf.PdfMargins(0)
        });
        // Add a page using the specified settings
        var page = pdf.addPage(settings);
        // Get the graphics object for all drawing operations
        var g = page.graphics;
        // Define commonly used brushes
        var gray = new ej.pdf.PdfBrush({ r: 64, g: 64, b: 64 });
        var black = new ej.pdf.PdfBrush({ r: 0, g: 0, b: 0 });
        var white = new ej.pdf.PdfBrush({ r: 255, g: 255, b: 255 });
        var violet = new ej.pdf.PdfBrush({ r: 255, g: 153, b: 255 });
        // Define pens used for section separators
        var redPen = new ej.pdf.PdfPen({ r: 255, g: 0, b: 0 }, 2);
        var violetPen = new ej.pdf.PdfPen({ r: 148, g: 0, b: 211 }, 2);
        var greenPen = new ej.pdf.PdfPen({ r: 0, g: 128, b: 0 }, 2);
        var bluePen = new ej.pdf.PdfPen({ r: 0, g: 0, b: 255 }, 2);
        /* ================= Background ================= */
        // Draw full-page background
        g.drawRectangle(
            { x: 0, y: 0, width: g.clientSize.width, height: g.clientSize.height },
            gray
        );
        // Draw header background strip
        g.drawRectangle(
            { x: 0, y: 0, width: g.clientSize.width, height: 130 },
            black
        );
        // Draw white background area for lower content
        g.drawRectangle(
            { x: 0, y: 400, width: g.clientSize.width, height: g.clientSize.height - 450 },
            white
        );
        /* ================= Header ================= */
        // Font for the main header title
        var headerFont = pdf.embedFont(ej.pdf.PdfFontFamily.timesRoman, 35);
        // Draw the company title
        g.drawString(
            'Enterprise',
            headerFont,
            { x: 10, y: 20, width: 200, height: 50 },
            violet
        );
        // Draw highlight rectangle under the title
        g.drawRectangle({ x: 10, y: 63, width: 140, height: 35 }, violet);
        // Font for the sub-header
        var subHeaderFont = pdf.embedFont(ej.pdf.PdfFontFamily.timesRoman, 16);
        // Draw sub-title text
        g.drawString(
            'Reporting Solutions',
            subHeaderFont,
            { x: 15, y: 70, width: 200, height: 30 },
            black
        );
        /* ================= Header Bullet Points ================= */
        // Font for header bullet text
        var bodyFont = pdf.embedFont(ej.pdf.PdfFontFamily.timesRoman, 11);
        // Font used for bullet symbols
        var bulletFont = pdf.embedFont(ej.pdf.PdfFontFamily.zapfDingbats, 10);
        // Initial Y position for header bullet points
        var y = 30;
        // Draw header bullet points
        y = drawHeaderPoint(g, 'Develop cloud-ready reporting applications in as little as 20% of the time.', y);
        y = drawHeaderPoint(g, 'Proven, reliable platform thousands of users over the past 10 years.', y);
        y = drawHeaderPoint(g, 'Microsoft Excel, Word, Adobe PDF, RDL display and editing.', y);
        y = drawHeaderPoint(g, 'Why start from scratch? Rely on our dependable solution frameworks.', y);
        /* ================= Body Bullet Points ================= */
        // Add vertical spacing before body content
        y += 105;
        // Fonts for body bullet symbols and content text
        var bulletBodyFont = pdf.embedFont(ej.pdf.PdfFontFamily.zapfDingbats, 16);
        var bodyContentFont = pdf.embedFont(ej.pdf.PdfFontFamily.timesRoman, 17);
        // Draw main body bullet points
        y = drawBodyContent(g, 'Deployment-ready framework tailored to your needs.', y);
        y = drawBodyContent(g, 'Our architects and developers have years of reporting experience.', y);
        y = drawBodyContent(g, 'Solutions available for web, desktop, and mobile applications.', y);
        y = drawBodyContent(g, 'Backed by our end-to-end product maintenance infrastructure.', y);
        y = drawBodyContent(g, 'The quickest path from concept to delivery.', y);
        /* ================= Sections ================= */
        // Font for section titles
        var titleFont = pdf.embedFont(ej.pdf.PdfFontFamily.timesRoman, 20);
        // Base X and Y positions for sections
        var x = 45;
        y = 350;
        // -------- Section 1 --------
        // Draw left section divider line
        g.drawLine(redPen, { x: x, y: y + 92 }, { x: x, y: y + 145 });
        // Draw first section title
        g.drawString('The Experts', titleFont, { x: x + 10, y: y + 90, width: 250, height: 40 }, black);
        // Draw first section description
        g.drawString(
            'A substantial number of .NET reporting applications use our frameworks.',
            bodyFont,
            { x: x + 10, y: y + 115, width: 250, height: 70 },
            black
        );
        // Draw right section divider line
        g.drawLine(violetPen, { x: x + 280, y: y + 92 }, { x: x + 280, y: y + 145 });
        // Draw second section title
        g.drawString('Accurate Estimates', titleFont, { x: x + 290, y: y + 90, width: 250, height: 40 }, black);
        // Draw second section description
        g.drawString(
            'Given our expertise, you can expect estimates to be accurate.',
            bodyFont,
            { x: x + 290, y: y + 115, width: 250, height: 70 },
            black
        );
        // -------- Section 2 --------
        // Move Y position for the next row of sections
        y += 200;
        // Draw left section divider line
        g.drawLine(greenPen, { x: x, y: y + 32 }, { x: x, y: y + 85 });
        // Draw third section title
        g.drawString('Product Licensing', titleFont, { x: x + 10, y: y + 30, width: 250, height: 40 }, black);
        // Draw third section description
        g.drawString(
            'Solution packages can be combined with product licensing for great cost savings.',
            bodyFont,
            { x: x + 10, y: y + 55, width: 250, height: 80 },
            black
        );
        // Draw right section divider line
        g.drawLine(bluePen, { x: x + 280, y: y + 32 }, { x: x + 280, y: y + 85 });
        // Draw fourth section title
        g.drawString('About Syncfusion', titleFont, { x: x + 290, y: y + 30, width: 250, height: 40 }, black);
        // Draw fourth section description
        g.drawString(
            'Syncfusion has more than 7,000 customers including Fortune 100 companies.',
            bodyFont,
            { x: x + 290, y: y + 55, width: 250, height: 80 },
            black
        );
        /* ================= Footer ================= */
        // Font for footer text
        var footerFont = pdf.embedFont(
            ej.pdf.PdfFontFamily.timesRoman,
            8,
            ej.pdf.PdfFontStyle.italic
        );
        // Draw footer disclaimer text
        g.drawString(
            'All trademarks mentioned belong to their owners.',
            footerFont,
            { x: 10, y: g.clientSize.height - 30, width: 300, height: 20 },
            white
        );
        // Create a clickable website link in the footer
        var link = new ej.pdf.PdfTextWebLinkAnnotation(
            { x: g.clientSize.width - 100, y: g.clientSize.height - 30, width: 90, height: 15 },
            { r: 255, g: 255, b: 255 },
            null,
            0,
            { text: 'www.syncfusion.com', font: footerFont, url: 'http://www.syncfusion.com' }
        );
        // Add the link annotation to the page
        page.annotations.add(link);
        // Save the PDF document and release resources
        pdf.save('Sample.pdf');
        pdf.destroy();
        /* ================= Helper Functions ================= */
        // Draws a bullet point in the header section and returns updated Y position
        function drawHeaderPoint(g, text, y) {
            g.drawString('l', bulletFont, { x: 220, y: y, width: 20, height: 20 }, violet);
            g.drawString(text, bodyFont, { x: 240, y: y, width: 400, height: 50 }, white);
            return y + 15;
        }
        // Draws a body content bullet point and returns updated Y position
        function drawBodyContent(g, text, y) {
            g.drawString('3', bulletBodyFont, { x: 35, y: y, width: 20, height: 20 }, violet);
            g.drawString(text, bodyContentFont, { x: 60, y: y, width: 500, height: 60 }, white);
            return y + 25;
        }
    };
};