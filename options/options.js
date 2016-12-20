let _currentOptions = null;


function initSettingsForm() {

  _currentOptions = new TecajOptions();
  CopyOptionsToUI();

  $('#options-form-button-default').click(function () {
    if (window.confirm('Da li ste sigurni da želite povratak na default posvke ?')) {
      _currentOptions.setDefaultOptions();
      _currentOptions.writeToPersistantStorage();
      CopyOptionsToUI();
    }
    return false;
  });

  $('#options-form-button-save').click(function () {
    CopyUIToOptions();
    _currentOptions.writeToPersistantStorage();  
    CopyOptionsToUI();
    return false;
  });
}

function CopyOptionsToUI() {
  $('#ShowCurrencyListOnStart').prop('checked', _currentOptions.ShowCurrencyListOnStart);
  $('#ShowCurrencyRateTypes').prop('checked', _currentOptions.ShowCurrencyRateTypes);
  $('#DefaultRateType').val(_currentOptions.DefaultRateType);
  $('#CalculatorFormFocus').val(_currentOptions.CalculatorFormFocus);
}

function CopyUIToOptions() {
  _currentOptions.ShowCurrencyListOnStart = $('#ShowCurrencyListOnStart').is(':checked');
  _currentOptions.ShowCurrencyRateTypes = $('#ShowCurrencyRateTypes').is(':checked');
  _currentOptions.DefaultRateType = $('#DefaultRateType').val();
  _currentOptions.CalculatorFormFocus = $('#CalculatorFormFocus').val();
}

initSettingsForm();