class CurrencyList {

  constructor(listData) {

    let firstLine = '';
    let lines = listData.split('\n').filter(function (ln) { return ln.length != 0 });
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
    var codeItemArr = this.Items.filter(function (ci) { return ci.Code == currencyCode });
    if (codeItemArr.length > 0) {
      return codeItemArr[0];
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

  calculateDomesticAmount(currencyAmount) {    
    var result = new CurrencyRateItem(); 
    result.BuyingRate = currencyAmount / (this.BuyingRate / this.Unit);
    result.MiddleRate = currencyAmount / (this.MiddleRate / this.Unit);
    result.SellingRate = currencyAmount / (this.SellingRate / this.Unit);
    return result;
  }

  calculateCurrencyAmount(domesticAmount) {
    //rez = (tcIznos / tecajJed) * editVal;
    var result = new CurrencyRateItem(); 
    result.BuyingRate = (currencyAmount / this.Unit) / this.BuyingRate;
    result.MiddleRate = (currencyAmount / this.Unit) / this.MiddleRate;
    result.SellingRate = (currencyAmount / this.Unit) / this.SellingRate;
    return result;    
  }

}

class CurrencyRateItem
{
  constructor()
  {
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
    this.Filename =  "f" + formatShortDate(this.CurrencyListDate, 'ddMMyy') + '.dat';
    var host = "http://www.hnb.hr/";
    var currencyRateListUrl = host + 'tecajn/' + this.Filename;
    var data = '';
    $.ajax({
      type: 'GET',
      headers: { 'Access-Control-Allow-Origin': host },
      url: currencyRateListUrl,
      success: function (resp) {
        data = resp;
      },
      async: false
    });
    this.Data = data;
  }

}