package org.green.hckh.repository.dao.common;

import org.apache.ibatis.annotations.Mapper;
import org.green.hckh.dto.common.SpotDto;

import java.util.List;

@Mapper
public interface SpotDao {

    List<SpotDto> findAll();

}
