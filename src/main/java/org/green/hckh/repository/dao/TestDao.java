package org.green.hckh.repository.dao;

import org.apache.ibatis.annotations.Mapper;
import org.aspectj.weaver.ast.Test;

@Mapper
public interface TestDao {
    Test test();
}
