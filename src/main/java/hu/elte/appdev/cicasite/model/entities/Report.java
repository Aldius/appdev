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
@Table(name = "REPORTS")
public class Report extends BaseEntity {

	@JoinColumn
	@ManyToOne(targetEntity = User.class)
	private User user;

	private User reported_by;

	@Enumerated(EnumType.STRING)
	private ReportReason reason;

	public enum ReportReason{
		REASON1, REASON2, REASON3
	}
}
