package com.ecommerce.nutritionsupplements.repository;

import com.ecommerce.nutritionsupplements.entity.Item;
import com.ecommerce.nutritionsupplements.entity.ShopHistory;
import com.ecommerce.nutritionsupplements.entity.ShopHistoryKey;
import com.ecommerce.nutritionsupplements.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ShopHistoryRepository extends JpaRepository<ShopHistory, Integer> {


//
//    List<ShopHistory> findAllByUser(User user);
//
//    List<ShopHistory> findAllByItem(Item item);
//
//    @Override
//    void deleteAll(Iterable<? extends ShopHistory> iterable);
}
