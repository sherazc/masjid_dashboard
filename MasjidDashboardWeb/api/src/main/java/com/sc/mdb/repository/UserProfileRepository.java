package com.sc.mdb.repository;

import com.sc.mdb.entity.UserProfile;
import com.sc.mdb.entity.UserRole;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface UserProfileRepository extends JpaRepository<UserProfile, Long> {

  @Query(
      """
          select u from UserProfile u
          where lower(u.email) = lower(:email) and u.company.id = :companyId"""
  )
  Optional<UserProfile> findByCompanyIdAndEmail(Long companyId, String email);

  @Query(
      """
          select up.userRoles from UserProfile up
          where up.company.id = :companyId and lower(up.email) = lower(:email)"""
  )
  List<UserRole> findRolesByCompanyAndEmail(Long companyId, String email);
}
