package com.ecommerce.nutritionsupplements.entity;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import java.io.Serializable;
import java.util.Objects;

@Embeddable
public class UserCartKey implements Serializable{

    @Column(name = "user_id_cart")
    int userId;

    @Column(name = "cart_item")
    int itemId;

    public UserCartKey() {
    }

    public UserCartKey(int userId, int itemId) {
        this.userId = userId;
        this.itemId = itemId;
    }

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    public int getItemId() {
        return itemId;
    }

    public void setItemId(int itemId) {
        this.itemId = itemId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        UserCartKey that = (UserCartKey) o;
        return getUserId() == that.getUserId() &&
                getItemId() == that.getItemId();
    }

    @Override
    public int hashCode() {
        return Objects.hash(getUserId(), getItemId());
    }

    @Override
    public String toString() {
        return "UserCartKey{" +
                "userId=" + userId +
                ", itemId=" + itemId +
                '}';
    }

    // standard constructors, getters, and setters
    // hashcode and equals implementation

}
