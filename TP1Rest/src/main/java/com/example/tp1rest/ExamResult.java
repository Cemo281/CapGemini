package com.example.tp1rest;

import jakarta.persistence.*;

import javax.xml.crypto.Data;
import java.util.Date;

@Entity
@Table(name = "exam_result")
public class ExamResult {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "student_id") // Chaque résultat appartient à un étudiant
    private Student student;

    @Column(nullable = false)
    private String exam;

    @Column(nullable = false)
    private Double mark;

    /*@Column(nullable = false)
    private Date date;*/

    // Getters et setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public Student getStudent() { return student; }
    public void setStudent(Student student) { this.student = student; }
    public String getExam() { return exam; }
    public void setExam(String exam) { this.exam = exam; }
    public Double getMark() { return mark; }
    public void setMark(Double mark) { this.mark = mark; }
    /*public Date getDate() { return date; }
    public void setDate(Date date) { this.date = date; }*/
}
