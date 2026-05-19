this.default = function () {
  // Initialize button
  var normalbtn = new ej.buttons.Button();
  normalbtn.appendTo('#normalbtn');
  normalbtn.element.onclick = createPdf;
  this.createPdf = createPdf;
  // Create PDF document with RTL text
  function createPdf() {
    var pdf = new ej.pdf.PdfDocument();
    var pageSettings = new ej.pdf.PdfPageSettings({ margins: new ej.pdf.PdfMargins(40) });
    var page = pdf.addPage(pageSettings);
    var g = page.graphics;
    // Load fonts for Arabic and Hebrew as promises
    Promise.all([fetchAsUint8Array(input1), fetchAsUint8Array(input2)])
      .then(function (results) {
        var arabicBytes = results[0];
        var hebrewBytes = results[1];
        var brush = new ej.pdf.PdfBrush({ r: 0, g: 0, b: 0 });
        var clientBounds = g.clientSize;
        var arabicRect = { x: 0, y: 0, width: clientBounds.width, height: 200 };
        var hebrewRect = { x: 0, y: 200, width: clientBounds.width, height: clientBounds.height - 200 };
        // Right-to-left string format
        var rtlFormat = new ej.pdf.PdfStringFormat();
        rtlFormat.textDirection = ej.pdf.PdfTextDirection.rightToLeft;
        rtlFormat.alignment = ej.pdf.PdfTextAlignment.right;
        // Draw Arabic text
        var arabicFont = new ej.pdf.PdfTrueTypeFont(arabicBytes, 13);
        g.drawString(
          "سنبدأ بنظرة عامة مفاهيمية على مستند PDF بسيط. تم تصميم هذا الفصل ليكون توجيهًا مختصرًا قبل الغوص في مستند حقيقي وإنشاءه من البداية.\nيمكن تقسيم ملف PDF إلى أربعة أجزاء: الرأس والجسم والجدول الإسناد الترافقي والمقطورة. يضع الرأس الملف كملف PDF ، حيث يحدد النص المستند المرئي ، ويسرد جدول الإسناد الترافقي موقع كل شيء في الملف ، ويوفر المقطع الدعائي تعليمات حول كيفية بدء قراءة الملف.\nرأس الصفحة هو ببساطة رقم إصدار PDF وتسلسل عشوائي للبيانات الثنائية. البيانات الثنائية تمنع التطبيقات الساذجة من معالجة ملف PDF كملف نصي. سيؤدي ذلك إلى ملف تالف ، لأن ملف PDF يتكون عادةً من نص عادي وبيانات ثنائية (على سبيل المثال ، يمكن تضمين ملف خط ثنائي بشكل مباشر في ملف PDF).",
          arabicFont,
          arabicRect,
          brush,
          rtlFormat
        );
        // Draw Hebrew text
        var hebrewFont = new ej.pdf.PdfTrueTypeFont(hebrewBytes, 13);
        g.drawString(
          "לאחר הכותרת והגוף מגיע טבלת הפניה המקושרת. הוא מתעדת את מיקום הבית של כל אובייקט בגוף הקובץ. זה מאפשר גישה אקראית של המסמך, ולכן בעת עיבוד דף, רק את האובייקטים הנדרשים עבור דף זה נקראים מתוך הקובץ. זה עושה מסמכי PDF הרבה יותר מהר מאשר קודמיו PostScript, אשר היה צריך לקרוא את כל הקובץ לפני עיבוד זה.",
          hebrewFont,
          hebrewRect,
          brush,
          rtlFormat
        );
        // Save and destroy PDF
        pdf.save('RTLText.pdf');
        pdf.destroy();
      })
      .catch(function (err) {
        console.error('Failed to create PDF:', err);
        alert('Failed to create RTL PDF.');
      });
  }
};
// Font URLs
var input1 = 'https://cdn.syncfusion.com/content/pdf-resources/noto-naskh-arabic-regular.ttf';
var input2 = 'https://cdn.syncfusion.com/content/pdf-resources/noto-sans-hebrew-medium.ttf';
// Helper: fetch font as Uint8Array
function fetchAsUint8Array(url) {
  return fetch(url, { cache: 'no-cache' })
    .then(function (res) {
      if (!res.ok) throw new Error("Failed to fetch " + url + ": " + res.status + " " + res.statusText);
      return res.arrayBuffer();
    })
    .then(function (buf) {
      return new Uint8Array(buf);
    });
}