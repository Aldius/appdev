package hu.elte.appdev.cicasite.repository;

import hu.elte.appdev.cicasite.model.entities.*;
import org.springframework.data.repository.*;
import org.springframework.stereotype.Repository;

@Repository
public interface MessagesRepository extends CrudRepository<Message, Integer> {

	Iterable<Message> findByUser(User user);

	Iterable<Message> findByFrom(User from);

}
