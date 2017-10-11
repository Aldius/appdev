package hu.elte.appdev.cicasite.model.entities;


import lombok.*;

import javax.persistence.*;
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

	public enum Role {
		ADMIN, REGISTERED, GUEST
	}

}
