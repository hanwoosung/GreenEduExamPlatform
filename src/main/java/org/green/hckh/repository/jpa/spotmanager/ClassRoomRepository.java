package org.green.hckh.repository.jpa.spotmanager;

import org.green.hckh.entity.ClassEntity;
import org.green.hckh.entity.ClassRoomEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

/**
 * Created on 2024-12-16 by 황승현
 */
public interface ClassRoomRepository extends JpaRepository<ClassRoomEntity, Integer> {
    List<ClassRoomEntity> findBySpotNoOrderByRoomName(int spotNo);
}
