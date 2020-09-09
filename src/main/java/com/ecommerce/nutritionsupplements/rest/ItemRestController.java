package com.ecommerce.nutritionsupplements.rest;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import com.cloudinary.utils.ObjectUtils;
import com.ecommerce.nutritionsupplements.entity.*;
import com.ecommerce.nutritionsupplements.models.CartItem;
import com.ecommerce.nutritionsupplements.models.Wish;
import com.ecommerce.nutritionsupplements.service.ItemService;
import com.ecommerce.nutritionsupplements.service.UserCartService;
import com.ecommerce.nutritionsupplements.service.UserService;
//import com.ecommerce.nutritionsupplements.service.WishlistService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import com.cloudinary.Cloudinary;

import javax.management.BadAttributeValueExpException;


@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000")
public class ItemRestController {

	private ItemService itemService;
	private UserService userService;
	private UserCartService userCartService;
//	private WishlistService wishlistService;



	Cloudinary cloudinary = new Cloudinary(ObjectUtils.asMap(
			"cloud_name", "itemsrestcloud",
			"api_key", "651238569588643",
			"api_secret", "Xdt0iDHEB9OYRsSIoJWoG-F2Av4"));


	@Autowired
	public ItemRestController(ItemService theitemService, UserService theuserService, UserCartService theUserCartService) {

		itemService = theitemService;
		userService = theuserService;
		userCartService = theUserCartService;
//		wishlistService = thewishlistService;
	}



	@GetMapping("/items")
	public List<Item> findAll() {
		List<Item> items = itemService.findAll();
//		System.out.println(items);
//		for (Item i:
//			 items) {
//			System.out.println(i.getUsers());
//		}
		return items;
	}

	@GetMapping("/items/{itemId}")
	public Item getItem(@PathVariable int itemId) {

		Item theItem = itemService.findById(itemId);
		
		if (theItem == null) {
			throw new RuntimeException("Item id not found - " + itemId);
		}
		
		return theItem;
	}
	
	@PostMapping("/items")
	public Item addItem(@RequestBody Item theItem) {
		
		// also just in case they pass an id in JSON ... set id to 0
		// this is to force a save of new item ... instead of update

		theItem.setId(0);

		itemService.save(theItem);
		
		return theItem;
	}
	
	@PutMapping("/items")
	public Item updateItem(@RequestBody Item theItem) {

		itemService.save(theItem);
		
		return theItem;
	}

	@DeleteMapping("/items/{itemId}")
	public String deleteItem(@PathVariable int itemId) {

		Item tempItem = itemService.findById(itemId);
		
		// throw exception if null
		
		if (tempItem == null) {
			throw new RuntimeException("Item id not found - " + itemId);
		}

		itemService.deleteById(itemId);
		
		return "Deleted item id - " + itemId;
	}

//	CLOUDINARY_URL=cloudinary://651238569588643:Xdt0iDHEB9OYRsSIoJWoG-F2Av4@itemsrestcloud
	@PostMapping(path = "/image",
			consumes = {"multipart/form-data"})
	public List<Object> addImage(@RequestParam(value = "image", required = true) final MultipartFile theImage) throws IOException {

		Map uploadResult = cloudinary.uploader().upload(theImage.getBytes(), ObjectUtils.emptyMap());
		List<Object> object = new ArrayList<Object>();
		object.add(uploadResult.get("url"));
		object.add(uploadResult.get("public_id"));

		return object;
	}

	@DeleteMapping("/image/{imageId}")
	public String deleteItem(@PathVariable String imageId) throws IOException {

		Map res = cloudinary.uploader().destroy(imageId,
				ObjectUtils.emptyMap());


		return "Deleted image id - " + imageId;
	}

	@PostMapping("/items/addHistory")
	public ShopHistory addItemToHistory(@RequestBody ShopHistory theShopHistory) {

		User user = userService.findById(theShopHistory.getUserId());
		user.addHistory(theShopHistory);
		userService.save(user);

		return theShopHistory;
	}

	@PostMapping("/items/addToCart")
	public String addItemToCart(@RequestBody CartItem cartitem) {

		User user;
		Item item;

		try{
			user = userService.findById(cartitem.getUserId());
			item = itemService.findById(cartitem.getItemId());
		}
		catch (RuntimeException e){
			return e.getMessage();
		}

		try{
			UserCart userCart = new UserCart(user,item, cartitem.getAmount());
			System.out.println(user.getUserCartList().contains(userCart));
			if(user.getUserCartList().contains(userCart)) throw  new Exception("");
//			user.addToCart(userCart, item);
			userCartService.save(userCart);
//			userService.save(user);
//			itemService.save(item);
		}
		catch(Exception exception){
			System.out.println(exception.getMessage());
			return "item already exists at cart";

		}

		return "Item added to your cart";
	}

	@DeleteMapping("/items/removeFromCart")
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

	@GetMapping("/user/getWishlist/{theid}")
	public List<Item> getWishlistByUserId(@PathVariable int theid) {

		User user = userService.findById(theid);
		List<Item> userWishlist = user.getWishlist();

		return userWishlist;
	}

	@PostMapping("/user/addToWishlist")
	public String addItemToWishlist(@RequestBody Wish theWish) {
		User user;
		Item item;

//		System.out.println(theWish.getUserId());
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

	@DeleteMapping("/user/removeFromWishlist")
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

//	@DeleteMapping("/items/{itemId}")
//	public String deleteItem(@PathVariable int itemId) {
//
//		Item tempItem = itemService.findById(itemId);
//
//		// throw exception if null
//
//		if (tempItem == null) {
//			throw new RuntimeException("Item id not found - " + itemId);
//		}
//
//		itemService.deleteById(itemId);
//
//		return "Deleted item id - " + itemId;
//	}

}










