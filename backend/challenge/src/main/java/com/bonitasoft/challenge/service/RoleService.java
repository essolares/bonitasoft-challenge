package com.bonitasoft.challenge.service;

import com.bonitasoft.challenge.model.Role;
/**
 * Role Service interface
 * @author: Edgar Salazar
 * @version: 08/15/2021
 */
public interface RoleService {
    Role findByName(String name);
}
