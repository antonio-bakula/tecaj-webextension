class TecajOptions {

  constructor() {
    setDefaultOptions();
    readFromPersistantStorage();
  }

  setDefaultOptions() {
    this.ShowCurrencyListOnStart = true;
    this.ShowCurrencyRateTypes = true;
    this.DefaultCurrencyRateType = "s";
  }

  readFromPersistantStorage() {
    var showListOnStart = localStorage.ShowCurrencyListOnStart;
    if (showListOnStart != undefined) {
      this.ShowCurrencyListOnStart = showListOnStart;
    }

    var showRateTypes = localStorage.ShowCurrencyRateTypes;
    if (showRateTypes != undefined) {
      this.ShowCurrencyRateTypes = showRateTypes;
    }

    var defaultRateType = localStorage.DefaultCurrencyRateType;
    if (defaultRateType != undefined) {
      this.DefaultCurrencyRateType = defaultRateType;
    }
  }

  writeToPersistantStorage() {
    localStorage.ShowCurrencyListOnStart = this.ShowCurrencyListOnStart;
    localStorage.ShowCurrencyRateTypes = this.ShowCurrencyRateTypes;
    localStorage.DefaultCurrencyRateType = this.DefaultCurrencyRateType;
  }
 
}