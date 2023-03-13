package com.epitech.dashboardpierre.demo.currencyExchange;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.reactive.function.client.WebClient;
//import org.springframework.web.reactive.function.client.WebClient.RequestBodySpec;
//import org.springframework.web.reactive.function.client.WebClient.UriSpec;

@SpringBootApplication
@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class currencyLayerController {
    private final String API_KEY = "4lWX43bG3EKOe9wIS1LRyKzjLynO540B";

    WebClient client = WebClient.create("https://api.currencylayer.com");
    
    @GetMapping("/live")
    public void getLiveTradeRate( @RequestParam String source, @RequestBody String[] currencies) {
        //if (source == null || source == "") return null;
        //if (currencies == null || currencies.length == 0) return null;
        String currenciesToString = String.join(",", currencies);
        System.out.println(source);
        System.out.println(currencies);
        System.out.println(currenciesToString);
        WebClient.ResponseSpec responseSpec = client
            .get()
            .uri(String.format("/live?source=%s&currencies=%s", source, currenciesToString))
            .header("apikey", API_KEY)
            .retrieve();
        //TradeRate responseBody = responseSpec.bodyToMono(TradeRate.class).block();
        String responseBody = responseSpec.bodyToMono(String.class).block();
        System.out.println(responseBody);
    }
    
}
