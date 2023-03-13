package com.epitech.dashboardpierre.demo.currencyExchange;

import java.util.HashMap;

public class TradeRate {
    public HashMap<String, Float> quotes = new HashMap<String, Float>();
    public String source ;
    public int timestamp ;
    
    public TradeRate() {
    }

    public HashMap<String, Float> getQuotes() {
        return quotes;
    }

    public void setQuotes(HashMap<String, Float> quotes) {
        this.quotes = quotes;
    }

    public String getSource() {
        return source;
    }

    public void setSource(String source) {
        this.source = source;
    }

    public int getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(int timestamp) {
        this.timestamp = timestamp;
    }
}
