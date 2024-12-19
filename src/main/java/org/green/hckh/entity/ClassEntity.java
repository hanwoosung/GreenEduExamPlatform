package org.green.hckh.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.Where;

import java.time.LocalDate;

@Entity
@Getter
@Setter
@Builder
@ToString
@Table(name = "tbl_class")
@NoArgsConstructor
@AllArgsConstructor
@Where(clause = "delete_yn = 'n'") // deleteYn이 'n'인 것만 조회
public class ClassEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "class_no", nullable = false)
    private Integer classNo;

    @Column(name = "spot_no", nullable = false)
    private Integer spotNo;

    @Transient
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

    @Column(name = "max_people")
    private Integer maxPeople;
}