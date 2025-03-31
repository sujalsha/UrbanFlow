package com.UrbanFlow.controller;

import com.UrbanFlow.service.UserPreferencesService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
public class UserPreferencesController {

    private final UserPreferencesService userPreferencesService;

    public UserPreferencesController(UserPreferencesService userPreferencesService) {
        this.userPreferencesService = userPreferencesService;
    }

    @PostMapping("/favoriteRoute/{routeId}")
    public ResponseEntity<String> addFavoriteRoute(@RequestParam Long userId, @PathVariable String routeId) {
        userPreferencesService.addFavoriteRoute(userId, routeId);
        return ResponseEntity.ok("Route added to favorites");
    }

    @GetMapping("/favorites")
    public ResponseEntity<List<String>> getFavoriteRoutes(@RequestParam Long userId) {
        return ResponseEntity.ok(userPreferencesService.getFavoriteRoutes(userId));
    }
}
