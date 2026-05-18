this.default = function () {
    /**
     * Writing Assist Document Editor sample
     */
    ej.documenteditor.DocumentEditorContainer.Inject(ej.documenteditor.Toolbar);
    var toolItem = {
        prefixIcon: 'e-icons e-file-new',
        text: 'AI Write',
        id: 'write'
    };
    var container = new ej.documenteditor.DocumentEditorContainer({
        enableToolbar: true,
        height: '99%',
        serviceUrl: 'https://document.syncfusion.com/web-services/docx-editor/api/documenteditor/',
        toolbarItems: [
            'New', 'Open', 'Separator', toolItem, 'Separator', 'Undo', 'Redo', 'Separator', 'Image', 'Table',
            'Hyperlink', 'Bookmark', 'TableOfContents', 'Separator', 'Header', 'Footer', 'PageSetup', 'PageNumber',
            'Break', 'InsertFootnote', 'InsertEndnote', 'Separator', 'Find', 'Separator', 'Comments', 'TrackChanges',
            'Separator', 'LocalClipboard', 'RestrictEditing', 'Separator', 'FormFields', 'UpdateFields', 'ContentControl'
        ]
    });
    container.appendTo('#DocumentEditor');

    if (container.documentEditor) {
        container.documentEditor.documentName = 'Getting Started';

        var dialog;
        var toolbar;
        var editableDiv = document.getElementById('e-de-editable-div');
        var toneValue = 'Professional';
        var formatValue = 'Paragraph';
        var lengthValue = 'Medium';
        var outList = [];
        var titleBarDiv;
        var documentTitle;
        var documentTitleContentEditor;
        var print;
        var openBtn;
        var download;

        var menuItems = [
            {
                text: 'AI Write',
                id: 'write',
                iconCss: 'e-icons e-file-new'
            }
        ];
        container.documentEditor.contextMenu.addCustomMenu(menuItems, false);

        container.customContextMenuSelect = function (args) {
            var item = args.id;
            var id = container.element.id;
            if (item === id + '_editorwrite' && dialog) {
                dialog.show();
            }
        };

        container.toolbarClick = function (args) {
            if (args.item.id === 'write' && dialog) {
                dialog.show();
            }
        };

        var updateIndex = function () {
            var element = document.getElementById('numeric');
            if (!element || !editableDiv) {
                return;
            }
            var text = editableDiv.innerHTML;
            if (outList.length > 0 && outList.indexOf(text) !== -1) {
                element.value = (outList.indexOf(text) + 1).toString();
            } else {
                element.value = '0';
            }
        };

        var moveToNext = function () {
            if (!editableDiv) {
                return;
            }
            var text = editableDiv.innerHTML;
            var index = outList.indexOf(text);
            if (index + 1 < outList.length) {
                editableDiv.innerHTML = outList[index + 1];
                updateIndex();
            }
        };

        var moveToPrevious = function () {
            if (!editableDiv) {
                return;
            }
            var text = editableDiv.innerHTML;
            var index = outList.indexOf(text);
            if (index - 1 >= 0) {
                editableDiv.innerHTML = outList[index - 1];
                updateIndex();
            }
        };

        var onToneChange = function (args) {
            toneValue = args.value;
        };

        var onFormatChange = function (args) {
            formatValue = args.value;
        };

        var onLengthChange = function (args) {
            lengthValue = args.value;
        };

        var onChangeToolbarVisibility = function (showPrimary) {
            var isPrimary = !!showPrimary;
            var isSecondary = !isPrimary;
            if (!toolbar || !toolbar.items) {
                return;
            }
            for (var i = 0; i < 5; i++) {
                if (toolbar.items[i]) {
                    toolbar.items[i].visible = isPrimary;
                }
                if (toolbar.items[i + 5]) {
                    toolbar.items[i + 5].visible = isSecondary;
                }
            }
        };

        var onGenerate = function (options) {
            outList = [];

            var updateEditor = function () {
                if (outList.length > 0 && editableDiv) {
                    editableDiv.innerHTML = outList[0];
                    updateIndex();
                }
            };

            var requestNext = function () {
                if (outList.length >= 3) {
                    updateEditor();
                    return Promise.resolve();
                }

                return getAzureAIRequest(options).then(function (response) {
                    if (response && outList.indexOf(response) === -1) {
                        outList.push(response);
                    } else {
                        return requestNext();
                    }
                    return requestNext();
                }).catch(function () {
                    return requestNext();
                });
            };

            return requestNext();
        };

        var onGenerateClick = function () {
            var dialogElement = document.getElementById('dialog');
            ej.popups.createSpinner({ target: dialogElement });
            ej.popups.showSpinner(dialogElement);

            var text = editableDiv ? editableDiv.innerText : '';
            var options = {
                messages: [
                    {
                        role: 'system',
                        content: "You are a helpful assistant. Your task is to generate content based on the provided text. Please adjust the text to reflect a tone of '" + toneValue + "', formatted in '" + formatValue + "' style, and maintain a length of '" + lengthValue + "'. Always respond in proper text format not a md format. Always respond in proper HTML format, excluding <html>, <head>, and <body> tags."
                    },
                    { role: 'user', content: text }
                ],
                model: 'gpt-4'
            };

            onGenerate(options).then(function () {
                if (toolbar && toolbar.items && toolbar.items[3]) {
                    toolbar.items[3].text = 'Rewrite';
                }
            }).catch(function () {
                // optional: log error or show a notification
            }).then(function () {
                ej.popups.hideSpinner(dialogElement);
            });
        };

        var onSettingsClick = function () {
            onChangeToolbarVisibility(false);
        };

        var onCloseSecondaryToolbar = function () {
            onChangeToolbarVisibility(true);
        };

        var onToolbarCreated = function () {
            if (dialog) {
                dialog.show();
            }
            updateIndex();
        };

        var onInsertContent = function () {
            if (!editableDiv) {
                return;
            }
            var response = editableDiv.innerHTML;
            var http = new XMLHttpRequest();
            var url = container.serviceUrl + 'SystemClipboard';
            http.open('POST', url, true);
            http.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
            http.onreadystatechange = function () {
                if (http.readyState === 4 && (http.status === 200 || http.status === 304)) {
                    container.documentEditor.editor.paste(http.responseText);
                    container.documentEditor.editor.onEnter();
                    if (dialog) {
                        dialog.hide();
                    }
                }
            };
            var sfdt = {
                content: response,
                type: '.Html'
            };
            http.send(JSON.stringify(sfdt));
        };

        var setPlaceholder = function () {
            if (editableDiv && editableDiv.innerHTML.trim() === '') {
                editableDiv.innerHTML = 'Please provide the topic or idea for content generation...';
                editableDiv.classList.add('placeholder');
            }
        };

        var removePlaceholder = function () {
            if (editableDiv && editableDiv.innerHTML === 'Please provide the topic or idea for content generation...') {
                editableDiv.innerHTML = '';
                editableDiv.classList.remove('placeholder');
            }
        };

        var clearContent = function () {
            if (!editableDiv) {
                return;
            }
            editableDiv.innerHTML = '';
            setPlaceholder();
            onChangeToolbarVisibility(true);
            if (toolbar && toolbar.items && toolbar.items[3]) {
                toolbar.items[3].disabled = true;
                toolbar.items[3].text = 'Generate';
            }
        };

        var handleDialogBeforeOpen = function () {
            onChangeToolbarVisibility(true);
        };

        var handleDialogClose = function () {
            clearContent();
        };

        var onPrint = function () {
            container.documentEditor.print();
        };

        var save = function (format) {
            var name = container.documentEditor.documentName === '' ? 'sample' : container.documentEditor.documentName;
            container.documentEditor.save(name, format);
        };

        var onExportClick = function (args) {
            var value = args.item.id;
            switch (value) {
                case 'word':
                    save('Docx');
                    break;
                case 'sfdt':
                    save('Sfdt');
                    break;
                case 'txt':
                    save('Txt');
                    break;
                case 'dotx':
                    save('Dotx');
                    break;
            }
        };

        var setTooltipForPopup = function () {
            var popup = document.getElementById('documenteditor-share-popup');
            if (!popup) {
                return;
            }
            var items = popup.querySelectorAll('li');
            if (items.length >= 4) {
                items[0].setAttribute('title', 'Download a copy of this document to your computer as an SFDT file.');
                items[1].setAttribute('title', 'Download a copy of this document to your computer as a DOCX file.');
                items[2].setAttribute('title', 'Download a copy of this document to your computer as a DOTX file.');
                items[3].setAttribute('title', 'Download a copy of this document to your computer as a TXT file.');
            }
        };

        var addButton = function (iconClass, btnText, styles, id, tooltipText, isDropDown, items) {
            var button = ej.base.createElement('button', { id: id, styles: styles });
            titleBarDiv.appendChild(button);
            button.setAttribute('title', tooltipText);
            if (isDropDown) {
                return new ej.splitbuttons.DropDownButton({
                    select: onExportClick,
                    items: items,
                    iconCss: iconClass,
                    cssClass: 'e-caret-hide',
                    content: btnText,
                    open: function () {
                        setTooltipForPopup();
                    }
                }, button);
            }
            return new ej.buttons.Button({ iconCss: iconClass, content: btnText }, button);
        };

        var initializeTitleBar = function (isShareNeeded) {
            documentTitle = ej.base.createElement('label', {
                id: 'documenteditor_title_name',
                styles: 'text-transform:capitalize;font-weight:400;text-overflow:ellipsis;white-space:pre;overflow:hidden;user-select:none;cursor:text'
            });
            documentTitleContentEditor = ej.base.createElement('div', {
                id: 'documenteditor_title_contentEditor',
                className: 'single-line'
            });
            documentTitleContentEditor.appendChild(documentTitle);
            titleBarDiv.appendChild(documentTitleContentEditor);
            documentTitleContentEditor.setAttribute('title', 'Document Name. Click or tap to rename this document.');
            var btnStyles = 'float:right;background: transparent;box-shadow:none; font-family: inherit;border-color: transparent;' +
                'border-radius: 2px;color:inherit;font-size:12px;text-transform:capitalize;margin-top:4px;height:28px;font-weight:400';
            print = addButton('e-de-icon-Print e-de-padding-right', 'Print', btnStyles, 'de-print', 'Print this document (Ctrl+P).', false);
            openBtn = addButton('e-de-icon-Open e-de-padding-right', 'open', btnStyles, 'de-open', 'Open', false);
            var items = [
                { text: 'Syncfusion Document Text (*.sfdt)', id: 'sfdt' },
                { text: 'Word Document (*.docx)', id: 'word' },
                { text: 'Word Template (*.dotx)', id: 'dotx' },
                { text: 'Plain Text (*.txt)', id: 'txt' }
            ];
            download = addButton('e-de-icon-Download e-de-padding-right', 'Download', btnStyles, 'documenteditor-share', 'Download this document.', true, items);
            if (!isShareNeeded) {
                download.element.style.display = 'none';
            } else {
                openBtn.element.style.display = 'none';
            }
        };

        var updateDocumentEditorTitle = function () {
            documentTitleContentEditor.contentEditable = 'true';
            documentTitleContentEditor.focus();
            window.getSelection().selectAllChildren(documentTitleContentEditor);
        };

        var updateDocumentTitle = function () {
            if (container.documentEditor.documentName === '') {
                container.documentEditor.documentName = 'Untitled';
            }
            documentTitle.textContent = container.documentEditor.documentName;
        };

        var wireEventsInTitleBar = function () {
            if (print && print.element) {
                print.element.addEventListener('click', onPrint);
            }
            if (openBtn && openBtn.element) {
                openBtn.element.addEventListener('click', function (e) {
                    if (e.target.id === 'de-open') {
                        var fileUpload = document.getElementById('uploadfileButton');
                        if (fileUpload) {
                            fileUpload.value = '';
                            fileUpload.click();
                        }
                    }
                });
            }
            if (documentTitleContentEditor) {
                documentTitleContentEditor.addEventListener('keydown', function (e) {
                    if (e.keyCode === 13) {
                        e.preventDefault();
                        documentTitleContentEditor.contentEditable = 'false';
                        if (documentTitleContentEditor.textContent === '') {
                            documentTitleContentEditor.textContent = 'Document1';
                        }
                    }
                });
                documentTitleContentEditor.addEventListener('blur', function () {
                    if (documentTitleContentEditor.textContent === '') {
                        documentTitleContentEditor.textContent = 'Document1';
                    }
                    documentTitleContentEditor.contentEditable = 'false';
                    container.documentEditor.documentName = documentTitle.textContent;
                });
                documentTitleContentEditor.addEventListener('click', function () {
                    updateDocumentEditorTitle();
                });
            }
        };

        if (editableDiv) {
            setPlaceholder();
            editableDiv.addEventListener('focus', removePlaceholder);
            editableDiv.addEventListener('blur', setPlaceholder);
            editableDiv.addEventListener('input', function () {
                if (toolbar && toolbar.items && toolbar.items.length > 3) {
                    toolbar.items[3].disabled = false;
                    toolbar.items[3].text = 'Generate';
                }
            });
        }

        dialog = new ej.popups.Dialog({
            header: 'Generate Content',
            showCloseIcon: true,
            content: document.getElementById('e-de-editable-div'),
            buttons: [
                {
                    click: function () {
                        onInsertContent();
                        clearContent();
                    },
                    buttonModel: {
                        isPrimary: true,
                        content: 'Insert',
                        cssClass: 'e-dig-insert'
                    }
                },
                {
                    click: function () {
                        clearContent();
                        if (dialog) {
                            dialog.hide();
                        }
                    },
                    buttonModel: {
                        content: 'Cancel',
                        cssClass: 'e-flat'
                    }
                }
            ],
            visible: false,
            target: document.getElementById('DocumentEditor'),
            width: '50%',
            height: 'auto',
            isModal: true,
            close: handleDialogClose,
            beforeOpen: handleDialogBeforeOpen
        });
        dialog.appendTo('#dialog');

        toolbar = new ej.navigations.Toolbar({
            items: [
                { prefixIcon: 'e-icons e-chevron-left', click: moveToPrevious },
                {
                    type: 'Input',
                    align: 'Left',
                    cssClass: 'page-count',
                    template: "<div><input type='text' id='numeric' style='width: 20px;padding-left: 10px;'> <span id='total-page'> of 3 </span> </input></div>"
                },
                { prefixIcon: 'e-icons e-chevron-right', click: moveToNext },
                { text: 'Generate', align: 'Right', click: onGenerateClick, disabled: true },
                { prefixIcon: 'e-icons e-settings', click: onSettingsClick },

                { prefixIcon: 'e-icons e-close', click: onCloseSecondaryToolbar },
                {
                    type: 'Input',
                    align: 'Left',
                    template: new ej.dropdowns.ComboBox({
                        width: '125px',
                        change: onToneChange,
                        value: toneValue,
                        dataSource: ['Professional', 'Friendly', 'Instructional', 'Marketing', 'Academic', 'Legal', 'Technical', 'Narrative', 'Direct'],
                        popupWidth: '125px',
                        showClearButton: false,
                        readonly: false
                    })
                },
                {
                    type: 'Input',
                    align: 'Left',
                    template: new ej.dropdowns.ComboBox({
                        width: '200px',
                        change: onFormatChange,
                        value: formatValue,
                        dataSource: ['Paragraph', 'Blog post', 'Technical Documentation', 'Report', 'Research Papers', 'Tutorial', 'Meeting Notes'],
                        popupWidth: '200px',
                        showClearButton: false,
                        readonly: false
                    })
                },
                {
                    type: 'Input',
                    align: 'Left',
                    template: new ej.dropdowns.ComboBox({
                        width: '100px',
                        change: onLengthChange,
                        value: lengthValue,
                        dataSource: ['Short', 'Medium', 'Long'],
                        popupWidth: '100px',
                        showClearButton: false,
                        readonly: false
                    })
                },
                { text: 'Rewrite', click: onGenerateClick }
            ],
            created: onToolbarCreated
        });
        toolbar.appendTo('#e-d-toolbar');

        titleBarDiv = document.getElementById('documenteditor_titlebar');
        initializeTitleBar(true);
        updateDocumentTitle();
        wireEventsInTitleBar();

        container.documentChange = function () {
            updateDocumentTitle();
        };
    }
};