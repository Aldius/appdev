package hu.elte.appdev.cicasite.model.entities;


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
public class User extends BaseEntity implements Serializable{

	@Column(nullable = false, unique = true)
	private String username;

	@Column(nullable = false)
	private String password;

	@Column(nullable = false, unique = true)
	private String email;

	@Enumerated(EnumType.STRING)
	private Role role;

    @JoinColumn
    @OneToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL, orphanRemoval = true, targetEntity = Advertisement.class)
    private List<Advertisement> ads;

    @JoinColumn
    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true, targetEntity = Report.class)
    private List<Report> reports;

    @JoinColumn
    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true, targetEntity = Message.class)
    private List<Message> messages;

    @JoinColumn
    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true, targetEntity = Message.class)
    private List<Message> messagesSent;

	public enum Role {
		ADMIN,
		USER,
		GUEST
	}

}
