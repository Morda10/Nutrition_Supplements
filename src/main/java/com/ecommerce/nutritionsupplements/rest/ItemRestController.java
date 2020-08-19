package com.ecommerce.nutritionsupplements.rest;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import com.cloudinary.utils.ObjectUtils;
import com.ecommerce.nutritionsupplements.entity.Item;
import com.ecommerce.nutritionsupplements.service.ItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import com.cloudinary.Cloudinary;

import javax.transaction.NotSupportedException;


@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000")
public class ItemRestController {

	private ItemService itemService;



	Cloudinary cloudinary = new Cloudinary(ObjectUtils.asMap(
			"cloud_name", "itemsrestcloud",
			"api_key", "651238569588643",
			"api_secret", "Xdt0iDHEB9OYRsSIoJWoG-F2Av4"));


	@Autowired
	public ItemRestController(ItemService theitemService) {
		itemService = theitemService;
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
	
}










