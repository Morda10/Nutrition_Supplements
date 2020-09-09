package com.ecommerce.nutritionsupplements.repository;

import com.ecommerce.nutritionsupplements.entity.UserCart;
import com.ecommerce.nutritionsupplements.entity.UserCartKey;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserCartRepository extends JpaRepository<UserCart, UserCartKey> {
}
