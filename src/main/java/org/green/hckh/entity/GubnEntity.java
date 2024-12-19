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
@Table(name = "tbl_gubn")
@ToString
@Where(clause = "delete_yn = 'n'")
@IdClass(GubnId.class) // 복합 키 클래스 지정
public class GubnEntity {
    @Id
    @Column(name = "group_code", length = 50)
    private String groupCode;

    @Id
    @Column(name = "gubn_code", length = 20)
    private String gubnCode;

    @Column(name = "gubn_name", nullable = false, length = 50)
    private String gubnName;

    @ColumnDefault("'N'")
    @Column(name = "delete_yn")
    private Character deleteYn;

}