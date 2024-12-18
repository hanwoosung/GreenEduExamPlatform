package org.green.hckh.service.spotmanager.clazzroom;

import org.green.hckh.entity.ClassRoomEntity;

import java.util.List;

/**
 * Created on 2024-12-17 by 황승현
 */
public interface ClassRoomService {
    List<ClassRoomEntity> findBySpotNoOrderByClassName(int spotNo);
}
