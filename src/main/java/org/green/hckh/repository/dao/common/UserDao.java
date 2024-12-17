package org.green.hckh.repository.dao.common;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.green.hckh.dto.common.UserDto;

@Mapper
public interface UserDao {

    int findCntById(String userId);

    UserDto findById(String userId);

    int save(@Param("user") UserDto user);
}
