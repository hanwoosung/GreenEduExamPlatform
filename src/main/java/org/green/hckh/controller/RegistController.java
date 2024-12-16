package org.green.hckh.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/")
public class RegistController {

    @GetMapping("/regist/cnt")
    public String regist(   ) {
        System.out.println("gd");
        return "aaa";
    }

}
