package com.codewithshashank.fullstackbackend.exception;

public class StudentNotFoundException extends RuntimeException{
    public StudentNotFoundException(Long id){
        super("Could not found the student with id " +id);
    }
}
