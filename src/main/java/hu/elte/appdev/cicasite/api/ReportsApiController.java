package hu.elte.appdev.cicasite.api;

import hu.elte.appdev.cicasite.model.entities.*;
import hu.elte.appdev.cicasite.service.*;
import org.springframework.beans.factory.annotation.*;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

import static hu.elte.appdev.cicasite.model.entities.User.Role.*;

@RestController
@RequestMapping("/api/reports")
public class ReportsApiController {

	private final UserService userService;

	private final ReportsService reportsService;

	@Autowired
	public ReportsApiController(UserService userService, ReportsService reportsService) {
		this.userService = userService;
		this.reportsService = reportsService;
	}

	@GetMapping("/all")
	public ResponseEntity<Iterable<Report>> getAll() {
		if (userService.isLoggedIn() && userService.getUser().getRole().equals(ADMIN)) {
			return ResponseEntity.ok(reportsService.getAll());
		}
		else {
			return ResponseEntity.badRequest().build();
		}
	}

	@PostMapping("/add")
	public ResponseEntity<Report> add(@RequestBody Report report) {
		if (userService.isLoggedIn()) {
			return ResponseEntity.ok(reportsService.add(report));
		}
		else {
			return ResponseEntity.badRequest().build();
		}
	}
}
