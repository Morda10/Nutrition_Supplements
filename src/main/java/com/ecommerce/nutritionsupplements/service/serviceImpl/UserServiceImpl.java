package com.ecommerce.nutritionsupplements.service;

import com.ecommerce.nutritionsupplements.repository.UserRepository;
import com.ecommerce.nutritionsupplements.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserServiceImpl implements UserService{

    private UserRepository theUserRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    public UserServiceImpl(UserRepository theUserReposity) {
        this.theUserRepository = theUserReposity;
    }

    @Override
    public List<User> findAll() {
        return theUserRepository.findAll();
    }

    @Override
    public User findById(int theId) {
        Optional<User> result = theUserRepository.findById(theId);

        User theUser = null;

        if (result.isPresent()) {
            theUser = result.get();
        }
        else {
            // we didn't find the employee
            throw new RuntimeException("Did not find user id - " + theId);
        }

        return theUser;

    }

    @Override
    public void save(User theUser) {
        theUserRepository.save(theUser);
    }

    @Override
    public void deleteById(int theId) {
        theUserRepository.deleteById(theId);
    }

    @Override
    public User registerUser(User accountDto){

        User user = new User();
        user.setUsername(accountDto.getUsername());
        user.setPassword(passwordEncoder.encode(accountDto.getPassword()));
        user.setActive(true);
        user.setRoles("USER");
        return theUserRepository.save(user);
    }

    @Override
    public User registerAdmin(User accountDto){

        User user = new User();
        user.setUsername(accountDto.getUsername());
        user.setPassword(passwordEncoder.encode(accountDto.getPassword()));
        user.setActive(true);
        user.setRoles("ADMIN");
        return theUserRepository.save(user);
    }
}
