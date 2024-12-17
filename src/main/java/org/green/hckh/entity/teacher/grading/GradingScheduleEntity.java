package org.green.hckh.entity.teacher.grading;

import jakarta.persistence.*;

import java.time.LocalDate;

@Entity
@Table(name = "tbl_schedule")
public class GradingScheduleEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "schedule_no", nullable = false)
    private Integer id;

    @Column(name = "schedule_name")
    private String scheduleName;

    @Column(name = "class_no")
    private Integer classNo;

    @Column(name = "start_date", nullable = false)
    private LocalDate startDate;

    @Column(name = "end_date", nullable = false)
    private LocalDate endDate;

    @Column(name = "delete_yn")
    private Character deleteYn;
}
