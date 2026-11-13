package com.sc.mdb.repository;

import com.sc.mdb.entity.ExpenseSheetRow;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ExpenseSheetRowRepository extends JpaRepository<ExpenseSheetRow, Long> {
}
