package com.ecommerce.nutritionsupplements.service;

import com.ecommerce.nutritionsupplements.entity.*;

import java.util.List;

public interface ShopHistoryService {

    public List<ShopHistory> findAll();

    public ShopHistory findById(int theId);

//    public ShopHistory findById(ShopHistoryKey theId);
//
//    public List<ShopHistory> findAllByUser(User user);
//
//    public List<ShopHistory> findAllByItem(Item item);


    public void save(ShopHistory theShopHistory);

    public void deleteById(int theId);

//    public void deleteById(ShopHistoryKey theId);

    public void deleteAll(Iterable<? extends ShopHistory> iterable);
}
