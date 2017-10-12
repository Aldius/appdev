package hu.elte.appdev.cicasite.model.entities;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.ManyToOne;
import javax.persistence.Table;


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
