package com.example.tp1rest;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ExamResultRepository extends JpaRepository<ExamResult, Long> {
    List<ExamResult> findByExam(String exam);
    List<ExamResult> findByExamAndStudentId(String exam, Long studentId);
    Optional<ExamResult> findByStudentIdAndExam(Long studentId, String exam);
}
