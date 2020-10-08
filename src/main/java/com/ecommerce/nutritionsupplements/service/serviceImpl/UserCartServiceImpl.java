package com.ecommerce.nutritionsupplements.service.serviceImpl;

import com.ecommerce.nutritionsupplements.entity.Item;
import com.ecommerce.nutritionsupplements.entity.User;
import com.ecommerce.nutritionsupplements.entity.UserCart;
import com.ecommerce.nutritionsupplements.entity.UserCartKey;
import com.ecommerce.nutritionsupplements.repository.UserCartRepository;
import com.ecommerce.nutritionsupplements.service.UserCartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserCartServiceImpl implements UserCartService {

    private UserCartRepository userCartRepository;

    @Autowired
    public UserCartServiceImpl(UserCartRepository userCartRepository) {
        this.userCartRepository = userCartRepository;
    }

    @Override
    public List<UserCart> findAll() {
        return userCartRepository.findAll();
    }

    @Override
    public List<UserCart> findAllByUser(User user) {
        return userCartRepository.findAllByUser(user);
    }

    @Override
    public List<UserCart> findAllByItem(Item item) {
        return userCartRepository.findAllByItem(item);
    }

    @Override
    public UserCart findById(UserCartKey theId) {
        Optional<UserCart> result = userCartRepository.findById(theId);

        UserCart theUserCart = null;

        if (result.isPresent()) {
            theUserCart = result.get();
        }
        else {
            // we didn't find the UserKart
            throw new RuntimeException("Did not find UserKart id - " + theId);
        }

        return theUserCart;
    }

    @Override
    public void save(UserCart theUserCart) {
        userCartRepository.save(theUserCart);
    }

    @Override
    public void deleteById(UserCartKey theId) {
        userCartRepository.deleteById(theId);
    }

    @Override
    public void deleteAll(Iterable<? extends UserCart> iterable) {
        userCartRepository.deleteAll(iterable);
    }
}
