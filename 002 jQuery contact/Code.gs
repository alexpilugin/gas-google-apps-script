//web app
function doGet() {
  //var html = HtmlService.createHtmlOutput('<h2>Hello World</h2>');
  //createHtmlOutputFromFile(<FileName>)
  try {
    var html = HtmlService.createTemplateFromFile("index.html").evaluate(); //.getContent();
    html.setTitle("GAS 02");
                
    //var x=t;
  } catch (err) {
    logErrors(err);
    html.setContent(err.name + ' on line: ' + err.lineNumber + ' -> ' + err.message);
  }
  return html;
}

//Error logging in the spreadsheet
function logErrors(err) {
  //logging errors in the spreadsheet:
  const SPREADSHEET_ID = '1L3xh3BDjjA5yVHp-0unvg-l1bBXIDx3cvSAuPewLYxg';
  var errorSheet = SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName('Errors'); //.getSheets()[0];
  var cell = errorSheet.getRange('A1').offset(errorSheet.getLastRow(),0);
  cell.setValue(new Date() + " function logErrors: " + err);

  Logger.log(err);
}

//https://developers.google.com/apps-script/guides/html/best-practices
//create include function and use it in html: <?!= include('Stylesheet'); ?>
function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename).getContent();
}

//RPC callBackremote procedure call
function addEmail(form){
  const SPREADSHEET_ID = '1L3xh3BDjjA5yVHp-0unvg-l1bBXIDx3cvSAuPewLYxg';
  var ss = SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName('Emails'); //.getSheets()[1];
  
  //.getRange(<row>, <column>, <numRows>, <numColumns>):
  //range is 2d array: [[row1 column1, row1 column2] , [row2 column1, row2 column2]]
  var range = ss.getRange(ss.getLastRow()+1, 1, 1, 2); 
  
  var values = [[new Date(), form.email]];
  range.setValues(values);
  
  Logger.log(form.email);
  return 200;
}

//RPC callBackremote procedure call
function addEmailFailure(form){
  Logger.log(form.email);
  return 500;
}