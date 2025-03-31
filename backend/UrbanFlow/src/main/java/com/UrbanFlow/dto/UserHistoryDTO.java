package com.UrbanFlow.dto;

import lombok.Data;
import java.time.LocalDateTime;

@Data
public class UserHistoryDTO {
    private Long id;
    private Long userId;
    private String routeId;
    private String routeName;
    private LocalDateTime traveledAt;
}
