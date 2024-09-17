package com.codewithshashank.fullstackbackend.controller;

import com.codewithshashank.fullstackbackend.exception.StudentNotFoundException;
import com.codewithshashank.fullstackbackend.model.Student;
import com.codewithshashank.fullstackbackend.repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
//connection between front-end and back-end
@CrossOrigin("http://localhost:3000/")

public class StudentController {

    @Autowired
    private StudentRepository studentRepository;

    //To push the data from front-end
    @PostMapping("/student")
    Student newStudent(@RequestBody Student newStudent){
        return studentRepository.save(newStudent);
    }

    //To pull the data from front-end
    @GetMapping("/student")
    List<Student> getAllStudents(){
        return studentRepository.findAll();
    }

    //To get the specific user
    @GetMapping("/student/{id}")
    Student getStudentById(@PathVariable Long id){
        return studentRepository.findById(id)
                //If id value not found
                //by using lamda function
                .orElseThrow(()->new StudentNotFoundException(id));
    }

    @PutMapping("/student/{id}")
    Student updateStudent(@RequestBody Student newStudent, @PathVariable Long id){
        return studentRepository.findById(id)
                .map(student -> {
                    student.setStudent_fname(newStudent.getStudent_fname());
                    student.setStudent_lname(newStudent.getStudent_lname());
                    student.setGender(newStudent.getGender());
                    student.setEmail(newStudent.getEmail());
                    student.setUsn(newStudent.getUsn());
                    student.setBranch(newStudent.getBranch());
                    student.setBatch(newStudent.getBatch());
                    student.setSemester(newStudent.getSemester());
                    return studentRepository.save(student);
                } ).orElseThrow(()->new StudentNotFoundException(id));
    }

    @DeleteMapping("/student/{id}")
    String deleteStudent(@PathVariable Long id){
        if(!studentRepository.existsById(id)){
            throw new StudentNotFoundException(id);
        }
        studentRepository.deleteById(id);
        return  "Student with id "+id+ " has been deleted successfully.";
    }
}
