package hu.elte.appdev.cicasite.api;


import hu.elte.appdev.cicasite.model.entities.*;
import hu.elte.appdev.cicasite.service.*;
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

	@GetMapping
	public ResponseEntity<User> user() {
		if (userService.isLoggedIn()) {
			return ResponseEntity.ok(userService.getUser());
		}
		else {
			return ResponseEntity.badRequest().build();
		}
	}

	@PostMapping("/login")
	public ResponseEntity<User> login(@RequestBody User user) {
		try {
			return ResponseEntity.ok(userService.login(user));
		} catch (UserNotValidException e) {
			return ResponseEntity.badRequest().build();
		}
	}

	@GetMapping("/logout")
	public ResponseEntity logout() {
		if (userService.logout()) {
			return ResponseEntity.ok().build();
		}
		else {
			return ResponseEntity.badRequest().build();
		}
	}

	@PostMapping("/register")
	public ResponseEntity<User> register(@RequestBody User user) {
		try {
			return ResponseEntity.ok(userService.register(user));
		} catch (AlreadyRegisteredException e) {
			return ResponseEntity.badRequest().build();
		}
	}

	@PostMapping("/delete")
	public ResponseEntity deleteUser(@RequestBody User user) {
		try {
			if (userService.isLoggedIn() && (user.getId() == userService.getUser().getId() || userService.getUser().getRole().equals(ADMIN))) {
				userService.delete(user);
				return ResponseEntity.ok().build();
			}
			else {
				return ResponseEntity.status(401).build();
			}
		} catch (Exception e)
		{
			return ResponseEntity.badRequest().build();
		}
	}

	@PostMapping("/modify")
	public ResponseEntity<User> modifyUser(@RequestBody User user) {
		try {
			if (userService.isLoggedIn() && (user.getId() == userService.getUser().getId() || userService.getUser().getRole().equals(ADMIN))) {
				return ResponseEntity.ok(userService.modifyUser(user));
			}
			else {
				return ResponseEntity.status(401).build();
			}
		} catch (Exception e)
		{
			return ResponseEntity.badRequest().build();
		}
	}

}
