this.default = function () {
    /**
     * Smart Spreadsheet Sample
     */
    var aiinstance;
    var prompts = [
        { prompt: '', response: '' }
    ];
    var currentAIFeature = '';
    /* custom code start */
    var isAiTabCreated = false;
    /* custom code end */
    var column = [
        { width: 88 }, { width: 120 }, { width: 106 }, { width: 98 }, { width: 110 }, { width: 110 }, { width: 110 }, { width: 98 }, { width: 130 }
    ];
    var columnSytle = {
        border: '1px solid #A6A6A6', textAlign: 'center', verticalAlign: 'middle', fontWeight: 'bold'
    };
    var sheet = [
        {
            ranges: [{
                dataSource: grossPay1,
                startCell: 'A3'
            },
            ],
            name: 'Gross Pay',
            rows: [{
                cells: [{
                    value: 'Gross Pay Calculation',
                    style: {
                        fontSize: '20pt', fontWeight: 'bold', textAlign: 'center', backgroundColor: '#B3FFB3', verticalAlign: 'middle'
                    }
                }]
            },
            {
                index: 3, cells: [{
                    index: 9, formula: '=B4+6',
                    style: { border: '1px solid #A6A6A6', textAlign: 'center', verticalAlign: 'middle', fontWeight: 'bold' }
                }]
            },
            {
                index: 4, cells: [{
                    index: 9, formula: '=B5+6',
                    style: { border: '1px solid #A6A6A6', textAlign: 'center', verticalAlign: 'middle', fontWeight: 'bold' }
                }]
            },
            {
                index: 5, cells: [{
                    index: 9, formula: '=B6+6',
                    style: { border: '1px solid #A6A6A6', textAlign: 'center', verticalAlign: 'middle', fontWeight: 'bold' }
                }]
            },
            {
                index: 6, cells: [{
                    index: 9, formula: '=B7+6',
                    style: { border: '1px solid #A6A6A6', textAlign: 'center', verticalAlign: 'middle', fontWeight: 'bold' }
                }]
            },
            {
                index: 7, cells: [{
                    index: 9, formula: '=B8+6',
                    style: { border: '1px solid #A6A6A6', textAlign: 'center', verticalAlign: 'middle', fontWeight: 'bold' }
                }]
            },
            {
                index: 8, cells: [{
                    index: 9, formula: '=B9+6',
                    style: { border: '1px solid #A6A6A6', textAlign: 'center', verticalAlign: 'middle', fontWeight: 'bold' }
                }]
            },
            {
                index: 9, cells: [{
                    index: 9, formula: '=B10+6',
                    style: { border: '1px solid #A6A6A6', textAlign: 'center', verticalAlign: 'middle', fontWeight: 'bold' }
                }]
            },
            {
                index: 10, cells: [{
                    index: 9, formula: '=B11+6',
                    style: { border: '1px solid #A6A6A6', textAlign: 'center', verticalAlign: 'middle', fontWeight: 'bold' }
                }]
            },
            {
                index: 11, cells: [{
                    index: 9, formula: '=B12+6',
                    style: { border: '1px solid #A6A6A6', textAlign: 'center', verticalAlign: 'middle', fontWeight: 'bold' }
                }]
            },
            {
                index: 12, cells: [{
                    index: 9, formula: '=B13+6',
                    style: { border: '1px solid #A6A6A6', textAlign: 'center', verticalAlign: 'middle', fontWeight: 'bold' }
                }]
            },
            {
                index: 13,
                cells: [{
                    index: 7, value: 'Total Gross',
                    style: columnSytle
                }, {
                    index: 8,
                    formula: '=Sum(I4:I13)', format: '$#,##0.00',
                    style: columnSytle
                }, {
                    index: 9, formula: '=Sum(J4:J13)',
                    style: columnSytle
                }]
            }
            ],
            columns: column
        }];
    //Initialize the SpreadSheet control
    var spreadsheet = new ej.spreadsheet.Spreadsheet({
        sheets: sheet,
        height: '520px',
        openUrl: 'https://document.syncfusion.com/web-services/spreadsheet-editor/api/spreadsheet/open',
        saveUrl: 'https://document.syncfusion.com/web-services/spreadsheet-editor/api/spreadsheet/save',
        /* custom code start */
        dataBound: function() {
            if (isAiTabCreated && spreadsheet.ribbonModule && spreadsheet.ribbonModule.ribbon && spreadsheet.ribbonModule.ribbon.items && 
                spreadsheet.ribbonModule.ribbon.items[spreadsheet.ribbonModule.ribbon.items.length - 1].header.text !== 'AI Assistant') {
                addAiAssistantTab(spreadsheet);
            }
        },
        /* custom code end */
        created: function() {
            spreadsheet.merge('A1:I2');
            spreadsheet.setBorder({ border: '1px solid #A6A6A6' }, 'A1:I13');
            spreadsheet.cellFormat({ textAlign: 'center', verticalAlign: 'middle' }, 'A3:I13');
            spreadsheet.cellFormat({ backgroundColor: '#B3FFB3', fontWeight: 'bold' }, 'A3:I3');
            spreadsheet.numberFormat('$#,##0.00', 'H4:I13');
            spreadsheet.wrap('H3:I3');
            addAiAssistantTab(spreadsheet);
            /* custom code start */
            isAiTabCreated = true;
            /* custom code end */
            spreadsheet.addDataValidation({ type: 'Time', operator: 'LessThan', value1: '9:00:00 AM', ignoreBlank: false }, 'E4:E13');
            spreadsheet.addDataValidation({ type: 'Time', operator: 'LessThan', value1: '6:00:00 PM', ignoreBlank: false }, 'F4:F13');
            spreadsheet.addDataValidation({ type: 'WholeNumber', operator: 'LessThan', value1: '10', ignoreBlank: false }, 'G4:G13');
            spreadsheet.addDataValidation({ type: 'WholeNumber', operator: 'LessThan', value1: '250', ignoreBlank: false }, 'H4:H13');
            spreadsheet.addDataValidation({ type: 'WholeNumber', operator: 'LessThan', value1: '300', ignoreBlank: false }, 'I4:I13');
        }
    });
    spreadsheet.appendTo('#spreadsheet');
    var spinEle = document.getElementById('spreadsheet');
    ej.popups.createSpinner({
        target: spinEle,
        cssClass: 'e-spin-large',
        width: '150px'
    });
    if (spreadsheet.element) {
        var sidebarObj = new ej.navigations.Sidebar({
            width: "500px",
            target: "#spreadsheet-maincontent",
            position: 'Right',
            closeOnDocumentClick: false,
            showBackdrop: false,
        });
        sidebarObj.appendTo("#defaultSidebar");
        sidebarObj.toggle();

        if (!ej.base.isNullOrUndefined(document.getElementById('close'))) {
            document.getElementById('close').onclick = function() {
                sidebarObj.hide();
            };
        }
    }

    function addAiAssistantTab(spreadsheet) {
        spreadsheet.addRibbonTabs([{
            header: { text: 'AI Assistant' }, content: [
                {
                    text: 'Full Sheet Analysis', tooltipText: 'Full Sheet Analysis',
                    click: function() {
                        fullSheetAnalysis();
                    }
                },
                {
                    text: 'Validate', tooltipText: 'Validate formulae',
                    click: function() {
                        formulaValidate();
                    }
                },
                {
                    text: 'Generate Formula', tooltipText: 'Generate Formula',
                    click: function () {
                        generateFormula();
                    }
                }
            ]
        }]);
    }

    function fullSheetAnalysis() {
        if (currentAIFeature === 'formula' && !ej.base.isNullOrUndefined(aiinstance)) {
            aiinstance.destroy();
            aiinstance = null;
        }
        currentAIFeature = 'analysis';
        spreadsheet.saveAsJson().then(function(data) {
            ej.popups.showSpinner(spinEle);
            var processedString = processDataSource(data);
            var query = 'Analyze the full data in this data. ' + processedString;
            var aiOutput = window.serverAIRequest({ messages: [{ role: 'user', content: query }] });
            aiOutput.then(function (result) {
                if (result) {
                    result = markdownToPlainText(result);
                    renderAssistView(result);
                    sidebarObj.show();
                } else {
                    console.log('No result data from AI Service');
                }
                ej.popups.hideSpinner(spinEle);
            }).catch(function(error) {
                console.error('AI Analysis Error:', error);
                ej.popups.hideSpinner(spinEle);
            });
        });
    }

    function formulaValidate() {
        var selectedCell = spreadsheet.sheets[spreadsheet.activeSheetIndex].selectedRange;
        var isFormulaAvailable = false;
        if (!ej.base.isNullOrUndefined(selectedCell)) {
            ej.popups.showSpinner(spinEle);
            spreadsheet.getData(selectedCell).then(function (data) {
                var currentCells = Array.from(data.keys());
                var query = 'Validate the below formulae and provide me the problem in it. Strictly provide the data for each validated response in a flat JSON with fields `cell` to hold the spreadsheet cell value and `response` to hold the problem and solution.';
                for (var a = 0; a < currentCells.length; a++) {
                    var cellFormula = data.get(currentCells[a]).formula;
                    if (!ej.base.isNullOrUndefined(cellFormula)) {
                        isFormulaAvailable = true;
                        query += 'Spreadsheet cell - ' + currentCells[a] + ' - Formula - ' + cellFormula + ' - ' + processString(cellFormula);
                    }
                }
                if (isFormulaAvailable) {
                    var aiOutput = window.serverAIRequest({ messages: [{ role: 'user', content: query }] });
                    aiOutput.then(function (result) {
                        if (result) {
                            try {
                                var cleanedResponseText = result;
                                if (result.includes('```json')) {
                                    cleanedResponseText = result.split('```json')[1].trim();
                                    cleanedResponseText = cleanedResponseText.split("```")[0].trim();
                                }
                                var responseJson = JSON.parse(cleanedResponseText);
                                for (var a = 0; a < responseJson.length; a++) {
                                    spreadsheet.updateCell({ notes: { text: responseJson[a].response } }, responseJson[a].cell);
                                }
                            } catch (error) {
                                console.error('JSON Parse Error:', error);
                                ej.popups.hideSpinner(spinEle);
                            }
                        } else {
                            console.error('No response from AI service. AI Parse error');
                            ej.popups.hideSpinner(spinEle);
                        }
                        ej.popups.hideSpinner(spinEle);
                    }).catch(function(error) {
                        console.error('AI Analysis Error:', error);
                        ej.popups.hideSpinner(spinEle);
                    });
                } else {
                    ej.popups.hideSpinner(spinEle);
                    console.log('No formulas found in the selected cells. Please select cells containing formulas to validate.');
                }
            });
        }
    }

    function generateFormula() {
        if (currentAIFeature === 'analysis' && !ej.base.isNullOrUndefined(aiinstance)) {
            aiinstance.destroy();
            aiinstance = null;
        }
        currentAIFeature = 'formula';
        renderAssistViewForFormula(prompts);
        sidebarObj.show();
    }

    function renderAssistViewForFormula(response) {
        if (ej.base.isNullOrUndefined(aiinstance)) {
            aiinstance = new ej.interactivechat.AIAssistView({
                promptPlaceholder: "Type your prompt for assistance...",
                prompts: prompts,
                promptRequest: promptHandler
            });
            aiinstance.appendTo('#defaultAIAssistView');
        }
    }

    function promptHandler(args) {
        var prompt = args.prompt;
        spreadsheet.saveAsJson().then(function(data) {
            var processedString = processDataSource(data);
            var query = prompt + '. Strictly provide the excel formula for the Excel sheet data which is provided as JSON below. /n' + processedString;
            var aiOutput = window.serverAIRequest({ messages: [{ role: 'user', content: query }] });
            aiOutput.then(function(result) {
                if (result) {
                    var cleanedResponseText = result.split('```excel')[1].trim();
                    cleanedResponseText = cleanedResponseText.split('```')[0].trim();
                    aiinstance.addPromptResponse(cleanedResponseText);
                } else {
                    console.error('No response from AI service. AI Parse error');
                }
            }).catch(function(error) {
                console.error('AI Analysis Error:', error);
            });
        });
    }

    function removeKeys(array, keysToRemove, cellsKeys) {
        array.forEach(function(obj) {
            keysToRemove.forEach(function(key) {
                if (key === 'cells') {
                    if (obj && obj.cells && obj.cells.length > 0) {
                        removeKeys(obj.cells, cellsKeys);
                    }
                } else {
                    if (obj && obj[key]) {
                        delete obj[key];
                    }
                }
            });
        });
        return array;
    }

    function processDataSource(data) {
        var dataSource = removeKeys(
            data.jsonObject.Workbook.sheets[spreadsheet.activeSheetIndex].rows, 
            ['height', 'cells'], 
            ['style', 'wrap', 'validation', 'colSpan', 'rowSpan']
        );
        var processedString = JSON.stringify(dataSource);
        return processedString.replace(/{}/g, 'null');
    }

    function renderAssistView(response) {
        if (ej.base.isNullOrUndefined(aiinstance)) {
            aiinstance = new ej.interactivechat.AIAssistView({
                promptPlaceholder: "Type your prompt for assistance...",
                prompts: [{ prompt: '', response: response }]
            });
            aiinstance.appendTo('#defaultAIAssistView');
        } else {
            aiinstance.prompts = [{ prompt: '', response: response }];
        }
    }

    function processString(forumlaString) {
        var processedString = '';
        var regex = /\(([^)]+)\)/g;
        var matches = [];
        var match;
        while ((match = regex.exec(forumlaString)) !== null) {
            var text = match[1];
            matches = text.split(/[:+\-*=/]/).map(function (s) { return s.trim(); }).filter(function (s) { return s !== ''; });
        }
        if (ej.base.isNullOrUndefined(matches) || matches.length <= 0) {
            matches = forumlaString.split(/[:+\-*=/]/).map(function (s) { return s.trim(); }).filter(function (s) { return s !== ''; });
        }
        if (matches.length > 0) {
            for (var i = 0; i < matches.length; i++) {
                var indexes = cellAddressToIndexes(matches[i]);
                var rowIndex = indexes.rowIndex;
                var columnIndex = indexes.columnIndex;
                if (rowIndex != null && columnIndex != null) {
                    processedString += 'Value of the cell ' + matches[i] + ' is ' + ej.spreadsheet.getCell(rowIndex, columnIndex, spreadsheet.sheets[spreadsheet.activeSheetIndex]).value + '/n';
                }
            }
        }
        return processedString;
    }

    function cellAddressToIndexes(cellAddress) {
        var match = cellAddress.match(/^([A-Z]+)(\d+)$/);
        var rowIndex;
        var columnIndex;
        if (!match) {
            rowIndex = null;
            columnIndex = null;
            return { rowIndex: rowIndex, columnIndex: columnIndex };
        }
        var columnLetters = match[1];
        var rowNumber = parseInt(match[2], 10);
        columnIndex = 0;
        for (var i = 0; i < columnLetters.length; i++) {
            columnIndex = columnIndex * 26 + (columnLetters.charCodeAt(i) - 'A'.charCodeAt(0));
        }
        rowIndex = rowNumber - 1;
        return { rowIndex: rowIndex, columnIndex: columnIndex };
    }

    function markdownToPlainText(markdown) {
        markdown = markdown.replace(/^###### (.+)$/gm, '<h6>$1</h6>');
        markdown = markdown.replace(/^##### (.+)$/gm, '<h5>$1</h5>');
        markdown = markdown.replace(/^#### (.+)$/gm, '<h4>$1</h4>');
        markdown = markdown.replace(/^### (.+)$/gm, '<h3>$1</h3>');
        markdown = markdown.replace(/^## (.+)$/gm, '<h2>$1</h2>');
        markdown = markdown.replace(/^# (.+)$/gm, '<h1>$1</h1>');

        // Replace bold and italic
        markdown = markdown.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
        markdown = markdown.replace(/\*(.+?)\*/g, '<em>$1</em>');

        // Replace lists
        markdown = markdown.replace(/^\* (.+)$/gm, '<ul>\n<li>$1</li>\n</ul>');
        markdown = markdown.replace(/^\d+\. (.+)$/gm, '<ol>\n<li>$1</li>\n</ol>');

        // Replace links
        markdown = markdown.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');

        // Replace line breaks with <br>
        markdown = markdown.replace(/\n/g, '<br>');

        // Replace empty lines with <p> tags
        markdown = markdown.replace(/(<br>){2,}/g, '</p>\n<p>');
        markdown = '<p>' + markdown + '</p>';
        return markdown;
    }
};