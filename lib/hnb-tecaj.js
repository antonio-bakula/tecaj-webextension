class CurrencyList {

  constructor(listData) {

    let firstLine = '';
    let lines = listData.split('\r\n').filter(function(ln) { return ln.length != 0 });
    if (lines.length > 0) {
      firstLine = lines[0];
    }
    this.Header = new CurrencyHeader(firstLine);

    this.Items = new Array();
    for (i = 1; i < lines.length; i++) {
      let item = new CurrencyItem(lines[i]);
      this.Items.push(item);
    }
  }

}

class CurrencyHeader {
  constructor(lineData) {
    this.ListNumber = 0;
    this.CreationDate = null;
    this.UsageDate = null;
    if (lineData.length >= 19) {
      this.ListNumber = parseIntZeroDefault(lineData.substr(0, 3));
      this.CreationDate = parseShortDate(lineData.substr(3, 8), 'ddMMyyyy');
      this.UsageDate = parseShortDate(lineData.substr(11, 8), 'ddMMyyyy');
    }
  }
}

class CurrencyItem {
  constructor(lineData) {
    // example: 978EUR001       7,458652       7,481095       7,503538
    this.Code = "";
    this.Abbrevation = "";
    this.Unit = 1;
    this.BuyingRate = 0;
    this.MiddleRate = 0;
    this.SellingRate = 0;
    if (lineData >= 51) {
      this.Code = lineData.substr(0, 3);
      this.Abbrevation = lineData.substr(3, 3);
      this.Unit = parseIntZeroDefault(lineData.substr(6, 3));
      this.BuyingRate = parseFloatZeroDefault(lineData.substr(9, 15).replace(',', '.'));
      this.MiddleRate = parseFloatZeroDefault(lineData.substr(24, 15).replace(',', '.'));
      this.SellingRate = parseFloatZeroDefault(lineData.substr(39, 15).replace(',', '.'));
    }
  }

  calculateDomesticAmount(currencyAmount) {

  }

  calculateCurrencyAmount(domesticAmount) {

  }
}