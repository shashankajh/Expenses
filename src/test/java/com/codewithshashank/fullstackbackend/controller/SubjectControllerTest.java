package com.codewithshashank.fullstackbackend.controller;

import com.codewithshashank.fullstackbackend.Services.SubjectService;
import com.codewithshashank.fullstackbackend.model.Subject;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
//import org.springframework.http.HttpStatus;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.RequestBody;
//import org.springframework.web.bind.annotation.RequestParam;

import java.util.Arrays;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

public class SubjectControllerTest {

    @InjectMocks
    private SubjectController subjectController;

    @Mock
    private SubjectService subjectService;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void testNewSubject() {
        //Creates a new instance of Subject for testing.
        Subject subject = new Subject();
        //replaces another component during testing
        when(subjectService.saveSubject(any(Subject.class))).thenReturn(subject);

        //Calls the newSubject method of subjectController and stores the result.
        Subject result = subjectController.newSubject(subject);
        //Asserts that the result from subjectController matches the expected subject.
        assertEquals(subject, result);
        //Verifies that saveSubject was called exactly once with the given subject.
        verify(subjectService, times(1)).saveSubject(subject);
    }

    @Test
    public void testGetSubjects() {
        Pageable pageable = PageRequest.of(0, 5);
        Subject subject = new Subject();
        Page<Subject> page = new PageImpl<>(Arrays.asList(subject));
        when(subjectService.searchSubjects(anyString(), eq(pageable))).thenReturn(page);

        Page<Subject> result = subjectController.getSubjects("", 0, 5);
        assertEquals(page, result);
        verify(subjectService, times(1)).searchSubjects("", pageable);
    }

    @Test
    public void testGetSubjectById() {
        Subject subject = new Subject();
        when(subjectService.getSubjectById(1L)).thenReturn(Optional.of(subject));

        Optional<Subject> result = subjectController.getSubjectById(1L);
        assertEquals(Optional.of(subject), result);
        verify(subjectService, times(1)).getSubjectById(1L);
    }

    @Test
    public void testUpdateSubject() {
        Subject updatedSubject = new Subject();
        when(subjectService.updateSubject(eq(1L), any(Subject.class))).thenReturn(updatedSubject);

        Subject result = subjectController.updateSubject(1L, updatedSubject);
        assertEquals(updatedSubject, result);
        verify(subjectService, times(1)).updateSubject(eq(1L), any(Subject.class));
    }

    @Test
    public void testDeleteSubject() {
        doNothing().when(subjectService).deleteSubject(1L);

        subjectController.deleteSubject(1L);
        verify(subjectService, times(1)).deleteSubject(1L);
    }
}
