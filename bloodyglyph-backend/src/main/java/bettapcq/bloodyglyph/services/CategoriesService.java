package bettapcq.bloodyglyph.services;

import bettapcq.bloodyglyph.entities.Category;
import bettapcq.bloodyglyph.entities.User;
import bettapcq.bloodyglyph.exceptions.BadRequestException;
import bettapcq.bloodyglyph.exceptions.NotFoundException;
import bettapcq.bloodyglyph.payloads.requests.NewCategoryDTO;
import bettapcq.bloodyglyph.payloads.responses.CategoryResponseDTO;
import bettapcq.bloodyglyph.repositories.CategoriesRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategoriesService {

    private final CategoriesRepository categoriesRepository;
    private final UsersService usersService;

    public CategoriesService(CategoriesRepository categoriesRepository, UsersService usersService) {
        this.categoriesRepository = categoriesRepository;
        this.usersService = usersService;
    }

    public CategoryResponseDTO toCategoryResponseDTO(Category category) {
        return new CategoryResponseDTO(
                category.getCategoryId(),
                category.getName()
        );
    }

    public CategoryResponseDTO createCategory(NewCategoryDTO payload) {

        User currentUser = usersService.getCurrentUserEntity();

        if (categoriesRepository.existsByNameIgnoreCaseAndUser(payload.name(), currentUser)) {
            throw new BadRequestException("La categoria esiste già");
        }

        Category newCategory = Category.builder()
                .name(payload.name().trim())
                .user(currentUser)
                .build();

        Category savedCategory = categoriesRepository.save(newCategory);

        return this.toCategoryResponseDTO(savedCategory);

    }

    public CategoryResponseDTO getCategoryById(Long categoryId) {
        User currentUser = usersService.getCurrentUserEntity();
        Category category = categoriesRepository.findByCategoryIdAndUser(categoryId, currentUser).orElseThrow(
                () -> new NotFoundException("Categoria non torvata"));
        return this.toCategoryResponseDTO(category);
    }

    public List<CategoryResponseDTO> getMyCategories() {
        User currentUser = usersService.getCurrentUserEntity();
        List<Category> myCategories = categoriesRepository.findByUser(currentUser);
        return myCategories.stream()
                .map(this::toCategoryResponseDTO)
                .toList();

    }

    public void deleteCategory(Long categoryId) {
        User currentUser = usersService.getCurrentUserEntity();
        Category category = categoriesRepository.findByCategoryIdAndUser(categoryId, currentUser).orElseThrow(
                () -> new NotFoundException("Categoria non torvata")
        );
        categoriesRepository.delete(category);
    }

    public CategoryResponseDTO updateCategory(Long categoryId, NewCategoryDTO payload) {

        User currentUser = usersService.getCurrentUserEntity();
        Category category = categoriesRepository.findByCategoryIdAndUser(categoryId, currentUser).orElseThrow(
                () -> new NotFoundException("La categoria no esiste")
        );

        category.setName(payload.name().trim());
        Category categoryUpdated = categoriesRepository.save(category);

        return this.toCategoryResponseDTO(categoryUpdated);
    }
}
