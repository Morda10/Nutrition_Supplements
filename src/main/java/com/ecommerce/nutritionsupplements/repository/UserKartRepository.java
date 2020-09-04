package com.ecommerce.nutritionsupplements.repository;

import com.ecommerce.nutritionsupplements.entity.UserCart;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserKartRepository  extends JpaRepository<UserCart, Integer> {
}
