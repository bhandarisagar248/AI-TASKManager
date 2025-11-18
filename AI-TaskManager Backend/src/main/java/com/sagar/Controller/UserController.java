package com.sagar.Controller;

import com.sagar.DTO.UserDTO;
import com.sagar.Entity.User;
import com.sagar.Service.UserService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@AllArgsConstructor
@RestController
@CrossOrigin("*")
@RequestMapping ("/api/user") // to handle the rest api request
public class UserController {

    // we will need the servie
    @Autowired
    private UserService userService;

    @PostMapping
    public ResponseEntity<UserDTO> userSignup(@RequestBody UserDTO  user){
        UserDTO saveduser=userService.signup(user);
        return new ResponseEntity<>(saveduser, HttpStatus.CREATED);
    }
}
