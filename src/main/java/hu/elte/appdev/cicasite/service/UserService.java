package hu.elte.appdev.cicasite.service;

import hu.elte.appdev.cicasite.model.entities.*;
import hu.elte.appdev.cicasite.repository.*;
import hu.elte.appdev.cicasite.service.exceptions.*;
import lombok.*;
import org.springframework.beans.factory.annotation.*;
import org.springframework.stereotype.*;
import org.springframework.web.context.annotation.*;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

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

	public Iterable<String> getUsernames() {
		Iterable<User> users = userRepository.findAll();
		Iterator<User> iterator = users.iterator();

		List<String> good = new ArrayList<>();
		while(iterator.hasNext())
		{
			User currentUser = iterator.next();
			good.add(currentUser.getUsername());
		}

		return good;
	}

	public Iterable<User> getUsers() { return userRepository.findAll(); }

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
		User toDelete = userRepository.findByUsername(user.getUsername()).get();
		userRepository.delete(toDelete);
		if (this.user.getUsername().equals(user.getUsername())){
			this.user = null;
		}
	}

	public User modifyUser(User user) {
		User currentUser = userRepository.findByUsername(user.getUsername()).get();
		currentUser.setFullName(user.getFullName());
		currentUser.setEmail(user.getEmail());
		currentUser.setPhone(user.getPhone());
		userRepository.save(currentUser);
		this.user = currentUser;
		return user;
	}

}
