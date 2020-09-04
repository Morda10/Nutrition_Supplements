package com.ecommerce.nutritionsupplements.service.serviceImpl;

import com.ecommerce.nutritionsupplements.entity.Wishlist;
import com.ecommerce.nutritionsupplements.repository.WishlistRepository;
import com.ecommerce.nutritionsupplements.service.WishlistService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class WishlistServiceImpl implements WishlistService {

    private WishlistRepository wishlistRepository;

    @Autowired
    public WishlistServiceImpl(WishlistRepository wishlistRepository) {
        this.wishlistRepository = wishlistRepository;
    }

    @Override
    public List<Wishlist> findAll() {
        return wishlistRepository.findAll();
    }

    @Override
    public Wishlist findById(int theId) {
        Optional<Wishlist> result = wishlistRepository.findById(theId);

        Wishlist theWishlist = null;

        if (result.isPresent()) {
            theWishlist = result.get();
        }
        else {
            // we didn't find the Wishlist
            throw new RuntimeException("Did not find Wishlist id - " + theId);
        }

        return theWishlist;
    }

    @Override
    public void save(Wishlist theWishlist) {
        wishlistRepository.save(theWishlist);
    }

    @Override
    public void deleteById(int theId) {
        wishlistRepository.deleteById(theId);
    }

    @Override
    public Optional<Wishlist> findByUserIdAndItemId(int userId, int itemId) {
        return wishlistRepository.findByUserIdAndItemId(userId,itemId);
    }
}
