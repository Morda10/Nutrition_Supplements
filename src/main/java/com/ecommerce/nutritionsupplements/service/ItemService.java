package com.ecommerce.nutritionsupplements.service;


import java.util.List;
import com.ecommerce.nutritionsupplements.entity.Item;



public interface ItemService {

	public List<Item> findAll();
	
	public Item findById(int theId);
	
	public void save(Item theItem);
	
	public void deleteById(int theId);

}
