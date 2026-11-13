package com.sc.mdb.repository;

import com.sc.mdb.entity.ExpenseSheet;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ExpenseSheetRepository extends JpaRepository<ExpenseSheet, Long> {
}
