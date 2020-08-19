package com.ecommerce.nutritionsupplements.entity;

import javax.persistence.*;

@Entity
@Table(name="item")
public class Item {

    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    @Column(name="id")
    private int id;

    @Column(name="name")
    private String name;

    @Column(name="cost")
    private float cost;

    @Column(name="in_stock")
    private int inStock;

    @Column(name="image")
    private String image;

    @Column(name="image_id")
    private String imageId;

    public Item() {
    }

    public Item(String name, float cost, int inStock, String image, String imageId) {
        this.name = name;
        this.cost = cost;
        this.inStock = inStock;
        this.image = image;
        this.imageId = imageId;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public float getCost() {
        return cost;
    }

    public void setCost(float cost) {
        this.cost = cost;
    }

    public int getInStock() {
        return inStock;
    }

    public void setInStock(int inStock) {
        this.inStock = inStock;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public String getImageId() {
        return imageId;
    }

    public void setImageId(String imageId) {
        this.imageId = imageId;
    }

    @Override
    public String toString() {
        return "Item{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", cost=" + cost +
                ", inStock=" + inStock +
                ", image='" + image + '\'' +
                ", imageId='" + imageId + '\'' +
                '}';
    }
}
