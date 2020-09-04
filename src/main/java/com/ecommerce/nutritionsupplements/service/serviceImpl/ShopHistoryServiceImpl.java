package com.ecommerce.nutritionsupplements.service.serviceImpl;

import com.ecommerce.nutritionsupplements.entity.Item;
import com.ecommerce.nutritionsupplements.entity.ShopHistory;
import com.ecommerce.nutritionsupplements.repository.ShopHistoryRepository;
import com.ecommerce.nutritionsupplements.service.ShopHistoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ShopHistoryServiceImpl implements ShopHistoryService {

    private ShopHistoryRepository shopHistoryRepository;

    @Autowired
    public ShopHistoryServiceImpl(ShopHistoryRepository shopHistoryRepository) {
        this.shopHistoryRepository = shopHistoryRepository;
    }

    @Override
    public List<ShopHistory> findAll() {
        return shopHistoryRepository.findAll();
    }

    @Override
    public ShopHistory findById(int theId) {
        Optional<ShopHistory> result = shopHistoryRepository.findById(theId);

        ShopHistory theShopHistory = null;

        if (result.isPresent()) {
            theShopHistory = result.get();
        }
        else {
            // we didn't find the ShopHistory
            throw new RuntimeException("Did not find ShopHistory id - " + theId);
        }

        return theShopHistory;
    }

    @Override
    public void save(ShopHistory theShopHistory) {
        shopHistoryRepository.save(theShopHistory);
    }

    @Override
    public void deleteById(int theId) {
        shopHistoryRepository.deleteById(theId);
    }
}
