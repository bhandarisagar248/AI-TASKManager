package com.sagar.Mapper;

import com.sagar.DTO.UserDTO;
import com.sagar.Entity.User;

public class userMapper {
    public static User mapToUser(UserDTO userDTO){
        User user=new User();
        user.setName(userDTO.getName());
        user.setEmail(userDTO.getEmail());
        user.setPassword(userDTO.getPassword());
        return user;
    }

    public static UserDTO mapToUserDTO(User user){
        UserDTO userDTO=new UserDTO();
        userDTO.setName(user.getName());
        userDTO.setEmail(user.getEmail());
        userDTO.setPassword(user.getPassword());
        return userDTO;
    }
}
