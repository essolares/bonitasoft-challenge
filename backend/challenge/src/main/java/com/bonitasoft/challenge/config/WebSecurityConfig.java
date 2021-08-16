package com.bonitasoft.challenge.config;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import javax.annotation.Resource;

/**
 * Main security manager, allow to control the authentication and authorization with roles and JWT.
 * @author: Edgar Salazar
 * @version: 08/15/2021
 */
@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {

    /**AUTHENTICATION METHOD -- Custom implementation of the UserDetailsService interface.
    AuthenticationManager needs to know where the user’s username and password have been stored
    */
    @Resource(name = "userService")
    private UserDetailsService userDetailsService;

    /**AUTHENTICATION METHOD -- Validate user and password provided
    through implementation of userDetailsService (UserServiceImpl)
    and BCrypt encode password (encoder).
    */
    @Override
    public void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(userDetailsService).passwordEncoder(encoder());
    }

    /**AUTHENTICATION METHOD -- This is added to the spring context as a bean
     */
    @Override
    @Bean
    public AuthenticationManager authenticationManagerBean() throws Exception {
        return super.authenticationManagerBean();
    }

    /**AUTHENTICATION METHOD -- Encode method set to configure authentication
    */
    @Bean
    public BCryptPasswordEncoder encoder(){
        return new BCryptPasswordEncoder();
    }

    /*-------------------------------------------------------------------------------------------*/
    /**AUTHORIZATION METHOD -- Handling of Unauthorized requests, we pass AuthenticationEntryPoint.
    We will return a 401 Unauthorized when we encounter an exception.
    * */
    @Autowired
    private UnauthorizedEntryPoint unauthorizedEntryPoint;

    /**AUTHORIZATION METHOD -- we passed a reference to the default HttpSecurity configuration.
    Require authentication for all requests, except /users/register & /users/authenticate
    (We require those two endpoints to be available to all users to sign-up or login).
    We use authenticationTokenFilterBean to get the roles and eval this.
    */
    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.cors().and().csrf().disable()
                .authorizeRequests()
                .antMatchers("/api/v1/users/authenticate", "/api/v1/users/register").permitAll()
                .anyRequest().authenticated()
                .and()
                .exceptionHandling().authenticationEntryPoint(unauthorizedEntryPoint).and()
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);

        http.addFilterBefore(authenticationTokenFilterBean(), UsernamePasswordAuthenticationFilter.class);
    }

    /**AUTHORIZATION METHOD -- Use JWT to store roles, then we need to translate
    this to Spring, JwtAuthenticationFilter class allow us to analise the JWT Token
    and get the allowed roles and check the APIs permissions.
    JwtAuthenticationFilter -- Class to generate and validate JWT Tokens
    */
    @Bean
    public JwtAuthenticationFilter authenticationTokenFilterBean() throws Exception {
        return new JwtAuthenticationFilter();
    }

}