package com.sc.mdb.repository;

import com.sc.mdb.entity.Picklist;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PicklistRepository extends JpaRepository<Picklist, Long> {
}
