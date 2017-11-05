package hu.elte.appdev.cicasite.model.entities;


import com.fasterxml.jackson.annotation.*;
import lombok.*;
import javax.persistence.*;
import java.io.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode(callSuper = true)
@Entity
@Table(name = "ADS")
public class Advertisement extends BaseEntity{

	@JoinColumn
	@ManyToOne(targetEntity = User.class)
	private User advertiser;

	@Column(nullable = false) private String title;

	private String picture_path;

	@Column(nullable = false, name = "ADTYPE") @Enumerated(EnumType.STRING) private AdType adType;

	@Column(nullable = false) @Enumerated(EnumType.STRING) private Status status;

	private String description;

	public enum AdType {
		FORSALE,
		WOULDBUY,
		LOST
	}

	public enum Status {
		APPROVED,
		WAITING,
		DISAPPROVED
	}
}
