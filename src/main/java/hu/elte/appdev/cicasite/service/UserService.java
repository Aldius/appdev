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
	private User user;

	@Autowired
	public UserService(UserRepository userRepository) {this.userRepository = userRepository;}

	public User login(User user) throws UserNotValidException {
		if (isValid(user)) {
			return this.user = userRepository.findByUsername(user.getUsername()).get();
		}
		throw new UserNotValidException();
	}

	public boolean logout(){
		if(isLoggedIn()){
			this.user = null;
			return true;
		}
		return false;
	}

	private boolean isValid(User user) {
		return userRepository.findByUsernameAndPassword(user.getUsername(), user.getPassword()).isPresent();
	}

	public User register(User user) {
		user.setRole(USER);
		this.user = userRepository.save(user);
		return user;
	}

	public boolean isLoggedIn() {
		return user != null;
	}

}
