package org.green.hckh.entity.teacher.grading;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.ColumnDefault;

import java.time.LocalDate;

@Getter
@Setter
@Entity
@Table(name = "tbl_class")
public class GradingClassEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "class_no", nullable = false)
    private Integer id;

    @Column(name = "spot_no", nullable = false)
    private Integer spotNo;

    @Column(name = "class_name", length = 50)
    private String className;

    @Column(name = "user_id", length = 50)
    private String userId;

    @Column(name = "room_no")
    private Integer roomNo;

    @Column(name = "start_date")
    private LocalDate startDate;

    @Column(name = "end_date", nullable = false)
    private LocalDate endDate;

    @ColumnDefault("'N'")
    @Column(name = "delete_yn")
    private Character deleteYn;

}