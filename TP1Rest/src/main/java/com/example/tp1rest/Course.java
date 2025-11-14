package com.example.tp1rest;

import jakarta.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "course")
public class Course {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private Long courseNb;

    @Column(nullable = false)
    private String title;

    @ManyToMany(mappedBy = "courses") // Relation ManyToMany avec Student
    private Set<Student> students = new HashSet<>();

    // Getters et setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public Long getCourseNb() { return courseNb; }
    public void setCourseNb(Long courseNb) { this.courseNb = courseNb; }
    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }
    public Set<Student> getStudents() { return students; }
    public void setStudents(Set<Student> students) { this.students = students; }
}
