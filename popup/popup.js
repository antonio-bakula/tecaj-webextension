function initPopup() {
  var hnbfetch = new HnbDataDownloader();
  hnbfetch.getData(new Date());
  var list = new CurrencyList(hnbfetch.Data);
  for (var i = 0; i < list.Items.length; i++) {
    var currency = list.Items[i];
    var listItemText = currency.Unit + " <strong>" + currency.Abbrevation + '</strong>=' + currency.Rate.MiddleRate + " kn";
    var listItemHtml = String.format('<li id="curr-{0}" class="tecaj-item" value="{1}">{2}</li>', currency.Code, currency.Rate.MiddleRate, listItemText);
    $('#currency-list').append($(listItemHtml));

    $('.tecaj-item').click(function() {

    });
  }
}

initPopup();