package com.ecommerce.nutritionsupplements.service;

import com.ecommerce.nutritionsupplements.entity.User;
import com.ecommerce.nutritionsupplements.entity.Wishlist;

import java.util.List;
import java.util.Optional;

public interface WishlistService {

    public List<Wishlist> findAll();

    public Wishlist findById(int theId);

    public void save(Wishlist theWishlist);

    public void deleteById(int theId);

    Optional<Wishlist> findByUserIdAndItemId(int userId, int itemId);
}
