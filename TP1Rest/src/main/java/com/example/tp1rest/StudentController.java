package com.example.tp1rest;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.transaction.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/students")
public class StudentController {

    private final StudentService studentService;

    public StudentController(StudentService studentService) {
        this.studentService = studentService;
    }

    @GetMapping("/fetchall")
    public List<Student> fetchAll(){
        return(studentService.fetchAllStudents());
    }

    @GetMapping("/fetchone")
    public Student fetchOne(@RequestParam Long id){
        return(studentService.fetchStudentById(id));
    }

    @GetMapping("/add")
    public Student addStudent(@RequestParam String name, @RequestParam Long registrationNb) {
        return studentService.addStudent(name, registrationNb);
    }

    @GetMapping("/delete")
    public void deleteStudent(@RequestParam Long studentId) {
        studentService.deleteStudent(studentId);
    }
}
