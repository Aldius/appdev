package hu.elte.appdev.cicasite.model.entities;


import lombok.*;

import javax.persistence.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode(callSuper = true)
@Entity
@Table(name = "REPORTS")
public class Report extends BaseEntity {

	@ManyToOne(cascade = CascadeType.ALL, targetEntity = User.class) private User user;

	@ManyToOne(cascade = CascadeType.ALL, targetEntity = User.class) private User reported_by;

	@Enumerated(EnumType.STRING) private ReportReason reason;

	public enum ReportReason {
		REASON1,
		REASON2,
		REASON3
	}
}
