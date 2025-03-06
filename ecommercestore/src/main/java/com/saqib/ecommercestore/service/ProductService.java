package com.saqib.ecommercestore.service;
import com.saqib.ecommercestore.model.Product;
import com.saqib.ecommercestore.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductService {
    @Autowired
    private ProductRepository productRepository;

    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    public void saveProduct(Product product) {
        productRepository.save(product);
    }

    public void addProduct(Product product) {
        productRepository.save(product);
    }
}