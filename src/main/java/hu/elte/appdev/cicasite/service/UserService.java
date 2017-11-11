package hu.elte.appdev.cicasite.service;

import hu.elte.appdev.cicasite.model.entities.*;
import hu.elte.appdev.cicasite.repository.*;
import hu.elte.appdev.cicasite.service.exceptions.*;
import lombok.*;
import org.springframework.beans.factory.annotation.*;
import org.springframework.stereotype.*;
import org.springframework.web.context.annotation.*;

import static hu.elte.appdev.cicasite.model.entities.User.Role.*;

@Service
@SessionScope
@Data
public class UserService {

	private final UserRepository userRepository;
	private       User           user;

	@Autowired
	public UserService(UserRepository userRepository) {this.userRepository = userRepository;}

	public User login(User user) throws UserNotValidException {
		if (userRepository.findByUsernameAndPassword(user.getUsername(), user.getPassword()).isPresent()) {
			this.user = userRepository.findByUsername(user.getUsername()).get();
			return this.user;
		}
		else {
			throw new UserNotValidException();
		}
	}

	public boolean logout() {
		if (isLoggedIn()) {
			this.user = null;
			return true;
		}
		return false;
	}

	public boolean isLoggedIn() {
		return user != null;
	}

	public User register(User user) throws AlreadyRegisteredException {
		if (userRepository.findByUsername(user.getUsername()).isPresent() || userRepository.findByEmail(user.getEmail()).isPresent()) {
			throw new AlreadyRegisteredException();
		}
		else {
			user.setRole(USER);
			this.user = userRepository.save(user);
			return this.user;
		}
	}

	public void delete(User user) {
		userRepository.delete(user);
	}

	public User modifyUser(User user) {
		userRepository.delete(user);
		userRepository.save(user);
		return user;
	}

}
