package com.example.tp1rest;

import jakarta.persistence.*;

@Entity
@Table(name = "scholarship")
public class Scholarship {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = true)
    private Double amount;

    @Column(nullable = true)
    private String description;

    @OneToOne
    @JoinColumn(name = "student_id") // Chaque bourse est attribuée à un étudiant
    private Student student;

    // Getters et setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public Double getAmount() { return amount; }
    public void setAmount(Double amount) { this.amount = amount; }
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    public Student getStudent() { return student; }
    public void setStudent(Student student) { this.student = student; }
}
