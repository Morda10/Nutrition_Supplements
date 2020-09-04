package com.ecommerce.nutritionsupplements.repository;

import com.ecommerce.nutritionsupplements.entity.ShopHistory;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ShopHistoryRepository extends JpaRepository<ShopHistory, Integer> {
}
