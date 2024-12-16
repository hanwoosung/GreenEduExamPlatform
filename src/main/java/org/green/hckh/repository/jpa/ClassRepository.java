package org.green.hckh.repository.jpa;

import org.green.hckh.entity.teacher.schedule.ClassEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

/**
 * Created on 2024-12-16 by 황승현
 */
public interface ClassRepository extends JpaRepository<ClassEntity, Integer> {
    Optional<List<ClassEntity>> findBySpotNo(int spotNo);
}
