if (!String.format) {
  String.format = function(format) {
    var args = Array.prototype.slice.call(arguments, 1);
    return format.replace(/{(\d+)}/g, function(match, number) { 
      return typeof args[number] != 'undefined'
        ? args[number] 
        : match
      ;
    });
  };
}

function roundOnTwoDecimals(num) {
  return Math.round(num * 100) / 100;
}

function parseFloatZeroDefault(strnum) {
  var num = Number.parseFloat(strnum);
  if (num == NaN) {
    num = 0;
  }
  return num;
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
    var tokens = ["y", "M", "d"];
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

  var year = parseShortDate_GetPartValue(parts, patternParts, "y");
  var month = parseShortDate_GetPartValue(parts, patternParts, "M") - 1;
  var day = parseShortDate_GetPartValue(parts, patternParts, "d");
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
  var picker = jQuery(selector);
  var date = parseShortDate(shortDate, g_currentShortDateFormat);
  if (date != null)
    picker.datepicker("setDate", date);
}