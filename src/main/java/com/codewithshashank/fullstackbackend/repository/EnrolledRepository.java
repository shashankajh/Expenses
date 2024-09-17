package com.codewithshashank.fullstackbackend.repository;

import com.codewithshashank.fullstackbackend.model.Enrolled;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EnrolledRepository extends JpaRepository<Enrolled,Long> {
}
