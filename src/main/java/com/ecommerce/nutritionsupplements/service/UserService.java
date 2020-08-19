package com.ecommerce.nutritionsupplements.service;

import com.ecommerce.nutritionsupplements.entity.User;
import java.util.List;


public interface UserService {

    public List<User> findAll();

    public User findById(int theId);

    public void save(User theUser);

    public void deleteById(int theId);

    public User registerUser(User user);

    public User registerAdmin(User user);
}
