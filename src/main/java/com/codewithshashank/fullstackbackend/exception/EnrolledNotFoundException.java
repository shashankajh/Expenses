package com.codewithshashank.fullstackbackend.exception;

public class EnrolledNotFoundException extends RuntimeException{
    public EnrolledNotFoundException(Long id){
        super("Could not found the student enrolled with id " +id);
    }
}
