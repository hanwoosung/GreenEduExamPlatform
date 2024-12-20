package org.green.hckh.repository.jpa.spotmanager;

import org.green.hckh.entity.ClassEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

/**
 * Created on 2024-12-16 by 황승현
 */
public interface ClassRepository extends JpaRepository<ClassEntity, Integer> {
    @Query(value = "SELECT * " +
            "FROM tbl_class " +
            "WHERE spot_no = :spotNo AND delete_yn = 'N'" +
            "ORDER BY CASE " +
            "WHEN NOW() >= end_date THEN 99 " +
            "ELSE start_date END",
            nativeQuery = true)
    Optional<List<ClassEntity>> findBySpotNo(int spotNo);

    @Modifying
    @Query("UPDATE ClassEntity c SET c.deleteYn = 'Y' WHERE c.classNo = :classNo")
    void updateDeleteYnByClassNo(@Param("classNo") int classNo);
}
