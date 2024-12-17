package org.green.hckh.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.Where;

import java.time.LocalDate;

@Getter
@Setter
@Entity
@Table(name = "tbl_user")
@Where(clause = "delete_yn = 'n'")
public class UserEntity {
    @Id
    @Column(name = "user_id", nullable = false, length = 50)
    private String userId;

    @Column(name = "user_password", length = 100)
    private String userPassword;

    @Column(name = "name", length = 20)
    private String name;

    @Column(name = "user_birth")
    private LocalDate userBirth;

    @Column(name = "user_role_code", length = 30)
    private String userRoleCode;

    @Column(name = "spot_no")
    private Integer spotNo;

    @ColumnDefault("'N'")
    @Column(name = "delete_yn")
    private Character deleteYn;

}