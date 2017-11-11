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

	@ManyToOne private User user;

	@ManyToOne private User from;

	private String message;

}
