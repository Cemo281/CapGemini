package com.example.tp1rest;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.transaction.support.ResourceTransactionManager;

import java.util.List;
import java.util.Set;

@Service
@Transactional
public class CourseService {
    private final CourseRepository courseRepository;

    public CourseService(CourseRepository courseRepository) {
        this.courseRepository = courseRepository;
    }

    public Course addCourse(Long courseNb, String title){
        Course course = new Course();
        course.setCourseNb(courseNb);
        course.setTitle(title);
        return(courseRepository.save(course));
    }

    public Course updateCourse(Long courseId, String newTitle, Set<Student> newStudents) {
        Course course = courseRepository.findById(courseId)
                .orElseThrow(() -> new RuntimeException("Course not found"));
        course.setTitle(newTitle);
        course.setStudents(newStudents);
        return courseRepository.save(course);
    }

    public List<Course> fetchAllCourse(){
        return(courseRepository.findAll());
    }

    public Course fetchCourseById(Long courseId){
        return(courseRepository.findById(courseId).orElseThrow(() -> new RuntimeException("Course not found")));
    }

    public Course save(Course course){
        return(courseRepository.save(course));
    }

    public List<Course> saveAll(List<Course> courses){
        return(courseRepository.saveAll(courses));
    }
}
