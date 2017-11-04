package hu.elte.appdev.cicasite.api;


import hu.elte.appdev.cicasite.model.entities.*;
import hu.elte.appdev.cicasite.service.*;
import hu.elte.appdev.cicasite.service.annotations.*;
import hu.elte.appdev.cicasite.service.exceptions.*;
import org.springframework.beans.factory.annotation.*;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

import static hu.elte.appdev.cicasite.model.entities.User.Role.*;

@RestController
@RequestMapping("/api/user")
public class UserApiController {

	private final UserService userService;

	@Autowired
	public UserApiController(UserService userService) {
		this.userService = userService;
	}

	@Role({USER, ADMIN})
	@GetMapping
	public ResponseEntity<User> user() {
		if (userService.isLoggedIn()) {
			return ResponseEntity.ok(userService.getUser());
		}
		return ResponseEntity.badRequest().build();
	}

	@PostMapping("/login")
	public ResponseEntity<User> login(@RequestBody User user) {
		try {
			return ResponseEntity.ok(userService.login(user));
		} catch (UserNotValidException e) {
			return ResponseEntity.badRequest().build();
		}
	}

	@PostMapping("/register")
	public ResponseEntity<User> register(@RequestBody User user) {
		return ResponseEntity.ok(userService.register(user));
	}


}
