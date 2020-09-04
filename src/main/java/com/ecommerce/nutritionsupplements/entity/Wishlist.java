package com.ecommerce.nutritionsupplements.entity;


import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "wishlist")
public class Wishlist {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name="id")
    private int id;

//    @Column(name="user_id_wishlist")
//    private int userId;

    @Column(name="wished_item")
    private int itemId;

    @ManyToOne(cascade= {CascadeType.DETACH, CascadeType.MERGE, CascadeType.PERSIST,
            CascadeType.REFRESH})
    @JoinColumn(name="user_id_wishlist")
    private User user;

    public Wishlist() {
    }

    public Wishlist( int itemId) {
//        this.userId = userId;
        this.itemId = itemId;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

//    public int getUserId() {
//        return userId;
//    }
//
//    public void setUserId(int userId) {
//        this.userId = userId;
//    }

    public int getItemId() {
        return itemId;
    }

    public void setItemId(int itemId) {
        this.itemId = itemId;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    @Override
    public String toString() {
        return "Wishlist{" +
                "id=" + id +
//                ", userId=" + userId +
                ", itemId=" + itemId +
                '}';
    }


}
