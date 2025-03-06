package com.saqib.ecommercestore.repository;
import com.saqib.ecommercestore.model.CartItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CartRepository extends JpaRepository<CartItem, Long> {
    CartItem findByProductId(Long productId);
}