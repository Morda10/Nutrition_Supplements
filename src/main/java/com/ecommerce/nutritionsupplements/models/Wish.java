package com.ecommerce.nutritionsupplements.models;

public class Wish {

    private int userId;
    private int itemId;

    public Wish() {
    }

    public Wish(int userId, int itemId) {
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
    public String toString() {
        return "Wish{" +
                "userId=" + userId +
                ", itemId=" + itemId +
                '}';
    }
}
