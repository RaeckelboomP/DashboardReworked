package com.epitech.dashboardpierre.demo.configuration;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.oauth2.client.OAuth2AuthorizedClient;
import org.springframework.security.oauth2.client.OAuth2AuthorizedClientService;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.security.core.GrantedAuthority;

@Configuration
@EnableWebSecurity
public class SpringSecurityConfig extends WebSecurityConfigurerAdapter {

    @Autowired
    private OAuth2AuthorizedClientService authorizedClientService;

    @Override
    public void configure(HttpSecurity http) throws Exception {
        http
         .authorizeRequests()
         .antMatchers("/admin").hasRole("ADMIN")
         .antMatchers("/user").hasRole("USER")
         .anyRequest().authenticated()
         .and()
         .oauth2Login()
         .successHandler(new AuthenticationSuccessHandler() {
            @Override
            public void onAuthenticationSuccess(
                HttpServletRequest request, 
                HttpServletResponse response,
                Authentication authentication
            ) throws IOException, ServletException {
                // Get needed information
                OAuth2User userInfo = (OAuth2User)authentication.getPrincipal();
                OAuth2AuthenticationToken oauthToken = 
                    (OAuth2AuthenticationToken)authentication;
                OAuth2AuthorizedClient client =
                authorizedClientService.loadAuthorizedClient(
                        oauthToken.getAuthorizedClientRegistrationId(),
                        oauthToken.getName());

                String accessToken = client.getAccessToken().getTokenValue();

                String avatarUrl = userInfo.getAttribute("avatar_url");
                String email = userInfo.getAttribute("email");
                String name = userInfo.getAttribute("name");
                if (name == null) {
                    String eName = email.split("@")[0];
                    name = eName.substring(0, 1).toUpperCase() + 
                           eName.substring(1);
                    name = name.replace(".", " ");
                }

                List<GrantedAuthority> listAuthorities = new ArrayList<GrantedAuthority>();
                listAuthorities.add(new SimpleGrantedAuthority("ROLE_USER"));
                User user = new User(
                    name,
                    email,
                    listAuthorities);
                
                if (avatarUrl != null)
                    user.setGithubAPIKey(accessToken);
            
                Cookie jwt = new Cookie(
                        "JWT", 
                        JWTService.generateJWT(userId.toString())
                    );
                jwt.setHttpOnly(false);
                jwt.setPath("/");
                response.addCookie(jwt);

                response.sendRedirect("http://localhost:3000/");
            }
        });
         
}
}
