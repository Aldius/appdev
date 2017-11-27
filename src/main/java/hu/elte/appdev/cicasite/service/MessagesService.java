package hu.elte.appdev.cicasite.service;


import hu.elte.appdev.cicasite.model.entities.*;
import hu.elte.appdev.cicasite.repository.*;
import org.springframework.beans.factory.annotation.*;
import org.springframework.stereotype.*;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

@Service
public class MessagesService {

	private final MessagesRepository messagesRepository;

	@Autowired
	public MessagesService(MessagesRepository messagesRepository) {
		this.messagesRepository = messagesRepository;
	}

	public Iterable<Message> getMessages(User user) {
		Iterable<Message> all =  messagesRepository.findAll();
		Iterator<Message> iterator = all.iterator();

		List<Message> good = new ArrayList<>();
		while(iterator.hasNext())
		{
			Message current = iterator.next();
			if(current.getUser().getUsername().equals(user.getUsername())){
				good.add(current);
			}
		}

		return good;
	}

	public Iterable<Message> getMessagesSent(User user) {
		Iterable<Message> all =  messagesRepository.findAll();
		Iterator<Message> iterator = all.iterator();

		List<Message> good = new ArrayList<>();
		while(iterator.hasNext())
		{
			Message current = iterator.next();
			if(current.getFrom().getUsername().equals(user.getUsername())){
				good.add(current);
			}
		}

		return good;
	}

	public Message sendMessage(Message message) {
		return messagesRepository.save(message);
	}
}
