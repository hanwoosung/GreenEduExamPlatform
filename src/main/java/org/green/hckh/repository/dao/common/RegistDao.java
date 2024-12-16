package org.green.hckh.repository.dao.common;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface RegistDao {

    int findCntById(String userId);

}
