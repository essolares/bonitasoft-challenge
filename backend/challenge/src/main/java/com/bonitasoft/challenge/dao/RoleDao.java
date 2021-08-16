package com.bonitasoft.challenge.dao;

import com.bonitasoft.challenge.model.Role;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
/**
 * Repository for Roles, to get data from database
 * @author: Edgar Salazar
 * @version: 08/15/2021
 */
@Repository
public interface RoleDao extends CrudRepository<Role, Long> {
    Role findRoleByName(String name);
}