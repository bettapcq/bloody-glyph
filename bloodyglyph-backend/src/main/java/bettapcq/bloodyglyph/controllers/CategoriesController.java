package bettapcq.bloodyglyph.controllers;


import bettapcq.bloodyglyph.exceptions.ValidationException;
import bettapcq.bloodyglyph.payloads.requests.NewCategoryDTO;
import bettapcq.bloodyglyph.payloads.responses.CategoryResponseDTO;
import bettapcq.bloodyglyph.services.CategoriesService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.context.support.DefaultMessageSourceResolvable;
import org.springframework.http.HttpStatus;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/categories")
@Tag(name = "Categories", description = "Endpoint per la gestione delle categorie")
public class CategoriesController {

    private final CategoriesService categoriesService;

    public CategoriesController(CategoriesService categoriesService) {
        this.categoriesService = categoriesService;
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    @Operation(summary = "Crea una nuova categoria")
    public CategoryResponseDTO createCategory(@RequestBody @Valid NewCategoryDTO payload, BindingResult valRes) {
        if (valRes.hasErrors()) {
            List<String> errList = valRes.getFieldErrors().stream().map(DefaultMessageSourceResolvable::getDefaultMessage).toList();

            throw new ValidationException(errList);
        }

        return categoriesService.createCategory(payload);
    }

    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    @Operation(summary = "Recupera tutte le categorie dell'utente autenticato")
    public List<CategoryResponseDTO> getMyCategories() {
        return categoriesService.getMyCategories();
    }

    @Operation(summary = "Recupera la categoria dell'utente autenticato tramite l'ID")
    @GetMapping("/{categoryId}")
    public CategoryResponseDTO getMyCategory(@PathVariable Long categoryId) {
        return categoriesService.getCategoryById(categoryId);
    }


    @PatchMapping("/{categoryId}")
    @Operation(summary = "Modifica categoria")
    public CategoryResponseDTO updateCategory(@PathVariable Long categoryId, @RequestBody @Valid NewCategoryDTO payload, BindingResult valRes) {
        if (valRes.hasErrors()) {
            List<String> errList = valRes.getFieldErrors().stream().map(DefaultMessageSourceResolvable::getDefaultMessage).toList();

            throw new ValidationException(errList);
        }
        return categoriesService.updateCategory(categoryId, payload);
    }
}
