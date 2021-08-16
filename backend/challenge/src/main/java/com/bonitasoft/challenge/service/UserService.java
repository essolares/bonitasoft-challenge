package com.bonitasoft.challenge.service;

import com.bonitasoft.challenge.model.User;
import com.bonitasoft.challenge.dto.UserDto;

import java.util.List;
import java.util.Optional;

/**
 * User Service interface
 * @author: Edgar Salazar
 * @version: 08/15/2021
 */
public interface UserService {
    User save(UserDto user);
    List<User> findAll();
    User findOne(String username);
    String delete(Long id);
}
