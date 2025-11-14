package com.example.tp1rest;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class ExamStatService {

    private final ExamResultRepository examResultRepository;

    public ExamStatService(ExamResultRepository examResultRepository) {
        this.examResultRepository = examResultRepository;
    }

    public double getAverageMarkForExam(String exam) {
        List<ExamResult> examResults = examResultRepository.findByExam(exam);

        if (examResults.isEmpty()) {
            throw new RuntimeException("No results found for exam: " + exam);
        }

        return examResults.stream()
                .mapToDouble(ExamResult::getMark)
                .average()
                .orElse(0.0);
    }

    public double getAverageMarkForStudentForExam(Long studentId,String exam) {
        List<ExamResult> examResults = examResultRepository.findByExamAndStudentId(exam,studentId);

        if (examResults.isEmpty()) {
            throw new RuntimeException("No results found for exam: " + exam);
        }

        return examResults.stream()
                .mapToDouble(ExamResult::getMark)
                .average()
                .orElse(0.0);
    }
}
