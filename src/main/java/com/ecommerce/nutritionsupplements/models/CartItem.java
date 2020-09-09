package com.ecommerce.nutritionsupplements.models;

public class CartItem {


    private int userId;
    private int itemId;
    private int amount;

    public CartItem() {
    }

    public CartItem(int userId, int itemId, int amount) {
        this.userId = userId;
        this.itemId = itemId;
        this.amount = amount;
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

    public int getAmount() {
        return amount;
    }

    public void setAmount(int amount) {
        this.amount = amount;
    }

    @Override
    public String toString() {
        return "CartItem{" +
                "userId=" + userId +
                ", itemId=" + itemId +
                ", amount=" + amount +
                '}';
    }
}
