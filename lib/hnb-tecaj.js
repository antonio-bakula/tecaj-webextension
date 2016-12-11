class CurrencyList {

  constructor(listData) {

    let lines = listData.split('\r\n').filter(function(ln) {return ln.length != 0});
    if (lines.length > 1)
    {                
      this.Header = lines[0];
    }
    
    this.Items = new Array();
    for (i = 1; i<lines.length; i++)
    {
      let item = new CurrencyItem(lines[i]);
      this.Items.push(item);
    }
  }

}

class CurrencyHeader
{
  constructor(lineData) {
    this.ListNumber = 0;
    this.CreationDate = null;
    this.UsageDate = null;    
    if (lineData.length >= 19)
    {
      let nn = Number.parseInt(lineData.substr(0, 3));
      if (nn != NaN){
        this.ListNumber = nn;
      }
      let cdat = lineData.substr(3, 8);
      let udat = lineData.substr(11, 8);
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
  }

  calculateDomesticAmount(currencyAmount) {

  }

  calculateCurrencyAmount(domesticAmount) {

  }
}
