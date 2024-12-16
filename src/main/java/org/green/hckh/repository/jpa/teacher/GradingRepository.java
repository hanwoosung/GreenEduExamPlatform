package org.green.hckh.repository.jpa.teacher;

import org.green.hckh.entity.teacher.grading.GradingClassEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface GradingRepository extends JpaRepository<GradingClassEntity, Integer> {

    @Query("SELECT e FROM GradingClassEntity e WHERE e.userId = :userId AND e.deleteYn = 'N'")
    List<GradingClassEntity> findAllByUserId(@Param("userId") String userId);

    @Query(value = "SELECT s.schedule_no, s.schedule_name , " +
            "s.start_date, s.end_date , s.delete_yn , " +
            "s.class_no " +
            "FROM tbl_schedule s " +
            "JOIN tbl_class c ON s.class_no = c.class_no " +
            "WHERE c.user_id = :userId " +
            "AND c.delete_yn = 'N' " +
            "AND s.delete_yn = 'N'",
            nativeQuery = true)
    List<Object[]> findAllByUserIdScheduleList(@Param("userId") String userId);

}
