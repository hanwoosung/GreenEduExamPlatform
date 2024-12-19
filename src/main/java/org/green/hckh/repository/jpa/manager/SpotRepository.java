package org.green.hckh.repository.jpa.manager;

import org.green.hckh.entity.ClassRoomEntity;
import org.green.hckh.entity.SpotEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

/**
 * Created on 2024-12-16 by 황승현
 */
public interface SpotRepository extends JpaRepository<SpotEntity, Integer> {
    List<SpotEntity> findAllByOrderBySpotNameAsc();

    @Modifying
    @Query("UPDATE SpotEntity s SET s.deleteYn = 'Y' WHERE s.spotNo = :spotNo")
    void updateDeleteYnBySpotNo(@Param("spotNo") int spotNo);
}
