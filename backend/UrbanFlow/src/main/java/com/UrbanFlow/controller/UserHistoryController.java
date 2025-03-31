package com.UrbanFlow.controller;

import com.UrbanFlow.dto.UserHistoryDTO;
import com.UrbanFlow.service.UserHistoryService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
public class UserHistoryController {

    private final UserHistoryService userHistoryService;

    public UserHistoryController(UserHistoryService userHistoryService) {
        this.userHistoryService = userHistoryService;
    }

    @GetMapping("/history")
    public ResponseEntity<List<UserHistoryDTO>> getUserHistory(@RequestParam Long userId) {
        return ResponseEntity.ok(userHistoryService.getUserHistory(userId));
    }
}
