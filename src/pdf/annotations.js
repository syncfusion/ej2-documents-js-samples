this.default = function () {
	// Module entry: wires UI controls and exposes sample functions.
	// Exports: `createAndSavePdf()` and `flattenUploadedPdf()` are attached to `this`.
	// Expected DOM IDs: 'submit', 'file', 'flatternButton', 'checkboxFlatten'.
	// Clicking 'submit' builds a new PDF with sample annotations and downloads it.
	// 'flatternButton' flattens an uploaded PDF and downloads the flattened result.
	// Wire up UI controls: a submit button that creates a new PDF
	var submitEl = document.getElementById('submit');
	if (submitEl) {
		submitEl.addEventListener('click', function (e) { e.preventDefault(); createAndSavePdf(); });
	}

	// Flatten uploaded PDF: enable/disable the button based on file input
	var flatBtnEl = document.getElementById('flatternButton');
	if (flatBtnEl) {
		flatBtnEl.setAttribute('aria-disabled', 'true');
		flatBtnEl.addEventListener('click', function (e) { e.preventDefault(); flattenUploadedPdf(); });
	}

	// File input change handler
	var fileUpload = document.getElementById('file');
	if (fileUpload) {
		fileUpload.addEventListener('change', function () {
			var btn = document.getElementById('flatternButton');
			if (btn) {
				var enabled = !!(fileUpload.files && fileUpload.files.length > 0);
				btn.disabled = !enabled;
				btn.setAttribute('aria-disabled', (!enabled).toString());
			}
			// Update visible file name if span exists
			var fileNameDisplay = document.getElementById('fileNameDisplay');
			if (fileNameDisplay) {
				var f = fileUpload.files && fileUpload.files[0];
				fileNameDisplay.textContent = f ? f.name : 'No file chosen';
			}
		});
	}

	// Utility: ensure an on-page host for transient alert messages.
	// Creates a hidden `div#noteMessage` (role=alert) on first use.
	function ensureNoteHost() {
		var host = document.getElementById('noteMessage');
		if (!host) {
			host = document.createElement('div');
			host.id = 'noteMessage';
			host.style.display = 'none';
			host.style.color = '#b00020';
			host.style.fontWeight = '600';
			host.style.margin = '8px 0';
			host.setAttribute('role', 'alert');
			host.setAttribute('aria-live', 'assertive');
			var controlSection = document.querySelector('.control-section') || document.body;
			controlSection.insertBefore(host, controlSection.firstChild);
		}
		return host;
	}

	function showNote(msg) {
		// Display a brief alert text inside the `noteMessage` host.
		var noteEl = ensureNoteHost();
		noteEl.textContent = msg;
		noteEl.style.display = 'block';
	}

	function hideNote() {
		// Hide the transient note message (if present).
		var noteEl = document.getElementById('noteMessage');
		if (noteEl) noteEl.style.display = 'none';
	}

	function getFlattenCheckboxChecked() {
		// Read the UI checkbox controlling whether created PDFs should be flattened.
		// Supports both native inputs and EJ2 checkbox widget instances.
		var el = document.getElementById('checkboxFlatten');
		if (!el) return false;
		if ('checked' in el) return !!el.checked;
		if (el.ej2_instances && el.ej2_instances[0] && 'checked' in el.ej2_instances[0]) return !!el.ej2_instances[0].checked;
		return false;
	}

	// Primary sample: construct a PDF document, add many annotation examples,
	// and save/download the resulting file. If the "flatten" checkbox is
	// checked the sample flattens annotations before saving.
	function createAndSavePdf() {
		hideNote();
		try {
			var pdfDoc = new ej.pdf.PdfDocument();
			var page = pdfDoc.addPage();
			var font = new ej.pdf.PdfStandardFont(ej.pdf.PdfFontFamily.helvetica, 10);
			var brush = new ej.pdf.PdfBrush({ r: 0, g: 0, b: 0 });

			page.graphics.drawString('Annotation with Comments and Reviews', font, { x: 30, y: 10, width: 200, height: 30 }, brush);

			var text = 'Adventure Works Cycles, the fictitious company on which the AdventureWorks sample databases are based, is a large, multinational manufacturing company. The company manufactures and sells metal and composite bicycles to North American, European and Asian commercial markets. While its base operation is located in Washington with 290 employees, several regional sales teams are located throughout their market base.';
			page.graphics.drawString(text, font, { x: 30, y: 40, width: page.graphics.clientSize.width - 60, height: 60 }, brush);

			// Add a text markup (highlight) annotation with comment threads and review history.
			var textMarkupAnnot = new ej.pdf.PdfTextMarkupAnnotation('Highlight', { x: 147, y: 63.5, width: 258, height: 10 }, {
				author: 'Annotation', opacity: 1, subject: 'Comments and Reviews', textMarkupType: ej.pdf.PdfTextMarkupAnnotationType.highlight,
				textMarkUpColor: { r: 255, g: 255, b: 0 }, innerColor: { r: 255, g: 0, b: 0 }
			});
			textMarkupAnnot.modifiedDate = new Date(2015, 1, 18);
			textMarkupAnnot.color = { r: 255, g: 255, b: 0 };
			textMarkupAnnot.flags = ej.pdf.PdfAnnotationFlag.print;

			var userQuery = new ej.pdf.PdfPopupAnnotation({ author: 'John' });
			userQuery.text = 'Can you please change South Asian to Asian?';
			userQuery.modifiedDate = new Date(2015, 1, 18);
			textMarkupAnnot.comments.add(userQuery);

			var userAnswer = new ej.pdf.PdfPopupAnnotation({ author: 'Smith' });
			userAnswer.text = 'South Asian has changed as Asian';
			userAnswer.modifiedDate = new Date(2015, 1, 18);
			textMarkupAnnot.comments.add(userAnswer);

			var userAnswerReview = new ej.pdf.PdfPopupAnnotation({ author: 'Smith', state: ej.pdf.PdfAnnotationState.completed, stateModel: ej.pdf.PdfAnnotationStateModel.review });
			userAnswerReview.modifiedDate = new Date(2015, 1, 18);
			userAnswer.reviewHistory.add(userAnswerReview);

			var userAnswerReviewJohn = new ej.pdf.PdfPopupAnnotation({ author: 'John', state: ej.pdf.PdfAnnotationState.accepted, stateModel: ej.pdf.PdfAnnotationStateModel.review });
			userAnswerReviewJohn.modifiedDate = new Date(2015, 1, 18);
			userAnswer.reviewHistory.add(userAnswerReviewJohn);
			page.annotations.add(textMarkupAnnot);

			// Geometric annotations: circle, ellipse, square, rectangle examples follow.
			var bounds = { x: 350, y: 170, width: 80, height: 80 };
			var circleannotation = new ej.pdf.PdfCircleAnnotation(bounds, {
				innerColor: { r: 255, g: 255, b: 0 },
				color: { r: 255, g: 0, b: 0 }, author: 'Syncfusion', subject: 'CircleAnnotation'
			});
			circleannotation.modifiedDate = new Date(2015, 1, 18);
			circleannotation.flags = ej.pdf.PdfAnnotationFlag.print;
			page.annotations.add(circleannotation);
			page.graphics.drawString('Circle Annotation', font, { x: 350, y: 130, width: 250, height: 30 }, brush);

			var ellipseannotation = new ej.pdf.PdfEllipseAnnotation({ x: 30, y: 150, width: 50, height: 100 }, {
				text: 'Ellipse Annotation', color: { r: 255, g: 0, b: 0 }, innerColor: { r: 255, g: 255, b: 0 }
			});
			page.graphics.drawString('Ellipse Annotation', font, { x: 30, y: 130, width: 250, height: 30 }, brush);
			ellipseannotation.flags = ej.pdf.PdfAnnotationFlag.print;
			page.annotations.add(ellipseannotation);

			var squareannotation = new ej.pdf.PdfSquareAnnotation({ x: 30, y: 300, width: 80, height: 80 }, {
				text: 'Square Annotation', innerColor: { r: 255, g: 0, b: 0 }, color: { r: 255, g: 255, b: 0 }
			});
			page.graphics.drawString('Square Annotation', font, { x: 30, y: 280, width: 250, height: 30 }, brush);
			squareannotation.flags = ej.pdf.PdfAnnotationFlag.print;
			page.annotations.add(squareannotation);

			var rectannot = { x: 350, y: 320, width: 100, height: 50 };
			var rectangleannotation = new ej.pdf.PdfRectangleAnnotation(rectannot, {
				text: 'Rectangle Annotation', innerColor: { r: 255, g: 0, b: 0 }, color: { r: 255, g: 255, b: 0 }
			});
			page.graphics.drawString('Rectangle Annotation', font, { x: 350, y: 280, width: 100, height: 30 }, brush);
			rectangleannotation.flags = ej.pdf.PdfAnnotationFlag.print;
			page.annotations.add(rectangleannotation);

			var lineAnnotation = new ej.pdf.PdfLineAnnotation({ x: 400, y: 350 }, { x: 550, y: 350 }, {
				text: 'Line Annotation is the one of the annotation type...', author: 'Syncfusion', subject: 'LineAnnotation'
			});
			lineAnnotation.modifiedDate = new Date(2015, 1, 18);
			lineAnnotation.text = 'PdfLineAnnotation';
			lineAnnotation.color = { r: 255, g: 0, b: 0 };
			lineAnnotation.setAppearance(true);
			page.graphics.drawString('Line Annotation', font, { x: 400, y: 420, width: 100, height: 50 }, brush);
			lineAnnotation.flags = ej.pdf.PdfAnnotationFlag.print;
			page.annotations.add(lineAnnotation);

			var polygonannotation = new ej.pdf.PdfPolygonAnnotation([{ x: 50, y: 298 }, { x: 100, y: 325 }, { x: 200, y: 355 }, { x: 300, y: 230 }, { x: 180, y: 230 }], {
				text: 'Polygon Annotation', color: { r: 255, g: 0, b: 0 }, innerColor: { r: 255, g: 182, b: 193 }
			});
			polygonannotation.bounds = { x: 30, y: 210, width: 300, height: 200 };
			polygonannotation.setAppearance(true);
			page.graphics.drawString('Polygon Annotation', font, { x: 50, y: 420, width: 100, height: 30 }, brush);
			polygonannotation.flags = ej.pdf.PdfAnnotationFlag.print;
			page.annotations.add(polygonannotation);

			var freeText = new ej.pdf.PdfFreeTextAnnotation({ x: 405, y: 645, width: 80 , height: 30}, {
				textMarkUpColor: { r: 0, g: 128, b: 0 }, font: new ej.pdf.PdfStandardFont(ej.pdf.PdfFontFamily.helvetica, 7), text: 'Free Text with Callouts', borderColor: { r: 0, g: 0, b: 255 },
				border: new ej.pdf.PdfAnnotationBorder({ width: 0.5 }), calloutLines: [{ x: 365, y: 700 }, { x: 379, y: 655 }, { x: 405, y: 655 }]
			});
			freeText.color = { r: 255, g: 255, b: 0 };
			freeText.border = new ej.pdf.PdfAnnotationBorder({ width: 0.5 });
			freeText.flags = ej.pdf.PdfAnnotationFlag.print;
			freeText.setAppearance(true);
			page.graphics.drawString('FreeText Annotation', font, { x: 400, y: 610, width: 100, height: 30 }, brush);
			page.annotations.add(freeText);

			var linePoints = [
				{ x: 72.919, y: 136.376 },
				{ x: 72.264, y: 136.376 },
				{ x: 62.446, y: 142.922 },
				{ x: 61.137, y: 142.922 },
				{ x: 55.901, y: 139.649 },
				{ x: 55.246, y: 138.34 },
				{ x: 54.592, y: 132.449 },
				{ x: 54.592, y: 127.867 },
				{ x: 55.901, y: 125.904 },
				{ x: 59.828, y: 121.976 },
				{ x: 63.101, y: 121.322 },
				{ x: 65.719, y: 122.631 },
				{ x: 68.992, y: 125.249 },
				{ x: 70.301, y: 130.485 },
				{ x: 71.61, y: 133.104 },
				{ x: 72.264, y: 136.376 },
				{ x: 72.919, y: 140.304 },
				{ x: 74.883, y: 144.885 },
				{ x: 76.192, y: 150.776 },
				{ x: 76.192, y: 151.431 },
				{ x: 76.192, y: 152.085 },
				{ x: 76.192, y: 158.631 },
				{ x: 76.192, y: 159.94 },
				{ x: 75.537, y: 155.358 },
				{ x: 74.228, y: 150.122 },
				{ x: 74.228, y: 146.195 },
				{ x: 73.574, y: 141.613 },
				{ x: 73.574, y: 137.685 },
				{ x: 74.228, y: 132.449 },
				{ x: 74.883, y: 128.522 },
				{ x: 75.537, y: 124.594 },
				{ x: 76.192, y: 123.285 },
				{ x: 76.846, y: 122.631 },
				{ x: 80.774, y: 122.631 },
				{ x: 82.737, y: 123.285 },
				{ x: 85.355, y: 125.249 },
				{ x: 88.628, y: 129.831 },
				{ x: 89.283, y: 133.104 },
				{ x: 89.937, y: 137.031 },
				{ x: 90.592, y: 140.958 },
				{ x: 89.937, y: 142.267 },
				{ x: 86.665, y: 141.613 },
				{ x: 85.355, y: 140.304 },
				{ x: 84.701, y: 138.34 },
				{ x: 84.701, y: 137.685 },
				{ x: 85.355, y: 137.031 },
				{ x: 87.974, y: 135.722 },
				{ x: 90.592, y: 136.376 },
				{ x: 92.555, y: 137.031 },
				{ x: 96.483, y: 139.649 },
				{ x: 98.446, y: 140.958 },
				{ x: 101.719, y: 142.922 },
				{ x: 103.028, y: 142.922 },
				{ x: 100.41, y: 138.34 },
				{ x: 99.756, y: 134.413 },
				{ x: 99.101, y: 131.14 },
				{ x: 99.101, y: 128.522 },
				{ x: 99.756, y: 127.213 },
				{ x: 101.065, y: 125.904 },
				{ x: 102.374, y: 123.94 },
				{ x: 103.683, y: 123.94 },
				{ x: 107.61, y: 125.904 },
				{ x: 110.228, y: 129.831 },
				{ x: 114.156, y: 135.067 },
				{ x: 117.428, y: 140.304 },
				{ x: 119.392, y: 143.576 },
				{ x: 121.356, y: 144.231 },
				{ x: 122.665, y: 144.231 },
				{ x: 123.974, y: 142.267 },
				{ x: 126.592, y: 139.649 },
				{ x: 127.247, y: 140.304 },
				{ x: 126.592, y: 142.922 },
				{ x: 124.628, y: 143.576 },
				{ x: 122.01, y: 142.922 },
				{ x: 118.083, y: 141.613 },
				{ x: 114.81, y: 136.376 },
				{ x: 114.81, y: 131.14 },
				{ x: 113.501, y: 127.213 },
				{ x: 114.156, y: 125.904 },
				{ x: 118.083, y: 125.904 },
				{ x: 120.701, y: 126.558 },
				{ x: 123.319, y: 130.485 },
				{ x: 125.283, y: 136.376 },
				{ x: 125.937, y: 140.304 },
				{ x: 125.937, y: 142.922 },
				{ x: 126.592, y: 143.576 },
				{ x: 125.937, y: 135.722 },
				{ x: 125.937, y: 131.794 },
				{ x: 125.937, y: 131.14 },
				{ x: 127.247, y: 129.176 },
				{ x: 129.21, y: 127.213 },
				{ x: 131.828, y: 127.213 },
				{ x: 134.447, y: 128.522 },
				{ x: 136.41, y: 136.376 },
				{ x: 139.028, y: 150.122 },
				{ x: 141.647, y: 162.558 },
				{ x: 140.992, y: 163.213 },
				{ x: 138.374, y: 160.595 },
				{ x: 135.756, y: 153.395 },
				{ x: 135.101, y: 148.158 },
				{ x: 134.447, y: 140.304 },
				{ x: 134.447, y: 130.485 },
				{ x: 133.792, y: 124.594 },
				{ x: 133.792, y: 115.431 },
				{ x: 133.792, y: 110.194 },
				{ x: 133.792, y: 105.612 },
				{ x: 134.447, y: 105.612 },
				{ x: 137.065, y: 110.194 },
				{ x: 137.719, y: 116.74 },
				{ x: 139.028, y: 120.013 },
				{ x: 139.028, y: 123.94 },
				{ x: 137.719, y: 127.213 },
				{ x: 135.756, y: 130.485 },
				{ x: 134.447, y: 130.485 },
				{ x: 133.792, y: 130.485 },
				{ x: 137.719, y: 131.794 },
				{ x: 141.647, y: 135.722 },
				{ x: 146.883, y: 142.922 },
				{ x: 152.774, y: 153.395 },
				{ x: 153.428, y: 159.286 },
				{ x: 150.156, y: 159.94 },
				{ x: 147.537, y: 156.667 },
				{ x: 146.883, y: 148.813 },
				{ x: 146.883, y: 140.958 },
				{ x: 146.883, y: 134.413 },
				{ x: 146.883, y: 125.904 },
				{ x: 145.574, y: 118.703 },
				{ x: 145.574, y: 114.776 },
				{ x: 145.574, y: 112.158 },
				{ x: 146.228, y: 111.503 },
				{ x: 147.537, y: 111.503 },
				{ x: 148.192, y: 112.158 },
				{ x: 150.156, y: 112.812 },
				{ x: 150.81, y: 113.467 },
				{ x: 152.119, y: 114.776 },
				{ x: 154.083, y: 117.394 },
				{ x: 155.392, y: 119.358 },
				{ x: 156.701, y: 120.667 },
				{ x: 157.356, y: 121.976 },
				{ x: 156.701, y: 121.322 },
				{ x: 156.047, y: 120.013 },
				{ x: 155.392, y: 119.358 },
				{ x: 154.083, y: 117.394 },
				{ x: 154.083, y: 116.74 },
				{ x: 152.774, y: 114.776 },
				{ x: 152.119, y: 114.121 },
				{ x: 150.81, y: 113.467 },
				{ x: 149.501, y: 113.467 },
				{ x: 147.537, y: 112.158 },
				{ x: 146.883, y: 112.158 },
				{ x: 145.574, y: 111.503 },
				{ x: 144.919, y: 112.158 },
				{ x: 144.265, y: 114.121 },
				{ x: 144.265, y: 115.431 },
				{ x: 144.265, y: 116.74 },
				{ x: 144.265, y: 117.394 },
				{ x: 144.265, y: 118.049 },
				{ x: 144.919, y: 118.703 },
				{ x: 145.574, y: 120.667 },
				{ x: 146.228, y: 122.631 },
				{ x: 147.537, y: 123.285 },
				{ x: 147.537, y: 124.594 },
				{ x: 148.192, y: 125.904 },
				{ x: 147.537, y: 128.522 },
				{ x: 147.537, y: 129.176 },
				{ x: 147.537, y: 130.485 },
				{ x: 147.537, y: 132.449 },
				{ x: 147.537, y: 134.413 },
				{ x: 147.537, y: 136.376 },
				{ x: 147.537, y: 138.34 },
				{ x: 147.537, y: 138.994 },
				{ x: 145.574, y: 138.994 },
				{ x: 142.956, y: 138.252 }
			];
			var inkAnnotation = new ej.pdf.PdfInkAnnotation({ x: 30, y: 580, width: 300, height: 400 }, linePoints);
			inkAnnotation.color = { r: 255, g: 0, b: 0 };
			page.graphics.drawString('Ink Annotation', font, { x: 30, y: 610, width: 100, height: 30 }, brush);
			inkAnnotation.flags = ej.pdf.PdfAnnotationFlag.print;
			page.annotations.add(inkAnnotation);

			var secondPage = pdfDoc.addPage();

			var string1 = 'This is TextMarkup annotation!!!';
			secondPage.graphics.drawString(string1, font, { x: 30, y: 70, width: 250, height: 30 }, brush);
			var textannot = new ej.pdf.PdfTextMarkupAnnotation('Strikeout', { x: 30, y: 70, width: 140, height: 11 }, {
				author: 'Annotation', opacity: 1, subject: 'pdftextmarkupannotation', textMarkUpColor: { r: 255, g: 255, b: 0 }, textMarkupType: ej.pdf.PdfTextMarkupAnnotationType.strikeOut,
				innerColor: { r: 255, g: 0, b: 0 }
			});
			textannot.modifiedDate = new Date(2015, 1, 18);
			textannot.color = { r: 255, g: 255, b: 0 };
			secondPage.graphics.drawString('TextMarkup Annotation', font, { x: 30, y: 40, width: 250, height: 30 }, brush);
			textannot.flags = ej.pdf.PdfAnnotationFlag.print;
			secondPage.annotations.add(textannot);

			var popupRect = { x: 430, y: 70, width: 30, height: 30 };
			var popupAnnotation = new ej.pdf.PdfPopupAnnotation({ color: { r: 0, g: 128, b: 0 }, open: true });
			popupAnnotation.border.width = 4;
			popupAnnotation.border.hRadius = 20;
			popupAnnotation.border.vRadius = 30;
			popupAnnotation.opacity = 1;
			popupAnnotation.text = 'Popup Annotation';
			popupAnnotation.bounds = popupRect;
			popupAnnotation.setAppearance(true);
			secondPage.graphics.drawString('Popup Annotation', font, { x: 400, y: 40, width: 100, height: 30 }, brush);
			popupAnnotation.flags = ej.pdf.PdfAnnotationFlag.print;
			secondPage.annotations.add(popupAnnotation);

			var border = new ej.pdf.PdfAnnotationBorder({ width: 2 });
			var lineMeasureAnnot = new ej.pdf.PdfLineAnnotation({ x: 400, y: 630 }, { x: 550, y: 630 }, {
				author: 'Syncfusion', subject: 'LineAnnotation', measurementUnit: ej.pdf.PdfMeasurementUnit.inch, color: { r: 255, g: 0, b: 0 }, border: border
			});
			lineMeasureAnnot.modifiedDate = new Date(2015, 1, 18);
			lineMeasureAnnot.measure = true;
			lineMeasureAnnot.setAppearance(true);
			secondPage.graphics.drawString('Line Measurement Annotation', font, { x: 370, y: 130, width: 250, height: 50 }, brush);
			lineMeasureAnnot.flags = ej.pdf.PdfAnnotationFlag.print;
			secondPage.annotations.add(lineMeasureAnnot);

			var freeText0 = new ej.pdf.PdfFreeTextAnnotation({ x: 80, y: 160, width: 100, height: 50 }, {
				textMarkUpColor: { r: 0, g: 128, b: 0 }, font: new ej.pdf.PdfStandardFont(ej.pdf.PdfFontFamily.helvetica, 7), text: 'Free Text with Callouts', borderColor: { r: 0, g: 0, b: 255 },
				border: new ej.pdf.PdfAnnotationBorder({ width: 0.5 }), calloutLines: [{ x: 45, y: 225 }, { x: 60, y: 180 }, { x: 80, y: 180}]
			});
			freeText0.flags = ej.pdf.PdfAnnotationFlag.print;
			freeText0.rotationAngle = ej.pdf.PdfRotationAngle.angle90;
			freeText0.color = { r: 255, g: 255, b: 0 };
			freeText0.setAppearance(true);
			secondPage.graphics.drawString('Rotated FreeText Annotation', font, { x: 40, y: 130, width: 150, height: 30 }, brush);
			secondPage.annotations.add(freeText0);

			var cloudannotation = new ej.pdf.PdfRectangleAnnotation({ x: 30, y: 300, width: 100, height: 50 }, {
				text: 'Rectangle Cloud Annotation', color: { r: 255, g: 0, b: 0 }, innerColor: { r: 0, g: 0, b: 255 }, border: new ej.pdf.PdfAnnotationBorder({ width: 1 })
			});
			var bordereffect = new ej.pdf.PdfBorderEffect();
			bordereffect.intensity = 2;
			bordereffect.style = ej.pdf.PdfBorderEffectStyle.cloudy;
			cloudannotation.borderEffect = bordereffect;
			cloudannotation.border.width = 1;
			cloudannotation.setAppearance(true);
			secondPage.graphics.drawString('Rectangle Cloud Annotation', font, { x: 40, y: 260, width: 300, height: 50 }, brush);
			cloudannotation.flags = ej.pdf.PdfAnnotationFlag.print;
			secondPage.annotations.add(cloudannotation);

			var rubberStampAnnotation = new ej.pdf.PdfRubberStampAnnotation({ x: 355, y: 310, width: 150, height: 50 }, {
				text: 'Rubber Stamp Annotation', author: 'Syncfusion', color: { r: 255, g: 0, b: 0 }
			});
			rubberStampAnnotation.modifiedDate = new Date(2015, 1, 18);
			rubberStampAnnotation.flags = ej.pdf.PdfAnnotationFlag.print;
			secondPage.graphics.drawString('Rubber Stamp Annotation', font, { x: 350, y: 260, width: 200, height: 30 }, brush);
			secondPage.annotations.add(rubberStampAnnotation);

			var cloudpolypoints = [{ x: 436, y: 254 }, { x: 491, y: 324 }, { x: 461, y: 374 }, { x: 411, y: 344 }, { x: 391, y: 294 }, { x: 431, y: 264 }, { x: 436, y: 254 }];
			var polygonCloud = new ej.pdf.PdfPolygonAnnotation(cloudpolypoints, {
				text: 'Polygon Cloud Annotation', color: { r: 255, g: 0, b: 0 }, innerColor: { r: 0, g: 0, b: 255 }, border: new ej.pdf.PdfAnnotationBorder({ width: 1 })
			});
			polygonCloud.flags = ej.pdf.PdfAnnotationFlag.print;
			bordereffect.intensity = 2;
			bordereffect.style = ej.pdf.PdfBorderEffectStyle.cloudy;
			polygonCloud.borderEffect = bordereffect;
			polygonCloud.setAppearance(true);
			secondPage.graphics.drawString('Polygon Cloud Annotation', font, { x: 350, y: 390, width: 150, height: 30 }, brush);
			secondPage.annotations.add(polygonCloud);

			var redactionAnnotation2 = new ej.pdf.PdfRedactionAnnotation({ x: 40, y: 430, width: 100, height: 50 }, {
				borderColor: { r: 255, g: 0, b: 0 }, innerColor: { r: 255, g: 165, b: 0 }, textColor: { r: 0, g: 128, b: 0 }, text: 'Redaction Annotation', font: new ej.pdf.PdfStandardFont(ej.pdf.PdfFontFamily.helvetica, 13), overlayText: 'REDACTED', repeatText: true, textAlignment: ej.pdf.PdfTextAlignment.left
			});
			redactionAnnotation2.setAppearance(true);
			secondPage.graphics.drawString('Redaction Annotation', font, { x: 40, y: 390, width: 100, height: 50 }, brush);
			redactionAnnotation2.flags = ej.pdf.PdfAnnotationFlag.print;
			secondPage.annotations.add(redactionAnnotation2);

			if (getFlattenCheckboxChecked()) {
				var data = pdfDoc.save();
				var loadedDocument = new ej.pdf.PdfDocument(data);
				loadedDocument.flatten = true;
				loadedDocument.save('AnnotationFlatten.pdf');
				loadedDocument.destroy();
			} else {
				pdfDoc.save('Annotation.pdf');
				pdfDoc.destroy();
			}
		} catch (err) {
			showNote((err && err.message) || 'Error while creating annotations PDF.');
		}
	}

	// Utility to flatten an uploaded PDF file: reads the file, creates a PdfDocument
	// instance from the bytes, sets `flatten = true` and saves the flattened result.
	function flattenUploadedPdf() {
		hideNote();
		try {
			var fileEl = document.getElementById('file');
			if (!fileEl || !fileEl.files || !fileEl.files.length) {
				showNote('Please select a PDF file to flatten.');
				return;
			}
			var file = fileEl.files[0];
			var reader = new FileReader();
			reader.onload = function (e) {
				try {
					var buf = e.target.result;
					var bytes = buf instanceof Uint8Array ? buf : new Uint8Array(buf);
					var pdfDoc = new ej.pdf.PdfDocument(bytes);
					pdfDoc.flatten = true;
					pdfDoc.save('AnnotationFlatten.pdf');
					pdfDoc.destroy();
				} catch (ex) {
					showNote((ex && ex.message) || 'Error while flattening PDF.');
				}
			};
			reader.onerror = function () {
				showNote('Failed to read uploaded PDF.');
			};
			reader.readAsArrayBuffer(file);
		} catch (err) {
			showNote((err && err.message) || 'Error while flattening PDF.');
		}
	}

	// Expose functions to the sample runner environment.
	this.createAndSavePdf = createAndSavePdf;
	this.flattenUploadedPdf = flattenUploadedPdf;
};

