package com.sc.mdb.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "picklist")
@Getter
@Setter
@NoArgsConstructor
public class Picklist {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "picklist_group_name", nullable = false)
    private PicklistGroup picklistGroup;

    @Column(name = "key", nullable = false)
    private String key;

    @Column(name = "value")
    private String value;

    private String displayValue;

    @Column
    private String displayImageUrl;
}
