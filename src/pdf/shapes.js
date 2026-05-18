this.default = function () {
	// Initialize the button
	var button = new ej.buttons.Button({}, '#shapebtn');
	// Button click event handler
	button.element.onclick = function () {
		// Create new PDF document
		var doc = new ej.pdf.PdfDocument();
		// Add first page
		var page = doc.addPage();
		var g = page.graphics;
		// Embed a font for headings
		var headerFont = doc.embedFont(ej.pdf.PdfFontFamily.helvetica, 14, ej.pdf.PdfFontStyle.bold);
		// Pens and brushes
		var pen = new ej.pdf.PdfPen({ r: 165, g: 42, b: 42 }, 10); // Brown pen
		pen.lineJoin = ej.pdf.PdfLineJoin.round; // Rounded line joins
		var greenBrush = new ej.pdf.PdfBrush({ r: 0, g: 128, b: 0 });
		var blueBrush = new ej.pdf.PdfBrush({ r: 0, g: 0, b: 139 });
		// --- Polygon ---
		var polygonPoints = makeRegularPolygon(140, 140, 100, 16);
		g.drawString('Polygon', headerFont, { x: 50, y: 0, width: 100, height: 100 }, blueBrush);
		g.drawPolygon(polygonPoints, pen, greenBrush);
		// --- Pie shapes ---
		var rect = { x: 20, y: 280, width: 200, height: 200 };
		g.drawString('Pie shape', headerFont, { x: 50, y: 250, width: 100, height: 100 }, blueBrush);
		g.drawPie(rect, 180, 60, pen, greenBrush);
		g.drawPie(rect, 300, 60, pen, greenBrush);
		g.drawPie(rect, 60, 60, pen, greenBrush);
		// --- Arcs ---
		g.drawString('Arcs', headerFont, { x: 330, y: 0, width: 100, height: 100 }, blueBrush);
		rect = { x: 310, y: 40, width: 200, height: 200 };
		g.drawArc(rect, 0, 90, new ej.pdf.PdfPen({ r: 165, g: 42, b: 42 }, 11));
		g.drawArc({ x: rect.x - 10, y: rect.y, width: rect.width, height: rect.height }, 90, 90, new ej.pdf.PdfPen({ r: 0, g: 100, b: 0 }, 11));
		g.drawArc({ x: rect.x - 10, y: rect.y - 10, width: rect.width, height: rect.height }, 180, 90, new ej.pdf.PdfPen({ r: 165, g: 42, b: 42 }, 11));
		g.drawArc({ x: rect.x, y: rect.y - 10, width: rect.width, height: rect.height }, 270, 90, new ej.pdf.PdfPen({ r: 0, g: 100, b: 0 }, 11));
		// --- Simple Rectangle ---
		rect = { x: 310, y: 280, width: 200, height: 100 };
		g.drawString('Simple Rectangle', headerFont, { x: 310, y: 255, width: 150, height: 100 }, blueBrush);
		g.drawRectangle(rect, new ej.pdf.PdfPen({ r: 165, g: 42, b: 42 }, 11), greenBrush);
		// --- Shape with pagination ---
		g.drawString('Shape with pagination', headerFont, { x: 300, y: 390, width: 200, height: 100 }, blueBrush);
		var brownBrush = new ej.pdf.PdfBrush({ r: 165, g: 42, b: 42 });
		g.drawEllipse({ x: 300, y: 450, width: 160, height: 1100 }, brownBrush);
		g.drawEllipse({ x: 320, y: 480, width: 160, height: 1100 }, greenBrush);
		// Add second page for continued shapes
		var page2 = doc.addPage();
		var g2 = page2.graphics;
		g2.drawEllipse({ x: 300, y: -480, width: 160, height: 1100 }, brownBrush);
		g2.drawEllipse({ x: 320, y: -450, width: 160, height: 1100 }, greenBrush);
		// --- Transparent rectangles ---
		g2.drawString('Transparent Rectangles', headerFont, { x: 50, y: 80, width: 200, height: 100 }, blueBrush);
		var r = { x: 10, y: 150, width: 100, height: 100 };
		g2.drawRectangle(r, new ej.pdf.PdfPen({ r: 0, g: 0, b: 0 }, 1), new ej.pdf.PdfBrush({ r: 0, g: 100, b: 0 }));
		// Overlapping transparent rectangles with different alpha
		var transparencies = [
			{ offset: 20, alpha: 0.7, pen: { r: 165, g: 42, b: 42 }, brush: { r: 165, g: 42, b: 42 } },
			{ offset: 20, alpha: 0.5, pen: { r: 165, g: 42, b: 42 }, brush: { r: 0, g: 100, b: 0 } },
			{ offset: 20, alpha: 0.25, pen: { r: 0, g: 0, b: 255 }, brush: { r: 128, g: 128, b: 128 } },
			{ offset: 20, alpha: 0.1, pen: { r: 0, g: 0, b: 0 }, brush: { r: 0, g: 128, b: 0 } }
		];
		transparencies.forEach(function (t) {
			r = { x: r.x + t.offset, y: r.y + t.offset, width: r.width, height: r.height };
			g2.setTransparency(t.alpha);
			g2.drawRectangle(r, new ej.pdf.PdfPen(t.pen, 1), new ej.pdf.PdfBrush(t.brush));
		});
		// Save PDF and cleanup
		doc.save('Shapes.pdf');
		doc.destroy();
	};
	// Helper: Create points for a regular polygon
	function makeRegularPolygon(cx, cy, r, pointNum) {
		var pts = [];
		var step = (2 * Math.PI) / pointNum;
		for (var i = 0; i < pointNum; i++) {
			var theta = i * step;
			pts.push({ x: Math.cos(theta) * r + cx, y: Math.sin(theta) * r + cy });
		}
		return pts;
	}
};