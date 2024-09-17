package com.codewithshashank.fullstackbackend.controller;

import com.codewithshashank.fullstackbackend.model.Contact;
import com.codewithshashank.fullstackbackend.repository.ContactRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;


@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class ContactController {

    @Autowired
    private ContactRepository contactRepository;


    //To push the data from front-end
    @PostMapping("/contact")
    Contact newContact(@RequestBody Contact newContact) {
        return contactRepository.save(newContact);
    }
}
