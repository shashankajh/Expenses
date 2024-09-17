package com.codewithshashank.fullstackbackend.repository;

import com.codewithshashank.fullstackbackend.model.Subject;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface SubjectRepository extends JpaRepository<Subject, Long> {

    @Query("SELECT s FROM Subject s WHERE LOWER(s.subject_name) LIKE LOWER(CONCAT('%', :searchTerm, '%'))")
    Page<Subject> searchSubjects(String searchTerm, Pageable pageable);
}
