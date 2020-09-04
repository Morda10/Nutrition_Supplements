package com.ecommerce.nutritionsupplements.entity;

import javax.management.BadAttributeValueExpException;
import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "user")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name="id")
    private int id;

    @Column(name="user_name")
    private String username;

    @Column(name="password")
    private String password;

    @Column(name="active")
    private boolean active;

    @Column(name="roles")
    private String roles;

    @OneToMany(fetch=FetchType.LAZY,
            mappedBy="user",
            cascade= {CascadeType.ALL})
    private List<Wishlist> wishlist;

    @OneToMany(fetch=FetchType.LAZY, cascade=CascadeType.ALL)
    @JoinColumn(name="user_id_history")
    private List<ShopHistory> shopHistoryList;

    @OneToMany(fetch=FetchType.LAZY, cascade=CascadeType.ALL)
    @JoinColumn(name="user_id_kart")
    private List<UserCart> userCartList;

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

    public List<Wishlist> getWishlist() {
        return wishlist;
    }

    public void setWishlist(List<Wishlist> wishlist) {
        this.wishlist = wishlist;
    }

    public List<ShopHistory> getShopHistoryList() {
        return shopHistoryList;
    }

    public void setShopHistoryList(List<ShopHistory> shopHistoryList) {
        this.shopHistoryList = shopHistoryList;
    }

    public List<UserCart> getUserKartList() {
        return userCartList;
    }

    public void setUserKartList(List<UserCart> userCartList) {
        this.userCartList = userCartList;
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
            if(w.getItemId() == theWishlist.getItemId()) {
                itemInList =true;
                theWishlist.setId(w.getId());
                tmp = w;
            }
        }
        if ( wishlist == null || !itemInList) {
            throw new BadAttributeValueExpException("Item " + theWishlist.getItemId() + " not at wishlist of " + theWishlist.getUser());
        }
        if(tmp!=null){

        wishlist.remove(tmp);
        }
//        System.out.println(wishlist.contains(theWishlist));
//        System.out.println(wishlist);
        return theWishlist.getId();

    }

    public void addHistory(ShopHistory theShopHistory) {

        if (shopHistoryList == null) {
            shopHistoryList = new ArrayList<>();
        }

        shopHistoryList.add(theShopHistory);
    }

    public void addToCart(UserCart theUserCart) {

        if (userCartList == null) {
            userCartList = new ArrayList<>();
        }

        userCartList.add(theUserCart);
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