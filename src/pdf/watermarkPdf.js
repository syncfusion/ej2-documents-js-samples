// Default PDF file name and URL
var defaultPdfName = 'http-succinctly.pdf';
var input1 = 'https://cdn.syncfusion.com/content/pdf-resources/http-succintly.pdf';
// Default watermark text and transparency
var defaultStampText = 'Created using Syncfusion PDF library';
var defaultTransparency = 0.25;
this.default = function () {
  // Initialize the watermark button using Syncfusion Button
  var watermarkBtn = new ej.buttons.Button({}, '#watermarkBtn');
  // Initialize TextBox for stamp text
  try {
    new ej.inputs.TextBox({ placeholder: 'Created using Syncfusion PDF library', width: '420px', showClearButton: true }, '#stampText');
  } catch (e) { }
  // Main function to create a watermarked PDF
  function createWatermarkedPdf() {
    // First, read UI values (PDF file, image file, text, transparency, etc.)
    return readUIValuesPromise().then(function (values) {
      var userPdf = values.userPdf;
      var userImg = values.userImg;
      var stampText = values.stampText;
      var transparency = values.transparency;
      var useImage = values.useImage;
      // Update displayed PDF file name
      var pdfNameEl = document.getElementById('pdfFileName');
      if (pdfNameEl) pdfNameEl.textContent = userPdf ? userPdf.name : defaultPdfName;
      // Load PDF bytes from user-uploaded file or default PDF
      return getPdfBytesOrDefault(userPdf).then(function (pdfBytes) {
        var pdf = new ej.pdf.PdfDocument(pdfBytes);
        // Setup watermark font, adjusting size if text is too long
        var maxWidth = 600;
        var font = pdf.embedFont(ej.pdf.PdfFontFamily.helvetica, 36, ej.pdf.PdfFontStyle.regular);
        var textSize = font.measureString(stampText);
        // Reduce font size until text fits maxWidth
        while (textSize.width > maxWidth && font.size > 6) {
          font = pdf.embedFont(ej.pdf.PdfFontFamily.helvetica, font.size - 1, ej.pdf.PdfFontStyle.regular);
          textSize = font.measureString(stampText);
        }
        var pageCount = pdf.pageCount || 0;
        // --- Apply text watermark ---
        if (stampText && stampText.trim()) {
          for (var i = 0; i < pageCount; i++) {
            var page = pdf.getPage(i);
            var g = page.graphics;
            g.save(); // Save current graphics state
            g.setTransparency(transparency); // Apply transparency
            var width = g.clientSize.width;
            var height = g.clientSize.height;
            // Rotate watermark text at -45 degrees and center it
            g.translateTransform({ x: width / 2, y: height / 2 });
            g.rotateTransform(-45);
            var brush = new ej.pdf.PdfBrush({ r: 255, g: 0, b: 0 }); // Red brush
            g.drawString(
              stampText,
              font,
              { x: -(textSize.width / 2), y: -(textSize.height / 2), width: width, height: height },
              brush
            );
            g.restore(); // Restore graphics state
          }
        }
        // --- Apply image watermark if user selected ---
        if (useImage && userImg) {
          return getImageBytes(userImg).then(function (imageBytes) {
            var bmp = new ej.pdf.PdfBitmap(imageBytes);
            // Draw image watermark on every page
            for (var j = 0; j < pageCount; j++) {
              var page2 = pdf.getPage(j);
              var g2 = page2.graphics;
              g2.setTransparency(transparency); // Set transparency for image
              var w = g2.clientSize.width;
              var h = g2.clientSize.height;
              g2.drawImage(bmp, { x: 0, y: 0, width: w, height: h });
            }
            // Save the watermarked PDF
            pdf.save('Watermarked.pdf');
            pdf.destroy();
          });
        } else {
          // Save PDF if only text watermark is applied
          pdf.save('Watermarked.pdf');
          pdf.destroy();
          return Promise.resolve();
        }
      });
    }).catch(function (err) {
      console.error(err);
      showAlert('Failed to process the PDF. See console for details.');
    });
  }
  // ---------------------- UI ELEMENT SETUP ----------------------
  var pdfFileEl = document.getElementById('pdfFile');
  var pdfNameEl = document.getElementById('pdfFileName');
  var useImageEl = document.getElementById('useImage');
  var imageRow = document.getElementById('imageRow');
  var imgFileEl = document.getElementById('imgFile');
  var imgNameEl = document.getElementById('imgFileName');
  // Initialize transparency DropDownList (use existing select options if present)
  var transparencyEl = document.getElementById('transparency');
  try {
    if (transparencyEl && transparencyEl.options && transparencyEl.options.length) {
      new ej.dropdowns.DropDownList({ value: (transparencyEl.value || '25'), width: '120px' }, '#transparency');
    } else {
      new ej.dropdowns.DropDownList({
        dataSource: [{ text: '25', value: '25' }, { text: '50', value: '50' }, { text: '75', value: '75' }, { text: '100', value: '100' }],
        fields: { text: 'text', value: 'value' },
        placeholder: 'Select',
        width: '120px'
      }, '#transparency');
    }
  } catch (e) { }
  // Initialize UI text
  if (pdfNameEl) pdfNameEl.textContent = defaultPdfName;
  if (imgNameEl) imgNameEl.textContent = 'No file chosen';
  // Display selected PDF file name
  if (pdfFileEl && pdfNameEl) {
    pdfFileEl.addEventListener('change', function () {
      var f = pdfFileEl.files && pdfFileEl.files[0];
      pdfNameEl.textContent = f ? f.name : defaultPdfName;
    });
  }
  // Show/hide image row based on checkbox
  if (useImageEl && imageRow) {
    useImageEl.addEventListener('change', function () {
      imageRow.style.display = useImageEl.checked ? 'flex' : 'none';
    });
  }
  // Display selected image file name
  if (imgFileEl && imgNameEl) {
    imgFileEl.addEventListener('change', function () {
      var f = imgFileEl.files && imgFileEl.files[0];
      imgNameEl.textContent = f ? f.name : 'No file chosen';
    });
  }
  // ---------------------- HELPER FUNCTIONS ----------------------
  // Read all UI values and return a promise for consistency with ES5
  function readUIValuesPromise() {
    function controlValue(el, fallback) {
      if (!el) return fallback;
      var inst = el.ej2_instances && el.ej2_instances[0];
      if (inst && typeof inst.value !== 'undefined') return String(inst.value || fallback);
      return (el.value || fallback);
    }
    var stampEl = document.getElementById('stampText');
    var transEl = document.getElementById('transparency');
    return Promise.resolve({
      userPdf: pdfFileEl && pdfFileEl.files && pdfFileEl.files[0] || null,
      userImg: imgFileEl && imgFileEl.files && imgFileEl.files[0] || null,
      stampText: (controlValue(stampEl, defaultStampText) || defaultStampText).trim(),
      transparency: (parseFloat(controlValue(transEl, '')) || (defaultTransparency * 100)) / 100 || defaultTransparency,
      useImage: !!(useImageEl && useImageEl.checked)
    });
  }
  // Show error/alert message
  function showAlert(msg) {
    var alertArea = document.getElementById('alertArea');
    if (!alertArea) return;
    alertArea.textContent = msg;
    alertArea.style.display = 'block';
  }
  // Clear alert messages
  function clearAlert() {
    var alertArea = document.getElementById('alertArea');
    if (!alertArea) return;
    alertArea.textContent = '';
    alertArea.style.display = 'none';
  }
  // Button click handler
  function onClickWatermarkBtn() {
    clearAlert();
    readUIValuesPromise().then(function (values) {
      if (values.useImage && !values.userImg) {
        showAlert('Please select a valid image file to add an image watermark.');
        return;
      }
      if (!values.useImage && (!values.stampText || !values.stampText.trim())) {
        showAlert('Please enter stamping text or enable image watermark.');
        return;
      }
      createWatermarkedPdf();
    });
  }
  // Load PDF bytes from uploaded file or default PDF URL
  function getPdfBytesOrDefault(userPdf) {
    return new Promise(function (resolve, reject) {
      if (userPdf) {
        var reader = new FileReader();
        reader.onload = function (e) {
          var bytes = new Uint8Array(e.target.result);
          var head = new TextDecoder('ascii').decode(bytes.slice(0, 5));
          if (head !== '%PDF-') reject(new Error('Selected file is not a valid PDF.'));
          else resolve(bytes);
        };
        reader.onerror = function () {
          reject(new Error('Failed to read uploaded PDF.'));
        };
        reader.readAsArrayBuffer(userPdf);
      } else {
        fetch(input1).then(function (res) {
          if (!res.ok) throw new Error('Failed to fetch default PDF: ' + res.status + ' ' + res.statusText);
          return res.arrayBuffer();
        }).then(function (buf) {
          var bytes2 = new Uint8Array(buf);
          var head2 = new TextDecoder('ascii').decode(bytes2.slice(0, 5));
          if (head2 !== '%PDF-') reject(new Error('Default PDF is not valid.'));
          else resolve(bytes2);
        }).catch(reject);
      }
    });
  }
  // Load image bytes from uploaded image
  function getImageBytes(userImg) {
    return new Promise(function (resolve, reject) {
      var reader = new FileReader();
      reader.onload = function (e) {
        resolve(new Uint8Array(e.target.result));
      };
      reader.onerror = function () {
        reject(new Error('Failed to read image.'));
      };
      reader.readAsArrayBuffer(userImg);
    });
  }
  // Assign click handler to watermark button
  watermarkBtn.element.onclick = onClickWatermarkBtn;
  this.onClickWatermarkBtn = onClickWatermarkBtn;
};