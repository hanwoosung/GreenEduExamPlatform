package org.green.hckh.repository.jpa.spotmanager;

import org.green.hckh.entity.ClassRoomEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

/**
 * Created on 2024-12-16 by 황승현
 */
public interface ClassRoomRepository extends JpaRepository<ClassRoomEntity, Integer> {
    List<ClassRoomEntity> findBySpotNoOrderByRoomName(int spotNo);

    @Modifying
    @Query("UPDATE ClassRoomEntity c SET c.deleteYn = 'Y' WHERE c.roomNo = :roomNo")
    void updateDeleteYnByRoomNo(@Param("roomNo") int roomNo);
}
