package com.sc.mdb.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "picklist_group")
@Getter
@Setter
@NoArgsConstructor
public class PicklistGroup {

    @Id
    @Column(name = "picklist_group_name")
    private String picklistGroupName;
}
