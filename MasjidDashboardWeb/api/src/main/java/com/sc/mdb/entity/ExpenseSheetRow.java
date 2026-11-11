package com.sc.mdb.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "expense_sheet_row")
@Getter
@Setter
@NoArgsConstructor
public class ExpenseSheetRow {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "sheet_id", nullable = false)
    private ExpenseSheet sheet;

    @Column(nullable = false)
    private Integer sortOrder = 0;

    private String label;

    @Column(columnDefinition = "text")
    private String value;
}
