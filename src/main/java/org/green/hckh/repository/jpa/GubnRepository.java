package org.green.hckh.repository.jpa;

import org.green.hckh.entity.GubnEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

/**
 * Created on 2024-12-19 by 황승현
 */
public interface GubnRepository extends JpaRepository<GubnEntity, String> {
    List<GubnEntity> findAllByGroupCode(String groupCode);
}
