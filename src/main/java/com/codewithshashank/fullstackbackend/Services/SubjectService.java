package com.codewithshashank.fullstackbackend.Services;

import com.codewithshashank.fullstackbackend.model.Subject;
import com.codewithshashank.fullstackbackend.repository.SubjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class SubjectService {

    @Autowired
    private SubjectRepository subjectRepository;

    public Page<Subject> searchSubjects(String searchTerm, Pageable pageable) {
        return subjectRepository.searchSubjects(searchTerm, pageable);
    }

    public Subject saveSubject(Subject newSubject) {
        return subjectRepository.save(newSubject);
    }

    public Optional<Subject> getSubjectById(Long id) {
        return subjectRepository.findById(id);
    }

    public Subject updateSubject(Long id, Subject updatedSubject) {
        return subjectRepository.findById(id).map(subject -> {
            subject.setSubject_name(updatedSubject.getSubject_name());
            subject.setSubject_code(updatedSubject.getSubject_code());
            return subjectRepository.save(subject);
        }).orElseGet(() -> {
            updatedSubject.setId(id);
            return subjectRepository.save(updatedSubject);
        });
    }

    public void deleteSubject(Long id) {
        subjectRepository.deleteById(id);
    }
}
