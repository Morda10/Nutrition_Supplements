package com.ecommerce.nutritionsupplements.entity;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import java.io.Serializable;
import java.util.Objects;


@Embeddable
public class ShopHistoryKey implements Serializable {

    @Column(name = "user_id_history")
    int userIdHistory;

    @Column(name = "cart_item_history")
    int itemIdHistory;

    public ShopHistoryKey() {
    }

    public ShopHistoryKey(int userId, int itemId) {
        this.userIdHistory = userId;
        this.itemIdHistory = itemId;
    }

    public int getUserIdHistory() {
        return userIdHistory;
    }

    public void setUserIdHistory(int userIdHistory) {
        this.userIdHistory = userIdHistory;
    }

    public int getItemIdHistory() {
        return itemIdHistory;
    }

    public void setItemIdHistory(int itemIdHistory) {
        this.itemIdHistory = itemIdHistory;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        UserCartKey that = (UserCartKey) o;
        return getUserIdHistory() == that.getUserId() &&
                getItemIdHistory() == that.getItemId();
    }

    @Override
    public int hashCode() {
        return Objects.hash(getUserIdHistory(), getItemIdHistory());
    }

    @Override
    public String toString() {
        return "ShopHistoryKey{" +
                "userId=" + userIdHistory +
                ", itemId=" + itemIdHistory +
                '}';
    }

    // standard constructors, getters, and setters
    // hashcode and equals implementation

}
