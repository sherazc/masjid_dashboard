package com.sc.mdb.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
@Table(name = "fundraise_campaign")
@Getter
@Setter
@NoArgsConstructor
public class FundraiseCampaign {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "company_id", nullable = false)
    private Company company;

    @Column(nullable = false)
    private Integer sortOrder = 0;

    private String name;

    @Column(precision = 14, scale = 2)
    private BigDecimal goal;

    @Column(precision = 14, scale = 2)
    private BigDecimal current;

    @Column(precision = 14, scale = 2)
    private BigDecimal pledge;

    private LocalDate endDate;

    private Boolean enabled;
}
