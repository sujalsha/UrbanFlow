package com.UrbanFlow.service;

import com.UrbanFlow.dto.UserHistoryDTO;
import com.UrbanFlow.model.User;
import com.UrbanFlow.model.UserHistory;
import com.UrbanFlow.repository.UserHistoryRepository;
import com.UrbanFlow.repository.UserRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class UserHistoryService {

    private final UserHistoryRepository userHistoryRepository;
    private final UserRepository userRepository;

    public UserHistoryService(UserHistoryRepository userHistoryRepository, UserRepository userRepository) {
        this.userHistoryRepository = userHistoryRepository;
        this.userRepository = userRepository;
    }

    public void recordTravelHistory(Long userId, String routeId, String routeName) {
        User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));

        UserHistory history = new UserHistory();
        history.setUser(user);
        history.setRouteId(routeId);
        history.setRouteName(routeName);
        userHistoryRepository.save(history);
    }

    public List<UserHistoryDTO> getUserHistory(Long userId) {
        return userHistoryRepository.findByUserId(userId).stream().map(history -> {
            UserHistoryDTO dto = new UserHistoryDTO();
            BeanUtils.copyProperties(history, dto);
            dto.setUserId(history.getUser().getId());
            return dto;
        }).collect(Collectors.toList());
    }
}
