package org.green.hckh.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.Where;

@Getter
@Setter
@Entity
@Table(name = "tbl_class_room")
@Where(clause = "delete_yn = 'n'")
public class ClassRoomEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "room_no", nullable = false)
    private Integer roomNo;

    @Column(name = "spot_no")
    private Integer spotNo;

    @Column(name = "room_name", nullable = false)
    private String roomName;

    @ColumnDefault("'N'")
    @Column(name = "delete_yn")
    private Character deleteYn;

}