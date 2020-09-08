package com.ecommerce.nutritionsupplements.rest;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import com.cloudinary.utils.ObjectUtils;
import com.ecommerce.nutritionsupplements.entity.*;
import com.ecommerce.nutritionsupplements.models.Wish;
import com.ecommerce.nutritionsupplements.service.ItemService;
import com.ecommerce.nutritionsupplements.service.UserService;
import com.ecommerce.nutritionsupplements.service.WishlistService;
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
	private WishlistService wishlistService;



	Cloudinary cloudinary = new Cloudinary(ObjectUtils.asMap(
			"cloud_name", "itemsrestcloud",
			"api_key", "651238569588643",
			"api_secret", "Xdt0iDHEB9OYRsSIoJWoG-F2Av4"));


	@Autowired
	public ItemRestController(ItemService theitemService, UserService theuserService, WishlistService thewishlistService) {

		itemService = theitemService;
		userService = theuserService;
		wishlistService = thewishlistService;
	}


	@GetMapping("/items")
	public List<Item> findAll() {
		return itemService.findAll();
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
	public UserCart addItemToHistory(@RequestBody UserCart theUserCart) {

		User user = userService.findById(theUserCart.getUserId());
		user.addToCart(theUserCart);
		userService.save(user);

		return theUserCart;
	}

	@GetMapping("/user/getWishlist/{theid}")
	public List<Item> getWishlistByUserId(@PathVariable int theid) {

		User user = userService.findById(theid);
		List<Wishlist> userWishlist = user.getWishlist();
		List<Item> wishlistItems = new ArrayList<>();

		for (Wishlist w: userWishlist) {
			Item item = itemService.findById(w.getItem().getId());
			wishlistItems.add(item);
		}

		return wishlistItems;
	}

	@PostMapping("/user/addToWishlist")
	public String addItemToWishlist(@RequestBody Wish theWish) {
		User user;
		Item item;
		Wishlist theWishlist = new Wishlist();

//		System.out.println(theWish.getUserId());
		try{
			 user = userService.findById(theWish.getUserId());
			 item = itemService.findById(theWish.getItemId());
			 theWishlist.setUser(user);
		}
		catch (RuntimeException e){
			return e.getMessage();
		}

		try{
//			System.out.println(user);
			user.addWish(theWishlist);
			item.addWish(theWishlist);
			userService.save(user);
			itemService.save(item);
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
		Wishlist theWishlist = new Wishlist();

		try{
			 user = userService.findById(theWish.getUserId());
			 item = itemService.findById(theWish.getItemId());
//			 wish = wishlistService.findByUserIdAndItemId(theWishlist.getUserId(), theWishlist.getItemId());
//			System.out.println(wish);
		}
		catch (RuntimeException e){
			return e.getMessage();
		}

		try{
			user.removeWish(theWishlist);
			item.removeWish(theWishlist);
//			System.out.println(theWishlist.getId());
			wishlistService.deleteById(theWishlist.getId());
			userService.save(user);
			itemService.save(item);

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










