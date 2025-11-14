package com.example.tp1rest;


import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/exam-stats")
public class ExamStatController {

    private final ExamStatService examStatisticsService;

    public ExamStatController(ExamStatService examStatisticsService) {
        this.examStatisticsService = examStatisticsService;
    }

    @GetMapping("/average")
    public double getAverageForExam(@RequestParam String exam) {
        return examStatisticsService.getAverageMarkForExam(exam);
    }

    @GetMapping("/average/student")
    public double getAverageForExamAndStudent(@RequestParam String exam,
                                              @RequestParam Long studentId) {
        return examStatisticsService.getAverageMarkForStudentForExam(studentId, exam);
    }
}

