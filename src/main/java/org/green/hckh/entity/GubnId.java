package org.green.hckh.entity;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;

@Getter
@Setter
@EqualsAndHashCode
public class GubnId implements Serializable {
    private String groupCode;
    private String gubnCode;
}