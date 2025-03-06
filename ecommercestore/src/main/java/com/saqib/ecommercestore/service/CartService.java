package com.saqib.ecommercestore.service;

import com.saqib.ecommercestore.model.CartItem;
import com.saqib.ecommercestore.model.Product;
import com.saqib.ecommercestore.repository.CartRepository;
import com.saqib.ecommercestore.repository.ProductRepository;
import org.springframework.stereotype.Service;

import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

@Service
public class CartService {
    @Autowired
    private CartRepository cartRepository;

    @Autowired
    private ProductRepository productRepository;

    public List<CartItem> getCart() {
        return cartRepository.findAll();
    }

    public void addToCart(CartItem cartItem) {
        CartItem existingItem = cartRepository.findByProductId(cartItem.getProductId());
        if (existingItem != null) {
            existingItem.setQuantity(existingItem.getQuantity() + cartItem.getQuantity());
            cartRepository.save(existingItem);
        } else {
            // Fetch product details if not provided
            if (cartItem.getProductName() == null || cartItem.getProductPrice() == 0.0) {
                Product product = productRepository.findById(cartItem.getProductId())
                        .orElseThrow(() -> new RuntimeException("Product not found"));
                cartItem.setProductName(product.getName());
                cartItem.setProductPrice(product.getPrice());
            }
            cartRepository.save(cartItem);
        }
    }

    public void removeFromCart(Long id) {
        cartRepository.deleteById(id);
    }

    public void clearCart() {
        cartRepository.deleteAll();
    }
}
