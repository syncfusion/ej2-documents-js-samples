this.default = function () {
    var data = [{
        'FileName': 'Pdf Succinctly.pdf',
        'Document': 'https://cdn.syncfusion.com/content/pdf/pdf-succinctly.pdf',
        'Author': 'Ryan Hodson',
    },
    {
        'FileName': 'Hive Succinctly.pdf',
        'Document': 'https://cdn.syncfusion.com/content/pdf/hive-succinctly.pdf',
        'Author': 'Elton Stoneman',
    },
    {
        'FileName': 'GIS Succinctly.pdf',
        'Document': 'https://cdn.syncfusion.com/content/pdf/gis-succinctly.pdf',
        'Author': 'Peter Shaw',
    },
    {
        'FileName': 'JavaScript Succinctly.pdf',
        'Document': 'https://cdn.syncfusion.com/content/pdf/Javascript-succinctly.pdf',
        'Author': 'Cody Lindley',
    },
    {
        'FileName': 'HTTP Succinctly.pdf',
        'Document': 'https://cdn.syncfusion.com/content/pdf/http-succinctly.pdf',
        'Author': 'Scott Allen',
    }];

    var dialogObj = new ej.popups.Dialog({
        header: '',
        animationSettings: { effect: 'None' },
        showCloseIcon: true,
        width: '90%',
        height: '90%',
        visible: false,
        isModal: true,
        enableResize: true,
        position: { X: 'center', Y: 'center' }
    });
    dialogObj.appendTo('#defaultDialog');
    var mode;
    function documentLoaded(){
        if (mode === 'View') {
            viewer.enablePageOrganizer = false;
        }
        else {
            viewer.enablePageOrganizer = true;
        }
    }
    var commandClick = function (args) {
        mode = args.mode;
        dialogObj.header = args.FileName;
        if (mode === 'View') {
            viewer.enableStickyNotesAnnotation = false;
            viewer.enableAnnotationToolbar = false;
            viewer.isFormDesignerToolbarVisible = false;
            viewer.toolbarSettings = {
                showTooltip: true,
                toolbarItems: [
                    'OpenOption',
                    'PageNavigationTool',
                    'MagnificationTool',
                    'PanTool',
                    'PrintOption',
                ],
            };
            viewer.annotationSettings = {
                isLock: true, author: 'Guest',
            };
            viewer.textFieldSettings = {
                isReadOnly: true,
            };
            viewer.radioButtonFieldSettings = {
                isReadOnly: true,
            };
            viewer.DropdownFieldSettings = {
                isReadOnly: true,
            };
            viewer.checkBoxFieldSettings = {
                isReadOnly: true,
            };
            viewer.signatureFieldSettings = {
                isReadOnly: true,
            };
            viewer.initialFieldSettings = {
                isReadOnly: true,
            };
            viewer.listBoxFieldSettings = {
                isReadOnly: true,
            };
            viewer.passwordFieldSettings = {
                isReadOnly: true,
            };
            viewer.contextMenuOption = 'None';
        } else {
            viewer.enableStickyNotesAnnotation = true;
            viewer.enableAnnotationToolbar = true;
            viewer.toolbarSettings = {
                showTooltip: true,
                toolbarItems: ['OpenOption', 'UndoRedoTool', 'PageNavigationTool', 'MagnificationTool',
                    'PanTool', 'SelectionTool', 'CommentTool', 'SubmitForm', 'AnnotationEditTool',
                    'FormDesignerEditTool', 'SearchOption', 'PrintOption', 'DownloadOption'],
                annotationToolbarItems: ['HighlightTool', 'UnderlineTool', 'StrikethroughTool', 'SquigglyTool',
                    'ColorEditTool', 'OpacityEditTool', 'AnnotationDeleteTool', 'StampAnnotationTool',
                    'HandWrittenSignatureTool', 'InkAnnotationTool', 'ShapeTool', 'CalibrateTool',
                    'StrokeColorEditTool', 'ThicknessEditTool', 'FreeTextAnnotationTool', 'FontFamilyAnnotationTool',
                    'FontSizeAnnotationTool', 'FontStylesAnnotationTool', 'FontAlignAnnotationTool',
                    'FontColorAnnotationTool', 'CommentPanelTool'],
                formDesignerToolbarItems: ['TextboxTool', 'PasswordTool', 'CheckBoxTool',
                    'RadioButtonTool', 'DropdownTool', 'ListboxTool', 'DrawSignatureTool', 'DeleteTool']
            };
            viewer.annotationSettings = {
                isLock: false, author: 'Guest',
            };
            viewer.textFieldSettings = {
                isReadOnly: false,
            };
            viewer.radioButtonFieldSettings = {
                isReadOnly: false,
            };
            viewer.DropdownFieldSettings = {
                isReadOnly: false,
            };
            viewer.checkBoxFieldSettings = {
                isReadOnly: false,
            };
            viewer.signatureFieldSettings = {
                isReadOnly: false,
            };
            viewer.initialFieldSettings = {
                isReadOnly: false,
            };
            viewer.listBoxFieldSettings = {
                isReadOnly: false,
            };
            viewer.passwordFieldSettings = {
                isReadOnly: false,
            };
            viewer.contextMenuOption = 'RightClick';
        }
        dialogObj.show();
        viewer.dataBind();
        viewer.load(args.Document,null);
    };

    function createTableHeader() {
        var thead = document.createElement('thead');
        var tr = document.createElement('tr');
        
        var headerCells = ['File Name', 'Author', 'Actions'];
        headerCells.forEach(function(headerText) {
            var th = document.createElement('th');
            th.setAttribute('scope', 'col');
            th.textContent = headerText;
            if (headerText === 'Actions') {
                th.classList.add('e-pv-table-actions-header');
            }
            tr.appendChild(th);
        });
        
        thead.appendChild(tr);
        return thead;
    }

    function createIconSpan(iconClass) {
        var span = document.createElement('span');
        span.className = 'e-icons ' + iconClass + ' e-flat';
        if (iconClass.includes('e-eye')) {
            span.classList.add('e-pv-view-icon');
        } else if (iconClass.includes('e-edit')) {
            span.classList.add('e-pv-edit-icon');
        }
        return span;
    }

    function renderBootstrapTable() {
        // container #Grid must exist in your HTML
        var gridContainer = document.querySelector('#Grid');
        if (!gridContainer) {
            console.warn('#Grid element not found. Bootstrap table cannot be rendered.');
            return;
        }
        var tplScript = document.getElementById('fileNameTemplate');
        var tplHtml = tplScript ? tplScript.innerHTML.trim() : '';
        var tplNode = null;
        if (tplHtml) {
            var tmp = document.createElement('div');
            tmp.innerHTML = tplHtml;
            tplNode = tmp.firstElementChild;
        }
        var table = document.createElement('table');
        table.className = 'table table-hover table-borderless align-middle';
        
        // Build thead
        table.appendChild(createTableHeader());
        
        // Build tbody
        var tbody = document.createElement('tbody');
        data.forEach(function (row) {
            var tr = document.createElement('tr');
            
            // FileName cell (use your template content if needed)
            var fileNameTd = document.createElement('td');
            if (tplNode) {
                var clone = tplNode.cloneNode(true);
                var span = clone.querySelector('span');
                if (span) span.textContent = row.FileName || '';
                fileNameTd.appendChild(clone);
            } else {
                fileNameTd.textContent = row.FileName || '';
            }
            tr.appendChild(fileNameTd);
            
            // Author
            var authorTd = document.createElement('td');
            authorTd.textContent = row.Author;
            authorTd.classList.add('e-pv-table-author-cell');
            tr.appendChild(authorTd);
            
            // Actions
            var actionTd = document.createElement('td');
            actionTd.classList.add('e-pv-table-actions-cell');
            
            // Create view button (eye icon)
            var viewBtn = document.createElement('button');
            viewBtn.type = 'button';
            viewBtn.className = 'btn btn-sm btn-link text-secondary p-2 e-pv-view-btn';
            viewBtn.title = 'View';
            viewBtn.appendChild(createIconSpan('e-eye'));
            
            // Create edit button (edit icon)
            var editBtn = document.createElement('button');
            editBtn.type = 'button';
            editBtn.className = 'btn btn-sm btn-link text-secondary p-2 e-pv-edit-btn';
            editBtn.title = 'Edit';
            editBtn.appendChild(createIconSpan('e-edit'));
            
            // Attach event listeners to buttons to map to commandClick signature
            viewBtn.addEventListener('click', function () {
                commandClick({
                    mode: 'View',
                    Document: row.Document,
                    FileName: row.FileName,
                    rowData: row
                });
            });
            editBtn.addEventListener('click', function () {
                commandClick({
                    mode: 'Edit',
                    Document: row.Document,
                    FileName: row.FileName,
                    rowData: row
                });
            });
            
            actionTd.appendChild(viewBtn);
            actionTd.appendChild(editBtn);
            tr.appendChild(actionTd);
            tbody.appendChild(tr);
        });
        table.appendChild(tbody);
        
        // Clear container and append table
        gridContainer.innerHTML = '';
        gridContainer.appendChild(table);
    }

    var viewer = new ej.pdfviewer.PdfViewer ({
        documentPath: "",
        resourceUrl:'https://cdn.syncfusion.com/ej2/23.2.6/dist/ej2-pdfviewer-lib',
        documentLoad: documentLoaded
    });
    ej.pdfviewer.PdfViewer.Inject(ej.pdfviewer.Toolbar, ej.pdfviewer.Magnification, ej.pdfviewer.BookmarkView, ej.pdfviewer.ThumbnailView, ej.pdfviewer.TextSelection, ej.pdfviewer.TextSearch, ej.pdfviewer.Print, ej.pdfviewer.Navigation, ej.pdfviewer.LinkAnnotation, ej.pdfviewer.Annotation,  ej.pdfviewer.FormFields, ej.pdfviewer.FormDesigner,ej.pdfviewer.PageOrganizer);
        
    renderBootstrapTable();
    viewer.height ="775px";
    viewer.appendTo('#pdfViewer');
    var SAMPLE_ROUTE = '/pdfviewer/document-list.html';

    function onBeforeUnload() { destroyed(); }

    function onHashChange() {
        if (window.location.hash.indexOf(SAMPLE_ROUTE) !== -1) {
            return;
        }
        destroyed();
    }

    function destroyed() {
        if (viewer) {
            viewer.destroy();
            viewer = null;
        }

        if (dialogObj) {
            dialogObj.destroy();
            dialogObj = null;
        }
        // Remove listeners if we reinitialize without full reload
        window.removeEventListener('beforeunload', onBeforeUnload);
        window.removeEventListener('hashchange', onHashChange);
    }
    // Register named handlers
    window.addEventListener('beforeunload', onBeforeUnload, { once: true });
    window.addEventListener('hashchange', onHashChange);

};
