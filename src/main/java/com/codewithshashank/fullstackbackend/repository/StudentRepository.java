package com.codewithshashank.fullstackbackend.repository;

import com.codewithshashank.fullstackbackend.model.Student;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StudentRepository extends JpaRepository<Student,Long> {
}
