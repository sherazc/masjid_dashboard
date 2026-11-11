package com.sc.mdb.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "company_configuration_default")
@Getter
@Setter
@NoArgsConstructor
public class CompanyConfigurationDefault {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private Integer sortOrder = 0;

    @Column(nullable = false)
    private String name;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "picklist_group_name")
    private PicklistGroup picklistGroup;

    private String label;

    @Column(columnDefinition = "text")
    private String defaultValue;

    @Column(columnDefinition = "text")
    private String description;

    @Column(length = 1024)
    private String displayImageUrl;
}
