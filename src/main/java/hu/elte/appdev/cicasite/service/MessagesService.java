package hu.elte.appdev.cicasite.service;


import hu.elte.appdev.cicasite.model.entities.*;
import hu.elte.appdev.cicasite.repository.*;
import org.springframework.beans.factory.annotation.*;
import org.springframework.stereotype.*;

@Service
public class MessagesService {

	private final MessagesRepository messagesRepository;

	@Autowired
	public MessagesService(MessagesRepository messagesRepository) {
		this.messagesRepository = messagesRepository;
	}

	public Iterable<Message> getMessages(User user) {
		return messagesRepository.findByUser(user);
	}

	public Iterable<Message> getMessagesSent(User user) {
		return messagesRepository.findByFrom(user);
	}

	public Message sendMessage(Message message) {
		return messagesRepository.save(message);
	}
}
