package com.sagar.Service;

import com.sagar.DTO.UserDTO;
import org.springframework.stereotype.Service;


public interface UserService {
    UserDTO signup(UserDTO user);
}
