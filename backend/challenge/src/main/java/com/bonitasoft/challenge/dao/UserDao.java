package com.bonitasoft.challenge.dao;

import com.bonitasoft.challenge.model.User;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
/**
 * Repository for users, to get data from database
 * @author: Edgar Salazar
 * @version: 08/15/2021
 */
@Repository
public interface UserDao extends CrudRepository<User, Long> {
    User findByUsername(String username);
}