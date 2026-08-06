package bettapcq.bloodyglyph.repositories;

import bettapcq.bloodyglyph.entities.Category;
import bettapcq.bloodyglyph.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CategoriesRepository extends JpaRepository<Category, Long> {

    List<Category> findByUser(User user);

    Optional<Category> findByCategoryIdAndUser(Long categoryId, User user);

    boolean existsByNameIgnoreCaseAndUser(String name, User user);

    void deleteAllByUser(User user);
}
