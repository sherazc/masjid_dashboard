package com.sc.mdb.repository;

import com.sc.mdb.entity.Hadith;
import org.springframework.data.jpa.repository.JpaRepository;

public interface HadithRepository extends JpaRepository<Hadith, Long> {
}
