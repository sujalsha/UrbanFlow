package com.UrbanFlow.dto;

import lombok.Data;
import java.util.List;

@Data
public class FavoriteRouteDTO {
    private Long userId;
    private List<String> favoriteRoutes;
}
