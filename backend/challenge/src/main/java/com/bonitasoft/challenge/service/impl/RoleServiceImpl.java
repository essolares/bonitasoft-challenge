package com.bonitasoft.challenge.service.impl;

import com.bonitasoft.challenge.dao.RoleDao;
import com.bonitasoft.challenge.model.Role;
import com.bonitasoft.challenge.service.RoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * Role Service interface implementation to get database data.
 * @author: Edgar Salazar
 * @version: 08/15/2021
 */
@Service(value = "roleService")
public class RoleServiceImpl implements RoleService {

    @Autowired
    private RoleDao roleDao;

    @Override
    public Role findByName(String name) {
        Role role = roleDao.findRoleByName(name);
        return role;
    }
}
