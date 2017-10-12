package hu.elte.appdev.cicasite.model.entities;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

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

	private String picture_path;

	@Column(nullable = false) @Enumerated(EnumType.STRING) private Status status;

	private String description;

	public enum Status {
		AVAILABLE, UNAVAILABLE
	}

}
