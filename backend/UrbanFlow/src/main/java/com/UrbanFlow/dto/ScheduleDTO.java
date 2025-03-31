package com.UrbanFlow.dto;

import lombok.Data;
import java.util.List;

@Data
public class ScheduleDTO {
    private String stopId;
    private List<String> departureTimes;  // List of expected arrival times
}
