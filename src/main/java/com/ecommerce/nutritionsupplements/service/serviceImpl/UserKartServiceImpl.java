package com.ecommerce.nutritionsupplements.service.serviceImpl;

import com.ecommerce.nutritionsupplements.entity.UserCart;
import com.ecommerce.nutritionsupplements.repository.UserKartRepository;
import com.ecommerce.nutritionsupplements.service.UserKartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserKartServiceImpl implements UserKartService {

    private UserKartRepository userKartRepository;

    @Autowired
    public UserKartServiceImpl(UserKartRepository userKartRepository) {
        this.userKartRepository = userKartRepository;
    }

    @Override
    public List<UserCart> findAll() {
        return userKartRepository.findAll();
    }

    @Override
    public UserCart findById(int theId) {
        Optional<UserCart> result = userKartRepository.findById(theId);

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
        userKartRepository.save(theUserCart);
    }

    @Override
    public void deleteById(int theId) {
        userKartRepository.deleteById(theId);
    }
}
