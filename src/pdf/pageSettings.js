this.default = function () {
    // Initialize buttons
    var button = new ejs.buttons.Button();
    button.appendTo('#normalbtn');
    button.element.onclick = createPdf;
    new ej.buttons.Button({}, '#addPage');
    // Initialize dropdowns (use existing <select> options if present)
    function optionsFromSelect(id) {
        var el = document.getElementById(id);
        if (!el) return [];
        var opts = [];
        for (var i = 0; i < el.options.length; i++) opts.push(el.options[i].text);
        return opts;
    }
    var psOptions = optionsFromSelect('ps');
    var poOptions = optionsFromSelect('po');
    var pmOptions = optionsFromSelect('pm');
    var prOptions = optionsFromSelect('pr');
    var psConfig = { value: (document.getElementById('ps') || {}).value || 'A4', width: '220px' };
    if (!psOptions.length) psConfig.dataSource = ['Letter', 'Legal', 'A3', 'A4', 'A5', 'B4', 'B5'];
    var psDrop = new ej.dropdowns.DropDownList(psConfig);
    psDrop.appendTo('#ps');
    var poConfig = { value: (document.getElementById('po') || {}).value || 'Portrait', width: '220px' };
    if (!poOptions.length) poConfig.dataSource = ['Portrait', 'Landscape'];
    var poDrop = new ej.dropdowns.DropDownList(poConfig);
    poDrop.appendTo('#po');
    var pmConfig = { value: (document.getElementById('pm') || {}).value || 'No margin', width: '220px' };
    if (!pmOptions.length) pmConfig.dataSource = ['No margin', 'Large', 'Small'];
    var pmDrop = new ej.dropdowns.DropDownList(pmConfig);
    pmDrop.appendTo('#pm');
    var prConfig = { value: (document.getElementById('pr') || {}).value || '0', width: '220px' };
    if (!prOptions.length) prConfig.dataSource = ['0', '90', '180', '270'];
    var prDrop = new ej.dropdowns.DropDownList(prConfig);
    prDrop.appendTo('#pr');
    // Main PDF creation function
    function createPdf() {
        // Read values from UI controls
        var ui = readUI();
        // Configure page settings
        var settings = new ej.pdf.PdfPageSettings();
        var size = getPageSize(ui.ps);
        settings.size = size;
        settings.orientation =
            ui.po === 'Portrait' ? ej.pdf.PdfPageOrientation.portrait : ej.pdf.PdfPageOrientation.landscape;
        settings.rotation = getRotationAngle(String(ui.pr));
        settings.margins = new ej.pdf.PdfMargins(getMargin(ui.pm));
        // Create PDF document
        var pdf = new ej.pdf.PdfDocument();
        // Drawing resources
        var pen = new ej.pdf.PdfPen({ r: 0, g: 0, b: 0 }, 6);
        var lightGreenBrush = new ej.pdf.PdfBrush({ r: 144, g: 238, b: 144 });
        var textBrush = new ej.pdf.PdfBrush({ r: 0, g: 0, b: 0 });
        var footerFont = pdf.embedFont(
            ej.pdf.PdfFontFamily.helvetica,
            16,
            ej.pdf.PdfFontStyle.regular
        );
        // Add required number of pages
        for (var i = 0; i < ui.pageCount; i++) {
            var page = pdf.addPage(settings);
            var g = page.graphics;
            var client = g.clientSize;
            // Draw page background
            g.drawRectangle(
                { x: 0, y: 0, width: client.width, height: client.height },
                lightGreenBrush
            );
            // Draw a horizontal line near the top
            g.drawLine(
                pen,
                { x: 0, y: 100 },
                { x: Math.min(300, client.width), y: 100 }
            );
            // Draw footer with page number
            var footerText = 'Page ' + (i + 1) + ' of ' + ui.pageCount;
            g.drawString(
                footerText,
                footerFont,
                {
                    x: client.width - 150,
                    y: client.height - 40,
                    width: 140,
                    height: 30
                },
                textBrush
            );
        }
        // Save and clean up
        pdf.save('PageSettings.pdf');
        pdf.destroy();
    }
    // Increase page count on Add Page button click
    var addButton = document.getElementById('addPage');
    var pageCountEl = document.getElementById('pageCount');
    if (addButton && pageCountEl) {
        addButton.addEventListener('click', function () {
            var current = parseInt(pageCountEl.value || '1', 10);
            pageCountEl.value = String(Math.max(1, current + 1));
        });
    }
    // Expose createPdf to UI
    this.createPdf = createPdf;
    // Resolve page size based on selection
    function getPageSize(name) {
        var PAGE_SIZES = {
            Letter: { width: 612, height: 792 },
            Legal: { width: 612, height: 1008 },
            A3: { width: 842, height: 1191 },
            A4: { width: 595, height: 842 },
            A5: { width: 420, height: 595 },
            B4: { width: 729, height: 1032 },
            B5: { width: 516, height: 729 }
        };
        var key = (name || '').trim();
        return PAGE_SIZES[key] || PAGE_SIZES.A4;
    }
    // Resolve margin size
    function getMargin(name) {
        var key = (name || '').trim();
        if (key === 'Small') return 20;
        if (key === 'Large') return 40;
        return 0;
    }
    // Resolve rotation angle
    function getRotationAngle(deg) {
        switch ((deg || '').trim()) {
            case '90':
                return ej.pdf.PdfRotationAngle.angle90;
            case '180':
                return ej.pdf.PdfRotationAngle.angle180;
            case '270':
                return ej.pdf.PdfRotationAngle.angle270;
            default:
                return ej.pdf.PdfRotationAngle.angle0;
        }
    }
    // Read all UI inputs safely (supports EJ2 dropdown instances)
    function readUI() {
        function controlValue(id, fallback) {
            var el = document.getElementById(id);
            if (!el) return fallback;
            var inst = el.ej2_instances && el.ej2_instances[0];
            if (inst && typeof inst.value !== 'undefined') {
                return String(inst.value || fallback);
            }
            return (el.value || fallback);
        }
        var ps = controlValue('ps', 'A4');
        var po = controlValue('po', 'Portrait');
        var pm = controlValue('pm', 'No margin');
        var pr = controlValue('pr', '0');
        var pageCount = parseInt((document.getElementById('pageCount') || {}).value || '1', 10);
        return { ps: ps, po: po, pm: pm, pr: pr, pageCount: Math.max(1, pageCount || 1) };
    }
};