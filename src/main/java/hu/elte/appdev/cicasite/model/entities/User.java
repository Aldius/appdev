package hu.elte.appdev.cicasite.model.entities;


import com.fasterxml.jackson.annotation.*;
import lombok.*;

import javax.persistence.*;
import java.io.*;
import java.util.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode(callSuper = true)
@Entity
@Table(name = "USER")
public class User extends BaseEntity implements Serializable {

	@Column(nullable = false, unique = true)
	private String username;

	@Column(nullable = false)
	private String password;

	@Column(nullable = false, unique = true)
	private String email;

	@Enumerated(EnumType.STRING)
	private Role role;

	@JsonManagedReference @OneToMany(mappedBy = "advertiser") private Set<Advertisement> ads;

	@JsonManagedReference @OneToMany(mappedBy = "user") private Set<Report> reports;

	@JsonManagedReference @OneToMany(mappedBy = "user") private List<Message> messages;

	@JsonManagedReference @OneToMany(mappedBy = "from") private List<Message> messagesSent;

	public enum Role {
		ADMIN,
		USER,
		GUEST
	}

}
