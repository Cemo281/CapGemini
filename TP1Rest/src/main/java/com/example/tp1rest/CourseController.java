package com.example.tp1rest;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/course")
public class CourseController {

    private final CourseService courseService;

    public CourseController(CourseService courseService) {
        this.courseService = courseService;
    }

    @GetMapping("/addCourse")
    public Course addCourse(@RequestParam Long courseNb,@RequestParam String title){
        return(courseService.addCourse(courseNb,title));
    }

    @GetMapping("/fetchall")
    public List<Course> fetchAll(){
        return(courseService.fetchAllCourse());
    }

    @GetMapping("/fetchone")
    public Course fetchOne(@RequestParam Long id){
        return(courseService.fetchCourseById(id));
    }

    @PostMapping
    public ResponseEntity<Course> create(@RequestBody Course course){
        Course saved = courseService.save(course);
        return ResponseEntity.status(HttpStatus.CREATED).body(saved);
    }

    @PostMapping("/batch")
    public ResponseEntity<List<Course>> addMultipleProducts(@RequestBody List<Course> courses) {
        List<Course> saved = courseService.saveAll(courses);
        return ResponseEntity.status(HttpStatus.CREATED).body(saved);
    }
}
