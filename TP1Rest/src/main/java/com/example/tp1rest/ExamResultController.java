package com.example.tp1rest;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/exam-marks")
public class ExamResultController {

    private final ExamResultService examResultService;

    public ExamResultController(ExamResultService examMarkService) {
        this.examResultService = examMarkService;
    }

    @GetMapping("/set")
    public ExamResult setMark(@RequestParam Long studentId,
                            @RequestParam String exam,
                            @RequestParam Double mark) {
        return examResultService.setResult(studentId, exam, mark);
    }

    @GetMapping("/update")
    public ExamResult updateMark(@RequestParam Long studentId,
                               @RequestParam String exam,
                               @RequestParam Double newMark) {
        return examResultService.updateMark(studentId, exam, newMark);
    }
}
