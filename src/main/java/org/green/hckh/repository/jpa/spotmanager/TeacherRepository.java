package org.green.hckh.repository.jpa.spotmanager;

import org.green.hckh.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

/**
 * Created on 2024-12-17 by 황승현
 */
public interface TeacherRepository extends JpaRepository<UserEntity, String> {

    List<UserEntity> findBySpotNoAndUserRoleCodeOrderByName(int spotNo, String roleCode);
}
