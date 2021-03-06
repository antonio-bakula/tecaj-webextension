class TecajOptions {

  constructor() {
    this.setDefaultOptions();
    this.readFromPersistantStorage();
  }

  setDefaultOptions() {
    this.ShowCurrencyListOnStart = true;
    this.ShowCurrencyRateTypes = true;
    this.DefaultRateType = "s";
    this.CalculatorFormFocus = "c";
  }

  readFromPersistantStorage() {
    var showListOnStart = localStorage.ShowCurrencyListOnStart;
    if (showListOnStart != undefined) {
      this.ShowCurrencyListOnStart = showListOnStart == 'true';
    }

    var showRateTypes = localStorage.ShowCurrencyRateTypes;
    if (showRateTypes != undefined) {
      this.ShowCurrencyRateTypes = showRateTypes == 'true';
    }

    var rateType = localStorage.DefaultRateType;
    if (rateType != undefined) {
      this.DefaultRateType = rateType;      
    }

    var calcFormFocus = localStorage.CalculatorFormFocus;
    if (calcFormFocus != undefined) {
      this.CalculatorFormFocus = localStorage.CalculatorFormFocus;
    }
  }

  writeToPersistantStorage() {
    localStorage.ShowCurrencyListOnStart = this.ShowCurrencyListOnStart;
    localStorage.ShowCurrencyRateTypes = this.ShowCurrencyRateTypes;
    localStorage.DefaultRateType = this.DefaultRateType;
    localStorage.CalculatorFormFocus = this.CalculatorFormFocus;
  } 

  storeUiLastUsedValue(key, value) {
    localStorage.setItem(key, value);
  }

  readUiLastUsedValue(key) {
    return localStorage.getItem(key);
  }
}

function roundOnTwoDecimals(num) {
  return Math.round(num * 100) / 100;
}

function parseFloatZeroDefault(strnum) {
  if (strnum)
  {
  var num = Number.parseFloat(strnum);
  if (num == NaN) {
    num = 0;
  }
  return num;
  }
  else
  {
    return 0;
  }
}

function parseIntZeroDefault(strnum) {
  var num = Number.parseInt(strnum);
  if (num == NaN) {
    num = 0;
  }
  return num;
}

function formatShortDate(date, pattern) {
  var m, d, y;
  var result = pattern.replace('yyyy', y = '' + date.getFullYear())
    .replace('yy', y.substring(2))
    .replace('MM', zeroPad(m = date.getMonth() + 1))
    .replace('M', m)
    .replace('dd', zeroPad(d = date.getDate()))
    .replace('d', d);
  return result;
}

function zeroPad(n) { return (+n < 10 ? '0' : '') + n }

function parseShortDate(dateStr, pattern) {
  var delimiter = ".";
  if (pattern.indexOf("/") != -1)
    delimiter = "/";
  else if (pattern.indexOf("-") != -1)
    delimiter = "-";

  var patternParts = [];
  var parts = [];
  if (pattern.indexOf(delimiter) != -1) {
    // pattern ima delimiter
    patternParts = parseShortDate_removeEmpty(pattern.split(delimiter));
    parts = parseShortDate_removeEmpty(dateStr.split(delimiter));
  } else {
    // pattern nema delimiter
    patternParts = ['', '', ''];
    parts = ['', '', ''];
    var tokens = ['y', 'M', 'd'];
    for (var pp = 0; pp < pattern.length; pp++) {
      for (var tt = 0; tt < 3; tt++) {
        if (tokens[tt] == pattern[pp]) {
          patternParts[tt] += pattern[pp];
          var valueChar = '';
          if (dateStr.length > pp) {
            parts[tt] += dateStr[pp];
          }  
        }
      }
    }
  }

  if (patternParts.length != 3 || parts.length != 3)
    return null;

  var year = parseShortDate_GetPartValue(parts, patternParts, 'y');
  var month = parseShortDate_GetPartValue(parts, patternParts, 'M') - 1;
  var day = parseShortDate_GetPartValue(parts, patternParts, 'd');
  if (isNaN(year) || isNaN(month) || isNaN(day))
    return null;

  var result = new Date(year, month, day, 0, 0, 0, 0);
  if (isNaN(result))
    return null;
  else
    return result;
}

function parseShortDate_GetPartValue(parts, patternParts, id) {
  var idx = parseShortDate_findIndex(patternParts, id);
  if (idx == -1)
    return NaN;
  var strValue = parts[idx];
  var numValue = parseInt(strValue);
  return numValue;
}

function parseShortDate_findIndex(dataArr, id) {
  for (var i = 0; i < dataArr.length; i++) {
    if (dataArr[i].indexOf(id) != -1)
      return i;
  }
  return -1;
}

function parseShortDate_removeEmpty(dataArr) {
  var result = new Array();
  for (var i = 0; i < dataArr.length; i++) {
    if (dataArr[i])
      result.push(dataArr[i]);
  }
  return result;
}

function setDatePickerValue(selector, shortDate) {
  var picker = $(selector);
  var date = parseShortDate(shortDate, g_currentShortDateFormat);
  if (date != null)
    picker.datepicker('setDate', date);
}

function appendListItemWithClass(ulSelector, liClass, liValue, liText)
{
  return appendListItem(ulSelector, '', liClass, liValue, liText);
}

function appendListItemWithId(ulSelector, liID, liValue, liText)
{
  return appendListItem(ulSelector, liID, '', liValue, liText);
}

function appendListItem(ulSelector, liID, liClass, liValue, liText = '')
{
  var listItem = addListItemElement($(ulSelector)[0]);
  setListItem(listItem, liID, liClass, liValue, liText);
  return listItem;
}

function prependListItemWithClass(ulSelector, liClass, liValue, liText)
{
  return prependListItem(ulSelector, '', liClass, liValue, liText);
}

function prependListItemWithId(ulSelector, liID, liValue, liText)
{
  return prependListItem(ulSelector, liID, '', liValue, liText);
}

function prependListItem(ulSelector, liID, liClass, liValue, liText = '')
{
  var listItem = addListItemElement($(ulSelector)[0], false);
  setListItem(listItem, liID, liClass, liValue, liText);
  return listItem;
}

function setListItem(listItem, liID, liClass, liValue, liText = '') {

  if (liID) {
    listItem.ID = liID;
  }

  if (liClass) {
    listItem.classList.add(liClass);
  }

  if (liValue) {
    listItem.value = liValue;
  }

  if (liText) {
    listItem.appendChild(document.createTextNode(liText));
  }

}

function addListItemElement(ulElement, doAppend = true)
{
  var listItem = document.createElement('li');
  if (doAppend) {
    ulElement.appendChild(listItem);
  }
  else {
    ulElement.insertBefore(listItem, ulElement.firstChild)
  }
  return listItem;
}