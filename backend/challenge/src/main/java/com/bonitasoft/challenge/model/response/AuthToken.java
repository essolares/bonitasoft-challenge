package com.bonitasoft.challenge.model.response;

import com.bonitasoft.challenge.model.Role;
import java.util.Set;

/**
 * AuthToken class that allow to return token information for api request
 * @author: Edgar Salazar
 * @version: 08/15/2021
 */
public class AuthToken {
    private String token;
    private String type = "Bearer";
    private Long id;
    private String username;
    private String email;
    private String name;
    private String phone;
    private Set<Role> roles;

    public AuthToken(){

    }
    public AuthToken(String token, Long id, String username, String email, String name, String phone, Set<Role> roles) {
        this.token = token;
        this.id = id;
        this.username = username;
        this.email = email;
        this.name = name;
        this.phone = phone;
        this.roles = roles;
    }

    public AuthToken(String token){
        this.token = token;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Set<Role> getRoles() {
        return roles;
    }

    public void setRoles(Set<Role> roles) {
        this.roles = roles;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }
}