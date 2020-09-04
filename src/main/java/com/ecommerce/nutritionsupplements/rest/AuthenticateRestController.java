package com.ecommerce.nutritionsupplements.rest;

import com.ecommerce.nutritionsupplements.entity.User;
import com.ecommerce.nutritionsupplements.models.AuthenticationRequest;
import com.ecommerce.nutritionsupplements.models.AuthenticationResponse;
import com.ecommerce.nutritionsupplements.service.serviceImpl.MyUserDetailsService;
import com.ecommerce.nutritionsupplements.service.UserService;
import com.ecommerce.nutritionsupplements.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
public class AuthenticateRestController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtUtil jwtTokenUtil;

    @Autowired
    private MyUserDetailsService userDetailsService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private UserService UserService;

    @GetMapping("/getUserByName/{userName}")
    public Optional<User> getUserByName(@PathVariable String userName){
        return UserService.findByUsername(userName);
    }

     @GetMapping("/getUserId/{userName}")
    public int getUserId(@PathVariable String userName){
        return UserService.findByUsername(userName).get().getId();
    }

    @RequestMapping(value = "/authenticate", method = RequestMethod.POST)
    public ResponseEntity<?> createAuthenticationToken(@RequestBody AuthenticationRequest authenticationRequest) throws Exception {
        Optional<User> user;
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(authenticationRequest.getUsername(), authenticationRequest.getPassword())
            );
        }
        catch (BadCredentialsException e) {
            throw new Exception("Incorrect username or password", e);
        }

        final UserDetails userDetails = userDetailsService
                .loadUserByUsername(authenticationRequest.getUsername());

        final String jwt = jwtTokenUtil.generateToken(userDetails);

        user = getUserByName(userDetails.getUsername());

        return ResponseEntity.ok(new AuthenticationResponse(jwt));
    }

    @PostMapping("/registerUser")
    public User addUser(@RequestBody User theUser) {

        // also just in case they pass an id in JSON ... set id to 0
        // this is to force a save of new item ... instead of update

        theUser.setId(0);

        UserService.registerUser(theUser);

        return theUser;
    }

    @PostMapping("/registerAdmin")
    public User addAdmin(@RequestBody User theUser) {


        theUser.setId(0);

        UserService.registerAdmin(theUser);

        return theUser;
    }

 @GetMapping("/getuser/{theid}")
    public User getuser(@PathVariable int theid) {

        User user = UserService.findById(theid);

        return user;
    }


}
