package com.sc.mdb.service.security;

import com.sc.mdb.repository.UserProfileRepository;
import com.sc.mdb.service.UserProfileService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ScSecurityUserDetailService implements UserDetailsService {

  private static final String USER_NAME_REGEX = "[0-9]*\\/.{2,}@.{2,}\\..{2,}";

  private final UserProfileService userProfileService;

  @Override
  public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
    if (!USER_NAME_REGEX.matches(username))
      throw new UsernameNotFoundException("Invalid user name format: %s".formatted(username));

    String[] userNameParts = username.split("/");
    Long companyId = Long.parseLong(userNameParts[0].trim());
    String email = userNameParts[0].trim();

    userProfileService.findByCompanyIdEmail(companyId,email);

    return null;
  }
}
