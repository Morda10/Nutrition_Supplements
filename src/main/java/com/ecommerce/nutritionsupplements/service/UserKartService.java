package com.ecommerce.nutritionsupplements.service;


import com.ecommerce.nutritionsupplements.entity.UserCart;

import java.util.List;

public interface UserKartService {

    public List<UserCart> findAll();

    public UserCart findById(int theId);

    public void save(UserCart theUserCart);

    public void deleteById(int theId);
}
