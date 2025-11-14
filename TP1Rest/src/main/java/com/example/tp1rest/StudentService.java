package com.example.tp1rest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

@Service
@Transactional
public class StudentService {
    private final StudentRepository studentRepository;

    public StudentService(StudentRepository studentRepository) {
        this.studentRepository = studentRepository;
    }

    public Student addStudent(String name, Long registrationNb) {
        Student student = new Student();
        student.setName(name);
        student.setRegistrationNb(registrationNb);
        return studentRepository.save(student);
    }

    public void deleteStudent(@RequestParam Long studentId) {
        studentRepository.deleteById(studentId);
    }

    public List<Student> fetchAllStudents(){
        return(studentRepository.findAll());
    }

    public Student fetchStudentById(Long studentId){
        return(studentRepository.findById(studentId).orElseThrow(() -> new RuntimeException("Student not found")));
    }
}
