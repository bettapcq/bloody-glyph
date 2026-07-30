package com.bloodyglyph.repositories;

import com.bloodyglyph.entities.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CategoriesRepository extends JpaRepository<Category, Long> {

    List<Category> findByUserUserId(Long userId);
}
