package com.ecommerce.nutritionsupplements.entity;


import javax.persistence.*;
import java.util.Objects;

@Entity
@Table(name = "usercart")
public class UserCart {

    @EmbeddedId
    UserCartKey id;

    @ManyToOne
    @MapsId("userId")
    @JoinColumn(name = "user_id_cart")
    User user;

    @ManyToOne
    @MapsId("itemId")
    @JoinColumn(name = "cart_item")
    Item item;

    @Column(name="amount")
    int amount;


    public UserCart() {
    }

    public UserCart(User user, Item item, int amount) {
        this.user = user;
        this.item = item;
        this.amount = amount;
        this.id = new UserCartKey(user.getId(), item.getId());
    }

    public UserCartKey getId() {
        return id;
    }

    public void setId(UserCartKey id) {
        this.id = id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Item getItem() {
        return item;
    }

    public void setItem(Item item) {
        this.item = item;
    }

    public int getAmount() {
        return amount;
    }

    public void setAmount(int amount) {
        this.amount = amount;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        UserCart userCart = (UserCart) o;
        return
                Objects.equals(getUser(), userCart.getUser()) &&
                Objects.equals(getItem(), userCart.getItem());
    }

    @Override
    public int hashCode() {
        return Objects.hash(getUser(), getItem());
    }

    @Override
    public String toString() {
        return "UserCart{" +
                "id=" + id +
                ", user=" + user +
                ", item=" + item +
                ", amount=" + amount +
                '}';
    }
}
