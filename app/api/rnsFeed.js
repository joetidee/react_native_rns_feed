'use strict';

var Api = {
    fetchRss(stockCode){
        //var url = "http://www.londonstockexchange.com/exchange/CompanyNewsRSS.html?newsSource=RNS&companySymbol=" + stockCode;
        var url = "http://www.londonstockexchange.com/exchange/CompanyNewsRSS.html?newsSource=RNS&sectorId=8350";
        return fetch(url).then((res) => {
            return res;
        }).catch((err) => {
            return err;
        });
    }
};

module.exports = Api;