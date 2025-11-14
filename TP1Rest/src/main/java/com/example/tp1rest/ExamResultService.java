package com.example.tp1rest;


import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@Transactional
public class ExamResultService {

    private final ExamResultRepository examResultRepository;
    private final StudentRepository studentRepository;


    public ExamResultService(ExamResultRepository examMarkRepository,
                           StudentRepository studentRepository) {
        this.examResultRepository = examMarkRepository;
        this.studentRepository = studentRepository;
    }

    /** Set a new mark for a specific exam and student */
    public ExamResult setResult(Long studentId, String exam, Double mark) {
        Student student = studentRepository.findById(studentId)
                .orElseThrow(() -> new RuntimeException("Student not found"));
        ExamResult examResult = new ExamResult();
        examResult.setStudent(student);
        examResult.setMark(mark);
        examResult.setExam(exam);

        return examResultRepository.save(examResult);
    }

    /** Modify an existing mark for a specific exam and student */
    public ExamResult updateMark(Long studentId, String exam, Double newMark) {
        ExamResult examMark = examResultRepository.findByStudentIdAndExam(studentId, exam)
                .orElseThrow(() -> new RuntimeException("Exam mark not found"));
        examMark.setMark(newMark);
        return examResultRepository.save(examMark);
    }
}
