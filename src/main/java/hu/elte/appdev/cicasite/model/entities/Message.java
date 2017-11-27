package hu.elte.appdev.cicasite.model.entities;


import lombok.*;

import javax.persistence.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode(callSuper = true)
@Entity
@Table(name = "MESSAGES")
public class Message extends BaseEntity {

	@ManyToOne(targetEntity = User.class) private User user;

	@ManyToOne(targetEntity = User.class) private User from;

	@Column
	private String message;
}
