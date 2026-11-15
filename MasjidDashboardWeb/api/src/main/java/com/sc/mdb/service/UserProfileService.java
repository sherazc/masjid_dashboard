package com.sc.mdb.service;

import com.sc.mdb.entity.UserProfile;
import com.sc.mdb.entity.UserRole;
import com.sc.mdb.repository.UserProfileRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserProfileService {
  private final UserProfileRepository userProfileRepository;

  public UserProfileService(UserProfileRepository userProfileRepository) {
    this.userProfileRepository = userProfileRepository;
  }

  public Optional<UserProfile> findByCompanyIdEmail(Long companyId, String email) {
    return userProfileRepository.findByCompanyIdAndEmail(companyId, email);
  }

  public List<UserRole> findRolesByCompanyAndEmail(Long companyId, String email) {
    return userProfileRepository.findRolesByCompanyAndEmail(companyId, email);
  }
}
