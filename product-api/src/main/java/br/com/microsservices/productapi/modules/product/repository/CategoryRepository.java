package br.com.microsservices.productapi.modules.product.repository;

import br.com.microsservices.productapi.modules.product.model.Category;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoryRepository extends JpaRepository<Category, Integer> {
}
