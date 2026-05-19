this.default = function () {
    // Render the PDF viewer control
    var viewer = new ej.pdfviewer.PdfViewer ({
    documentPath: "https://cdn.syncfusion.com/content/pdf/pdf-succinctly.pdf",
    resourceUrl:'https://cdn.syncfusion.com/ej2/23.2.6/dist/ej2-pdfviewer-lib'
});
    ej.pdfviewer.PdfViewer.Inject(ej.pdfviewer.Toolbar, ej.pdfviewer.Magnification, ej.pdfviewer.BookmarkView, ej.pdfviewer.ThumbnailView, ej.pdfviewer.TextSelection, ej.pdfviewer.TextSearch, ej.pdfviewer.Print, ej.pdfviewer.Navigation, ej.pdfviewer.LinkAnnotation, ej.pdfviewer.Annotation,  ej.pdfviewer.FormFields, ej.pdfviewer.FormDesigner,ej.pdfviewer.PageOrganizer);

    viewer.appendTo('#pdfViewer');
};