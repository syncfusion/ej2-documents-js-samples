var DEFAULT_PDF_NAME = 'pdf-succinctly.pdf';
var DEFAULT_PDF_URL = 'https://cdn.syncfusion.com/content/pdf-resources/pdf-succinctly.pdf';
this.default = function () {
  // Initialize Split button
  var splitBtnSf = new ej.buttons.Button({}, '#splitBtn');
  // Main function to split PDF
  function splitPdf() {
    getInputPdfBytes().then(function (bytes) {
      var pdf = new ej.pdf.PdfDocument(bytes);
      pdf.splitEvent = function (_sender, args) {
        var part = new ej.pdf.PdfDocument(args.pdfData);
        part.save('SplittedDoc_' + (args.index + 1) + '.pdf');
        part.destroy();
      };
      var total = pdf.pageCount || 0;
      if (total <= 0) {
        pdf.destroy();
        alert('The input PDF has no pages.');
        return;
      }
      var fixedRangeRadio = document.getElementById('fixedRange');
      var fileCountRadio = document.getElementById('fileCount');
      var pageCountRadio = document.getElementById('pageCount');
      if (fixedRangeRadio && fixedRangeRadio.checked) {
        var controlInt = function (id, fallback) {
          var el = document.getElementById(id);
          if (!el) return parseInt(fallback || '1', 10);
          var inst = el.ej2_instances && el.ej2_instances[0];
          var val = inst && typeof inst.value !== 'undefined' ? String(inst.value) : (el.value || fallback || '1');
          return parseInt(val, 10);
        };
        var from = controlInt('fromPage', '1');
        var to = controlInt('toPage', '1');
        if (isNaN(from) || isNaN(to) || from < 1 || to < from || to > total) {
          alert('Please enter a valid page range between 1 and ' + total + '.');
          pdf.destroy();
          return;
        }
        pdf.splitByPageRanges([[from - 1, to - 1]]);
      } else if (fileCountRadio && fileCountRadio.checked) {
        var nEl = document.getElementById('fileCountInput');
        var n = Math.max(1, (function () {
          if (!nEl) return 2;
          var inst = nEl.ej2_instances && nEl.ej2_instances[0];
          var val = inst && typeof inst.value !== 'undefined' ? String(inst.value) : (nEl.value || '2');
          return parseInt(val, 10) || 2;
        })());
        pdf.splitByPageRanges(buildRangesForFileCount(total, n));
      } else if (pageCountRadio && pageCountRadio.checked) {
        var pEl = document.getElementById('pagesPerFileInput');
        var per = Math.max(1, (function () {
          if (!pEl) return 1;
          var inst = pEl.ej2_instances && pEl.ej2_instances[0];
          var val = inst && typeof inst.value !== 'undefined' ? String(inst.value) : (pEl.value || '1');
          return parseInt(val, 10) || 1;
        })());
        pdf.splitByFixedNumber(per);
      }
      pdf.destroy();
    }).catch(function (err) {
      console.error(err);
      alert(err && err.message ? err.message : 'Failed to split PDF.');
    });
  }
  // Handle file input
  var fileInput = document.getElementById('fileUpload');
  var fileNameSpan = document.getElementById('fileName');
  if (fileNameSpan) fileNameSpan.textContent = DEFAULT_PDF_NAME;
  if (fileInput) {
    fileInput.addEventListener('change', function () {
      fileNameSpan.textContent =
        (fileInput.files && fileInput.files[0] && fileInput.files[0].name) || DEFAULT_PDF_NAME;
    });
  }
  // Initialize NumericTextBox controls (if EJ2 inputs are available)
  var elFrom = document.getElementById('fromPage');
  var elTo = document.getElementById('toPage');
  var elFileCount = document.getElementById('fileCountInput');
  var elPagesPer = document.getElementById('pagesPerFileInput');
  try {
    new ej.inputs.NumericTextBox({ min: 1, value: elFrom ? parseInt(elFrom.value || '1', 10) : 1, format: 'n0', width: '120px', showSpinButton: true }, '#fromPage');
    new ej.inputs.NumericTextBox({ min: 1, value: elTo ? parseInt(elTo.value || '1', 10) : 1, format: 'n0', width: '120px', showSpinButton: true }, '#toPage');
    new ej.inputs.NumericTextBox({ min: 1, value: elFileCount ? parseInt(elFileCount.value || '2', 10) : 2, format: 'n0', width: '120px', showSpinButton: true }, '#fileCountInput');
    new ej.inputs.NumericTextBox({ min: 1, value: elPagesPer ? parseInt(elPagesPer.value || '1', 10) : 1, format: 'n0', width: '120px', showSpinButton: true }, '#pagesPerFileInput');
  } catch (e) {
    // EJ2 not available or elements missing — ignore
  }
  function updateVisibility() {
    var selectedInput = document.querySelector('input[name="splitOption"]:checked');
    var selected = selectedInput ? selectedInput.value : null;
    var rangeSection = document.getElementById('rangeSection');
    var fileCountSection = document.getElementById('fileCountSection');
    var pageCountSection = document.getElementById('pageCountSection');
    if (rangeSection) rangeSection.style.display = selected === 'fixed' ? 'block' : 'none';
    if (fileCountSection) fileCountSection.style.display = selected === 'fileCount' ? 'block' : 'none';
    if (pageCountSection) pageCountSection.style.display = selected === 'pageCount' ? 'block' : 'none';
  }
  var splitOptions = document.querySelectorAll('input[name="splitOption"]');
  for (var i = 0; i < splitOptions.length; i++) {
    splitOptions[i].addEventListener('change', updateVisibility);
  }
  updateVisibility();
  splitBtnSf.element.onclick = splitPdf;
  function getInputPdfBytes() {
    return new Promise(function (resolve, reject) {
      var chosen = fileInput && fileInput.files && fileInput.files[0];
      if (chosen) {
        var reader = new FileReader();
        reader.onload = function (e) {
          resolve(new Uint8Array(e.target.result));
        };
        reader.onerror = function (e) {
          reject(new Error('Failed to read uploaded file'));
        };
        reader.readAsArrayBuffer(chosen);
      } else {
        fetch(DEFAULT_PDF_URL, { cache: 'no-cache' })
          .then(function (res) {
            if (!res.ok) throw new Error('Failed to fetch default PDF: ' + res.status + ' ' + res.statusText);
            return res.arrayBuffer();
          })
          .then(function (buf) {
            resolve(new Uint8Array(buf));
          })
          .catch(function (err) {
            reject(err);
          });
      }
    });
  }
  function buildRangesForFileCount(totalPages, numberOfFiles) {
    var ranges = [];
    var per = Math.ceil(totalPages / Math.max(1, numberOfFiles));
    var start = 0;
    while (start < totalPages) {
      var end = Math.min(start + per - 1, totalPages - 1);
      ranges.push([start, end]);
      start = end + 1;
    }
    return ranges;
  }
};