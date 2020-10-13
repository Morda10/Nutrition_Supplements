package com.ecommerce.nutritionsupplements.rest;

import com.ecommerce.nutritionsupplements.entity.*;
import com.ecommerce.nutritionsupplements.models.CartItem;
import com.ecommerce.nutritionsupplements.service.ItemService;
import com.ecommerce.nutritionsupplements.service.ShopHistoryService;
import com.ecommerce.nutritionsupplements.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;


@RestController
@RequestMapping("/history")
@CrossOrigin(origins = "http://localhost:3000")
public class ShopHistoryRestController {

    private ItemService itemService;
    private UserService userService;
    private ShopHistoryService shopHistoryService;

    @Autowired
    public ShopHistoryRestController(ItemService itemService, UserService userService, ShopHistoryService shopHistoryService) {
        this.itemService = itemService;
        this.userService = userService;
        this.shopHistoryService = shopHistoryService;
    }


    @PostMapping("/addHistory")
    public ShopHistory addItemToHistory(@RequestBody ShopHistory theShopHistory) {

        User user = userService.findById(theShopHistory.getUserId());
        user.addHistory(theShopHistory);
        userService.save(user);

        return theShopHistory;
    }

//    @PostMapping("/addHistory")
//    public ResponseEntity<Object> addItemToHistory(@RequestBody CartItem cartitem) {
//
//        User user;
//        Item item;
//
//        try{
//            user = userService.findById(cartitem.getUserId());
//            item = itemService.findById(cartitem.getItemId());
//        }
//        catch (RuntimeException e){
//            return  ResponseEntity.status(HttpStatus.BAD_REQUEST).body( e.getMessage());
//
//        }
//
//        try{
//            ShopHistory shopHistory = new ShopHistory(user,item, cartitem.getAmount());
//
//            System.out.println(shopHistory.getId());
//            for (UserCart u : user.getUserCartList()
//            ) {
//                if(shopHistory.getId().equals(u.getId())){
//                    return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Item already in cart");
//                }
//            }
//            shopHistoryService.save(shopHistory);
//        }
//        catch(Exception exception){
//            System.out.println(exception.getMessage());
//            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Item already in cart");
//
//
//        }
//
//        return ResponseEntity.ok("Item added to your cart");
//    }

//    @DeleteMapping("/removeFromCart")
//    public String removeFromCart(@RequestBody UserCartKey cartitemId) {
//        try{
//            userCartService.deleteById(cartitemId);
//        }
//        catch (RuntimeException e){
//            System.out.println(e.getMessage());
//            return "something went wrong";
//        }
//        return "item removed from cart";
//    }

//    @GetMapping("/getCart/{theid}")
//    public List<UserCart> getCartByUserId(@PathVariable int theid) {
//
//        try {
//            User user = userService.findById(theid);
//            List<Item> userCart = new ArrayList<>();
//            List<UserCart> userCartList = userCartService.findAllByUser(user);
//            for (UserCart u:
//                    userCartList) {
//                userCart.add(u.getItem());
//            }
//
//            return userCartList;
////		return userCart;
//        }
//        catch (Exception e){
//            System.out.println(e.getMessage());
//            return new ArrayList<>();
//        }
//    }



}










