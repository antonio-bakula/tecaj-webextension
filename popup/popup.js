var _selectedCurrency = null;
var _currencyList = null;
var _lastInputChanged = "";

function initPopup() {

  if (_currencyList != null) {
    return;
  }

  var hnbfetch = new HnbDataDownloader();
  hnbfetch.getData(new Date());

  _currencyList = new CurrencyList(hnbfetch.Data);
  for (var i = 0; i < _currencyList.Items.length; i++) {
    var currency = _currencyList.Items[i];
    var listItemText = getCurrencyTitleMarkup(currency);
    var listItemHtml = String.format('<li id="curr-{0}" class="tecaj-item" value="{1}">{2}</li>', currency.Code, currency.Code, listItemText);
    $('#currency-list').append($(listItemHtml));
  }

  $('.tecaj-item').click(function () {
    var ccode = $(this).val();
    setCalculator(ccode);
    return false;
  });

}

function setCalculator(currencyCode) {
  _selectedCurrency = _currencyList.findItem(currencyCode);
  if (_selectedCurrency == null) {
    return;
  }

  $('#menu-form').hide();
  $('#calculator-form').show();

  $('#calculator-title-currency').html(getCurrencyTitleMarkup(_selectedCurrency));
  $('#label-foreing-currency').text(_selectedCurrency.Abbrevation);

  $('#domestic-currency').change(function () {
    _lastInputChanged = 'domestic';
    performUiCalculate();
  });

  $('#foreign-currency').change(function () {
    _lastInputChanged = 'foreign';
    performUiCalculate();
  });

  $('#button-calculate').click(function () {
    performUiCalculate();
    return false;
  });

}

function performUiCalculate() {
  if (_selectedCurrency != null) {
    var amountDom = parseFloatZeroDefault($('#domestic-currency').val());
    var amountFrg = parseFloatZeroDefault($('#foreign-currency').val());
    var logCalc = "";

    var lastValue = 0;
    var lastItem = $('.result-item').first();
    if (lastItem.length > 0) {
      lastValue = lastItem.val();
    }

    var calculated = 0;
    if (_lastInputChanged == 'foreign') {
      var rate = _selectedCurrency.calculateDomesticAmount(amountFrg);
      calculated = rate.MiddleRate;
      $('#domestic-currency').val(rate.MiddleRate.toString());
      logCalc = String.format("{0} {1} = {2} kn", amountFrg, _selectedCurrency.Abbrevation, calculated);
    }
    else {
      var rate = _selectedCurrency.calculateCurrencyAmount(amountDom);
      calculated = rate.MiddleRate;
      $('#foreign-currency').val(rate.MiddleRate.toString());
      logCalc = String.format("{0} kn = {1} {2}", amountDom, calculated, _selectedCurrency.Abbrevation);
    }

    var litemValue = Math.floor(calculated * 100); // list value is integer
    if (calculated > 0 && litemValue != lastValue) {
      var logLine = String.format('<li class="result-item" value="{0}">{1}</li>', litemValue, logCalc);
      $('#calculation-results').prepend($(logLine));
      setTimeout(function () {
        $('.result-item').first().addClass("show");
      }, 10);
    }

  }
}

function getCurrencyTitleMarkup(currency) {
  return currency.Unit + " <strong>" + currency.Abbrevation + '</strong> = ' + currency.Rate.MiddleRate + " kn";
}

initPopup();