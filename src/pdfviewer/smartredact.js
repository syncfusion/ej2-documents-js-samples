this.default = function () {
    /**
     * Smart Redact Sample
     */
    ej.pdfviewer.PdfViewer.Inject(ej.pdfviewer.Toolbar, ej.pdfviewer.Magnification, ej.pdfviewer.Navigation, ej.pdfviewer.Annotation,
        ej.pdfviewer.LinkAnnotation, ej.pdfviewer.ThumbnailView, ej.pdfviewer.BookmarkView, ej.pdfviewer.TextSelection,
        ej.pdfviewer.TextSearch, ej.pdfviewer.FormFields, ej.pdfviewer.FormDesigner, ej.pdfviewer.PageOrganizer);

    var pdfviewer = new ej.pdfviewer.PdfViewer();
    //Replace the service url with your port number.
    pdfviewer.serviceUrl = 'http://localhost:62870/api/pdfviewer';
    pdfviewer.enableAnnotationToolbar = false;
    pdfviewer.enableToolbar = false;
    pdfviewer.contextMenuSettings = {
        contextMenuAction: 'RightClick',
        contextMenuItems: [ej.pdfviewer.ContextMenuItem.Delete]
    };
    pdfviewer.downloadFileName = "SmartRedaction.pdf";
    pdfviewer.zoomMode = "FitToPage";
    pdfviewer.annotationAdd = annotationAdded;
    pdfviewer.annotationRemove = annotationRemove;
    pdfviewer.documentLoad = documentLoaded;
    pdfviewer.created = sampleCreated;
    pdfviewer.appendTo('#e-pv-smartredact-pdfviewer');
    var selectedTreeViewObj;
    var fileUploadBtn;
    if (pdfviewer.element) {
        pdfviewer.load('Confidential_Medical_Record.pdf', '');
        var downloadBtn = document.getElementById('e-pv-smartredact-downloadBtn');
        var scanTreeObj = document.getElementById('e-pv-smartredact-treeViewScanObj');
        var selectedTreeObj = document.getElementById('e-pv-smartredact-treeViewSelectedObj');
        var scnaBtnObj = document.getElementById('e-pv-smartredact-redactScanBtn');
        var redactApplyBtnObj = document.getElementById('e-pv-smartredact-redactApplyBtn');
        var redactCancelBtnObj = document.getElementById('e-pv-smartredact-redactCancelBtn');
        var rightContainer = document.getElementById('e-pv-smartredact-right-container');
        var rightContainerBlack = document.getElementById('e-pv-smartredact-right-container-blackout');
        fileUploadBtn = document.getElementById('e-pv-smartredact-fileUpload');
        var zoomInBtn = document.getElementById('zoominButton');
        var zoomOutBtn = document.getElementById('zoomoutButton');
        var leftContainer = document.getElementById('e-pv-smartredact-left-container');
        var parentContainer = document.querySelector('.e-pv-viewer-container');
        var smartRedactContainerOpen = false;
        var isFindMobileDevice = false;
        var selectedTreeObjData = [];
        selectedTreeViewObj = new ej.navigations.TreeView();
        var redactionCount = 0;

        if (downloadBtn) {
            downloadBtn.addEventListener('click', downloadClicked);
        }

        /* Initialize the Appbar */
        var defaultAppBarObj = new ej.navigations.AppBar({
            colorMode: 'Dark'
        });
        defaultAppBarObj.appendTo('#e-pv-smartredact-defaultappbar');
        var downloadBtnObj = new ej.buttons.Button({ cssClass: 'e-inherit', iconCss: 'e-icons e-download e-btn-icon e-icon-left', content: 'Download' });
        downloadBtnObj.appendTo('#e-pv-smartredact-downloadBtn');

        /* Initialize the Toolbar */
        var toolbarObj = new ej.navigations.Toolbar({
            items: [
                { prefixIcon: 'e-icons e-folder', tooltipText: 'Open', text: 'Open File', id: 'openButton', cssClass: 'e-pv-open-container', click: openDocument },
                { type: "Separator", tooltipText: "separator", align: 'Left' },
                { prefixIcon: 'e-icons e-circle-remove', tooltipText: 'Zoom Out', text: 'Zoom Out', id: 'zoomoutButton', cssClass: 'e-pv-zoomout-container', click: zoomOutClicked },
                { prefixIcon: 'e-icons e-circle-add', tooltipText: 'Zoom In', text: 'Zoom In', id: 'zoominButton', cssClass: 'e-pv-zoomin-container', click: zoomInClicked },
                { type: "Separator", tooltipText: "separator" },
                { prefixIcon: 'e-icons e-pv-smartredact-mark-redact', tooltipText: 'Mark for Redaction', text: 'Mark for Redaction', id: 'markforRedaction', cssClass: 'e-pv-mark-container', click: applyRectangle },
                { prefixIcon: 'e-icons e-redaction', tooltipText: 'Redaction', text: 'Redaction', id: 'redactButton', cssClass: 'e-pv-redact-container', click: redactionApply },
                { prefixIcon: 'e-icons e-redaction', tooltipText: 'Smart Redaction', text: 'Smart Redaction', id: 'smartredactButton', cssClass: 'e-pv-smartredact-container', align: 'Right', click: openSmartReact }
            ]
        });
        toolbarObj.appendTo('#e-pv-smartredact-toolbar');
        toolbarObj.hideItem(7, true);

        /* Initialize the scan objects tree view */
        var treeObjData = [
            { id: 1, name: 'Select All', hasChild: true, expanded: true, isChecked: true },
            { id: 2, pid: 1, name: 'Person Names' },
            { id: 3, pid: 1, name: 'Organization Names' },
            { id: 4, pid: 1, name: 'Email addresses' },
            { id: 5, pid: 1, name: 'Phone Numbers' },
            { id: 6, pid: 1, name: 'Addresses' },
            { id: 7, pid: 1, name: 'Dates' },
            { id: 8, pid: 1, name: 'Account Numbers' },
            { id: 9, pid: 1, name: 'Credit Card Numbers' }
        ];
        var treeObj = new ej.navigations.TreeView({
            fields: { dataSource: treeObjData, id: 'id', parentID: 'pid', text: 'name', hasChildren: 'hasChild' },
            showCheckBox: true,
        });
        treeObj.appendTo('#e-pv-smartredact-scantree');
        var scanBtn = new ej.buttons.Button({ content: 'Scan', isPrimary: true });
        scanBtn.appendTo('#e-pv-smartredact-redactScanBtn');
        var redactAIBtn = new ej.buttons.Button({ content: 'Redact', isPrimary: true });
        redactAIBtn.appendTo('#e-pv-smartredact-redactApplyBtn');
        var redactCancelBtn = new ej.buttons.Button({ content: 'Cancel' });
        redactCancelBtn.appendTo('#e-pv-smartredact-redactCancelBtn');

        if (rightContainer) {
            ej.popups.createSpinner({ target: rightContainer });
            ej.popups.hideSpinner(rightContainer);
        }
        if (scnaBtnObj) {
            scnaBtnObj.addEventListener('click', scanBtnClicked);
        }
        if (redactApplyBtnObj) {
            redactApplyBtnObj.addEventListener('click', redactionApply);
        }
        if (redactCancelBtnObj) {
            redactCancelBtnObj.addEventListener('click', redactCancel);
        }

        if (parentContainer) {
            parentContainer.addEventListener('touchstart', checkClickedDiv);
        }

    }

    /* Function for the document download */
    function downloadClicked() {
        pdfviewer.download();
    }

    /* Function for the annotation add event */
    function annotationAdded(args) {
        redactionCount++;
        updateRedactButton();
    }

    /* Function for the annotation remove event */
    function annotationRemove(args) {
        var subject = args.annotationBounds.parentObj.properties.subject;
        selectedTreeViewObj.uncheckAll([subject]);
        redactionCount--;
        updateRedactButton();
    }

    /* Function for the pdfviewer created event */
    function sampleCreated(args) {
        var appbarContainer = document.getElementById('e-pv-smartredact-appbar-container');
        if (appbarContainer) {
            appbarContainer.style.display = 'block';
        }
    }

    /* Function for the document load event */
    function documentLoaded(args) {
        toolbarObj.hideItem(7, false);
        isMobileDevice();
        if (smartRedactContainerOpen) {
            openSmartReact();
        }
        selectedTreeObjData = [];
        annotationCollection = [];
        redactionCount = 0;
        updateRedactButton();
    }

    /* Function for the enable or disable the redact button */
    function updateRedactButton() {
        var toolbarRedactBtn = document.getElementById('redactButton');
        if (redactionCount > 0) {
            if (toolbarRedactBtn) {
                toolbarObj.enableItems(toolbarRedactBtn, true);
                redactAIBtn.disabled = false;
                redactAIBtn.dataBind();
            }
        }
        else {
            if (toolbarRedactBtn) {
                toolbarObj.enableItems(toolbarRedactBtn, false);
                redactAIBtn.disabled = true;
                redactAIBtn.dataBind();
            }
        }
    }

    function checkClickedDiv(args) {
        if (ej.base.Browser.isDevice && !isFindMobileDevice) {
            if (rightContainer) {
                rightContainer.style.display = 'none';
                smartRedactContainerOpen = false;
            }
        }
    }

    function isMobileDevice() {
        //Check if the device is mobile
        var isMobile = ej.base.Browser.isDevice;
        var sampleContent = document.getElementById('e-pv-smart-redact-container');
        if (isMobile) {
            var sampleContentRect = sampleContent && sampleContent.getBoundingClientRect();
            var sampleContentMinWidth = 450;
            if (sampleContentRect && ((sampleContentRect.width) > sampleContentMinWidth)) {
                return false;
            } else {
                return true;
            }
        }
        isFindMobileDevice = isMobile;
    }

    /* Filter the name from the collection */
    function getNamesByIds(ids, data) {
        return data
            .filter(function (item) { return ids.includes(item.id.toString()); }) // Added return and explicit check
            .map(function (item) { return item.name; }); // Added return statement
    }

    /* Function for the aply rectangle annotation */
    function applyRectangle() {
        pdfviewer.rectangleSettings = {
            author: 'Redaction'
        };
        pdfviewer.annotation.setAnnotationMode('Rectangle');
    }

    var annotationCollection = [];

    /* Function for the redaction cancel button */
    function redactCancel() {
        if (rightContainer) {
            if (rightContainerBlack) {
                rightContainerBlack.style.display = 'block';
            }
            ej.popups.showSpinner(rightContainer);
        }
        // Ensure annotationCollection and pdfviewer are accessible in scope
       for (var i = annotationCollection.length - 1; i >= 0; i--) {
            (function (index, pdfviewer, annotation) {
                var collection = pdfviewer.annotationCollection;
              var subject = annotation.subject;
                if (subject && subject.indexOf("Details") !== -1) {
                    var filteredCollection = collection.filter(function (item) {
                        return item.subject === subject;
                    });
                    if (filteredCollection.length > 0) {
                        pdfviewer.annotationModule.deleteAnnotationById(filteredCollection[0].annotationId);
                    }
                }
            }).bind(this, i, pdfviewer, annotationCollection[i]);
        }

        updateRedactButton();
        selectedTreeObjData = [];
        annotationCollection = [];
        if (rightContainer) {
            if (rightContainerBlack) {
                rightContainerBlack.style.display = 'none';
            }
            ej.popups.hideSpinner(rightContainer);
        }
        if (scanTreeObj) {
            scanTreeObj.style.display = 'block';
        }
        if (selectedTreeObj) {
            selectedTreeObj.style.display = 'none';
        }
    }

    /* Function for the redaction apply button */
    function redactionApply() {
        if (redactAIBtn.disabled == false) {
            pdfviewer.saveAsBlob().then(function (value) {
                if (rightContainer) {
                    if (rightContainerBlack) {
                        rightContainerBlack.style.display = 'block';
                    }
                    ej.popups.showSpinner(rightContainer);
                }
                var data = value;
                var reader = new FileReader();
                reader.readAsDataURL(data);
                reader.onload = function (e) {
                    var base64String = e && e.target ? e.target.result : null;
                    sendRedactionequest(base64String);
                    selectedTreeObjData = [];
                    annotationCollection = [];
                    redactionCount = 0;
                };
            });
        }
    }

    /* Function for the send request for the redaction apply */
    function sendRedactionequest(data) {
        var dictionary = {
            "hashId": data,
        };
        var post = JSON.stringify(dictionary);
        //Replace the service url with your port number.
        var url = "http://localhost:62870/api/pdfviewer/AIRedaction";
        var xhr = new XMLHttpRequest();
        xhr.open('Post', url, true);
        xhr.setRequestHeader('Content-type', 'application/json; charset=UTF-8');
        xhr.onload = function () {
            if (xhr.status >= 200 && xhr.status < 300) {
                var response = xhr.responseText;
                try {
                    if (rightContainer) {
                        if (rightContainerBlack) {
                            rightContainerBlack.style.display = 'none';
                        }
                        ej.popups.hideSpinner(rightContainer);
                    }
                    if (smartRedactContainerOpen) {
                        openSmartReact();
                    }
                    pdfviewer.load(response, 'null');
                    if (scanTreeObj) {
                        scanTreeObj.style.display = 'none';
                    }
                    if (selectedTreeObj) {
                        selectedTreeObj.style.display = 'none';
                    }
                } catch (e) {
                    console.error('Failed to parse response as JSON:', e);
                }
            } else {
                console.error('Request failed with status:', xhr.status, xhr.statusText);
            }
        };
        xhr.onerror = function () {
            console.error('Network error');
        };
        xhr.send(post);
    }

    /* Fucntion for send request for the get details from the document */
    function scanBtnClicked() {
        if (rightContainer) {
            if (rightContainerBlack) {
                rightContainerBlack.style.display = 'block';
            }
            ej.popups.showSpinner(rightContainer);
        }
        var data = pdfviewer.getRootElement();
        var hashId = data.ej2_instances[0].viewerBase.hashId;
        var selectedItems = treeObj.getAllCheckedNodes();
        var names = getNamesByIds(selectedItems, treeObjData);
        var dictionary = {
            "hashId": hashId
        };
        var post = JSON.stringify({
            jsonObject: dictionary,
            selectedItems: names
        });
        //Replace the service url with your port number.
        var url = "http://localhost:62870/api/pdfviewer/FindTextinDocument";
        var xhr = new XMLHttpRequest();
        xhr.open('Post', url, true);
        xhr.setRequestHeader('Content-type', 'application/json; charset=UTF-8');
        xhr.onload = function () {
            if (xhr.status >= 200 && xhr.status < 300) {
                var response = xhr.responseText;
                try {
                    var jsonResponse = JSON.parse(response);
                    var count = 1;
                    var pidNumber;
                    var obj = {
                        id: 'SelectAll', name: 'Select All', expanded: true, hasChild: true, isChecked: true
                    };
                    selectedTreeObjData.push(obj);
                    for (var i = 0; i < pdfviewer.viewerBase.pageCount; i++) {
                        if (jsonResponse[i].length != 0) {
                            var obj_1 = {
                                id: 'Page' + (i + 1), name: 'Page ' + (i + 1), pid: 'SelectAll', expanded: true, hasChild: true, isChecked: true
                            };
                            pidNumber = 'Page' + (i + 1);
                            selectedTreeObjData.push(obj_1);
                            for (var j = 0; j < jsonResponse[i].length; j++) {
                                var content = (jsonResponse[i])[j].SensitiveInformation;
                                var obj_2 = {
                                    id: 'Details' + count, name: '' + content, pid: pidNumber
                                };
                                var annotObj = {
                                    width: (jsonResponse[i])[j].Bounds.Width,
                                    height: (jsonResponse[i])[j].Bounds.Height,
                                    x: (jsonResponse[i])[j].Bounds.X,
                                    y: (jsonResponse[i])[j].Bounds.Y,
                                    author: "Redaction",
                                    pageNumber: i + 1,
                                    subject: 'Details' + count
                                };
                                pdfviewer.annotation.addAnnotation("Rectangle", {
                                    width: (jsonResponse[i])[j].Bounds.Width,
                                    height: (jsonResponse[i])[j].Bounds.Height,
                                    offset: { x: (jsonResponse[i])[j].Bounds.X, y: (jsonResponse[i])[j].Bounds.Y },
                                    author: "Redaction",
                                    pageNumber: i + 1,
                                    subject: 'Details' + count
                                });
                                annotationCollection.push(annotObj);
                                selectedTreeObjData.push(obj_2);
                                count++;
                            }
                        }
                    }
                    selectedTreeViewObj.fields = { dataSource: selectedTreeObjData, id: 'id', parentID: 'pid', text: 'name', hasChildren: 'hasChild' };
                    selectedTreeViewObj.showCheckBox = true;
                    selectedTreeViewObj.nodeChecked = nodeCheckedChange;
                    selectedTreeViewObj.nodeSelected = nodeSelected;
                    selectedTreeViewObj.dataBind();
                    if (rightContainer) {
                        if (rightContainerBlack) {
                            rightContainerBlack.style.display = 'none';
                        }
                        ej.popups.hideSpinner(rightContainer);
                    }
                    if (scanTreeObj) {
                        scanTreeObj.style.display = 'none';
                    }
                    if (selectedTreeObj) {
                        selectedTreeObj.style.display = 'block';
                    }
                } catch (e) {
                    console.error('Failed to parse response as JSON:', e);
                }
            } else {
                console.error('Request failed with status:', xhr.status, xhr.statusText);
            }
        };
        xhr.onerror = function () {
            console.error('Network error');
        };
        xhr.send(post);
        if (selectedTreeViewObj) {
            selectedTreeViewObj.appendTo("#e-pv-smartredact-selectedTree");
        }
    }

    /* Function for open the document */
    function openDocument() {
        if (fileUploadBtn) {
            fileUploadBtn.click();
        }
    }

    /* Function for separate the page number */
    function separateNumbersAndStrings(input) {
        var numbers = [];
        var regex = /\d+/g;
        var match;
        while ((match = regex.exec(input)) !== null) {
            numbers.push(parseInt(match[0], 10));
        }
        return numbers;
    }

    /* Function for node selected event */
    function nodeSelected(args) {
        if (args.nodeData.parentID) {
            if (args.nodeData.parentID.includes('Page')) {
                var pageNumber = separateNumbersAndStrings(args.nodeData.parentID);
                pdfviewer.navigation.goToPage(pageNumber[0]);
            }
            else {
                var pageNumbers = separateNumbersAndStrings(args.nodeData.id);
                pdfviewer.navigation.goToPage(pageNumbers[0]);
            }
        }
    }

    /* Function for node check event */
    function nodeCheckedChange(args) {
        if (args.action == "check") {
            for (var i = 0; i < args.data.length; i++) {
                (function (i, pdfviewer, args, annotationCollection) {
                    if (args.data[i].id.includes("Details")) {
                        var filteredCollection = annotationCollection.filter(function (item) {
                            return item.subject === args.data[i].id;
                        });
                        if (filteredCollection[0]) {
                            pdfviewer.annotation.addAnnotation("Rectangle", {
                                width: filteredCollection[0].width,
                                height: filteredCollection[0].height,
                                offset: { x: filteredCollection[0].x, y: filteredCollection[0].y },
                                author: "Redaction",
                                pageNumber: filteredCollection[0].pageNumber,
                                subject: filteredCollection[0].subject
                            });
                        }
                    }
                }).bind(this, i, pdfviewer, args, annotationCollection);
            }
            updateRedactButton();
        }
        if (args.action == "uncheck") {
            for (var l = 0; l < args.data.length; l++) {
                (function (l, pdfviewer, args) {
                    if (args.data[l].id.includes("Details")) {
                        var filteredCollections = pdfviewer.annotationCollection.filter(function (item) {return item.subject === args.data[l].id; });
                        if (filteredCollections[0]) {
                            pdfviewer.annotationModule.deleteAnnotationById(filteredCollections[0].annotationId);
                        }
                    }
                }).bind(this, l, pdfviewer, args);
            }
            updateRedactButton();
        }
    }

    /* Function for read the open file */
    function readFile(args) {
        var upoadedFiles = args.target.files;
        if (args.target.files[0] !== null) {
            var uploadedFile = upoadedFiles[0];
            if (uploadedFile) {
                var reader = new FileReader();
                var filename = upoadedFiles[0].name;
                reader.readAsDataURL(uploadedFile);
                reader.onload = function (e) {
                    var uploadedFileUrl = e.currentTarget.result;
                    pdfviewer.documentPath = uploadedFileUrl;
                    pdfviewer.fileName = filename;
                };
            }
        }
    }

    /* Open and close the right container */
    function openSmartReact() {
        if (!smartRedactContainerOpen) {
            if (!ej.base.Browser.isDevice) {
                if (leftContainer) {
                    leftContainer.style.width = '70%';
                }
                pdfviewer.updateViewerContainer();
                toolbarObj.refreshOverflow();
            }
            if (rightContainer) {
                rightContainer.style.display = 'block';
            }
            if (scanTreeObj) {
                scanTreeObj.style.display = 'block';
            }
            if (selectedTreeObj) {
                selectedTreeObj.style.display = 'none';
            }
            smartRedactContainerOpen = true;
        }
        else {
            if (!ej.base.Browser.isDevice) {
                if (leftContainer) {
                    leftContainer.style.width = '100%';
                }
                setTimeout(function () {
                    pdfviewer.updateViewerContainer();
                }, 50);
                toolbarObj.refreshOverflow();
            }
            if (rightContainer) {
                rightContainer.style.display = 'none';
            }
            smartRedactContainerOpen = false;
        }
    }

    /* Function for the zoom in the pdfviewer */
    function zoomInClicked() {
        pdfviewer.magnification.zoomIn();
        updateZoomBtn();
    }

    /* Function for the zoom out the pdfviewer */
    function zoomOutClicked() {
        pdfviewer.magnification.zoomOut();
        updateZoomBtn();
    }

    /* Function for enable and disable zoom in adn zoom out button */
    function updateZoomBtn() {
        if (zoomInBtn && zoomOutBtn) {
            if (pdfviewer.magnificationModule.zoomFactor == 4) {
                toolbarObj.enableItems(zoomInBtn, false);
                toolbarObj.enableItems(zoomOutBtn, true);
            }
            else if (pdfviewer.magnificationModule.zoomFactor == 0.25) {
                toolbarObj.enableItems(zoomInBtn, true);
                toolbarObj.enableItems(zoomOutBtn, false);
            }
            else {
                toolbarObj.enableItems(zoomInBtn, true);
                toolbarObj.enableItems(zoomOutBtn, true);
            }
        }
    }
    if (fileUploadBtn) {
        fileUploadBtn.addEventListener('change', readFile, false);
    }
};