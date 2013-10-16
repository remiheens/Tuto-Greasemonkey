// ==UserScript==
// @name       Tuto Credits Currency
// @namespace  fr.remiheens.tuto
// @version    0.1
// @description  display new currency for tuto credits 
// @match      https://fr.tuto.com/credits.html
// @match      https://fr.tuto.com/panier/credits/
// @copyright  2013+, Remi
// ==/UserScript==

var CURRENCY_CODE = 'USD';

// DO NOT MODIFY BELOW THIS LINE

var rate;
var items,span,label,price,new_price;
$.ajax({
    url : 'https://rate-exchange.appspot.com/currency?from=EUR&to='+CURRENCY_CODE,
    data : {},
    dataType: 'jsonp',
    success: function(json){
        if(json.rate)
        {
            rate = json.rate;
            items = $('.credit-pack-item');
            $.each(items,function(i,el){
                span = $(el).find('.col-label');
                label = span.html();
                price = label.match(/ ([0-9]{1,3}\.[0-9]{2}) /)[0];
                new_price = price * rate;
                
                $(span).append(' <em style="font-size:11px;text-transform:italic">'+$("<div>").html("&#177;").text()+new_price.toFixed(2)+'('+CURRENCY_CODE+')</em>');
            });
        }
    }
});