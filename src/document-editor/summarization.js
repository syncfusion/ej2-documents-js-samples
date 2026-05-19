this.default = function () {
    /**
     * Summarization sample
     */
    var isDocumentChanged = true;
    ej.documenteditor.DocumentEditorContainer.Inject(ej.documenteditor.Toolbar);
    var container = new ej.documenteditor.DocumentEditorContainer({
        enableToolbar: true,
        height: '100%',
        width: '100%',
        serviceUrl: 'https://document.syncfusion.com/web-services/docx-editor/api/documenteditor/'
    });

    container.created = function () {
        var sfdt = '{\"sfdt\":\"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\"}';
        container.documentEditor.open(sfdt);
    };

    container.appendTo('#DocumentEditor');

    if (container.documentEditor) {
        container.documentEditor.documentName = 'Getting Started';

        ej.popups.createSpinner({
            target: document.getElementById('container')
        });

        var isChecked = false;
        var switchObj;
        var aiAssistView;

        var handleAIPaneToggle = function (checked) {
            if (checked) {
                onOpenAIPane();
            } else {
                onCloseAIPane();
            }
        };

        var onOpenAIPane = function () {
            isChecked = true;
            container.showPropertiesPane = false;
            container.width = '70%';
            var element = document.getElementById('e-de-ai');
            if (element) {
                element.style.display = 'block';
            }
            if (isDocumentChanged) {
                aiAssistView.executePrompt('Summarize the document');
            }
        };

        var onCloseAIPane = function () {
            isChecked = false;
            container.showPropertiesPane = true;
            container.width = '100%';
            var element = document.getElementById('e-de-ai');
            if (element) {
                element.style.display = 'none';
            }
        };

        var copyToClip = function (content) {
            var blob = new Blob([content], { type: 'text/html' });
            var clipboardItem = new ClipboardItem({ 'text/html': blob });
            return navigator.clipboard.write([clipboardItem]);
        };

        var onInsertContent = function (response) {
            var http = new XMLHttpRequest();
            var url = container.serviceUrl + 'SystemClipboard';
            http.open('POST', url, true);
            http.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
            http.onreadystatechange = function () {
                if (http.readyState === 4 && (http.status === 200 || http.status === 304)) {
                    container.documentEditor.editor.paste(http.responseText);
                    container.documentEditor.editor.onEnter();
                }
            };
            var sfdt = {
                content: response,
                type: '.Html'
            };
            http.send(JSON.stringify(sfdt));
        };

        var dispose = function () {
            aiAssistView.prompts = [];
            aiAssistView.promptSuggestions = [];
        };

        var uploadDocument = function (documentText) {
            return new Promise(function (resolve, reject) {
                var http = new XMLHttpRequest();
                var url = 'http://localhost:62870/api/documenteditor/UpLoadDocument';
                http.open('POST', url, true);
                http.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
                var sfdt = { content: documentText };
                http.onreadystatechange = function () {
                    if (http.readyState === 4) {
                        if (http.status === 200 || http.status === 304) {
                            resolve();
                        } else {
                            reject('Error: ' + http.status + ' - ' + http.statusText);
                        }
                    }
                };
                http.send(JSON.stringify(sfdt));
            });
        };

        var getDocumentSummary = function (documentText) {
            return new Promise(function (resolve, reject) {
                var http = new XMLHttpRequest();
                var url = 'http://localhost:62870/api/documenteditor/GetDocumentSummary';
                http.open('GET', url, true);
                http.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
                http.onreadystatechange = function () {
                    if (http.readyState === 4) {
                        if (http.status === 200 || http.status === 304) {
                            resolve(http.responseText);
                        } else {
                            reject('Error: ' + http.status + ' - ' + http.statusText);
                        }
                    }
                };
                var sfdt = { content: documentText };
                http.send(JSON.stringify(sfdt));
            });
        };

        var getSuggestions = function () {
            return new Promise(function (resolve, reject) {
                var http = new XMLHttpRequest();
                var url = 'http://localhost:62870/api/documenteditor/GetSuggestions';
                http.open('GET', url, true);
                http.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
                http.onreadystatechange = function () {
                    if (http.readyState === 4) {
                        if (http.status === 200 || http.status === 304) {
                            resolve(http.responseText);
                        } else {
                            reject('Error: ' + http.status + ' - ' + http.statusText);
                        }
                    }
                };
                http.send();
            });
        };

        var getAnswer = function (question) {
            return new Promise(function (resolve, reject) {
                var http = new XMLHttpRequest();
                var url = 'http://localhost:62870/api/documenteditor/GetDocumentSummary';
                http.open('GET', url, true);
                http.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
                http.onreadystatechange = function () {
                    if (http.readyState === 4) {
                        if (http.status === 200 || http.status === 304) {
                            resolve(http.responseText);
                        } else {
                            reject('Error: ' + http.status + ' - ' + http.statusText);
                        }
                    }
                };
                var sfdt = { content: question };
                http.send(JSON.stringify(sfdt));
            });
        };

        var promptRequestToAI = function (args) {
            var spinnerTarget = document.getElementById('container');
            ej.popups.showSpinner(spinnerTarget);

            var action = Promise.resolve();

            if (args.prompt === 'Summarize the document' && isDocumentChanged) {
                isDocumentChanged = false;
                var documentText = '';

                action = container.documentEditor.saveAsBlob('Txt')
                    .then(function (exportedDocument) {
                        return exportedDocument.text();
                    })
                    .then(function (text) {
                        documentText = text;
                        return uploadDocument(documentText);
                    })
                    .then(function () {
                        return getDocumentSummary(documentText);
                    })
                    .then(function (response) {
                        aiAssistView.addPromptResponse(response);
                        return getSuggestions();
                    })
                    .then(function (suggestions) {
                        aiAssistView.promptSuggestions = suggestions.split('\n');
                    });

            } else if (args.prompt) {
                action = getAnswer(args.prompt).then(function (answer) {
                    aiAssistView.addPromptResponse(answer);
                });
            }

            return action
                .catch(function () {
                    // Optionally log or display an error message.
                })
                .then(function () {
                    ej.popups.hideSpinner(spinnerTarget);
                });
        };

        var responseToolbarSettings = {
            itemClicked: function (args) {
                if (args.item.iconCss === 'e-icons e-copy') {
                    return copyToClip(aiAssistView.prompts[args.dataIndex].response);
                }
                if (args.item.iconCss === 'e-btn-icon e-de-ctnr-new') {
                    onInsertContent(aiAssistView.prompts[args.dataIndex].response);
                }
                return Promise.resolve();
            },
            items: [
                { iconCss: 'e-icons e-copy' },
                { iconCss: 'e-btn-icon e-de-ctnr-new' }
            ]
        };

        var setSwitchState = function (value) {
            if (switchObj) {
                switchObj.checked = value;
            }
        };

        var assistViewToolbarSettings = {
            itemClicked: function (args) {
                switch (args.item.iconCss) {
                    case 'e-icons e-close':
                        onCloseAIPane();
                        setSwitchState(false);
                        break;
                }
            },
            items: [
                { iconCss: 'e-icons e-close', align: 'Right' }
            ]
        };

        aiAssistView = new ej.interactivechat.AIAssistView({
            promptPlaceholder: 'Ask a question about this document.',
            height: '100%',
            toolbarSettings: assistViewToolbarSettings,
            bannerViewTemplate: '<div class="ai-assist-banner">\n                            <div class="e-icons e-ai-assist"></div>\n                            <h2>Summarization & QnA</h2>\n                        </div>',
            promptRequest: promptRequestToAI,
            responseToolbarSettings: responseToolbarSettings
        });

        aiAssistView.appendTo('#e-de-ai');

        container.documentChange = function () {
            isDocumentChanged = true;
            dispose();
            if (isChecked) {
                aiAssistView.executePrompt('Summarize the document');
            }
        };

        // Title bar helpers ---------------------------------------------------
        var titleBarDiv = document.getElementById('documenteditor_titlebar');
        var documentTitle;
        var documentTitleContentEditor;
        var print;
        var openBtn;
        var download;

        var onPrint = function () {
            container.documentEditor.print();
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

        var save = function (format) {
            var name = container.documentEditor.documentName === '' ?
                'sample' : container.documentEditor.documentName;
            container.documentEditor.save(name, format);
        };

        var setTooltipForPopup = function () {
            var popup = document.getElementById('documenteditor-share-popup');
            if (popup) {
                var items = popup.querySelectorAll('li');
                if (items.length >= 4) {
                    items[0].setAttribute('title', 'Download a copy of this document to your computer as an SFDT file.');
                    items[1].setAttribute('title', 'Download a copy of this document to your computer as a DOCX file.');
                    items[2].setAttribute('title', 'Download a copy of this document to your computer as a DOTX file.');
                    items[3].setAttribute('title', 'Download a copy of this document to your computer as a TXT file.');
                }
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

        var wireEventsInTitleBar = function () {
            print.element.addEventListener('click', onPrint);
            openBtn.element.addEventListener('click', function (e) {
                if (e.target.id === 'de-open') {
                    var fileUpload = document.getElementById('uploadfileButton');
                    fileUpload.value = '';
                    fileUpload.click();
                }
            });
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
        };

        var addSwitch = function () {
            var switchDiv = ej.base.createElement('div', { id: 'e-de-switch', styles: 'float:right;' });
            titleBarDiv.appendChild(switchDiv);
            var style = document.createElement('style');
            style.innerHTML = '\n                .de-switch {\n                    float: right;\n                    margin-top: 7px;\n                }\n            ';
            document.head.appendChild(style);
            var onToggle = function (args) {
                handleAIPaneToggle(args.checked);
            };
            switchObj = new ej.buttons.Switch({
                onLabel: 'ON',
                offLabel: 'OFF',
                checked: false,
                cssClass: 'de-switch',
                change: onToggle
            });
            switchObj.appendTo(switchDiv);

            var textDiv = ej.base.createElement('div', { className: 'single-line', styles: 'float:right; margin-top:5px;' });
            var aiTitle = ej.base.createElement('label', {
                styles: 'font-weight:400;text-overflow:ellipsis;white-space:pre;overflow:hidden;user-select:none;cursor:text;font-family: "Times New Roman";'
            });
            aiTitle.textContent = 'AI Assist';
            textDiv.appendChild(aiTitle);
            titleBarDiv.appendChild(textDiv);
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

        initializeTitleBar(true);
        updateDocumentTitle();
        wireEventsInTitleBar();
        addSwitch();

        container.documentChange = function () {
            updateDocumentTitle();
        };

        var updateSwitchProgrammatically = function (value) {
            setSwitchState(value);
        };

        // ensure the switch reflects pane visibility on start
        updateSwitchProgrammatically(false);
    }
};