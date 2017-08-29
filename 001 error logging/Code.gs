//Error logging in the spreadsheet
function logErrors(err) {
  //logging errors in the spreadsheet:
  const ERROR_SPREADSHEET_ID = '1ay-L5zllizKWSqz-S1x6f5mo-51S-uCnIaaZArO2r4o';
  var errorSheet = SpreadsheetApp.openById(ERROR_SPREADSHEET_ID).getSheetByName('Errors');
  var cell = errorSheet.getRange('A1').offset(errorSheet.getLastRow(),0);
  cell.setValue(new Date() + " function logErrors: " + err);

  Logger.log(err);
}

//https://developers.google.com/apps-script/guides/html/best-practices
//create include function and use it in html: <?!= include('Stylesheet'); ?>
function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename)
      .setSandboxMode(HtmlService.SandboxMode.IFRAME)
      .getContent();
}

//web app
function doGet() {
  //var html = HtmlService.createHtmlOutput('<h2>Hello World</h2>');
  //createHtmlOutputFromFile(<FileName>)
  try {
    var html = HtmlService.createTemplateFromFile("index.html").evaluate(); //.getContent();
    html.setTitle("Book: GAS 01");
    //var x=t;
  } catch (err) {
    logErrors(err);
    html.setContent(err.name + ' on line: ' + err.lineNumber + ' -> ' + err.message);
  }
  return html;
}

