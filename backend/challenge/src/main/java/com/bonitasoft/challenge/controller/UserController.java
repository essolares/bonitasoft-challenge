package com.bonitasoft.challenge.controller;

import com.bonitasoft.challenge.config.TokenProvider;
import com.bonitasoft.challenge.model.response.AuthToken;
import com.bonitasoft.challenge.model.LoginUser;
import com.bonitasoft.challenge.model.User;
import com.bonitasoft.challenge.dto.UserDto;
import com.bonitasoft.challenge.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

/**
 * REST API FOR USERS, allow to receive POST and GET request to interact with the database tables.
 * @author: Edgar Salazar
 * @version: 08/15/2021
 */
@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/v1//users")
public class UserController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private TokenProvider jwtTokenUtil;

    @Autowired
    private UserService userService;

    /**
     * authenticate -
     * Authenticate service to authorize o denied access, POST request
     * POST request.
     * NO role required.
     */
    @RequestMapping(value = "/authenticate", method = RequestMethod.POST)
    public ResponseEntity<?> generateToken(@RequestBody LoginUser loginUser) throws AuthenticationException {
        final Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginUser.getUsername(),
                        loginUser.getPassword()
                )
        );
        SecurityContextHolder.getContext().setAuthentication(authentication);
        final String token = jwtTokenUtil.generateToken(authentication);
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        String username = userDetails.getUsername();
        User user = userService.findOne(username);
        user.getRoles();
        return ResponseEntity.ok(new AuthToken(token,user.getId(),
                user.getUsername(),
                user.getEmail(),
                user.getName(),
                user.getPhone(),
                user.getRoles()));
    }

    /**
     * register -
     * Register service, to create new users, POST request. no role required.
     * POST request.
     * NO role required.
     */
    @RequestMapping(value="/register", method = RequestMethod.POST)
    public ResponseEntity<?> saveUser(@RequestBody UserDto user){
        User userDetails = userService.save(user);
        return ResponseEntity.ok(userDetails);
    }

    /**
     * adminping -
     * Admin test service
     * POST request.
     * ADMIN role required.
     */
    @PreAuthorize("hasRole('ADMIN')")
    @RequestMapping(value="/adminping", method = RequestMethod.GET)
    public String adminPing(){
        return "Only Admins Can Read This";
    }

    /**
     * userping -
     * Chef test service
     * POST request.
     * USER role required.
     */
    @PreAuthorize("hasRole('USER')")
    @RequestMapping(value="/userping", method = RequestMethod.GET)
    public String userPing(){
        return "Any User Can Read This";
    }

    /**
     * chefping -
     * User test service
     * POST request.
     * CHEF role required.
     */
    @PreAuthorize("hasRole('CHEF')")
    @RequestMapping(value="/chefping", method = RequestMethod.GET)
    public String cherPing(){
        return "Only Chefs Can Read This";
    }

    /**
     * getall -
     * Get All Users - allowed by ADMIN role, return all the users
     * POST request.
     * ADMIN role required.
     */
    @PreAuthorize("hasRole('ADMIN')")
    @RequestMapping(value="/getall", method = RequestMethod.GET)
    public List<User> getAllUsers(){
        return userService.findAll();
    }

    /**
     * getbyusername -
     * Get User Data by username - allowed by ADMIN, USER, CHEF roles, return user data by username
     * POST request.
     * ADMIN, USER, CHEF role required.
     */
    @PreAuthorize("hasAnyRole('ADMIN', 'USER', 'CHEF')")
    @RequestMapping(value="/getbyusername", method = RequestMethod.GET)
    public User getUserByUsername(String username){
        return userService.findOne(username);
    }

    /**
     * deleteuser -
     * Delete user from database
     * DELETE request.
     * ADMIN role required.
     */
    @PreAuthorize("hasRole('ADMIN')")
    @RequestMapping(value="/deleteuser", method = RequestMethod.DELETE)
    public String deleteuser(@RequestBody Map<String, Long> userId){
        return userService.delete(userId.get("userId"));
    }
}
