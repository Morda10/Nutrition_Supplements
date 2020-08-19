package com.ecommerce.nutritionsupplements.service;

import java.util.List;
import java.util.Optional;

import com.ecommerce.nutritionsupplements.repository.ItemRepository;
import com.ecommerce.nutritionsupplements.entity.Item;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ItemServiceImpl implements ItemService {

	private ItemRepository itemRepository;
	
	@Autowired
	public ItemServiceImpl(ItemRepository theItemRepository) {
		itemRepository = theItemRepository;
	}
	
	@Override
	public List<Item> findAll() {
		return itemRepository.findAll();
	}

	@Override
	public Item findById(int theId) {
		Optional<Item> result = itemRepository.findById(theId);

		Item theItem = null;
		
		if (result.isPresent()) {
			theItem = result.get();
		}
		else {
			// we didn't find the employee
			throw new RuntimeException("Did not find item id - " + theId);
		}
		
		return theItem;
	}

	@Override
	public void save(Item theItem) {
		itemRepository.save(theItem);
	}

	@Override
	public void deleteById(int theId) {
		itemRepository.deleteById(theId);
	}


}






