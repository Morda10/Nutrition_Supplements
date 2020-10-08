package com.ecommerce.nutritionsupplements.service;


import com.ecommerce.nutritionsupplements.entity.Item;
import com.ecommerce.nutritionsupplements.entity.User;
import com.ecommerce.nutritionsupplements.entity.UserCart;
import com.ecommerce.nutritionsupplements.entity.UserCartKey;

import java.util.List;

public interface UserCartService {

    public List<UserCart> findAll();

    public List<UserCart> findAllByUser(User user);

    public List<UserCart> findAllByItem(Item item);

    public UserCart findById(UserCartKey theId);

    public void save(UserCart theUserCart);

    public void deleteById(UserCartKey theId);

    public void deleteAll(Iterable<? extends UserCart> iterable);

}
