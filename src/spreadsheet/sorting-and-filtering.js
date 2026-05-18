/**
 * Filtering and sorting sample
 */
this.default = function () {
    //Initialize Spreadsheet component
    var spreadsheet = new ej.spreadsheet.Spreadsheet({
        sheets: [{
			name: 'Employee Details',
            ranges: [{
                dataSource: sortingAndFiltering,
                showFieldAsHeader: true
            }],
            columns: [{
                width: 110
            },
            {
                width: 142
            },
            {
                width: 80
            },
            {
                width: 137
            },
            {
                width: 122
            },
            {
                width: 92
            },
            {
                width: 124
            }]
        }],
        openUrl: 'https://document.syncfusion.com/web-services/spreadsheet-editor/api/spreadsheet/open',
        saveUrl: 'https://document.syncfusion.com/web-services/spreadsheet-editor/api/spreadsheet/save',
        created: function() {
            // Sorted B(Employee Name field) column in ascending order
            /* custom code start: spreadsheet formatting (visible in non-Arabic) */
            if (spreadsheet.locale === 'ar' || spreadsheet.locale.startsWith('ar')) {
                setTimeout(function() {
                    spreadsheet.sort({ sortDescriptors: { field: 'B' } }, 'A2:G51').then(function () {
                        spreadsheet.applyFilter([{ field: 'D', operator: 'equal', value: 'Services' }], 'A1:G51');
                    });
                    spreadsheet.cellFormat({ fontWeight: 'bold', textAlign: 'center' }, 'A1:G1');
                    spreadsheet.numberFormat('$#,##0.00', 'F2:F51');
                    spreadsheet.numberFormat('m/d/yyyy', 'E2:E51');
                });
                return;
            }
            /* custom code end */
            spreadsheet.cellFormat({ fontWeight: 'bold',  textAlign: 'center' }, 'A1:G1');
            spreadsheet.sort({ sortDescriptors: { field: 'B' } }, 'A2:G51').then(function() {
                spreadsheet.applyFilter([{ field: 'D', operator: 'equal', value: 'Services' }], 'A1:G51');
            });
            spreadsheet.numberFormat('m/d/yyyy', 'E2:E51');
            spreadsheet.numberFormat('$#,##0.00', 'F2:F51');
        }
    }
);
    //Render initialized Spreadsheet component
    spreadsheet.appendTo('#spreadsheet');
};
