class HrkCurrencyList {

  constructor() {
    this.listDate = null;
    this.listNumber = "";
    this.items = [];
  }

  readList(data) {}

}

class CurrencyItem {
  constructor(currencyCode) {
    this.code = currencyCode;
    this.abbrevation = "";
    this.unit = 1;
    this.buyingRate = 0;
    this.middleRate = 0;
    this.sellingRate = 0;
  }

  readData(data) {
    // example:
  }

  calculateDomesticAmount(currencyAmount) {

  }

  calculateCurrencyAmount(domesticAmount) {

  }
}