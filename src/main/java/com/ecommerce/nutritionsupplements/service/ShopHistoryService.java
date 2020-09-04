package com.ecommerce.nutritionsupplements.service;

import com.ecommerce.nutritionsupplements.entity.ShopHistory;

import java.util.List;

public interface ShopHistoryService {

    public List<ShopHistory> findAll();

    public ShopHistory findById(int theId);

    public void save(ShopHistory theShopHistory);

    public void deleteById(int theId);
}
