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

	@GetMapping()
	public ResponseEntity<Iterable<Report>> getAll() {
		try {
			if (userService.isLoggedIn() && userService.getUser().getRole().equals(ADMIN)) {
				return ResponseEntity.ok(reportsService.getAll());
			}
			else {
				return ResponseEntity.status(401).build();
			}
		} catch (Exception e)
		{
			return ResponseEntity.badRequest().build();
		}
	}

	@PostMapping()
	public ResponseEntity<Report> add(@RequestBody Report report) {
		try {
			if (userService.isLoggedIn()) {
				report.setUser(userService.getUserRepository().findByUsername(report.getUser().getUsername()).get());
				report.setReported_by(userService.getUserRepository().findByUsername(report.getReported_by().getUsername()).get());
				return ResponseEntity.ok(reportsService.add(report));
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
