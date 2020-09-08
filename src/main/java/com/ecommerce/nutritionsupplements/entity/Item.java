package com.ecommerce.nutritionsupplements.entity;

import javax.management.BadAttributeValueExpException;
import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name="item")
public class Item {

    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    @Column(name="id")
    private int id;

    @Column(name="name")
    private String name;

    @Column(name="cost")
    private float cost;

    @Column(name="in_stock")
    private int inStock;

    @Column(name="image")
    private String image;

    @Column(name="image_id")
    private String imageId;

    @OneToMany(fetch=FetchType.LAZY,
            mappedBy="item",
            cascade= {CascadeType.ALL})
    private List<Wishlist> wishlist;

    public Item() {
    }

    public Item(String name, float cost, int inStock, String image, String imageId) {
        this.name = name;
        this.cost = cost;
        this.inStock = inStock;
        this.image = image;
        this.imageId = imageId;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public float getCost() {
        return cost;
    }

    public void setCost(float cost) {
        this.cost = cost;
    }

    public int getInStock() {
        return inStock;
    }

    public void setInStock(int inStock) {
        this.inStock = inStock;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public String getImageId() {
        return imageId;
    }

    public void setImageId(String imageId) {
        this.imageId = imageId;
    }

    public List<Wishlist> getWishlist() {
        return wishlist;
    }

    public void setWishlist(List<Wishlist> wishlist) {
        this.wishlist = wishlist;
    }

    public void addWish(Wishlist theWishlist){

        if (wishlist == null) {
            wishlist = new ArrayList<>();
        }
        wishlist.add(theWishlist);
//        System.out.println(wishlist);
    }

    public int removeWish(Wishlist theWishlist) throws BadAttributeValueExpException {
        boolean itemInList = false;
        Wishlist tmp =null;
//        System.out.println(wishlist);
        for (Wishlist w:
                wishlist) {
            if(w.getItem().getId() == theWishlist.getItem().getId()) {
                itemInList =true;
                theWishlist.setId(w.getId());
                tmp = w;
            }
        }
        if ( wishlist == null || !itemInList) {
            throw new BadAttributeValueExpException("Item " + theWishlist.getItem().getId() + " not at wishlist of " + theWishlist.getUser());
        }
        if(tmp!=null){

            wishlist.remove(tmp);
        }
//        System.out.println(wishlist.contains(theWishlist));
//        System.out.println(wishlist);
        return theWishlist.getId();

    }

    @Override
    public String toString() {
        return "Item{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", cost=" + cost +
                ", inStock=" + inStock +
                ", image='" + image + '\'' +
                ", imageId='" + imageId + '\'' +
                '}';
    }
}
