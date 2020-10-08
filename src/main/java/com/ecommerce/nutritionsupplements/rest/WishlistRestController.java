package com.ecommerce.nutritionsupplements.rest;

import com.ecommerce.nutritionsupplements.entity.Item;
import com.ecommerce.nutritionsupplements.entity.User;
import com.ecommerce.nutritionsupplements.models.Wish;
import com.ecommerce.nutritionsupplements.service.ItemService;
import com.ecommerce.nutritionsupplements.service.UserCartService;
import com.ecommerce.nutritionsupplements.service.UserService;
import org.springframework.web.bind.annotation.*;

import javax.management.BadAttributeValueExpException;
import java.util.List;

@RestController
@RequestMapping("/wishlist")
@CrossOrigin(origins = "http://localhost:3000")
public class WishlistRestController {

    private ItemService itemService;
    private UserService userService;
    private UserCartService userCartService;

    public WishlistRestController(ItemService itemService, UserService userService, UserCartService userCartService) {
        this.itemService = itemService;
        this.userService = userService;
        this.userCartService = userCartService;
    }

    @GetMapping("/getWishlist/{theid}")
    public List<Item> getWishlistByUserId(@PathVariable int theid) {

        User user = userService.findById(theid);
        List<Item> userWishlist = user.getWishlist();

        return userWishlist;
    }

    @PostMapping("/addToWishlist")
    public String addItemToWishlist(@RequestBody Wish theWish) {
        User user;
        Item item;

        try{
            user = userService.findById(theWish.getUserId());
            item = itemService.findById(theWish.getItemId());
        }
        catch (RuntimeException e){
            return e.getMessage();
        }

        try{
            user.addWish(item);
            userService.save(user);
        }
        catch(Exception exception){
            System.out.println(exception.getMessage());
            return "item already exists at wishlist\n";

        }

        return "item added to wishlist";
    }

    @DeleteMapping("/removeFromWishlist")
    public String removeFromWishlist(@RequestBody Wish theWish) {
        System.out.println(theWish);
        User user;
        Item item;

        try{
            user = userService.findById(theWish.getUserId());
            item = itemService.findById(theWish.getItemId());
        }
        catch (RuntimeException e){
            return e.getMessage();
        }

        try{
            user.removeWish(item);
            userService.save(user);

        }
        catch(BadAttributeValueExpException exception){
            System.out.println(exception);
            return exception.toString();

        }

        return "item removed from wishlist";
    }

}
