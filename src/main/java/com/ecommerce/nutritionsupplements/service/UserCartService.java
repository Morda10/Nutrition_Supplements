package com.ecommerce.nutritionsupplements.service;


import com.ecommerce.nutritionsupplements.entity.UserCart;
import com.ecommerce.nutritionsupplements.entity.UserCartKey;

import java.util.List;

public interface UserCartService {

    public List<UserCart> findAll();

    public UserCart findById(UserCartKey theId);

    public void save(UserCart theUserCart);

    public void deleteById(UserCartKey theId);
}
