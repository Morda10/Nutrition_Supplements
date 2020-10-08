package com.ecommerce.nutritionsupplements.repository;

import com.ecommerce.nutritionsupplements.entity.Item;
import com.ecommerce.nutritionsupplements.entity.User;
import com.ecommerce.nutritionsupplements.entity.UserCart;
import com.ecommerce.nutritionsupplements.entity.UserCartKey;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UserCartRepository extends JpaRepository<UserCart, UserCartKey> {

    List<UserCart> findAllByUser(User user);

    List<UserCart> findAllByItem(Item item);

    @Override
    void deleteAll(Iterable<? extends UserCart> iterable);
}
