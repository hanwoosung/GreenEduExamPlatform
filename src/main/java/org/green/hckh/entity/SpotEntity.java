package org.green.hckh.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.Where;

@Getter
@Setter
@Entity
@ToString
@Table(name = "tbl_spot")
@Where(clause = "delete_yn = 'n'")
public class SpotEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "spot_no", nullable = false)
    private Integer spotNo;

    @Column(name = "spot_name", nullable = false)
    private String spotName;

    @ColumnDefault("'N'")
    @Column(name = "delete_yn")
    private Character deleteYn;

}