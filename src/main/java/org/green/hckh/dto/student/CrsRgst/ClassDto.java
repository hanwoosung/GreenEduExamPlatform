package org.green.hckh.dto.student.CrsRgst;

import lombok.Data;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Date;

@Data
public class ClassDto {
    private Integer classNo; // 강의 번호
    private int spotNo; // 지점 번호
    private int spotName; // 지점 번호
    private String className; // 강의명
    private String userId; // 선생님 ID
    private String name;
    private int roomNo; // 강의실 번호
    private String roomName; // 강의실 번호
    private Date startDate; // 강의 시작일
    private Date endDate; // 강의 수료일
    private String deleteYn; // 삭제 여부
    private int maxPeople; // 최대 수강 인원
    private int nowPeople; // 현재 수강 인원
    private String graduateCode; // 나의 상태가 빈값이면 내가 신청한 것이 아님.
    private LocalDateTime createDt; // 수강신청시간
    private LocalDate userBirth;
    private int possibleApplyCnt;
}
