package hu.elte.appdev.cicasite.model.entities;


import lombok.*;

import javax.persistence.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode(callSuper = true)
@Entity
@Table(name = "ADS")
public class Advertisement extends BaseEntity {

	@ManyToOne
	private User advertiser;

	private String photos;

	@Enumerated(EnumType.STRING)
	private Status status;

	private String description;

	public enum Status {
		AVAILABLE, UNAVAILABLE
	}

}
