package org.green.hckh.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.green.hckh.entity.teacher.grading.GradingClassEntity;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.Where;

import java.time.LocalDate;

@Getter
@Setter
@Entity
@ToString
@Table(name = "tbl_schedule")
@Where(clause = "delete_yn = 'n'")
public class ScheduleEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "schedule_no", nullable = false)
    private Integer scheduleNo;

    @Column(name = "schedule_name")
    private String scheduleName;

    @Column(name = "class_no")
    private int classNo;

    @Column(name = "start_date", nullable = false)
    private LocalDate startDate;

    @Column(name = "end_date", nullable = false)
    private LocalDate endDate;

    @ColumnDefault("'N'")
    @Column(name = "delete_yn")
    private Character deleteYn;

}