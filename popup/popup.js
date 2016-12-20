var _selectedCurrency = null;
var _selectedRateType = null;
var _currencyList = null;
var _lastInputChanged = "";
var _modal = null;
var _original_modal_height = 0;

var _root_element_selector = "#root-element";


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
    var listItemHtml = `<li id="curr-${currency.Code}" class="tecaj-item" value="${currency.Code}">${listItemText}</li>`;
    $('#currency-list').append($(listItemHtml));
  }

  $('.tecaj-item').click(function () {
    var ccode = $(this).val();
    setCalculator(ccode);
    return false;
  });

  $('#label-foreing-currency').click(function () {
    var cloned = $('#menu-form').clone(true, true);
    cloned.removeClass('menu-list-wide');
    cloned.show();
    if (_modal) {
      _modal.unmount();
    }
    _modal = new Modal(cloned[0], true, (function () {
      RestoreOriginalModalHeight();
    }));
    _modal.show();
    StoreOriginalModalHeightAndSetCustom(440);

    return false;
  });

  //setCalculator("840");
}

function setCalculator(currencyCode) {
  _selectedCurrency = _currencyList.findItem(currencyCode);
  if (_selectedCurrency == null) {
    return;
  }

  // ako je prikazan popup zatvori ga
  if (_modal) {
    RestoreOriginalModalHeight();
    _modal.unmount();
    _modal = null;
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

  // choice of rate types (buying, middle, selling)
  _selectedRateType = "s";
  $('.rt-s').addClass('rate-type-selected');
  
  $('.rate-type-anchor').click(function () {
    $('.rate-type-link').removeClass('rate-type-selected');
    $(this).parent().addClass('rate-type-selected');
    _selectedRateType = $(this).attr('data-rttp');
    $('#calculator-title-currency').html(getCurrencyTitleMarkup(_selectedCurrency));
    performUiCalculate();
    return false;
  });
  
}

function performUiCalculate() {
  if (_selectedCurrency != null) {
    var amountDom = parseFloatZeroDefault($('#domestic-currency').val());
    var amountFrg = parseFloatZeroDefault($('#foreign-currency').val());
    var logCalc = "";

    var calculated = 0;
    if (_lastInputChanged == 'foreign' && amountFrg) {
      var rate = _selectedCurrency.calculateDomesticAmount(amountFrg);
      calculated = getSelectedRateAmount(rate);
      $('#domestic-currency').val(getSelectedRateAmount(rate).toString());
      logCalc = `${amountFrg} ${_selectedCurrency.Abbrevation} = ${calculated} kn`;
    }
    else if (amountDom) {
      var rate = _selectedCurrency.calculateCurrencyAmount(amountDom);
      calculated = getSelectedRateAmount(rate);
      $('#foreign-currency').val(getSelectedRateAmount(rate).toString());
      logCalc = `${amountDom} kn = ${calculated} ${_selectedCurrency.Abbrevation}`;
    }

    if (calculated > 0) {
      logCalculationResult(calculated, logCalc);
    }

  }
}

function logCalculationResult(calcResult, calcLog) {
  var lastValue = 0;
  var lastItem = $('.result-item').first();
  if (lastItem.length > 0) {
    lastValue = lastItem.val();
  }

  var calcResultForCmp = Math.floor(calcResult * 100); // list value is integer
  if (lastValue != calcResultForCmp) {
    var logLine = `<li class="result-item" value="${calcResultForCmp}">${calcLog}</li>`;
    $('#calculation-results').prepend($(logLine));
    setTimeout(function () {
      $('.result-item').first().addClass("show");
    }, 10);
  }
}

function getCurrencyTitleMarkup(currency) {
  return currency.Unit + " <strong>" + currency.Abbrevation + '</strong> = ' + getSelectedRateAmount(currency.Rate) + " kn";
}

function StoreOriginalModalHeightAndSetCustom(customHeight) {
  var rootHg = $(_root_element_selector).height();
  if (rootHg < customHeight) {
    _original_modal_height = rootHg;
    $(_root_element_selector).height(customHeight);
  }
}

function RestoreOriginalModalHeight() {
  if (_original_modal_height != 0) {
    $(_root_element_selector).height(_original_modal_height);
    _original_modal_height = 0;
  }
}

function getSelectedRateAmount(rate)
{
  if (_selectedRateType == "k") {
    return rate.BuyingRate;
  }
  else if (_selectedRateType == "s") {
    return rate.MiddleRate;
  }
  else if (_selectedRateType == "p") {
    return rate.SellingRate;  
  }

  //fallback na srednji tečaj
  return rate.MiddleRate;
}

initPopup();