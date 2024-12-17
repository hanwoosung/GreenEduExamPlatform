package org.green.hckh.entity.teacher.schedule;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.ColumnDefault;

import java.time.LocalDate;

@Entity
@Getter
@Setter
@Builder
@ToString
@Table(name = "tbl_class")
@NoArgsConstructor
@AllArgsConstructor
public class ClassEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "class_no", nullable = false)
    private Integer classNo;

    @Column(name = "spot_no", nullable = false)
    private Integer spotNo;

    private String spotName;

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