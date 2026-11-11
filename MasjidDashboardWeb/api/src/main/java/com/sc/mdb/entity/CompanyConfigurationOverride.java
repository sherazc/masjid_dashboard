package com.sc.mdb.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "company_configuration_override")
@Getter
@Setter
@NoArgsConstructor
public class CompanyConfigurationOverride {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "company_id", nullable = false)
    private Company company;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "company_configuration_default_id", nullable = false)
    private CompanyConfigurationDefault companyConfigurationDefault;

    @Column(columnDefinition = "text")
    private String value;
}
