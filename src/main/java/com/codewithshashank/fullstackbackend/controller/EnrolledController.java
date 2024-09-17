package com.codewithshashank.fullstackbackend.controller;


import com.codewithshashank.fullstackbackend.exception.EnrolledNotFoundException;
import com.codewithshashank.fullstackbackend.model.Enrolled;
import com.codewithshashank.fullstackbackend.repository.EnrolledRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
//connection between front-end and back-end
@CrossOrigin("http://localhost:3000/")

public class EnrolledController {

    @Autowired
    private EnrolledRepository enrolledRepository;

    // To push the data from front-end
    @PostMapping("/enrolled")
    Enrolled newEnrolled(@RequestBody Enrolled newEnrolled) {
        // Save the enrolled data to the database
        return enrolledRepository.save(newEnrolled);
    }

    //To pull the data from front-end
    @GetMapping("/enrolled")
    List<Enrolled> getAllEnrolled(){
        return enrolledRepository.findAll();
    }

    //To get the specific user
    @GetMapping("/enrolled/{id}")
    Enrolled getEnrolledById(@PathVariable Long id){
        return enrolledRepository.findById(id)
                //If id value not found
                //by using lamda function
                .orElseThrow(()->new EnrolledNotFoundException(id));
    }

    @PutMapping("/enrolled/{id}")
    Enrolled updateEnrolled(@RequestBody Enrolled newEnrolled, @PathVariable Long id){
        return enrolledRepository.findById(id)
                .map(enrolled -> {
                    enrolled.setStudent_fname(newEnrolled.getStudent_fname());
                    enrolled.setStudent_lname(newEnrolled.getStudent_lname());
                    enrolled.setGender(newEnrolled.getGender());
                    enrolled.setEmail(newEnrolled.getEmail());
                    enrolled.setUsn(newEnrolled.getUsn());
                    enrolled.setBranch(newEnrolled.getBranch());
                    enrolled.setBatch(newEnrolled.getBatch());
                    enrolled.setSemester(newEnrolled.getSemester());
                    enrolled.setSubject_code(newEnrolled.getSubject_code());
                    enrolled.setSubject_name(newEnrolled.getSubject_name());
                    return enrolledRepository.save(enrolled);
                } ).orElseThrow(()->new EnrolledNotFoundException(id));
    }

    @DeleteMapping("/enrolled/{id}")
    String deleteEnrolled(@PathVariable Long id){
        if(!enrolledRepository.existsById(id)){
            throw new EnrolledNotFoundException(id);
        }
        enrolledRepository.deleteById(id);
        return  "Enrolled Student with id "+id+ " has been deleted successfully.";
    }
}