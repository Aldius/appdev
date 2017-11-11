package hu.elte.appdev.cicasite.model.entities;


import com.fasterxml.jackson.annotation.*;
import lombok.*;

import javax.persistence.*;
import java.util.*;

@Data
@EqualsAndHashCode(callSuper = true)
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "USER")
public class User extends BaseEntity {

	@Column(nullable = false, unique = true) private String username;

	private String fullName;

	@Column(nullable = false) private String password;

	@Column(nullable = false, unique = true) private String email;

	private String phone;

	@Enumerated(EnumType.STRING)
	@Column(nullable = false)
	private Role role;

	@JsonIgnore
	@JoinColumn(name = "ADVERTISER_ID")
	@OneToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL, orphanRemoval = true, targetEntity = Advertisement.class)
	private List<Advertisement> ads;

	@JsonIgnore
	@JoinColumn(name = "USER_ID")
	@OneToMany(cascade = CascadeType.ALL, orphanRemoval = true, targetEntity = Report.class)
	private List<Report> reports; // this user got these reports

	@JsonIgnore
	@JoinColumn(name = "REPORTED_BY_ID")
	@OneToMany(cascade = CascadeType.ALL, orphanRemoval = true, targetEntity = Report.class)
	private List<Report> reported; // this user handed in these reports

	@JsonIgnore
	@JoinColumn(name = "USER_ID")
	@OneToMany(cascade = CascadeType.ALL, orphanRemoval = true, targetEntity = Message.class)
	private List<Message> messages;

	@JsonIgnore
	@JoinColumn(name = "FROM_ID")
	@OneToMany(cascade = CascadeType.ALL, orphanRemoval = true, targetEntity = Message.class)
	private List<Message> messagesSent;

	public enum Role {
		GUEST,
		ADMIN,
		USER
	}

}
