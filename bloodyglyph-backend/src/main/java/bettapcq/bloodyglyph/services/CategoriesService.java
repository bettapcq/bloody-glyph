package bettapcq.bloodyglyph.services;

import bettapcq.bloodyglyph.entities.Category;
import bettapcq.bloodyglyph.entities.User;
import bettapcq.bloodyglyph.exceptions.BadRequestException;
import bettapcq.bloodyglyph.payloads.requests.NewCategoryDTO;
import bettapcq.bloodyglyph.payloads.responses.CategoryResponseDTO;
import bettapcq.bloodyglyph.repositories.CategoriesRepository;
import org.springframework.stereotype.Service;

@Service
public class CategoriesService {

    private final CategoriesRepository categoriesRepository;
    private final UsersService usersService;

    public CategoriesService(CategoriesRepository categoriesRepository, UsersService usersService) {
        this.categoriesRepository = categoriesRepository;
        this.usersService = usersService;
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

        return new CategoryResponseDTO(
                savedCategory.getCategoryId(),
                savedCategory.getName()
        );

    }
}
