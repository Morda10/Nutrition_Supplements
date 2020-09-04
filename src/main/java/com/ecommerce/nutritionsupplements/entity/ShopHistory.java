package com.ecommerce.nutritionsupplements.entity;


import javax.persistence.*;

@Entity
@Table(name = "shophistory")
public class ShopHistory {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name="id")
    private int id;

    @Column(name="user_id_history")
    private int userId;

    @Column(name="itemId")
    private int itemId;

    @Column(name="amount")
    private int amount;

    public ShopHistory() {
    }

    public ShopHistory(int userId, int itemId, int amount) {
        this.userId = userId;
        this.itemId = itemId;
        this.amount = amount;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
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
        return "ShopHistory{" +
                "id=" + id +
                ", userId=" + userId +
                ", itemId=" + itemId +
                ", amount=" + amount +
                '}';
    }
}
