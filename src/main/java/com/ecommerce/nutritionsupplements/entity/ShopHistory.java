package com.ecommerce.nutritionsupplements.entity;


import javax.persistence.*;

@Entity
@Table(name = "shophistory")
public class ShopHistory {

    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    @Column(name="history_id")
    private int id;

    @Column(name = "user_id_history")
    int userId;


    @Column(name = "item_id_history")
    int itemId;

    @Column(name="amount_history")
    int amount;


    public ShopHistory() {
    }

    public ShopHistory(int user, int item, int amount) {
        this.userId = user;
        this.itemId = item;
        this.amount = amount;
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

//
//@Entity
//@Table(name = "shophistory")
//public class ShopHistory {
//
//    @EmbeddedId
//    ShopHistoryKey id;
//
//    @ManyToOne
//    @MapsId("userIdHistory")
//    @JoinColumn(name = "user_id_history")
//    User user;
//
//    @ManyToOne
//    @MapsId("itemIdHistory")
//    @JoinColumn(name = "cart_item_history")
//    Item item;
//
//    @Column(name="amount_history")
//    int amount;
//
//
//    public ShopHistory() {
//    }
//
//    public ShopHistory(User user, Item item, int amount) {
//        this.user = user;
//        this.item = item;
//        this.amount = amount;
//        this.id = new ShopHistoryKey(user.getId(), item.getId());
//    }
//
//    public ShopHistoryKey getId() {
//        return id;
//    }
//
//    public void setId(ShopHistoryKey id) {
//        this.id = id;
//    }
//
//    public void setUser(User user) {
//        this.user = user;
//    }
//
//    public Item getItem() {
//        return item;
//    }
//
//    public void setItem(Item item) {
//        this.item = item;
//    }
//
//    public int getAmount() {
//        return amount;
//    }
//
//    public void setAmount(int amount) {
//        this.amount = amount;
//    }
//
//
//    @Override
//    public String toString() {
//        return "ShopHistory{" +
//                "id=" + id +
//                ", user=" + user +
//                ", item=" + item +
//                ", amount=" + amount +
//                '}';
//    }
//}

