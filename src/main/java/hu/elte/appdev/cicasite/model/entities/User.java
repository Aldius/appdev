package hu.elte.appdev.cicasite.model.entities;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.List;
import java.util.Set;

@Data
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode(callSuper = true)
@Entity
@Table(name = "USER")
public class User extends BaseEntity {

	@Column(nullable = false, unique = true)
	private String username;

	@Column(nullable = false)
	private String password;

	@Column(nullable = false, unique = true)
	private String email;

	@Enumerated(EnumType.STRING)
	private Role role;

	@OneToMany(mappedBy = "advertiser")
	private Set<Advertisement> ads;

	@OneToMany(mappedBy = "user") private Set<Report> reports;

	@OneToMany(mappedBy = "user") private List<Message> messages;

	@OneToMany(mappedBy = "from") private List<Message> messagesSent;

	public enum Role {
		ADMIN, REGISTERED, GUEST
	}

}
