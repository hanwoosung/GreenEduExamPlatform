package org.green.hckh.dto.manager;

import lombok.Data;

import java.time.LocalDate;
import java.time.LocalDateTime;

/**
 * Created on 2024-12-19 by 황승현
 */
@Data
public class TeacherSpotDto {
    private boolean checked = false;
    private String userId;
    private String name;
    private LocalDate userBirth;
    private Integer spotNo;
    private String spotName;
    private LocalDateTime createDt;
    private String deleteYn;
}
