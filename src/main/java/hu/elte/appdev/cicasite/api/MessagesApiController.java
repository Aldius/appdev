package hu.elte.appdev.cicasite.api;


import hu.elte.appdev.cicasite.model.entities.*;
import hu.elte.appdev.cicasite.service.*;
import org.springframework.beans.factory.annotation.*;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/messages")
public class MessagesApiController {

	private final MessagesService messagesService;

	private final UserService userService;

	@Autowired
	public MessagesApiController(MessagesService messagesService, UserService userService) {
		this.messagesService = messagesService;
		this.userService = userService;
	}

	@GetMapping("/incoming")
	public ResponseEntity<Iterable<Message>> getMessages() {
		if (userService.isLoggedIn()) {
			return ResponseEntity.ok(messagesService.getMessages(userService.getUser()));
		}
		else {
			return ResponseEntity.badRequest().build();
		}
	}

	@GetMapping("/outgoing")
	public ResponseEntity<Iterable<Message>> getMessagesSent() {
		if (userService.isLoggedIn()) {
			return ResponseEntity.ok(messagesService.getMessagesSent(userService.getUser()));
		}
		else {
			return ResponseEntity.badRequest().build();
		}
	}

	@PostMapping("/send")
	public ResponseEntity<Message> sendMessage(@RequestBody Message message) {
		if (userService.isLoggedIn()) {
			return ResponseEntity.ok(messagesService.sendMessage(message));
		}
		else {
			return ResponseEntity.badRequest().build();
		}
	}

}
