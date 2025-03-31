package com.UrbanFlow.service;

import com.UrbanFlow.dto.FavoriteRouteDTO;
import com.UrbanFlow.model.User;
import com.UrbanFlow.model.UserPreferences;
import com.UrbanFlow.repository.UserPreferencesRepository;
import com.UrbanFlow.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class UserPreferencesService {

    private final UserPreferencesRepository userPreferencesRepository;
    private final UserRepository userRepository;

    public UserPreferencesService(UserPreferencesRepository userPreferencesRepository, UserRepository userRepository) {
        this.userPreferencesRepository = userPreferencesRepository;
        this.userRepository = userRepository;
    }

    public void addFavoriteRoute(Long userId, String routeId) {
        Optional<UserPreferences> optionalPreferences = userPreferencesRepository.findByUserId(userId);
        UserPreferences preferences = optionalPreferences.orElseGet(() -> {
            User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
            UserPreferences newPreferences = new UserPreferences();
            newPreferences.setUser(user);
            newPreferences.setFavoriteRoutes("");
            return newPreferences;
        });

        List<String> favorites = Arrays.asList(preferences.getFavoriteRoutes().split(","));
        if (!favorites.contains(routeId)) {
            favorites = favorites.stream().filter(fav -> !fav.isEmpty()).collect(Collectors.toList());
            favorites.add(routeId);
            preferences.setFavoriteRoutes(String.join(",", favorites));
            userPreferencesRepository.save(preferences);
        }
    }

    public List<String> getFavoriteRoutes(Long userId) {
        return userPreferencesRepository.findByUserId(userId)
                .map(pref -> Arrays.asList(pref.getFavoriteRoutes().split(",")))
                .orElse(List.of());
    }
}
