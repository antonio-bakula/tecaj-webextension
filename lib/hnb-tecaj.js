class CurrencyList {

  constructor(listData) {

    let firstLine = '';
    let lines = listData.split('\n').filter(ln => ln.length != 0);
    if (lines.length > 0) {
      firstLine = lines[0];
    }
    this.Header = new CurrencyHeader(firstLine);

    this.Items = new Array();
    for (var i = 1; i < lines.length; i++) {
      let item = new CurrencyItem(lines[i]);
      this.Items.push(item);
    }
  }

  findItem(currencyCode) {
    var codeItem = this.Items.find(ci => ci.Code == currencyCode);
    if (codeItem != undefined) {
      return codeItem;
    }
    return null;
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
    this.Code = "";
    this.Abbrevation = "";
    this.Unit = 1;
    this.Rate = new CurrencyRateItem();
    if (lineData.length >= 51) {
      this.Code = lineData.substr(0, 3);
      this.Abbrevation = lineData.substr(3, 3);
      this.Unit = parseIntZeroDefault(lineData.substr(6, 3));
      this.Rate.BuyingRate = parseFloatZeroDefault(lineData.substr(9, 15).replace(',', '.'));
      this.Rate.MiddleRate = parseFloatZeroDefault(lineData.substr(24, 15).replace(',', '.'));
      this.Rate.SellingRate = parseFloatZeroDefault(lineData.substr(39, 15).replace(',', '.'));
    }
  }

  /* Calculate: Currency => HRK  */
  calculateDomesticAmount(currencyAmount) {
    var result = new CurrencyRateItem();
    result.BuyingRate = roundOnTwoDecimals(currencyAmount * (this.Rate.BuyingRate / this.Unit));
    result.MiddleRate = roundOnTwoDecimals(currencyAmount * (this.Rate.MiddleRate / this.Unit));
    result.SellingRate = roundOnTwoDecimals(currencyAmount * (this.Rate.SellingRate / this.Unit));
    return result;
  }

  /* Calculate: HRK => Currency  */
  calculateCurrencyAmount(domesticAmount) {
    //rez = (tcIznos / tecajJed) * editVal;
    var result = new CurrencyRateItem();
    result.BuyingRate = roundOnTwoDecimals(domesticAmount / (this.Rate.BuyingRate / this.Unit));
    result.MiddleRate = roundOnTwoDecimals(domesticAmount / (this.Rate.MiddleRate / this.Unit));
    result.SellingRate = roundOnTwoDecimals(domesticAmount / (this.Rate.SellingRate / this.Unit));
    return result;
  }

}

class CurrencyRateItem {
  constructor() {
    this.BuyingRate = 0;
    this.MiddleRate = 0;
    this.SellingRate = 0;
  }
}

class HnbDataDownloader {

  constructor() {
    this.CurrencyListDate = null;
    this.Data = '';
    this.Filename = '';
  }

  getData(currencyListDate) {
    this.CurrencyListDate = currencyListDate;
    this.Filename = "f" + formatShortDate(this.CurrencyListDate, 'ddMMyy') + '.dat';
    var host = "http://www.hnb.hr/";
    var currencyRateListUrl = host + 'tecajn/' + this.Filename;
    var data = '';
    $.ajax({
      type: 'GET',
      headers: { 'Access-Control-Allow-Origin': host },
      url: currencyRateListUrl,
      success: function(resp) {
        data = resp;
      },
      async: false
    });
    this.Data = data;
  }

}