package hu.elte.appdev.cicasite.repository;

import hu.elte.appdev.cicasite.model.entities.*;
import org.springframework.data.repository.*;
import org.springframework.stereotype.Repository;

import java.util.*;

@Repository
public interface UserRepository extends CrudRepository<User, Integer> {

	Optional<User> findByUsername(String username);

	Optional<User> findByUsernameAndPassword(String username, String password);

	Optional<User> findByEmail(String email);

}
