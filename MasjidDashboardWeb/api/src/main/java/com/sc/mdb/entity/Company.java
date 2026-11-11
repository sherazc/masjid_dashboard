package com.sc.mdb.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "company")
@Getter
@Setter
@NoArgsConstructor
public class Company {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String url;

    @Column(nullable = false, length = 512)
    private String website;

    private String street;

    @Column(length = 128)
    private String city;

    @Column(length = 64)
    private String state;

    @Column(length = 32)
    private String zip;

    @Column(length = 32)
    private String longitude;

    @Column(length = 32)
    private String latitude;

    @Column(nullable = false)
    private Boolean active = true;

    private LocalDateTime expirationDate;

    @CreationTimestamp
    @Column(nullable = false, updatable = false)
    private LocalDateTime createdDate;

    private LocalDateTime updatedDate;

    private String createdBy;

    private String updatedBy;
}
