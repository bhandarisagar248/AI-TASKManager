package com.sagar.Implementation;

import com.sagar.DTO.UserDTO;
import com.sagar.Entity.User;
import com.sagar.Mapper.userMapper;
import com.sagar.Repository.userRepository;
import com.sagar.Service.UserService;
import org.springframework.security.crypto.password.PasswordEncoder;

public class UserServiceImp implements UserService {
    final userRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserServiceImp(userRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public UserDTO signup(UserDTO userDTO) {
        User result= userMapper.mapToUser(userDTO);
        result.setPassword(passwordEncoder.encode(userDTO.getPassword()));
        User savedUser= userRepository.save(result);
        return userMapper.mapToUserDTO(savedUser);


    }
}
