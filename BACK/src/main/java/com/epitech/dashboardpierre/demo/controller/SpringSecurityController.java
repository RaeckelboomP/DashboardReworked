package com.epitech.dashboardpierre.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.oauth2.client.OAuth2AuthorizedClient;
import org.springframework.security.oauth2.client.OAuth2AuthorizedClientService;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

public class SpringSecurityController {
    @Autowired
private OAuth2AuthorizedClientService authorizedClientService;

@GetMapping("/loginSuccess")
public String getLoginInfo(Model model, OAuth2AuthenticationToken authentication) {
    OAuth2AuthorizedClient client = authorizedClientService
      .loadAuthorizedClient(
        authentication.getAuthorizedClientRegistrationId(), 
          authentication.getName());
    //...
    return "loginSuccess";
}
}
