package com.ecommerce.nutritionsupplements.entity;

import javax.management.BadAttributeValueExpException;
import javax.persistence.*;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
@Table(name = "user")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name="user_id")
    private int id;

    @Column(name="user_name")
    private String username;

    @Column(name="password")
    private String password;

    @Column(name="active")
    private boolean active;

    @Column(name="roles")
    private String roles;

//    @OneToMany(fetch=FetchType.LAZY,
//            mappedBy="user",
//            cascade= {CascadeType.ALL})
//    private List<Wishlist> wishlist;

    @ManyToMany(cascade = { CascadeType.ALL })
    @JoinTable(
            name = "wishlist",
            joinColumns = { @JoinColumn(name = "user_id_wishlist") },
            inverseJoinColumns = { @JoinColumn(name = "wished_item") }
    )
    List<Item> userWishlist;

    @OneToMany(mappedBy = "user")
    List<UserCart> cart;

    @OneToMany(fetch=FetchType.LAZY, cascade=CascadeType.ALL)
    @JoinColumn(name="user_id_history")
    private List<ShopHistory> shopHistoryList;


    public User(){}

    public User(String username, String password, boolean active, String roles) {
        this.username = username;
        this.password = password;
        this.active = active;
        this.roles = roles;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String userName) {
        this.username = userName;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public boolean isActive() {
        return active;
    }

    public void setActive(boolean active) {
        this.active = active;
    }

    public String getRoles() {
        return roles;
    }

    public void setRoles(String roles) {
        this.roles = roles;
    }

//    public List<Wishlist> getWishlist() {
//        return wishlist;
//    }
//
//    public void setWishlist(List<Wishlist> wishlist) {
//        this.wishlist = wishlist;
//    }

    public List<ShopHistory> getShopHistoryList() {
        return shopHistoryList;
    }

    public void setShopHistoryList(List<ShopHistory> shopHistoryList) {
        this.shopHistoryList = shopHistoryList;
    }

    public List<UserCart> getUserCartList() {
        return cart;
    }

    public void setUserCartList(List<UserCart> userCartList) {
        this.cart = userCartList;
    }

    public List<Item> getWishlist() {
        return userWishlist;
    }

    public void setWishlist(List<Item> wishlist) {
        this.userWishlist = wishlist;
    }

    public void addWish(Item theWish){
        if (userWishlist == null) {
            userWishlist = new ArrayList<>();
        }
        userWishlist.add(theWish);
//        System.out.println(wishlist);
    }

    public int removeWish(Item theWish) throws BadAttributeValueExpException {
        boolean itemInList = false;
        Item tmp =null;
//        System.out.println(wishlist);
        for (Item w:
                userWishlist) {
            if(w.getId() == theWish.getId()) {
                itemInList =true;
//                theWish.setId(w.getId());
                tmp = w;
            }
        }
        if ( userWishlist == null || !itemInList) {
            throw new BadAttributeValueExpException("Item " + theWish.getId() + " not at wishlist of " + this);
        }
        if(tmp!=null){

            userWishlist.remove(tmp);
        }
//        System.out.println(wishlist.contains(theWishlist));
//        System.out.println(wishlist);
        return theWish.getId();

    }

    public void addToCart(UserCart itemToAdd, Item theItem) {
        if (cart == null) {
            cart = new ArrayList<>();
        }

        cart.add(itemToAdd);
//        itemToAdd.getItem().getCart().add(itemToAdd);
        theItem.getCart().add(itemToAdd);
        System.out.println(cart);
    }

    public void addHistory(ShopHistory theShopHistory) {

        if (shopHistoryList == null) {
            shopHistoryList = new ArrayList<>();
        }

        shopHistoryList.add(theShopHistory);
    }


    @Override
    public String toString() {
        return "User{" +
                "id=" + id +
                ", userName='" + username + '\'' +
                ", password='" + password + '\'' +
                ", active=" + active +
                ", roles='" + roles + '\'' +
                '}';
    }
}