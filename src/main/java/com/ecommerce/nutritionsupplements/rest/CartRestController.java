package com.ecommerce.nutritionsupplements.rest;

import com.ecommerce.nutritionsupplements.entity.*;
import com.ecommerce.nutritionsupplements.models.CartItem;
import com.ecommerce.nutritionsupplements.service.ItemService;
import com.ecommerce.nutritionsupplements.service.UserCartService;
import com.ecommerce.nutritionsupplements.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;


@RestController
@RequestMapping("/cart")
@CrossOrigin(origins = "http://localhost:3000")
public class CartRestController {

    private ItemService itemService;
    private UserService userService;
    private UserCartService userCartService;

    @Autowired
    public CartRestController(ItemService itemService, UserService userService, UserCartService userCartService) {
        this.itemService = itemService;
        this.userService = userService;
        this.userCartService = userCartService;
    }


//    @PostMapping("/addHistory")
//    public ShopHistory addItemToHistory(@RequestBody ShopHistory theShopHistory) {
//
//        User user = userService.findById(theShopHistory.getId().);
//        user.addHistory(theShopHistory);
//        userService.save(user);
//
//        return theShopHistory;
//    }

    @PostMapping("/addToCart")
    public ResponseEntity<Object> addItemToCart(@RequestBody CartItem cartitem) {

        User user;
        Item item;

        try{
            user = userService.findById(cartitem.getUserId());
            item = itemService.findById(cartitem.getItemId());
        }
        catch (RuntimeException e){
            return  ResponseEntity.status(HttpStatus.BAD_REQUEST).body( e.getMessage());

        }

        try{
            UserCart userCart = new UserCart(user,item, cartitem.getAmount());

            System.out.println(userCart.getId());
            for (UserCart u : user.getUserCartList()
                 ) {
                if(userCart.getId().equals(u.getId())){
                    return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Item already in cart");
                }
            }
            userCartService.save(userCart);
        }
        catch(Exception exception){
            System.out.println(exception.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Item already in cart");


        }

        return ResponseEntity.ok("Item added to your cart");
    }

    @DeleteMapping("/removeFromCart")
    public String removeFromCart(@RequestBody UserCartKey cartitemId) {
        try{
            userCartService.deleteById(cartitemId);
        }
        catch (RuntimeException e){
            System.out.println(e.getMessage());
            return "something went wrong";
        }
        return "item removed from cart";
    }

    @GetMapping("/getCart/{theid}")
    public List<UserCart> getCartByUserId(@PathVariable int theid) {

        try {
            User user = userService.findById(theid);
            List<Item> userCart = new ArrayList<>();
            List<UserCart> userCartList = userCartService.findAllByUser(user);
            for (UserCart u:
                    userCartList) {
                userCart.add(u.getItem());
            }

            return userCartList;
//		return userCart;
        }
        catch (Exception e){
            System.out.println(e.getMessage());
            return new ArrayList<>();
        }
    }



}










