package com.ecommerce.nutritionsupplements.repository;

import com.ecommerce.nutritionsupplements.entity.User;
import com.ecommerce.nutritionsupplements.entity.Wishlist;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface WishlistRepository  extends JpaRepository<Wishlist, Integer> {
    Optional<Wishlist> findByUserIdAndItemId(int userId,int itemId);
}
