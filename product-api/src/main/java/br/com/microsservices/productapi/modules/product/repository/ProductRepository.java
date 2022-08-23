package br.com.microsservices.productapi.modules.product.repository;

import br.com.microsservices.productapi.modules.product.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductRepository extends JpaRepository<Product, Integer> {
}
